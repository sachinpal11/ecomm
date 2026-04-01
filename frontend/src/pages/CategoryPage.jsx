import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchProducts } from "../api/product/productThunk";
import { clearProducts } from "../api/product/productSlice";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

function CategoryPage({ categoryTitle, categoryValue }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { products, loading, error, currentPage, totalPages } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    // Clear products when category changes
    dispatch(clearProducts());
    dispatch(fetchProducts({ page: 1, limit: 8, category: categoryValue }));
  }, [categoryValue, dispatch]);

  const handlePageChange = (page) => {
    dispatch(fetchProducts({ page, limit: 8, category: categoryValue }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen py-30 bg-white flex flex-col items-center">

      <div className="w-full max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-10 gap-4">
          <h1 className="text-3xl md:text-5xl font-light tracking-tight uppercase">
            {categoryTitle}
          </h1>
          <p className="text-sm text-gray-400 font-medium tracking-wider">
            Showing all items in {categoryTitle}
          </p>
        </div>

        {loading && products.length === 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-neutral-100 rounded-xl mb-4" />
                <div className="h-4 bg-neutral-100 rounded w-3/4 mb-2" />
                <div className="h-4 bg-neutral-100 rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
            <p className="text-red-500 font-medium">Error: {error}</p>
            <button
              onClick={() => handlePageChange(1)}
              className="mt-4 text-black underline underline-offset-4"
            >
              Try again
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-40 border border-neutral-100 rounded-3xl">
            <h2 className="text-xl font-light text-gray-400 uppercase tracking-widest mb-2">No items found</h2>
            <p className="text-sm text-gray-400">Please check back later for new arrivals.</p>
          </div>
        ) : (
          <>
            {/* Table-like Grid UI (8 items per page) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
