"use client";
import countries from "@/lib/countries.json";
import states from "@/lib/states.json";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { closestMatch } from "closest-match";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import { DND_API_URL } from "@/lib/API";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  location: z.object({
    city: z.string().min(2, {
      message: "City must be at least 2 characters.",
    }),
    country: z.string().min(2, {
      message: "Country must be at least 2 characters.",
    }),
    state: z.string().optional(),
  }),
  description: z.string(),
});

export function MonsterForm() {
  const router = useRouter();
  const sighting = useMutation(api.myFunctions.createSighting);
  const [monsterList, setMonsterList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data: monsterList } = await axios.get(
          `${DND_API_URL}/api/monsters`
        );
        setMonsterList(monsterList.results);
      } catch (error) {
        console.error(error);
      }
    })().catch((error) => console.error(error));
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: {
        city: "",
        country: "US",
        state: "",
      },
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const closestMatch = findClosestMatch(values.name, monsterList);

    sighting({ ...values, closestMatch })
      .then(() => {
        form.reset();
        toast({ description: "Sighting reported successfully!" });
        router.push("/");
      })
      .catch((error) => {
        console.error(error);
        toast({ description: "Error reporting sighting" });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Dragon..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between w-full">
          <FormField
            control={form.control}
            name="location.country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="overflow-y-auto max-h-[10rem]">
                    <SelectGroup>
                      {countries.map((country) => (
                        <SelectItem
                          key={country.countryCode}
                          value={country.countryCode}
                        >{`${country.country} ${country.flag}`}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="location.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="LA..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.getValues("location.country") === "US" && (
              <FormField
                control={form.control}
                name="location.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="overflow-y-auto max-h-[10rem]">
                        <SelectGroup>
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the monster"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="secondary" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

function findClosestMatch(
  input: string,
  matchArray: { index: string; name: string; url: string }[]
) {
  const nameArray = matchArray.map((item) => item.name.toLowerCase());
  const inputString = input.toLowerCase();

  const match = closestMatch(inputString, nameArray);
  const found = matchArray.find((item) => item.name.toLowerCase() === match);
  if (found) return found.url;
  else return "";
}
