"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { toast } from 'react-hot-toast';
import CartItem from "./CartItem";
import { SidebarContext } from "@/contexts/SidebarContext";
import { CartContext } from "@/contexts/CartContext";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, itemAmount, total } = useContext(CartContext);
  const wallet = useWallet();
  const [isProcessing, setIsProcessing] = useState(false);

  const STORE_WALLET = new PublicKey("AExAHqjEmcVak5gg1AuCsvMzad34ov83NSzokUyWgCXd");

  const storePurchaseData = async (purchaseData) => {

    console.log(purchaseData, 'another')
    try {
      const response = await fetch('http://localhost:5001/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData),
      });

      if (!response.ok) {
        throw new Error('Failed to store purchase data');
      }
    } catch (error) {
      console.error('Error storing purchase:', error);
      toast.error('Failed to record purchase. Please contact support.');
    }
  };

  const processPayment = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsProcessing(true);

    try {
      const connection = new Connection("https://api.devnet.solana.com", "confirmed");
      const lamports = Math.round(total * 1000000000);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: STORE_WALLET,
          lamports: lamports,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = wallet.publicKey;

      const signature = await wallet.sendTransaction(transaction, connection);
      const confirmation = await connection.confirmTransaction(signature, "confirmed");

      if (confirmation.value.err) {
        throw new Error("Transaction failed");
      }
 
      // Store each item in the cart as a purchase
      for (const item of cart) {
        const purchaseData = {
          address: wallet.publicKey.toString(),
          title: item.title,
          price: item.price,
          description: item.description,
          category: item.category,
          image: item.image,
          txHash: signature
        };

        await storePurchaseData(purchaseData);
      }

      toast.success('Payment successful!');
      clearCart();
      handleClose();

    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] lg:w-[40vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">
          Shopping Bag ({itemAmount})
        </div>
        <div
          onClick={handleClose}
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>

      <div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
        {cart.map((item) => {
          return <CartItem item={item} key={item.id} />;
        })}
      </div>

      <div className="flex flex-col gap-y-3 mt-4">
        <div className="flex w-full justify-between items-center">
          <div className="font-semibold">
            <span className="mr-2">Subtotal:</span>
            {parseFloat(total).toFixed(3)} SOL
          </div>
          <div
            onClick={clearCart}
            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
          >
            <FiTrash2 />
          </div>
        </div>

        <button
          onClick={processPayment}
          disabled={!wallet.connected || cart.length === 0 || isProcessing}
          className={`bg-primary flex p-3 justify-center items-center text-white w-full font-medium
            ${(!wallet.connected || cart.length === 0 || isProcessing) 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-primary-dark'}`}
        >
          {!wallet.connected 
            ? 'Connect Wallet to Checkout'
            : cart.length === 0 
              ? 'Cart is Empty'
              : isProcessing 
                ? 'Processing Payment...'
                : 'Pay with SOL'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;