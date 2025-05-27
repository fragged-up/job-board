"use client";

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

const AppHeader = () => {
  const { isSignedIn, user } = useUser();

  return (
    <header className="flex header justify-between items-center p-4 h-16">
      <div>
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
      </div>
      <div className="inline-flex gap-2 items-center">
        <SignedIn>
          {user?.firstName && <span className="font-semibold">Hello, {user.firstName}</span>}
        </SignedIn>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default AppHeader;
