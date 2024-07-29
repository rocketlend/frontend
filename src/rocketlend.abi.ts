const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "address",
        "type": "address"
      }
    ],
    "name": "RegisterLender",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "old",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "new",
        "type": "address"
      }
    ],
    "name": "UpdateLender",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "id",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "name": "lender",
            "type": "uint256"
          },
          {
            "name": "interestRate",
            "type": "uint256"
          },
          {
            "name": "endTime",
            "type": "uint256"
          }
        ],
        "indexed": false,
        "name": "params",
        "type": "tuple"
      }
    ],
    "name": "CreatePool",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "id",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "total",
        "type": "uint256"
      }
    ],
    "name": "SupplyPool",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "id",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "name": "old",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "new",
        "type": "uint256"
      }
    ],
    "name": "SetAllowance",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "id",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "name": "allowed",
        "type": "bool"
      },
      {
        "indexed": false,
        "name": "nodes",
        "type": "address[]"
      }
    ],
    "name": "ChangeAllowedToBorrow",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "id",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "total",
        "type": "uint256"
      }
    ],
    "name": "WithdrawFromPool",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "id",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "supplied",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "interestPaid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "available",
        "type": "uint256"
      }
    ],
    "name": "WithdrawInterest",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "id",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "total",
        "type": "uint256"
      }
    ],
    "name": "WithdrawEtherFromPool",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "id",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "name": "node",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "withdrawn",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "available",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "borrowed",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "interestDue",
        "type": "uint256"
      }
    ],
    "name": "ForceRepayRPL",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "id",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "name": "node",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "available",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "borrowed",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "interestDue",
        "type": "uint256"
      }
    ],
    "name": "ForceRepayETH",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "id",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "name": "node",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "claimedRPL",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "claimedETH",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "repaidRPL",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "repaidETH",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "RPL",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "ETH",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "borrowed",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "interestDue",
        "type": "uint256"
      }
    ],
    "name": "ForceClaimRewards",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "id",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "name": "node",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "claimed",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "repaid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "available",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "borrowed",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "interestDue",
        "type": "uint256"
      }
    ],
    "name": "ForceDistributeRefund",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "node",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "old",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "new",
        "type": "address"
      }
    ],
    "name": "UpdateBorrower",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "node",
        "type": "address"
      }
    ],
    "name": "JoinProtocol",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "node",
        "type": "address"
      }
    ],
    "name": "LeaveProtocol",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "node",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "total",
        "type": "uint256"
      }
    ],
    "name": "WithdrawRPL",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "pool",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "name": "node",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "borrowed",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "interestDue",
        "type": "uint256"
      }
    ],
    "name": "Borrow",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "pool",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "name": "node",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "borrowed",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "interestDue",
        "type": "uint256"
      }
    ],
    "name": "Repay",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "node",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "fromPool",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "name": "toPool",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "interestDue",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "allowance",
        "type": "uint256"
      }
    ],
    "name": "TransferDebt",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "node",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Distribute",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "node",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "total",
        "type": "uint256"
      }
    ],
    "name": "DistributeMinipools",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "node",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "total",
        "type": "uint256"
      }
    ],
    "name": "RefundMinipools",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "node",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "claimedRPL",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "claimedETH",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "stakedRPL",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "totalRPL",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "totalETH",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "ClaimRewards",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "node",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "amountRPL",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "amountETH",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "totalRPL",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "totalETH",
        "type": "uint256"
      }
    ],
    "name": "Withdraw",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [],
    "name": "registerLender",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_lender",
        "type": "uint256"
      },
      {
        "name": "_newAddress",
        "type": "address"
      },
      {
        "name": "_confirm",
        "type": "bool"
      }
    ],
    "name": "changeLenderAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_lender",
        "type": "uint256"
      }
    ],
    "name": "confirmChangeLenderAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "name": "lender",
            "type": "uint256"
          },
          {
            "name": "interestRate",
            "type": "uint256"
          },
          {
            "name": "endTime",
            "type": "uint256"
          }
        ],
        "name": "_params",
        "type": "tuple"
      },
      {
        "name": "_andSupply",
        "type": "uint256"
      },
      {
        "name": "_allowance",
        "type": "uint256"
      },
      {
        "name": "_borrowers",
        "type": "address[]"
      }
    ],
    "name": "createPool",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_poolId",
        "type": "bytes32"
      },
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "supplyPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_poolId",
        "type": "bytes32"
      },
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "setAllowance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_poolId",
        "type": "bytes32"
      },
      {
        "name": "_allowed",
        "type": "bool"
      },
      {
        "name": "_nodes",
        "type": "address[]"
      }
    ],
    "name": "changeAllowedToBorrow",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_poolId",
        "type": "bytes32"
      },
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawFromPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_poolId",
        "type": "bytes32"
      },
      {
        "name": "_amount",
        "type": "uint256"
      },
      {
        "name": "_andSupply",
        "type": "uint256"
      }
    ],
    "name": "withdrawInterest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_poolId",
        "type": "bytes32"
      },
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawEtherFromPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_poolId",
        "type": "bytes32"
      },
      {
        "name": "_node",
        "type": "address"
      },
      {
        "name": "_withdrawAmount",
        "type": "uint256"
      }
    ],
    "name": "forceRepayRPL",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_poolId",
        "type": "bytes32"
      },
      {
        "name": "_node",
        "type": "address"
      }
    ],
    "name": "forceRepayETH",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_poolId",
        "type": "bytes32"
      },
      {
        "name": "_node",
        "type": "address"
      },
      {
        "name": "_repayRPL",
        "type": "uint256"
      },
      {
        "name": "_repayETH",
        "type": "uint256"
      },
      {
        "name": "_rewardIndex",
        "type": "uint256[]"
      },
      {
        "name": "_amountRPL",
        "type": "uint256[]"
      },
      {
        "name": "_amountETH",
        "type": "uint256[]"
      },
      {
        "name": "_merkleProof",
        "type": "bytes32[][]"
      }
    ],
    "name": "forceClaimMerkleRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_poolId",
        "type": "bytes32"
      },
      {
        "name": "_node",
        "type": "address"
      },
      {
        "name": "_distribute",
        "type": "bool"
      },
      {
        "name": "_distributeMinipools",
        "type": "address[]"
      },
      {
        "name": "_rewardsOnly",
        "type": "bool"
      },
      {
        "name": "_refundMinipools",
        "type": "address[]"
      }
    ],
    "name": "forceDistributeRefund",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_node",
        "type": "address"
      },
      {
        "name": "_newAddress",
        "type": "address"
      },
      {
        "name": "_confirm",
        "type": "bool"
      }
    ],
    "name": "changeBorrowerAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_node",
        "type": "address"
      }
    ],
    "name": "confirmChangeBorrowerAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_node",
        "type": "address"
      }
    ],
    "name": "joinAsBorrower",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_node",
        "type": "address"
      }
    ],
    "name": "leaveAsBorrower",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_node",
        "type": "address"
      },
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "stakeRPLFor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_node",
        "type": "address"
      },
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawRPL",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_poolId",
        "type": "bytes32"
      },
      {
        "name": "_node",
        "type": "address"
      },
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "borrow",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_poolId",
        "type": "bytes32"
      },
      {
        "name": "_node",
        "type": "address"
      },
      {
        "name": "_amount",
        "type": "uint256"
      },
      {
        "name": "_amountSupplied",
        "type": "uint256"
      }
    ],
    "name": "repay",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_node",
        "type": "address"
      },
      {
        "name": "_fromPool",
        "type": "bytes32"
      },
      {
        "name": "_toPool",
        "type": "bytes32"
      },
      {
        "name": "_fromAvailable",
        "type": "uint256"
      },
      {
        "name": "_fromInterest",
        "type": "uint256"
      },
      {
        "name": "_fromAllowance",
        "type": "uint256"
      }
    ],
    "name": "transferDebt",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_node",
        "type": "address"
      },
      {
        "name": "_rewardIndex",
        "type": "uint256[]"
      },
      {
        "name": "_amountRPL",
        "type": "uint256[]"
      },
      {
        "name": "_amountETH",
        "type": "uint256[]"
      },
      {
        "name": "_merkleProof",
        "type": "bytes32[][]"
      },
      {
        "name": "_stakeAmount",
        "type": "uint256"
      }
    ],
    "name": "claimMerkleRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_node",
        "type": "address"
      }
    ],
    "name": "distribute",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_node",
        "type": "address"
      },
      {
        "name": "_minipools",
        "type": "address[]"
      },
      {
        "name": "_rewardsOnly",
        "type": "bool"
      }
    ],
    "name": "distributeMinipools",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_node",
        "type": "address"
      },
      {
        "name": "_minipools",
        "type": "address[]"
      }
    ],
    "name": "refundMinipools",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_node",
        "type": "address"
      },
      {
        "name": "_amountRPL",
        "type": "uint256"
      },
      {
        "name": "_amountETH",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "RPL",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "rocketStorage",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextLenderId",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "arg0",
        "type": "uint256"
      }
    ],
    "name": "lenderAddress",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "arg0",
        "type": "uint256"
      }
    ],
    "name": "pendingLenderAddress",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "arg0",
        "type": "bytes32"
      }
    ],
    "name": "params",
    "outputs": [
      {
        "components": [
          {
            "name": "lender",
            "type": "uint256"
          },
          {
            "name": "interestRate",
            "type": "uint256"
          },
          {
            "name": "endTime",
            "type": "uint256"
          }
        ],
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "arg0",
        "type": "bytes32"
      }
    ],
    "name": "pools",
    "outputs": [
      {
        "components": [
          {
            "name": "available",
            "type": "uint256"
          },
          {
            "name": "borrowed",
            "type": "uint256"
          },
          {
            "name": "allowance",
            "type": "uint256"
          },
          {
            "name": "interestPaid",
            "type": "uint256"
          },
          {
            "name": "reclaimed",
            "type": "uint256"
          }
        ],
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "arg0",
        "type": "bytes32"
      },
      {
        "name": "arg1",
        "type": "address"
      }
    ],
    "name": "allowedToBorrow",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "arg0",
        "type": "bytes32"
      },
      {
        "name": "arg1",
        "type": "address"
      }
    ],
    "name": "loans",
    "outputs": [
      {
        "components": [
          {
            "name": "borrowed",
            "type": "uint256"
          },
          {
            "name": "startTime",
            "type": "uint256"
          },
          {
            "name": "interestDue",
            "type": "uint256"
          }
        ],
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "arg0",
        "type": "address"
      }
    ],
    "name": "borrowers",
    "outputs": [
      {
        "components": [
          {
            "name": "borrowed",
            "type": "uint256"
          },
          {
            "name": "interestDue",
            "type": "uint256"
          },
          {
            "name": "RPL",
            "type": "uint256"
          },
          {
            "name": "ETH",
            "type": "uint256"
          },
          {
            "name": "index",
            "type": "uint256"
          },
          {
            "name": "address",
            "type": "address"
          },
          {
            "name": "pending",
            "type": "address"
          }
        ],
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "arg0",
        "type": "address"
      },
      {
        "name": "arg1",
        "type": "uint256"
      }
    ],
    "name": "intervals",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_rocketStorage",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  }
] as const;
export default abi;
