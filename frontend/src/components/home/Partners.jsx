import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { partners } from "../../assets/data/partners";

function Partner({ partner }) {
  return (
    <Card className="flex-1 min-w-60 max-w-70">
      <CardContent className="flex justify-center items-center h-full">
        <img src={partner} alt="" className="w-20 object-cover" />
      </CardContent>
    </Card>
  );
}

export default function Partners() {
  return (
    <>
      <main className="flex justify-around overflow-hidden flex-wrap w-[90%] mx-auto py-5 gap-5">
        <h1 className="w-[100%] text-5xl font-bold text-center mb-5">
          Our partners
        </h1>
        {partners.map((partner, index) => (
          <Partner partner={partner} key={index} />
        ))}
      </main>
    </>
  );
}
