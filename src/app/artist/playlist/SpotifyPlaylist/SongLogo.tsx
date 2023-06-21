"use client";

import Image from "next/image";
import { usePreview } from "./useSongPreview/usePreview";

type SongLogoProps = {
  logo?: {
    url: string;
    width: number;
    height: number;
  };
  songName?: string;
  previewUrl?: string | null;
};

export const SongLogo = ({ logo, songName, previewUrl }: SongLogoProps) => {
  const { isPlaying, onPlayClick } = usePreview(previewUrl || "");

  return (
    <div
      className="container relative aspect-square h-4/5 select-none overflow-hidden rounded-md"
      style={{
        width: (logo?.width || 0) * 0.8,
        height: (logo?.height || 0) * 0.8,
      }}
      onClick={onPlayClick}
    >
      {logo && (
        <Image
          src={logo.url}
          alt={songName ?? ""}
          width={logo.width}
          height={logo.height}
          className="h-full w-full"
        />
      )}
      <div
        className={`absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-50  text-3xl text-white
        ${isPlaying ? "opacity-100" : "opacity-0"}
        transition-opacity ${isPlaying ? "" : "md:hover:opacity-100"}`}
      >
        {isPlaying ? "ⅠⅠ" : "▶"}
      </div>
    </div>
  );
};
