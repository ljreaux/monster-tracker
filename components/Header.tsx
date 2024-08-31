"use client";
import React from "react";
import { StickyHeader } from "./layout/sticky-header";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Creepster } from "next/font/google";
import { cn } from "@/lib/utils";
const creepster = Creepster({ subsets: ["latin"], weight: "400" });

function Header() {
  return (
    <StickyHeader className="px-4 py-2">
      <div className="flex items-center justify-between">
        <Link
          href={"/"}
          className={cn(creepster.className, "text-6xl text-secondary")}
        >
          {" "}
          Monster Tracker
        </Link>
        <SignInAndSignUpButtons />
      </div>
    </StickyHeader>
  );
}

export default Header;

function SignInAndSignUpButtons() {
  return (
    <div className="flex gap-4">
      <Authenticated>
        <UserButton afterSignOutUrl="#" />
      </Authenticated>
      <Unauthenticated>
        <SignInButton mode="modal">
          <Button variant="ghost">Sign in</Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button>Sign up</Button>
        </SignUpButton>
      </Unauthenticated>
    </div>
  );
}
