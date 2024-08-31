"use client";
import IndividualMonster from "@/components/IndividualMonster";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";

function MonsterFormRoute() {
  const { monsterId } = useParams();
  const monster = useQuery(api.myFunctions.getIndividualSighting, {
    id: monsterId as string,
  });

  if (!monster) return <div>Loading...</div>;

  return <IndividualMonster sighting={monster} />;
}

export default MonsterFormRoute;
