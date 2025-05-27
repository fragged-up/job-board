"use client";

import { ClerkProvider } from "@clerk/nextjs";

interface Props {
  children: React.ReactNode;
}

const ClerkProviderWrapper: React.FC<Props> = ({ children }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default ClerkProviderWrapper;
