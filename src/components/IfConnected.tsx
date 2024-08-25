import { FC, ReactNode } from 'react';

export const IfConnected: FC<{children: ReactNode, accountStatus: string}> = ({children, accountStatus}) => (
  accountStatus === 'connected' ? children :
    <section><h2>Please connect your wallet</h2><p>Connection status: {accountStatus}</p></section>
);
export default IfConnected;
