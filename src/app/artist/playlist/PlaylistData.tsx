"use client";
import { atom } from "jotai";
import { useEffect } from "react";
import type { SpotifySong } from "~/server/spotifyApi/schemas";

export const playlistAtom = atom<SpotifySong[]>([]);

export const PlaylistData = ({ data }: { data: SpotifySong[] }) => {
  useEffect(() => {
    playlistAtom.onMount = (set) => {
      set(data);
    };
  }, [data]);

  return null;
};
