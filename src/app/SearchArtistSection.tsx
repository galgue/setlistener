"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export const SearchArtistSection = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  return (
    <>
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
        <input
          type="text"
          id="first_name"
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              void router.push(`/artist/name/${encodeURIComponent(search)}`);
            }
          }}
          className="block w-10/12 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-center text-2xl text-gray-900 "
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <button
        className="mb-20 rounded-lg border-0 bg-spotify-green px-8 py-2 text-5xl text-white hover:bg-green-600 focus:outline-none disabled:opacity-50"
        disabled={search.length === 0}
        onClick={() => {
          void router.push(`/artist/name/${encodeURIComponent(search)}`);
        }}
      >
        Search
      </button>
    </>
  );
};
