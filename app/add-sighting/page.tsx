"use client";
import { MonsterForm } from "@/components/MonsterForm";
import { useUser } from "@clerk/clerk-react";
import React from "react";

function NewSightings() {
  const { user } = useUser();

  if (!user) {
    return (
      <p className="flex items-center justify-center w-full">
        Please sign in to report new sightings.
      </p>
    );
  }
  return (
    <div>
      <MonsterForm />
    </div>
  );
}

export default NewSightings;
