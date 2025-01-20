import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function RoutesLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <>
          <Header />
          {children}
          <Sidebar />
          <Footer />
        </>
      </body>
    </html>
  );
}
