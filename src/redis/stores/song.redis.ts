import { createStore } from "./createStore";
import { SpotifySongSchema } from "~/server/spotifyApi/schemas";

export const songStore = createStore("song", SpotifySongSchema);
