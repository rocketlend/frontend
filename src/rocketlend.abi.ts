const abi = [{"anonymous":false,"inputs":[{"indexed":true,"name":"id","type":"uint256"}],"name":"CreatePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"old","type":"address"}],"name":"PendingTransferPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"old","type":"address"},{"indexed":true,"name":"oldPending","type":"address"}],"name":"ConfirmTransferPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"id","type":"uint256"},{"indexed":true,"name":"total","type":"uint256"}],"name":"SupplyPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"id","type":"uint256"},{"indexed":true,"name":"old","type":"uint256"}],"name":"SetAllowance","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"id","type":"uint256"},{"indexed":true,"name":"node","type":"address"},{"indexed":true,"name":"allowed","type":"bool"}],"name":"ChangeAllowedToBorrow","type":"event"},{"anonymous":false,"inputs":[],"name":"WithdrawETHFromPool","type":"event"},{"anonymous":false,"inputs":[],"name":"WithdrawRPLFromPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"available","type":"uint256"},{"indexed":true,"name":"borrowed","type":"uint256"},{"indexed":true,"name":"interestDue","type":"uint256"}],"name":"ForceRepayRPL","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"available","type":"uint256"},{"indexed":true,"name":"borrowed","type":"uint256"},{"indexed":true,"name":"interestDue","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"ForceRepayETH","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"RPL","type":"uint256"},{"indexed":true,"name":"ETH","type":"uint256"},{"indexed":false,"name":"borrowed","type":"uint256"},{"indexed":false,"name":"interestDue","type":"uint256"}],"name":"ForceClaimRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"claimed","type":"uint256"},{"indexed":true,"name":"repaid","type":"uint256"},{"indexed":false,"name":"available","type":"uint256"},{"indexed":false,"name":"borrowed","type":"uint256"},{"indexed":false,"name":"interestDue","type":"uint256"}],"name":"ForceDistributeRefund","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"charged","type":"uint256"},{"indexed":true,"name":"total","type":"uint256"}],"name":"ChargeInterest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"old","type":"address"}],"name":"PendingChangeBorrowerAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"old","type":"address"},{"indexed":true,"name":"oldPending","type":"address"}],"name":"ConfirmChangeBorrowerAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"borrower","type":"address"}],"name":"JoinProtocol","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldPending","type":"address"}],"name":"LeaveProtocol","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"total","type":"uint256"}],"name":"UnstakeRPL","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"borrowed","type":"uint256"},{"indexed":true,"name":"interestDue","type":"uint256"}],"name":"Borrow","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"amount","type":"uint256"},{"indexed":true,"name":"borrowed","type":"uint256"},{"indexed":true,"name":"interestDue","type":"uint256"}],"name":"Repay","type":"event"},{"anonymous":false,"inputs":[],"name":"TransferDebt","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"amount","type":"uint256"},{"indexed":true,"name":"total","type":"uint256"}],"name":"DistributeRefund","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"totalRPL","type":"uint256"},{"indexed":true,"name":"totalETH","type":"uint256"},{"indexed":true,"name":"index","type":"uint256"}],"name":"ClaimRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"totalRPL","type":"uint256"},{"indexed":true,"name":"totalETH","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"total","type":"uint256"}],"name":"StakeRPLFor","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"total","type":"uint256"}],"name":"DepositETHFor","type":"event"},{"inputs":[],"name":"setName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"name":"_poolId","type":"uint256"},{"name":"_newAddress","type":"address"},{"name":"_confirm","type":"bool"}],"name":"transferPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_poolId","type":"uint256"}],"name":"confirmTransferPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"name":"interestRate","type":"uint8"},{"name":"endTime","type":"uint256"}],"name":"_params","type":"tuple"},{"name":"_supply","type":"uint256"},{"name":"_allowance","type":"uint256"},{"name":"_borrowers","type":"address[]"}],"name":"createPool","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_poolId","type":"uint256"},{"name":"_targetSupply","type":"uint256"}],"name":"changePoolRPL","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_poolId","type":"uint256"},{"name":"_amount","type":"uint256"}],"name":"withdrawEtherFromPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_poolId","type":"uint256"},{"name":"_borrowers","type":"uint256[]"}],"name":"changeAllowedToBorrow","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_poolId","type":"uint256"},{"name":"_allowance","type":"uint256"}],"name":"setAllowance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_poolId","type":"uint256"},{"name":"_node","type":"address"}],"name":"updateInterestDue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_poolId","type":"uint256"},{"name":"_node","type":"address"},{"name":"_prevIndex","type":"uint256"},{"name":"_unstakeAmount","type":"uint256"}],"name":"forceRepayRPL","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_poolId","type":"uint256"},{"name":"_node","type":"address"},{"name":"_prevIndex","type":"uint256"}],"name":"forceRepayETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_poolId","type":"uint256"},{"name":"_node","type":"address"},{"name":"_prevIndex","type":"uint256"},{"name":"_repayRPL","type":"uint256"},{"name":"_repayETH","type":"uint256"},{"name":"_rewardIndex","type":"uint256[]"},{"name":"_amountRPL","type":"uint256[]"},{"name":"_amountETH","type":"uint256[]"},{"name":"_merkleProof","type":"bytes32[][]"}],"name":"forceClaimMerkleRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_poolId","type":"uint256"},{"name":"_node","type":"address"},{"name":"_prevIndex","type":"uint256"},{"name":"_distribute","type":"bool"},{"components":[{"name":"index","type":"uint256"},{"name":"action","type":"uint256"}],"name":"_minipools","type":"tuple[]"}],"name":"forceDistributeRefund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_node","type":"address"},{"name":"_newAddress","type":"address"},{"name":"_confirm","type":"bool"}],"name":"changeBorrowerAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_node","type":"address"}],"name":"confirmChangeBorrowerAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_node","type":"address"}],"name":"joinAsBorrower","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_node","type":"address"}],"name":"leaveAsBorrower","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_node","type":"address"},{"name":"_caller","type":"address"},{"name":"_allowed","type":"bool"}],"name":"setStakeRPLForAllowed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_node","type":"address"},{"name":"_amount","type":"uint256"}],"name":"unstakeRPL","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_poolId","type":"uint256"},{"name":"_node","type":"address"},{"name":"_prevIndex","type":"uint256"},{"name":"_amount","type":"uint256"}],"name":"borrow","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_poolId","type":"uint256"},{"name":"_node","type":"address"},{"name":"_prevIndex","type":"uint256"},{"name":"_unstakeAmount","type":"uint256"},{"name":"_repayAmount","type":"uint256"}],"name":"repay","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_node","type":"address"},{"name":"_fromPool","type":"uint256"},{"name":"_fromPrevIndex","type":"uint256"},{"name":"_toPool","type":"uint256"},{"name":"_toPrevIndex","type":"uint256"},{"name":"_fromInterest","type":"uint256"},{"name":"_fromBorrowed","type":"uint256"},{"name":"_fromAvailable","type":"uint256"}],"name":"transferDebt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_node","type":"address"},{"name":"_rewardIndex","type":"uint256[]"},{"name":"_amountRPL","type":"uint256[]"},{"name":"_amountETH","type":"uint256[]"},{"name":"_merkleProof","type":"bytes32[][]"},{"name":"_stakeAmount","type":"uint256"}],"name":"claimMerkleRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_node","type":"address"},{"name":"_distribute","type":"bool"},{"components":[{"name":"index","type":"uint256"},{"name":"action","type":"uint256"}],"name":"_minipools","type":"tuple[]"}],"name":"distributeRefund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_node","type":"address"},{"name":"_amountRPL","type":"uint256"},{"name":"_amountETH","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_node","type":"address"},{"name":"_amount","type":"uint256"}],"name":"stakeRPLFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_node","type":"address"},{"name":"_amount","type":"uint256"}],"name":"depositETHFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"RPL","outputs":[{"name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rocketStorage","outputs":[{"name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextPoolId","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"arg0","type":"uint256"}],"name":"params","outputs":[{"components":[{"name":"interestRate","type":"uint8"},{"name":"endTime","type":"uint256"}],"name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"arg0","type":"uint256"}],"name":"pools","outputs":[{"components":[{"name":"available","type":"uint256"},{"name":"borrowed","type":"uint256"},{"name":"allowance","type":"uint256"},{"name":"reclaimed","type":"uint256"},{"name":"lenderAddress","type":"address"},{"name":"pendingLenderAddress","type":"address"}],"name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"arg0","type":"uint256"},{"name":"arg1","type":"address"}],"name":"allowedToBorrow","outputs":[{"name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"arg0","type":"uint256"},{"name":"arg1","type":"address"}],"name":"loans","outputs":[{"components":[{"name":"borrowed","type":"uint256"},{"name":"interestDue","type":"uint256"},{"name":"accountedUntil","type":"uint256"}],"name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"arg0","type":"address"}],"name":"borrowers","outputs":[{"components":[{"name":"borrowed","type":"uint256"},{"name":"interestDue","type":"uint256"},{"name":"RPL","type":"uint256"},{"name":"ETH","type":"uint256"},{"name":"index","type":"uint256"},{"name":"address","type":"address"},{"name":"pending","type":"address"}],"name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"arg0","type":"address"},{"name":"arg1","type":"uint256"}],"name":"intervals","outputs":[{"name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"arg0","type":"address"},{"name":"arg1","type":"uint256"}],"name":"debtPools","outputs":[{"components":[{"name":"next","type":"uint256"},{"name":"poolId","type":"uint256"}],"name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"_rocketStorage","type":"address"}],"stateMutability":"nonpayable","type":"constructor"}] as const;
export default abi;
