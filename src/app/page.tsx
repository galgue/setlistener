"use client";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const Home = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex h-full  w-full flex-col items-center justify-center">
      <h1 className="flex-1 text-center text-4xl font-bold">Search</h1>
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
        <input
          type="text"
          id="first_name"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <Link
        className="flex-1"
        href="artist/name/[name]"
        as={`/artist/name/${encodeURIComponent(search)}`}
      >
        <button>Search</button>
      </Link>
    </div>
  );
};

export default Home;
