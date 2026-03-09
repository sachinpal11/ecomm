import React, { useState } from "react";
import AdminProductCard from "./AdminProductCard";
import { useNavigate } from "react-router";

function AllProduct() {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const AllProductData = [
    {
      _id: "1",
      name: "Oversized Hoodie",
      description: "Premium cotton hoodie",
      price: 1999,
      category: "women",
      frontImage: { url: "/products/p1.png" },
      totalStock: 20,
      featured: true,
    },
    {
      _id: "2",
      name: "Vintage Tee",
      description: "Vintage aesthetic tee",
      price: 1299,
      category: "women",
      frontImage: { url: "/products/p2.png" },
      totalStock: 15,
      featured: false,
    },
    {
      _id: "3",
      name: "Street Cargo Pants",
      description: "Streetwear cargo pants",
      price: 2499,
      category: "women",
      frontImage: { url: "/products/p3.png" },
      totalStock: 12,
      featured: true,
    },
    {
      _id: "4",
      name: "Minimal Hoodie",
      description: "Clean minimal hoodie",
      price: 2199,
      category: "women",
      frontImage: { url: "/products/p4.png" },
      totalStock: 18,
      featured: false,
    },
    {
      _id: "5",
      name: "Retro Jacket",
      description: "90s retro jacket",
      price: 3499,
      category: "women",
      frontImage: { url: "/products/p5.png" },
      totalStock: 10,
      featured: true,
    },
  ];

  const filteredProducts =
    filter === "featured"
      ? AllProductData.filter((p) => p.featured)
      : AllProductData;

  return (
    <div className="mt-20 px-4 sm:px-6 lg:px-10 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Products</h1>

        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-black text-white px-5 py-2 rounded-lg hover:bg-neutral-800 transition"
        >
          + Add Product
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 text-sm rounded-full border transition ${
            filter === "all" ? "bg-black text-white" : "hover:bg-neutral-100"
          }`}
        >
          All Products
        </button>

        <button
          onClick={() => setFilter("featured")}
          className={`px-4 py-2 text-sm rounded-full border transition ${
            filter === "featured"
              ? "bg-black text-white"
              : "hover:bg-neutral-100"
          }`}
        >
          Featured
        </button>
      </div>

      <div
        className="grid gap-6 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4"
      >
        {filteredProducts.map((product) => (
          <AdminProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default AllProduct;
