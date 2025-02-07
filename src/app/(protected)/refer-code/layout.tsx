import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
  title: "Refer  | CasinoCity24",
  description:
    "Share your referral code and earn rewards! Invite friends to join Bangladesh’s top online casino and betting site and win together.",
};
const ReferLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default ReferLayout