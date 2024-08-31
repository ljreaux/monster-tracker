import React, { use, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DND_API_URL } from "@/lib/API";
import axios from "axios";
import { Button } from "./ui/button";

function IndividualMonster({
  sighting,
}: {
  sighting: {
    _id: string;
    name: string;
    description: string;
    _creationTime: number;
    location: {
      state?: string;
      city: string;
      country: string;
    };
    user: {
      id: string;
      name: string;
    };
    closestMatch: string;
  };
}) {
  const [possibleMonster, setPossibleMonster] = useState<{
    name: string;
    image?: string;
  } | null>(null);
  useEffect(() => {
    console.log(sighting.closestMatch);
    (async () => {
      if (sighting.closestMatch[0] === "/") {
        const { data } = await axios.get(DND_API_URL + sighting.closestMatch);
        console.log(Object.keys(data));
        setPossibleMonster(data);
      }
    })();
  }, []);

  return (
    <Card className="m-4 text-center ">
      <CardHeader>
        <CardTitle>{sighting.name}</CardTitle>
        <CardDescription>
          <div>
            {sighting.location.city}, {sighting.location.state}{" "}
            {sighting.location.country}
          </div>
          <div>
            Reported on: {new Date(sighting._creationTime).toLocaleString()}{" "}
            <span className="text-destructive">by {sighting.user.name}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription>{sighting.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-center"></CardFooter>

      {possibleMonster && (
        <div className="flex flex-col justify-center gap-6 item-center">
          <h2>Possible Monster Match:</h2>
          <p>{possibleMonster.name}</p>
          {possibleMonster.image && (
            <img
              src={`${DND_API_URL}${possibleMonster.image}`}
              alt={possibleMonster.name}
              className="max-w-[400px] self-center"
            />
          )}
          <Button
            variant="secondary"
            onClick={() => setPossibleMonster(null)}
            className="m-4"
          >
            Close
          </Button>
        </div>
      )}
    </Card>
  );
}

export default IndividualMonster;
