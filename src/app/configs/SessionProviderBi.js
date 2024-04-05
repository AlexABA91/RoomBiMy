"use client";
import { SessionProvider } from "next-auth/react";

const SessionProviderBi = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export { SessionProviderBi };
