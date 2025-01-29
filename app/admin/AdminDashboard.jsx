"use client";

import React, { useContext, useState } from "react";
import { ProductContext } from "@/contexts/ProductContext";
import ProductRow from "../components/ProductRow"; // Component for rendering each product row
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import AddProduct from "../components/AddProduct";

const AdminDashboard = () => {
  const router = useRouter();

  const { products } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const productsPerPage = 10;

  // Filter products by category and search term
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handlers
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      //   await fetch(`/api/products/${id}`, { method: 'DELETE' });
      // Optionally refresh the product list here
    }
  };

  const handleEdit = (product) => {
    // Set up your edit logic here
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    router.push("/admin/login");
  };

  return (
    <div className="container mx-auto py-20">
      <div className="w-full flex justify-between">
        <h1 className="text-3xl font-semibold mb-4">Admin Panel</h1>
        <div className="flex gap-3">
          <AddProduct />
          <Button className="w-fit px-4 py-2" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-4 py-2 border rounded-md"
      />

      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          setCurrentPage(1); // Reset to first page when category changes
        }}
        className="mb-4 px-4 py-2 border rounded-md float-right"
      >
        <option value="all">All Categories</option>
        <option value="grains">Grains</option>
        <option value="legumes">Legumes</option>
        <option value="fruits">Fruits</option>
        <option value="vegetables">Vegetables</option>
        <option value="tubers">Tubers</option>
      </select>

      {/* Products Table */}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">S/N</th>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Displaying count of filtered products */}
      <div className="mt-4">Showing {filteredProducts.length} product(s)</div>
    </div>
  );
};

export default AdminDashboard;
