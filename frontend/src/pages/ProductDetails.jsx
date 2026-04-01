import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../api/product/productThunk";
import { clearSingleProduct } from "../api/product/productSlice";
import { ShoppingBag, Star, RefreshCcw, Truck } from "lucide-react";
import toast from "react-hot-toast";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleProduct, loading, error } = useSelector((state) => state.product);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    dispatch(clearSingleProduct());
    dispatch(fetchSingleProduct(id));
  }, [id, dispatch]);

  if (loading && !singleProduct) {
    return (
      <div className="min-h-screen pt-40 flex justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-40 flex flex-col items-center justify-center bg-white px-6">
        <h2 className="text-2xl font-light mb-4 tracking-tighter">Unable to load product</h2>
        <p className="text-gray-400 mb-8 max-w-sm text-center">It looks like this item is no longer available or there was a problem with the connection.</p>
        <button onClick={() => dispatch(fetchSingleProduct(id))} className="bg-black text-white px-10 py-3 rounded-full hover:bg-neutral-800 transition">Retry</button>
      </div>
    );
  }

  if (!singleProduct) return null;

  const { name, description, images, price, discountPrice, variants, totalStock } = singleProduct;

  const handleAddToCart = () => {
    if ((variants?.length > 0) && (!selectedSize || !selectedColor)) {
      toast.error("Please select a size and color");
      return;
    }
    toast.success(`${name} added to your collection!`);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Images Section */}
          <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-4">
            <div className="flex-1 aspect-[4/5] bg-neutral-100 overflow-hidden rounded-2xl">
              <img
                src={images[selectedImage]}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 lg:w-24 aspect-[4/5] rounded-lg overflow-hidden border-2 transition-all opacity-70 hover:opacity-100 ${
                    selectedImage === index ? "border-black p-1" : "border-transparent"
                  }`}
                >
                  <img src={img} alt={`${name} ${index}`} className="w-full h-full object-cover rounded-md" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold tracking-widest uppercase bg-neutral-100 px-3 py-1 rounded-full">New Arrival</span>
              {totalStock < 10 && <span className="text-[10px] font-bold tracking-widest uppercase bg-red-50 text-red-500 px-3 py-1 rounded-full">Low Stock</span>}
            </div>

            <h1 className="text-3xl md:text-4xl font-light uppercase tracking-tight mb-4">
              {name}
            </h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center text-xs gap-1 font-semibold">
                <Star size={14} className="fill-black" />
                <Star size={14} className="fill-black" />
                <Star size={14} className="fill-black" />
                <Star size={14} className="fill-black" />
                <Star size={14} className="text-gray-300" />
                <span className="text-gray-400 ml-2">4.1 (12 Reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-semibold text-black">₹{discountPrice || price}</span>
              {discountPrice && (
                <span className="text-xl text-gray-400 line-through">₹{price}</span>
              )}
            </div>

            <p className="text-gray-500 leading-relaxed mb-10 text-sm">
              {description}
            </p>

            {/* Variants Logic (Dynamic) */}
            <div className="flex flex-col gap-8 mb-12">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Select Size</p>
                <div className="flex flex-wrap gap-2">
                  {["XS", "S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-12 flex items-center justify-center border-2 rounded-xl text-xs font-semibold transition-all ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-neutral-100 hover:border-black text-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Colors</p>
                <div className="flex gap-4">
                  {["#000000", "#FFFFFF", "#FFDBB5", "#800000"].map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color ? "border-black ring-2 ring-neutral-200 ring-offset-2" : "border-neutral-100"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white flex items-center justify-center gap-3 py-5 rounded-3xl hover:bg-neutral-800 transition group"
            >
              <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-semibold uppercase tracking-widest text-sm">Add to Bag</span>
            </button>

            {/* Info Badges */}
            <div className="grid grid-cols-2 gap-4 mt-10 p-6 bg-neutral-50 rounded-3xl">
              <div className="flex items-start gap-3">
                <Truck size={18} className="text-gray-400 mt-0.5" />
                <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-tighter">Fast Shipping</h4>
                    <p className="text-[10px] text-gray-400">Delivered in 2-4 days</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-l pl-4 border-neutral-200">
                <RefreshCcw size={18} className="text-gray-400 mt-0.5" />
                <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-tighter">14 Day Return</h4>
                    <p className="text-[10px] text-gray-400">Easy exchange policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
