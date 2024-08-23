# Rocket Lend Pages/Components

Home and Explorer areas do not need a connected wallet.
Everything else does.

Most lender and borrower pages should check that the connected wallet is a
lender/borrower (except the ones for registering/joining, or cases where a
third party can take an action (like supply-on-behalf)).

## Home / Landing

## Lender actions

### Register as a lender

### Change lender address

Initiate the change as the current lender account, confirm it with the
changed-to account.

### Create a lending pool

### Manage a pool

- Supply RPL
- Withdraw RPL
- Withdraw (and maybe resupply) RPL interest
- Withdraw ETH
- Change transfer allowance
- Change allowed-to-borrow list

### Manage a loan

- Force claim RPL and/or ETH in expired loans

## Borrower actions

### Join as a borrower

### Leave as a borrower

### Change borrower address

Initiate the change as the current borrower account, confirm it with the
changed-to account.

### Interact with a pool

- Borrow (and stake) RPL from a pool
- Repay RPL and/or interest to a pool
- Transfer debt from one pool to another pool

### Rocket Lend balance actions

- Withdraw ETH and RPL from RL balance
- Stake RPL from RL balance
- Deposit ETH to node from RL balance

### Node operator actions

- Distribute fee distributor (to RL balance)
- Claim Merkle rewards (to RL balance)
- Withdraw RPL from node (to RL balance)
- Distribute and/or refund minipools (to RL balance)
- Change RPL stake-on-behalf allowlist

## Explorer views

These components/pages should also be visible with the pools/loans filtered to
those belonging to the connected lender/borrower (if there is one). E.g. a
filter (maybe on by default) to "my pools/loans" instead of "all pools/loans".

### View lending pools

### View a lending pool's details

### View loans

### View a loan's details

### View a lender

### View a borrower

### View protocol summary

This could also be the content of the landing page, after any introduction to
what the site is about.
