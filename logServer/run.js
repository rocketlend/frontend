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
  lenderIdsByAddress: {},
  pendingLenderIdsByAddress: {},
}

const eventNames = [[
  'RegisterLender',
  'PendingChangeLenderAddress',
  'ConfirmChangeLenderAddress',
]]

const updateCache = async (toBlock) => {
  while (cache.blockNumber < toBlock) {
    const fromBlock = cache.blockNumber
    const untilBlock = Math.min(toBlock, fromBlock + MAX_QUERY_RANGE)
    console.log(`About to run queryFilter ${fromBlock}...${untilBlock}`)
    const logs = await rocketLend.queryFilter(eventNames, fromBlock, untilBlock)
    console.log(`Got ${logs.length} logs from filter`)
    logs.sort((a, b) => a.blockNumber < b.blockNumber ? -1 :
                        a.blockNumber > b.blockNumber ? +1 :
                        a.index < b.index ? -1 :
                        a.index > b.index ? +1 : 0)
    for (const log of logs) {
      if (cache.blockNumber < log.blockNumber ||
          cache.blockNumber === log.blockNumber &&
          cache.logIndex < log.index) {
        cache.blockNumber = log.blockNumber
        cache.logIndex = log.index
        console.log(`Waiting to get transaction from log at ${log.blockNumber}`)
        const tx = await log.getTransaction()
        const desc = rocketLend.interface.parseTransaction(tx)
        switch (log.eventName) {
          case 'RegisterLender': {
            const address = tx.from.toLowerCase()
            const lenderId = log.args.lender.toString()
            cache.lenderIdsByAddress[address] ||= new Set()
            console.log(`Adding lenderId ${lenderId} to ${tx.from}`)
            cache.lenderIdsByAddress[address].add(lenderId)
            break
          }
          case 'PendingChangeLenderAddress': {
            const oldAddress = log.args.old.toLowerCase()
            const newAddress = desc.args._newAddress.toLowerCase()
            const lenderId = desc.args._lender.toString()
            cache.pendingLenderIdsByAddress[newAddress] ||= new Set()
            if (cache.pendingLenderIdsByAddress[oldAddress]) {
              console.log(`Clearing pending transfer of ${lenderId} to ${log.args.old}`)
              cache.pendingLenderIdsByAddress[oldAddress].delete(lenderId)
            }
            console.log(`Adding pending transfer of ${lenderId} to ${desc.args._newAddress}`)
            cache.pendingLenderIdsByAddress[newAddress].add(lenderId)
            break
          }
          case 'ConfirmChangeLenderAddress': {
            const oldAddress = log.args.old.toLowerCase()
            const oldPending = log.args.oldPending.toLowerCase()
            const newAddress = (desc.name == 'changeLenderAddress' ? decs.args._newAddress : tx.from).toLowerCase()
            const lenderId = desc.args._lender.toString()
            cache.lenderIdsByAddress[newAddress] ||= new Set()
            console.log(`Removing lenderId ${lenderId} from ${log.args.old}`)
            cache.lenderIdsByAddress[oldAddress].delete(lenderId)
            console.log(`Adding lenderId ${lenderId} to ${ethers.getAddress(newAddress)}`)
            cache.lenderIdsByAddress[newAddress].add(lenderId)
            if (cache.pendingLenderIdsByAddress[oldPending]) {
              console.log(`Clearing pending transfer of ${lenderId} to ${log.args.old}`)
              cache.pendingLenderIdsByAddress[oldPending].delete(lenderId)
            }
            break
          }
        }
      }
      else {
        console.log(`Skipping ${log.blockNumber}:${log.logIndex} vs ${cache.blockNumber}:${cache.logIndex}`)
      }
    }
    if (cache.blockNumber == fromBlock) {
      cache.blockNumber = untilBlock
      cache.logIndex = 0
    }
  }
  console.log(`Updated events to ${toBlock}`)
}

await updateCache(await provider.getBlockNumber())

provider.on('block', async (blockNumber) => {
  await updateCache(blockNumber)
})

const addressRe = '0x[0-9a-fA-F]{40}'

const app = express()

app.use(cors())

app.get(`/lenderIds/:address(${addressRe})`, async (req, res, next) => {
  try {
    const address = req.params.address.toLowerCase()
    const ids = cache.lenderIdsByAddress[address] || []
    return res.status(200).json({
      untilBlock: cache.blockNumber,
      lenderIds: Array.from(ids),
    })
  }
  catch (e) { next(e) }
})

app.listen(port)
