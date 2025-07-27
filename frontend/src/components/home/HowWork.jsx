import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { infoArray } from "../../assets/data/infos";

function Info({ info }) {
  return (
    <Card className="flex-1 min-w-60 max-w-80 text-center justify-evenly">
      <CardHeader>
        <img
          src={info.img}
          alt={info.title}
          className="w-15 mx-auto object-cover"
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl font-bold">{info.title}</CardTitle>
      </CardContent>
      <CardFooter>
        <CardDescription>{info.description}</CardDescription>
      </CardFooter>
    </Card>
  );
}

export default function HowWork() {
  return (
    <>
      <main
        id="about"
        className="flex justify-around overflow-hidden flex-wrap w-[90%] mx-auto py-5 gap-5"
      >
        <h1 className="w-[100%] text-5xl font-bold text-center mb-5">
          How it works
        </h1>
        {infoArray.map((info, index) => (
          <Info info={info} key={index} />
        ))}
      </main>
    </>
  );
}
