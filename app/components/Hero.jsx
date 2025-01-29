import React from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className=" h-[500px] sm:h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-20">
      <div className="container mx-auto flex justify-around h-full w-full">
        {/* text */}
        <div className="flex flex-col justify-center items-center gap-2 sm:gap-3 w-full">
          <h1 className=" text-[#70681b] font-semibold text-2xl md:text-4xl xl:text-7xl ">
            Welcome to G-Farms
            <br />
          </h1>
          <p className="font-light text-[11px] text-base lg:text-lg">
            BlockChain Powered E-Marketplace for Farm Produce.
          </p>

          <Link href={"#products"}>
            {" "}
            <Button className="bg-green-600 text-[11px] md:text-base lg:text-lg mt-3 max-sm:py-2 max-sm:px-4">
              View Produce
            </Button>{" "}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
