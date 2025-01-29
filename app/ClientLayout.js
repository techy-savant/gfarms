"use client";

import "./globals.css";
import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

import SidebarProvider from "@/contexts/SidebarContext";
import CartProvider from "@/contexts/CartContext";
import ProductProvider from "@/contexts/ProductContext";

import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { Toaster } from "@/components/ui/toaster";

export default function ClientLayout({ children }) {
  // Define wallets and network
  const network = WalletAdapterNetwork.Devnet; // or Mainnet, Testnet
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      // Add other wallet adapters as needed
    ],
    [network]
  );

  return (
    <html lang="en">
      <body className="bg-white text-black">
        <ConnectionProvider endpoint="http://127.0.0.1:8899">
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <SidebarProvider>
                <CartProvider>
                  <ProductProvider>
                    <React.StrictMode>{children}</React.StrictMode>
                  </ProductProvider>
                </CartProvider>
              </SidebarProvider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
        <Toaster />
      </body>
    </html>
  );
}
