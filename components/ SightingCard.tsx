"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

function SightingCard({
  sighting,
}: {
  sighting: {
    _id: string;
    name: string;
    description: string;
    _creationTime: number;
  };
}) {
  const router = useRouter();
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>{sighting.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{sighting.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <Button
          variant="secondary"
          onClick={() => router.push(`/${sighting._id}`)}
        >
          More Info
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SightingCard;
