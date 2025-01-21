"use client";

import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "@/contexts/SidebarContext";
import { CartContext } from "@/contexts/CartContext";
import Link from "next/link";
import logo from "/public/img/logo.svg";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";

import { BsBag } from "react-icons/bs";
import { GiBasket } from "react-icons/gi";
import { PiPlantDuotone } from "react-icons/pi";

import Image from "next/image";

const Header = () => {
  // header state
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  // event listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 lg:px-8 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link href={"/"}>
          <div className="w-fit flex gap-2 justify-center items-center">
            <h1 className=" font-bold text-3xl">GozieFarms</h1>
            <PiPlantDuotone className="text-4xl text-black" />
          </div>
        </Link>

        {/* <WalletDisconnectButton /> */}
        {/* cart */}
        <div className="flex gap-x-8">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex relative"
          >
            <GiBasket className="text-3xl" />
            <div className="bg-red-500 absolute right-[-5px] top-5 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
              {itemAmount}
            </div>
          </div>
          <WalletMultiButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
