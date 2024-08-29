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

const eventNames = [
  'RegisterLender',
  'PendingChangeLenderAddress',
  'ConfirmChangeLenderAddress',
]

const updateCache = async (toBlock) => {
  while (cache.blockNumber < toBlock) {
    const fromBlock = cache.blockNumber
    const untilBlock = Math.min(toBlock, fromBlock + MAX_QUERY_RANGE)
    const logs = await rocketLend.queryFilter(eventNames, fromBlock, untilBlock)
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
        switch (log.eventName) {
          case 'RegisterLender': {
            const address = log.args.address.toLowerCase()
            const lenderId = log.args.id.toString()
            cache.lenderIdsByAddress[address] ||= new Set()
            console.log(`Adding lenderId ${lenderId} to ${log.args.address}`)
            cache.lenderIdsByAddress[address].add(lenderId)
            break
          }
          case 'PendingChangeLenderAddress': {
            const oldAddress = log.args.old.toLowerCase()
            const newAddress = log.args.new.toLowerCase()
            const lenderId = log.args.id.toString()
            cache.pendingLenderIdsByAddress[newAddress] ||= new Set()
            if (cache.pendingLenderIdsByAddress[oldAddress]) {
              console.log(`Clearing pending transfer of ${lenderId} to ${log.args.old}`)
              cache.pendingLenderIdsByAddress[oldAddress].delete(lenderId)
            }
            console.log(`Adding pending transfer of ${lenderId} to ${log.args.new}`)
            cache.pendingLenderIdsByAddress[newAddress].add(lenderId)
            break
          }
          case 'ConfirmChangeLenderAddress': {
            const oldAddress = log.args.old.toLowerCase()
            const newAddress = log.args.new.toLowerCase()
            const oldPending = log.args.oldPending.toLowerCase()
            const lenderId = log.args.id.toString()
            cache.lenderIdsByAddress[newAddress] ||= new Set()
            console.log(`Removing lenderId ${lenderId} from ${log.args.old}`)
            cache.lenderIdsByAddress[oldAddress].delete(lenderId)
            console.log(`Adding lenderId ${lenderId} to ${log.args.new}`)
            cache.lenderIdsByAddress[newAddress].add(lenderId)
            if (cache.pendingLenderIdsByAddress[oldPending]) {
              console.log(`Clearing pending transfer of ${lenderId} to ${log.args.old}`)
              cache.pendingLenderIdsByAddress[oldPending].delete(lenderId)
            }
            break
          }
        }
      }
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
