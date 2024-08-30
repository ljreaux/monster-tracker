"use client";

import { Button } from "@/components/ui/button";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "@/convex/_generated/api";
import { Code } from "@/components/typography/code";
import { Link } from "@/components/typography/link";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { StickyHeader } from "@/components/layout/sticky-header";
import { Skeleton } from "@/components/ui/skeleton";
import SightingCard from "@/components/ SightingCard";

export default function Home() {
  return (
    <>
      <StickyHeader className="px-4 py-2">
        <div className="flex items-center justify-between">
          Convex + Next.js + Clerk
          <SignInAndSignUpButtons />
        </div>
      </StickyHeader>
      <main className="container flex flex-col max-w-2xl gap-8">
        <Link href={"/add-sighting"}>Report new Sighting</Link>
        <Authenticated>
          <SignedInContent />
        </Authenticated>
        <Unauthenticated>
          <p>Click one of the buttons in the top right corner to sign in.</p>
        </Unauthenticated>
      </main>
    </>
  );
}

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

function SignedInContent() {
  const sightings = useQuery(api.myFunctions.listSightings);

  return (
    <>{sightings?.map((sighting) => <SightingCard sighting={sighting} />)}</>
  );
}
