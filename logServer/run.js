import { config } from '@dotenvx/dotenvx';
import { ethers } from 'ethers';
import { readFileSync } from 'node:fs';
import express from 'express';
import cors from 'cors';

config({path: ['../.env', '../.env.local']})

const port = 8879

// TODO: parameterise by chain

const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_HOLESKY_RPC || 'http://localhost:8546')

const abiRegExp = /const abi =\s+(?<abi>\[.*\])\s+as const/s
const rocketLendABI = JSON.parse(abiRegExp.exec(readFileSync('../src/rocketlend.abi.ts', 'utf8')).groups.abi)

const rocketLend = new ethers.Contract(
  process.env.NEXT_PUBLIC_HOLESKY_ROCKETLEND, rocketLendABI, provider)

const deployBlock = parseInt(process.env.HOLESKY_DEPLOY_BLOCK)

const MAX_QUERY_RANGE = 1024

const cache = {
  blockNumber: deployBlock,
  logIndex: 0,
  nodesByBorrowerAddress: {},
  pendingNodesByBorrowerAddress: {},
  poolIdsByLenderAddress: {},
  pendingPoolIdsByLenderAddress: {},
}

const eventNames = [[
  'CreatePool',
  'PendingTransferPool',
  'ConfirmTransferPool',
  'JoinProtocol',
  'LeaveProtocol',
  'PendingChangeBorrowerAddress',
  'ConfirmChangeBorrowerAddress',
]]

const updateCache = async (toBlock) => {
  while (cache.blockNumber < toBlock) {
    const fromBlock = cache.blockNumber
    const untilBlock = Math.min(toBlock, fromBlock + MAX_QUERY_RANGE)
    console.log(`About to run queryFilter ${fromBlock}...${untilBlock}`)
    const logs = await rocketLend.queryFilter(eventNames, fromBlock, untilBlock)
    console.log(`Got ${logs.length} logs from filter`)
    let processed
    logs.sort((a, b) => a.blockNumber < b.blockNumber ? -1 :
                        a.blockNumber > b.blockNumber ? +1 :
                        a.index < b.index ? -1 :
                        a.index > b.index ? +1 : 0)
    for (const log of logs) {
      if (cache.blockNumber < log.blockNumber ||
          cache.blockNumber === log.blockNumber &&
          cache.logIndex < log.index) {
        console.log(`Waiting to get transaction from log at ${log.blockNumber}`)
        const tx = await log.getTransaction()
        const desc = rocketLend.interface.parseTransaction(tx)
        switch (log.eventName) {
          case 'JoinProtocol': {
            const node = desc.args._node.toLowerCase()
            const borrower = log.args.borrower.toLowerCase()
            cache.nodesByBorrowerAddress[borrower] ||= new Set()
            console.log(`Adding node ${desc.args._node} to borrower ${log.args.borrower}`)
            cache.nodesByBorrowerAddress[borrower].add(node)
            break
          }
          case 'LeaveProtocol': {
            const oldAddress = tx.from.toLowerCase()
            const oldPending = log.args.oldPending.toLowerCase()
            const node = desc.args._node.toLowerCase()
            console.log(`Removing node ${desc.args._node} from ${tx.from}`)
            cache.nodesByBorrowerAddress[oldAddress].delete(node)
            if (cache.pendingNodesByBorrowerAddress[oldPending]) {
              console.log(`Clearing pending transfer of ${desc.args._node} to ${log.args.oldPending}`)
              cache.pendingNodesByBorrowerAddress[oldPending].delete(node)
            }
            break
          }
          case 'PendingChangeBorrowerAddress': {
            const oldAddress = log.args.old.toLowerCase()
            const newAddress = desc.args._newAddress.toLowerCase()
            const node = desc.args._node.toLowerCase()
            cache.pendingNodesByBorrowerAddress[newAddress] ||= new Set()
            if (cache.pendingNodesByBorrowerAddress[oldAddress]) {
              console.log(`Clearing pending transfer of ${desc.args._node} to ${log.args.old}`)
              cache.pendingNodesByBorrowerAddress[oldAddress].delete(node)
            }
            console.log(`Adding pending transfer of ${desc.args._node} to ${desc.args._newAddress}`)
            cache.pendingNodesByBorrowerAddress[newAddress].add(node)
            break
          }
          case 'ConfirmChangeBorrowerAddress': {
            const oldAddress = log.args.old.toLowerCase()
            const oldPending = log.args.oldPending.toLowerCase()
            const newAddress = (desc.name == 'changeBorrowerAddress' ? desc.args._newAddress : tx.from).toLowerCase()
            const node = desc.args._node.toLowerCase()
            cache.nodesByBorrowerAddress[newAddress] ||= new Set()
            console.log(`Removing node ${desc.args._node} from ${log.args.old}`)
            cache.nodesByBorrowerAddress[oldAddress].delete(node)
            console.log(`Adding node ${desc.args._node} to ${ethers.getAddress(newAddress)}`)
            cache.nodesByBorrowerAddress[newAddress].add(node)
            if (cache.pendingNodesByBorrowerAddress[oldPending]) {
              console.log(`Clearing pending transfer of ${desc.args._node} to ${log.args.old}`)
              cache.pendingNodesByBorrowerAddress[oldPending].delete(node)
            }
            break
          }
          case 'CreatePool': {
            const poolId = log.args.id.toLowerCase()
            const lender = tx.from.toLowerCase()
            cache.poolIdsByLenderAddress[lender] ||= new Set()
            console.log(`Adding pool ${log.args.id} to lender ${tx.from}`)
            cache.poolIdsByLenderAddress[lender].add(poolId)
            break
          }
          case 'PendingTransferPool': {
            const oldAddress = log.args.old.toLowerCase()
            const newAddress = desc.args._newAddress.toLowerCase()
            const poolId = desc.args._poolId.toString()
            cache.pendingPoolIdsByLenderAddress[newAddress] ||= new Set()
            if (cache.pendingPoolIdsByLenderAddress[oldAddress]) {
              console.log(`Clearing pending transfer of pool ${poolId} to ${log.args.old}`)
              cache.pendingPoolIdsByLenderAddress[oldAddress].delete(poolId)
            }
            console.log(`Adding pending transfer of pool ${poolId} to ${desc.args._newAddress}`)
            cache.pendingPoolIdsByLenderAddress[newAddress].add(poolId)
            break
          }
          case 'ConfirmTransferPool': {
            const oldAddress = log.args.old.toLowerCase()
            const oldPending = log.args.oldPending.toLowerCase()
            const newAddress = (desc.name == 'transferPool' ? desc.args._newAddress : tx.from).toLowerCase()
            const poolId = desc.args._poolId.toString()
            cache.poolIdsByLenderAddress[newAddress] ||= new Set()
            console.log(`Removing pool ${poolId} from lender ${log.args.old}`)
            cache.poolIdsByLenderAddress[oldAddress].delete(poolId)
            console.log(`Adding pool ${poolId} to lender ${ethers.getAddress(newAddress)}`)
            cache.poolIdsByLenderAddress[newAddress].add(poolId)
            if (cache.pendingPoolIdsByLenderAddress[oldPending]) {
              console.log(`Clearing pending transfer of pool ${poolId} to ${log.args.old}`)
              cache.pendingPoolIdsByLenderAddress[oldPending].delete(poolId)
            }
            break
          }
        }
        cache.blockNumber = log.blockNumber
        cache.logIndex = log.index
        processed = true
      }
      else {
        console.log(`Skipping ${log.blockNumber}:${log.index} vs ${cache.blockNumber}:${cache.logIndex}`)
      }
    }
    if (!processed) {
      cache.blockNumber = untilBlock
      cache.logIndex = 0
      console.log(`No logs processed, so marking cache done to ${untilBlock}:0`)
    }
  }
  console.log(`Updated events to ${toBlock}`)
}

await updateCache(await provider.getBlockNumber())

provider.on('block', async (blockNumber) => {
  await updateCache(blockNumber)
})

const addressRe = '0x[0-9a-fA-F]{40}'
const numberRe = '0|[1-9][0-9]*'

const app = express()

app.use(cors())

app.get(`/nodes/:address(${addressRe})`, async (req, res, next) => {
  try {
    const address = req.params.address.toLowerCase()
    const nodes = cache.nodesByBorrowerAddress[address] || []
    return res.status(200).json({
      untilBlock: cache.blockNumber,
      nodes: Array.from(nodes),
    })
  }
  catch (e) { next(e) }
})

app.get(`/pendingNodes/:address(${addressRe})`, async (req, res, next) => {
  try {
    const address = req.params.address.toLowerCase()
    const nodes = cache.pendingNodesByBorrowerAddress[address] || []
    return res.status(200).json({
      untilBlock: cache.blockNumber,
      pendingNodes: Array.from(nodes),
    })
  }
  catch (e) { next(e) }
})

app.get(`/poolIds/:address(${addressRe})`, async (req, res, next) => {
  try {
    const address = req.params.address.toLowerCase()
    const ids = cache.poolIdsByLenderAddress[address] || []
    return res.status(200).json({
      untilBlock: cache.blockNumber,
      poolIds: Array.from(ids),
    })
  }
  catch (e) { next (e) }
})

app.get(`/pendingPoolIds/:address(${addressRe})`, async (req, res, next) => {
  try {
    const address = req.params.address.toLowerCase()
    const ids = cache.pendingPoolIdsByLenderAddress[address] || []
    return res.status(200).json({
      untilBlock: cache.blockNumber,
      pendingPoolIds: Array.from(ids),
    })
  }
  catch (e) { next(e) }
})

app.listen(port)
