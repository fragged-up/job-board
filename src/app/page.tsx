"use client";

import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";

export default function Home() {
  const [refresh, setRefresh] = useState(0);
  const { user } = useUser();

  return (
    <main className="min-h-screen imager py-10 px-4">
      <header className="flex justify-between items-center max-w-4xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-gray-800"> My Job Board</h1>

        <SignedIn>
          <UserButton />
          <p>You're signed in!</p>
        </SignedIn>
      </header>

      <SignedIn>
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-gray-600">
            Hello, <span className="font-semibold">{user?.firstName}</span> 👋
          </p>
          <JobForm onSubmit={() => setRefresh(refresh + 1)} />
          <JobList refreshTrigger={refresh} />
        </div>
      </SignedIn>

      <SignedOut>
        <div className="max-w-md mx-auto text-center bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Sign in to manage your job board</h2>
          <SignInButton mode="modal">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Sign In</button>
          </SignInButton>
        </div>
      </SignedOut>
    </main>
  );
}
