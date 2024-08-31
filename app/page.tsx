"use client";
export const DND_API_URL = "https://www.dnd5eapi.co";
import { Button } from "@/components/ui/button";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "@/convex/_generated/api";
import { Link } from "@/components/typography/link";
import SightingCard from "@/components/ SightingCard";

export default function Home() {
  return (
    <>
      <main className="container flex flex-col max-w-2xl gap-8">
        <Authenticated>
          <Link href={"/add-sighting"}>Report new Sighting</Link>
          <SignedInContent />
        </Authenticated>
        <Unauthenticated>
          <p> Sign in to report new sightings.</p>
        </Unauthenticated>
      </main>
    </>
  );
}

function SignedInContent() {
  const sightings = useQuery(api.myFunctions.listSightings);

  return (
    <>{sightings?.map((sighting) => <SightingCard sighting={sighting} />)}</>
  );
}
