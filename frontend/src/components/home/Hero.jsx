import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import heroImg from "../../assets/images/Sign 1.png";

export default function Hero() {
  return (
    <main className="text-white w-[95%] text-center mx-auto h-140 rounded-4xl relative">
      <img
        src={heroImg}
        alt={"warqtek image"}
        className="absolute h-full w-full object-cover rounded-4xl "
      />
      <div className="absolute max-w-250 w-[80%] top-[50%] left-[50%] translate-[-50%] space-x-4 space-y-10">
        <h1 className="text-5xl font-extrabold">Paperwork, Simplified</h1>
        <p>
          Government documents, applications, and certificates &#8211; all in
          one place. Fast, clear, and hassle-free No more long queues, confusing
          forms, or wasted time
        </p>
        <div>
          <Button className="h-15 text-lg">
            <Link to={"/user/documents/create"}>START YOUR APPLICATION</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
