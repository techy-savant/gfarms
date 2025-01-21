"use client";

import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "@/contexts/SidebarContext";
import { CartContext } from "@/contexts/CartContext";
import Link from "next/link";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from '@solana/wallet-adapter-react';
import { BsBag } from "react-icons/bs";
import { GiBasket } from "react-icons/gi";
import { PiPlantDuotone } from "react-icons/pi";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const { connected, publicKey } = useWallet();
  const [userStatus, setUserStatus] = useState('');

  // Handle wallet registration
  const handleWalletRegistration = async (address) => {
    try {
      // Check if user exists
      const checkResponse = await fetch(`http://localhost:5001/walletUser/${address}`);
      
      if (checkResponse.status === 404) {
        // Register new user
        const registerResponse = await fetch('http://localhost:5001/walletUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ address }),
        });

        if (registerResponse.ok) {
          setUserStatus('registered');
        }
      } else if (checkResponse.ok) {
        setUserStatus('existing');
      }
    } catch (error) {
      console.error('Wallet registration error:', error);
    }
  };

  // Check wallet connection and register
  useEffect(() => {
    if (connected && publicKey) {
      handleWalletRegistration(publicKey.toString());
    }
  }, [connected, publicKey]);

  // Scroll event listener
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
            <h1 className="font-bold text-3xl">GozieFarms</h1>
            <PiPlantDuotone className="text-4xl text-black" />
          </div>
        </Link>

        <div className="flex gap-x-8 items-center">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex relative"
          >
            <GiBasket className="text-3xl" />
            <div className="bg-red-500 absolute right-[-5px] top-5 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
              {itemAmount}
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <WalletMultiButton />
            {userStatus && connected && (
              <span className="text-xs mt-1 text-gray-600">
                {userStatus === 'registered' ? 'Welcome!' : 'Welcome back!'}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;