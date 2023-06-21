"use client";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const Home = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-center text-4xl font-bold text-white">Setlister</h1>
      </div>
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
        <input
          type="text"
          id="first_name"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-center text-2xl text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <Link
        className="flex flex-1 flex-col items-center justify-start"
        href="artist/name/[name]"
        as={`/artist/name/${encodeURIComponent(search)}`}
      >
        <button
          className="rounded-lg border-0 bg-spotify-green px-8 py-2 text-lg text-white hover:bg-green-600 focus:outline-none disabled:opacity-50"
          disabled={search.length === 0}
        >
          Search
        </button>
      </Link>
    </div>
  );
};

export default Home;
