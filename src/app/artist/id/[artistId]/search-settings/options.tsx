"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { RouteBuilder } from "~/utils/routeBuilder";

type OptionsProps = {
  artistId: string;
  tours: string[];
};

export const Options = ({ artistId, tours }: OptionsProps) => {
  const selectedTourRef = useRef<string>("");
  const selectNumberOfShowsRef = useRef<number>();
  const maxOccurrencesRef = useRef<number>();
  const withCoversRef = useRef<boolean>(false);

  const router = useRouter();

  return (
    <>
      <div className="flex flex-col">
        <select
          onChange={(e) => {
            selectedTourRef.current = e.currentTarget.value;
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
            selectNumberOfShowsRef.current = Number(e.currentTarget.value);
          }}
          min={1}
          max={10}
        />
        <input
          type="number"
          name="max occurrences"
          id="maxOccurrences"
          onChange={(e) => {
            maxOccurrencesRef.current = Number(e.currentTarget.value);
          }}
          min={1}
          max={10}
        />
        <input
          type="checkbox"
          name="with covers"
          id="withCovers"
          onChange={(e) => {
            withCoversRef.current = e.currentTarget.checked;
          }}
        />
        <button
          onClick={() => {
            router.push(
              RouteBuilder()
                .path("/artist/id/")
                .query(artistId)
                .path("/playlist")
                .searchParam("tour", selectedTourRef.current)
                .searchParam("numberOfShows", selectNumberOfShowsRef.current)
                .searchParam("maxOccurrences", maxOccurrencesRef.current)
                .searchParam("withCovers", withCoversRef.current)
                .build()
            );
          }}
        >
          Search
        </button>
      </div>
    </>
  );
};
