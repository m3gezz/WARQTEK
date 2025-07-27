import React from "react";
import Footer from "../../slices/Footer";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-[100vh] flex select-none flex-col items-center justify-between">
      <section class="bg-background mt-22">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
              404
            </h1>
            <p class="mb-4 text-3xl tracking-tight font-bold">
              Something's missing.
            </p>
            <p class="mb-4 text-lg font-light">
              Sorry, we can't find that page. You'll find lots to explore on the
              home page.{" "}
            </p>
            <Button>
              <Link to="/guest">Go back home</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
