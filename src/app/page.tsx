"use client";

import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import JobPostingForm from "./components/JobForm";
import JobListing from "./components/JobList";

const Page = () => {
  const [refreshJobs, setRefreshJobs] = useState(0);
  const { user } = useUser();

  return (
    <div className="min-h-screen main-content">
      <header className="py-10">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">
          <SignedIn>
            <span className="font-semibold">{user?.firstName}'s </span>
          </SignedIn>
          Job Board
        </h1>
      </header>

      <main className="space-y-8">
        <SignedIn>
          <JobPostingForm onSubmit={() => setRefreshJobs((prev) => prev + 1)} />
          <JobListing refreshTrigger={refreshJobs} />
        </SignedIn>

        <SignedOut>
          <div className="max-w-md mx-auto text-center bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Sign in to manage your job board</h2>
            <SignInButton mode="modal">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
                Sign In
              </button>
            </SignInButton>
          </div>
        </SignedOut>
      </main>
    </div>
  );
};

export default Page;
