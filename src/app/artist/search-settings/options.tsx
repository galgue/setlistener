"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type OptionsProps = {
  artistId: string;
  artistName: string;
  tours: string[];
};

export const Options = ({ artistId, tours, artistName }: OptionsProps) => {
  const [tour, setTour] = useState<string>("");
  const [numberOfShows, setNumberOfShows] = useState<number>();
  const [maxOccurrences, setMaxOccurrences] = useState<number>();
  const [withCovers, setWithCovers] = useState<boolean>(false);

  const router = useRouter();

  return (
    <>
      <div className="flex flex-col">
        <select
          onChange={(e) => {
            setTour(e.currentTarget.value);
          }}
        >
          <option value="">every tour</option>
          {tours.map((tour) => (
            <option key={tour} value={tour}>
              {tour}
            </option>
          ))}
        </select>
        <input
          type="number"
          onChange={(e) => {
            setNumberOfShows(Number(e.currentTarget.value));
          }}
          min={1}
          max={10}
        />
        <input
          type="number"
          name="max occurrences"
          id="maxOccurrences"
          onChange={(e) => {
            setMaxOccurrences(Number(e.currentTarget.value));
          }}
          min={1}
          max={10}
        />
        <input
          type="checkbox"
          name="with covers"
          id="withCovers"
          onChange={(e) => {
            setWithCovers(e.currentTarget.checked);
          }}
        />
        <Link
          href={{
            pathname: "/artist/playlist",
            query: {
              artistId,
              artistName,
              numberOfShows,
              maxOccurrences,
              withCovers,
              tour,
            },
          }}
        >
          <button>Search</button>
        </Link>
      </div>
    </>
  );
};
