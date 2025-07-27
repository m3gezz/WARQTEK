import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { stats } from "../../assets/data/stats";

function Stat({ stat }) {
  return (
    <Card className="flex-1 min-w-60 max-w-80 text-center">
      <CardHeader>
        <CardTitle className="text-5xl font-bold">
          {stat.num} <span className="text-warqtek">+</span>
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <CardDescription className="mx-auto">
          {stat.description}
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

export default function Stats() {
  return (
    <>
      <main className="flex justify-around overflow-hidden flex-wrap w-[90%] mx-auto py-5 gap-5">
        <h1 className="w-[100%] text-5xl font-bold text-center mb-5">
          Official Stats
        </h1>
        {stats.map((stat, index) => (
          <Stat stat={stat} key={index} />
        ))}
      </main>
    </>
  );
}
