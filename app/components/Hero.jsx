import React from "react";

import Link from "next/link";

const Hero = () => {
  return (
    <section className="h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-20">
      <div className="container mx-auto flex justify-around h-full">
        {/* text */}
        <div className="flex flex-col justify-center">
          <div className="font-semibold flex items-center text-lg">
            <div className="w-10 h-[2px] mr-3 bg-cyan-700"></div>GozieFarms
          </div>
          <h1 className="uppercase text-[55px] md:text-[70px] leading-[1.1] font-semibold mb-4">Freshest Farm Produce<br />
          <span className="font-light text-[50px]">Right at your fingertips</span></h1>
          <Link href={'#products'} className='self-start uppercase font-semibold border-b-2 border-primary'>View Produce</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
