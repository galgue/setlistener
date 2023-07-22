import { SpotifyArtistSchema } from "~/server/spotifyApi/schemas";
import { createStore } from "./createStore";

export const artistStore = createStore("artist", SpotifyArtistSchema);
