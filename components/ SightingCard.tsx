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
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>{sighting.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{sighting.description}</CardDescription>
      </CardContent>
      <CardFooter className="">
        <Button>More Info</Button>
      </CardFooter>
    </Card>
  );
}

export default SightingCard;
