import { NULL_ADDRESS } from "../src/constants";

export const mockPoolState: { [key: string]: number } = {
  available: 4542.5436,
  borrowed: 625.5876,
  allowance: 600,
  interestPaid: 27.6264,
  reclaimed: 0,
}

export const mockBorrowersState = {
  borrowers: [
    'gfdshgfdjklsdhjkltrewgsh',
    'twuioawgjfdlbknvcnbkldfg',
    'ghelreahurtiraehgilhgdjk',
  ],
  allowedToBorrow: [NULL_ADDRESS], // "everyone is allowed"
};

export const mockPoolParams = {
  lender: 264254365,
  interestRate: 14,
  endTime: 1730080453,
};