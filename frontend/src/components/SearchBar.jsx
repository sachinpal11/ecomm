import React from "react";
import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="w-full max-w-2xl px-6 mb-12">
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Search for items, collections and more..."
          className="w-full bg-neutral-100 hover:bg-neutral-200 focus:bg-white border-none rounded-full py-4 pl-12 pr-6 text-sm outline-none ring-0 focus:ring-1 focus:ring-black transition-all duration-300"
          disabled
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-medium text-gray-400 bg-neutral-200 px-2 py-1 rounded border border-neutral-300">
          CMD + K
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
