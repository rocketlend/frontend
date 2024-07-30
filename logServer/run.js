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

const lenderIdByAddress = {
  untilBlock: deployBlock,
  data: {}
}

const updateLenderIdByAddress = async (toBlock) => {
  while (lenderIdByAddress.untilBlock < toBlock) {
    const fromBlock = lenderIdByAddress.untilBlock
    const newUntilBlock = Math.min(toBlock, fromBlock + MAX_QUERY_RANGE)
    const logs = await rocketLend.queryFilter('RegisterLender', fromBlock, newUntilBlock).then(
      async logs => logs.concat(await rocketLend.queryFilter('UpdateLender', fromBlock, newUntilBlock))
    )
    for (const log of logs) {
      const address = log.args[log.eventName == 'RegisterLender' ? 'address' : 'new']
      const lenderId = log.args.id
      const {blockNumber, logIndex} = lenderIdByAddress.data[address]
      if ((blockNumber || 0) < log.blockNumber || blockNumber == log.blockNumber && logIndex < log.index) {
        cnosole.log(`Updating lenderId to ${lenderId} for ${address}`)
        lenderIdByAddress.data[address] = {
          blockNumber: log.blockNumber,
          logIndex: log.index,
          lenderId
        }
      }
    }
    console.log(`Updated lenderIdByAddress to ${newUntilBlock}`)
    lenderIdByAddress.untilBlock = newUntilBlock
  }
}

await updateLenderIdByAddress(await provider.getBlockNumber())

provider.on('block', async (blockNumber) => {
  await updateLenderIdByAddress(blockNumber)
})

const app = express()
