"use client";
import { atom, useAtomValue } from "jotai";
import { useEffect } from "react";
import type { SpotifySong } from "~/server/spotifyApi/schemas";

export const playlistAtom = atom<SpotifySong[]>([]);

export const usePlaylist = () => {
  const playlist = useAtomValue(playlistAtom);

  return {
    playlist,
  };
};

export const PlaylistDataAtom = ({ data }: { data: SpotifySong[] }) => {
  useEffect(() => {
    playlistAtom.onMount = (set) => {
      set(data);
    };
  }, [data]);

  return null;
};
