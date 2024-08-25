# Rocket Lend Pages/Components

Home and Explorer areas do not need a connected wallet.
Everything else does.

Most lender and borrower pages should check that the connected wallet is a
lender/borrower (except the ones for registering/joining, or cases where a
third party can take an action (like supply-on-behalf)).

## Home / Landing
- information
- links to the rest of the site
- resource links:
  - link to Rocket Pool Discord (maybe specific thread)
  - Rocket Lend protocol repo README (docs)

## Lender actions
- lend is a route
- probably nested routes for lender IDs

### Register as a lender
- form with a "Register" button (this blocks all other lend functionality)
  - result: a new lender ID associated with current connected account
 
If there's more than one lender ID associated with the connected account, need a way to choose which one to act with.

### Change lender address

Initiate the change as the current lender account, confirm it with the
changed-to account.

- form to submit a transaction to transfer the lender ID to a different account
  - to-address
  - checkbox to require confirmation or not
  - button to submit transaction

- if the log server sees a pending confirmation of lender account transfer:
  - button to confirm receiving transfer
  - option to hide it, maybe

### Create a lending pool

- form (that creates a transaction)
  - lender ID pulled from current route, displayed for informational purposes
  - pool parameters:
    - interest rate (integer between 0 and 20, percent APR)
    - end time (date and time in the future)
  - (optional) amount of RPL to already supply the pool with - maybe an explanatory tooltip. Default 0.
    - if nonzero, the amount needs to be <= the amount they have/have approved. Indicator of this would be good.
    - "You've approved X amount. Click here to change it." (modal)
  - (optional) transfer allowance: how much debt this pool can take on - maybe an explanatory tooltip. Default 0.
  - (optional) list of addresses of allowed borrowers, default is everyone - maybe an explanatory tooltip

### Manage a pool
- overview includes:
  - some subset of: interest rate, end time, amount RPL available in pool, amount RPL borrowed from pool, amount of interest accrued, list of borrower entities (addresses and/or ENS names), allowed-to-borrow list, ETH balance (only happens if there's a default on a loan, ETH is reclaimed)

- Supply RPL
  - display current amount supplied
  - input of how much to add
  - (maybe) display new total as you change input
  - gated by same approval stuff as above
  - button to submit
- Withdraw RPL
  - no approvals required
  - number limited by amount currently available
  - input of how much to withdraw
  - "preview" similar to above
  - button to submit
- Withdraw (and maybe resupply) RPL interest
  - input: total amount of interest to withdraw (goes to their wallet)
    - bounded by amount of interest that's been paid to the pool
    - no approval required
  - input: of the above amount, how much to resupply to pool
    - can be *any amount*
      - if greater than interest in pool: drain available interest, take the rest from wallet - tooltip to explain this
      - maybe: preview should show what comes out of interest and what comes out of wallet (maybe balances-to-be)
  - indication if the transaction will fail due to insufficient total funds
- Withdraw ETH
  - display how much available
  - input for how much to withdraw (bounded by amount available)
  - button to submit
- Change transfer allowance
  - display current allowance
  - input for new allowance (any positive number)
  - button to submit
- Change allowed-to-borrow list
  - two UIs: one to add allowed borrowers, one to remove allowed borrowers (if list exists). OR choose option for "anyone"
  - display: either "anyone" or a list
  - to change from "anyone" to a list, have an input to add
  - to alter an existing list:
    - option to change to "anyone" (requires you to add)
    - otherwise, select either "add" or "remove
    - "add" lets you input borrower addresses, then submit
    - "remove" lets you select checkboxes from the list, then submit

### Manage a loan

- Force claim RPL and/or ETH in expired loans

## Borrower actions
- borrow is a route
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
