"use client";

import { usePlaylist } from "~/app/stores";
import { api } from "~/utils/api";
import { SpotifyLogo } from "./SpotifyLogo";
import { useRouter } from "next/navigation";
import { HomeIcon } from "./HomeIcon";
import { LoginButton } from "~/layouts/page-with-header/auth/Login";
import { Button } from "~/components";

type CreatePlaylistButtonProps = {
  artistName: string;
  isUserConnected?: boolean;
};

export const CreatePlaylistButton = ({
  artistName,
  isUserConnected = false,
}: CreatePlaylistButtonProps) => {
  const { mutate, isSuccess, isLoading, data } =
    api.spotify.createPlaylist.useMutation({
      onError: (error) => {
        console.error(error);
      },
    });
  const { playlist } = usePlaylist();
  const router = useRouter();

  if (!isUserConnected) {
    return (
      <LoginButton className="h-full w-full rounded-lg border-0 bg-spotify-header text-3xl text-white hover:bg-spotify-row focus:outline-none disabled:opacity-50">
        <div className="flex flex-row items-center justify-center gap-3">
          <div>Connect to</div>
          <div className="h-3/6 w-1/2">
            <SpotifyLogo />
          </div>
        </div>
      </LoginButton>
    );
  }

  return (
    <div className="h-full w-full overflow-hidden">
      <div
        className={`grid h-full w-[200%] ${
          isSuccess ? "-translate-x-1/2" : "translate-x-0"
        } 
      ${isLoading ? "animate-pulse" : ""} grid-cols-2 transition-transform
      duration-300 ease-in-out`}
      >
        <Button
          className="h-full w-full text-3xl"
          variant="secondary"
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
        </Button>
        <div className="grid grid-cols-[4fr,1fr] gap-4">
          <Button
            className="h-full w-full text-3xl"
            onClick={() => {
              if (data?.uri) {
                router.push(data?.uri);
              }
            }}
          >
            Go to playlist
          </Button>
          <Button
            className="h-full w-full text-3xl "
            onClick={() => {
              router.push("/");
            }}
          >
            <div className="p-2">
              <HomeIcon />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
