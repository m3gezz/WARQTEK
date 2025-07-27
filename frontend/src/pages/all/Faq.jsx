import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "../../assets/data/faq";
import img from "../../assets/images/Sign 1.png";

function Question({ question }) {
  return (
    <Accordion
      type="multiple"
      collapsible="true"
      className="bg-foreground  py-2 px-4 rounded-2xl"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>{question.trigger}</AccordionTrigger>
        <AccordionContent>{question.context}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default function Faq() {
  return (
    <main className="space-y-10 text-background select-none py-10">
      <div className="relative mx-auto w-[95%] h-80 text-green-800 flex justify-center">
        <img src={img} alt="" className="object-cover rounded-2xl h-full" />
        <h1 className="absolute text-center w-full text-5xl font-bold h-full flex items-center justify-center">
          Frequently Asked Questions
        </h1>
      </div>
      <main className=" max-w-200 w-[90%] mx-auto space-y-5">
        {faq.map((question, index) => (
          <Question question={question} key={index} />
        ))}
      </main>
    </main>
  );
}
