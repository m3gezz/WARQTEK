import React, { useState } from "react";
import FullLogo from "../components/custom/FullLogo";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Footer() {
  const [more1, setMore1] = useState(false);
  const [more2, setMore2] = useState(false);

  const handleMore1 = () => {
    setMore1((prev) => !prev);
  };

  const handleMore2 = () => {
    setMore2((prev) => !prev);
  };

  const text1 = `The Waratek platform is an online service that allows you to
            electronically request government documents and track their
            progress, ensuring fast and secure delivery to your preferred
            acidress.`;

  const text2 = `Our support team is here to assist you at every step of the process.
            Whether you have questions about filling out a form, tracking your
            document, or resolving an issue, we provide fast and reliable
            assistance. Contact us through live chat, email, or phone, and get
            the help you need—efficiently and hassle-free.`;

  return (
    <footer className="text-sm mt-10 bg-green-800 select-none border-t-8 border-warqtek">
      <section className="flex gap-20 justify-around p-5 items-baseline">
        <div className="flex flex-col gap-5 flex-1 max-w-150">
          <Link>
            <FullLogo />
          </Link>
          <p>
            {more1 ? text1 : text1.slice(0, Math.floor(text1.length / 3))}
            {more1 ? (
              <Button variant={"link"} onClick={handleMore1}>
                less
              </Button>
            ) : (
              <>
                {"..."}
                <Button variant={"link"} onClick={handleMore1}>
                  more
                </Button>
              </>
            )}
          </p>
        </div>
        <div className="flex flex-col gap-5 flex-1 max-w-150">
          <h1 className="text-2xl font-bold">Support</h1>
          <p>
            {more2 ? text2 : text2.slice(0, Math.floor(text1.length / 3))}
            {more2 ? (
              <Button variant={"link"} onClick={handleMore2}>
                less
              </Button>
            ) : (
              <>
                {"..."}
                <Button variant={"link"} onClick={handleMore2}>
                  more
                </Button>
              </>
            )}
          </p>
        </div>
      </section>

      <div className="flex flex-col justify-between px-5 items-center py-2 bg-gray-400">
        <p>Warqtek.com - all rights reserved {new Date().getFullYear()}</p>
        <ul className="flex gap-2.5">
          <li>
            <Button variant={"link"}>
              <a href="">Privacy Policy</a>
            </Button>
          </li>
          <li>
            <Button variant={"link"}>
              <a href="">Terms of Use</a>
            </Button>
          </li>
          <li>
            <Button variant={"link"}>
              <a href="">Legal Notice</a>
            </Button>
          </li>
        </ul>
      </div>
    </footer>
  );
}
