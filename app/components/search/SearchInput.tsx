"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  onChange: (value: string) => void;
  value: string;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className="relative">
      <Search
        className="top-1/2 left-4 absolute text-neutral-400 -translate-y-1/2"
        size={18}
      />
      <input
        className="bg-[#181818] py-3 pr-4 pl-11 border border-neutral-800 focus:border-neutral-600 rounded-2xl outline-none w-full text-white placeholder:text-neutral-500 text-sm transition"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tìm kiếm người dùng..."
        type="text"
        value={value}
      />
    </div>
  );
};

export default SearchInput;
