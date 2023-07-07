"use client";

import Link from "next/link";
import { useState } from "react";
import { NumberInput } from "./NumberInput";

type OptionsProps = {
  artistId: string;
  artistName: string;
  tours: string[];
};

export const Options = ({ artistId, tours, artistName }: OptionsProps) => {
  const [tour, setTour] = useState<string>("");
  const [numberOfShows, setNumberOfShows] = useState<number>(5);
  const [minOccurrences, setMinOccurrences] = useState<number>(2);
  const [withCovers, setWithCovers] = useState<boolean>(true);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex w-full flex-1 flex-col items-start justify-start pb-4">
        <div
          className={`flex ${
            isEditing ? "max-h-96" : "max-h-0"
          } h-full min-h-0 w-full flex-col overflow-hidden text-white transition-[max-height] duration-500 ease-in-out`}
        >
          <label
            about="tour"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a tour
          </label>
          <select
            id="tour"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
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
          <div className="flex w-full">
            <div className="w-1/2 p-3 pl-0">
              <NumberInput
                label="Number of shows"
                min={minOccurrences}
                max={10}
                value={numberOfShows}
                onChange={(value) => {
                  setNumberOfShows(value);
                }}
              />
            </div>
            <div className="w-1/2 p-3 pl-0">
              <NumberInput
                label="Min occurrences"
                min={1}
                max={numberOfShows}
                value={minOccurrences}
                onChange={(value) => {
                  setMinOccurrences(value);
                }}
              />
            </div>
          </div>
          <div className="mb-4 mt-3 flex w-full items-center justify-center">
            <input
              id="default-checkbox"
              type="checkbox"
              checked={withCovers}
              onChange={(e) => {
                setWithCovers(e.currentTarget.checked);
              }}
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-950 accent-spotify-green "
            />
            <label
              about="default-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              onClick={() => {
                setWithCovers(!withCovers);
              }}
            >
              with cover songs
            </label>
          </div>
        </div>
        <div className="w-full">
          <button
            onClick={() => {
              setIsEditing(!isEditing);
            }}
            type="button"
            className="flex w-full items-center justify-between rounded-xl border border-gray-200 px-3 py-2 text-left font-medium text-gray-500  focus:ring-gray-200"
          >
            <span>edit options</span>
            <svg
              className={`h-6 w-6 shrink-0 ${isEditing ? "rotate-180" : ""}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-6 flex w-full items-center justify-center">
        <Link
          href={{
            pathname: "/artist/playlist",
            query: {
              artistId,
              artistName,
              ...(isEditing
                ? { numberOfShows, minOccurrences, withCovers, tour }
                : {}),
            },
          }}
        >
          <button className="rounded-lg border-0 bg-spotify-green px-8 py-2 text-2xl text-white hover:bg-green-600 focus:outline-none disabled:opacity-50">
            Search
          </button>
        </Link>
      </div>
    </div>
  );
};
