"use client";

import { usePlaylist } from "~/app/stores";
import { api } from "~/utils/api";
import { SpotifyLogo } from "./SpotifyLogo";
import { useRouter } from "next/navigation";
import { HomeIcon } from "./HomeIcon";

type CreatePlaylistButtonProps = {
  artistName: string;
};

export const CreatePlaylistButton = ({
  artistName,
}: CreatePlaylistButtonProps) => {
  const { mutate, isSuccess, isLoading, data } =
    api.spotify.createPlaylist.useMutation({
      onError: (error) => {
        console.error(error);
      },
    });
  const { playlist } = usePlaylist();
  const router = useRouter();
  return (
    <div
      className={`grid h-full w-[200%] ${
        isSuccess ? "-translate-x-1/2" : "translate-x-0"
      } 
      ${isLoading ? "animate-pulse" : ""} grid-cols-2 transition-transform
      duration-300 ease-in-out`}
    >
      <button
        className="h-full w-full rounded-lg border-0 bg-spotify-header text-3xl text-white hover:bg-spotify-row focus:outline-none disabled:opacity-50"
        disabled={isSuccess || isLoading}
        onClick={() => {
          void mutate({
            artistName,
            songUris: playlist?.map((song) => song.uri) || [],
          });
        }}
      >
        <div className="flex flex-row items-center justify-center gap-3">
          <div>Add to</div>
          <div className="h-3/6 w-1/2">
            <SpotifyLogo />
          </div>
        </div>
      </button>
      <div className="grid grid-cols-[4fr,1fr] gap-4">
        <button
          className="h-full w-full rounded-lg border-0 bg-spotify-header text-3xl text-white hover:bg-spotify-row focus:outline-none disabled:opacity-50"
          onClick={() => {
            if (data?.uri) {
              router.push(data?.uri);
            }
          }}
        >
          Go to playlist
        </button>
        <button
          className="h-full w-full rounded-lg border-0 bg-spotify-green text-3xl text-white hover:bg-green-600 focus:outline-none disabled:opacity-50"
          onClick={() => {
            router.push("/");
          }}
        >
          <div className="p-2">
            <HomeIcon />
          </div>
        </button>
      </div>
    </div>
  );
};
