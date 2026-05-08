"use client";

import { useEffect, useState } from "react";
import SearchCard from "../../components/search/SearchCard";
import SearchInput from "../../components/search/SearchInput";
import Loader from "../../components/shared/Loader";

interface User {
  _count: {
    followers: number;
    following: number;
  };
  bio?: string | null;
  id: string;
  image?: string | null;
  name: string;
  username: string;
}

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const debounce = setTimeout(async () => {
      if (!query.trim()) {
        setUsers([]);
        return;
      }
      try {
        setLoading(true);
        const response = await fetch(`/api/users/search?q=${query}`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="space-y-6 mx-auto px-4 py-6 max-w-2xl">
      <h1 className="font-bold text-white text-2xl">Tìm kiếm</h1>
      <SearchInput onChange={setQuery} value={query} />
      {loading && <Loader />}
      {!loading && query && users.length === 0 && (
        <div className="pt-10 text-neutral-500 text-center">
          Không tìm thấy người dùng
        </div>
      )}
      <div className="space-y-4">
        {users.map((user) => (
          <SearchCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
