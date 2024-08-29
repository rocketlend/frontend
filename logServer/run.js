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

const lenderIdsByAddress = {
  untilBlock: deployBlock,
  data: {}
}

const updateLenderIdsByAddress = async (toBlock) => {
  while (lenderIdsByAddress.untilBlock < toBlock) {
    const fromBlock = lenderIdsByAddress.untilBlock
    const newUntilBlock = Math.min(toBlock, fromBlock + MAX_QUERY_RANGE)
    const logs = await rocketLend.queryFilter('RegisterLender', fromBlock, newUntilBlock).then(
      async logs => logs.concat(await rocketLend.queryFilter('UpdateLender', fromBlock, newUntilBlock))
    )
    for (const log of logs) {
      const address = log.args[log.eventName == 'RegisterLender' ? 'address' : 'new']
      const prevKey = log.args.old?.toLowerCase()
      const key = address.toLowerCase()
      const lenderId = log.args.id.toString()
      lenderIdsByAddress.data[key] ||= {ids: new Set()}
      const {blockNumber, logIndex, ids} = lenderIdsByAddress.data[key]
      if ((blockNumber || 0) < log.blockNumber || blockNumber == log.blockNumber && logIndex < log.index) {
        console.log(`Adding lenderId ${lenderId} to ${address}`)
        lenderIdsByAddress.data[key].blockNumber = log.blockNumber
        lenderIdsByAddress.data[key].logIndex = log.index
        ids.add(lenderId)
        if (prevKey) {
          console.log(`Removing lenderId ${lenderId} from ${log.args.old}`)
          lenderIdsByAddress.data[prevKey].ids.delete(lenderId)
        }
      }
    }
    console.log(`Updated lenderIdsByAddress to ${newUntilBlock}`)
    lenderIdsByAddress.untilBlock = newUntilBlock
  }
}

await updateLenderIdsByAddress(await provider.getBlockNumber())

provider.on('block', async (blockNumber) => {
  await updateLenderIdsByAddress(blockNumber)
})

const addressRe = '0x[0-9a-fA-F]{40}'

const app = express()

app.use(cors())

app.get(`/lenderIds/:address(${addressRe})`, async (req, res, next) => {
  try {
    const address = req.params.address.toLowerCase()
    const {ids} = lenderIdsByAddress.data[address] || {ids: []}
    return res.status(200).json({
      untilBlock: lenderIdsByAddress.untilBlock,
      lenderIds: Array.from(ids),
    })
  }
  catch (e) { next(e) }
})

app.listen(port)
