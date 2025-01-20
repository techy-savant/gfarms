"use client";

import React, { useContext, useState } from "react";
import { ProductContext } from "@/contexts/ProductContext";
import Product from "../components/Product";
import Hero from "../components/Hero";
import Header from "../components/Header";

const Home = () => {
  // get products from product context
  const { products } = useContext(ProductContext);

  // pagination and filter state
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const productsPerPage = 10;

  // filter products by category
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // calculate pagination values
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // pagination handlers
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // category change handler
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to first page when category changes
  };

  return (
    <div>
      <Hero />
      <section className="py-20">
        <div className="container mx-auto" id="products">
          <div className="flex justify-between items-center mb-10 px-4 lg:px-8">
            <h1 className="text-3xl font-semibold">View Our Produce</h1>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-4 py-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="grains">Grains</option>
              <option value="legumes">Legumes</option>
              <option value="fruits">Fruits</option>
              <option value="vegetables">Vegetables</option>
              <option value="tubers">Tubers</option>
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-600 py-10">
              No products found in this category.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
                {currentProducts.map((product) => {
                  return <Product product={product} key={product.id} />;
                })}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition"
                >
                  Previous
                </button>

                <span className="text-lg">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition"
                >
                  Next
                </button>
              </div>

              {/* Products count info */}
              <div className="text-center mt-4 text-gray-600">
                Showing products {indexOfFirstProduct + 1} -{" "}
                {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
                {filteredProducts.length}
                {selectedCategory !== "all" && ` in ${selectedCategory}`}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
