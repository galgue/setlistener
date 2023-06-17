import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  getSetlist,
  searchBands,
  getArtistSetlistsIds,
} from "../../setlistApi";

export const artistsRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      return await searchBands(input.text);
    }),
  tours: publicProcedure
    .input(z.object({ artistId: z.string() }))
    .query(async ({ input }) => {
      const playlists = await getArtistSetlistsIds(input.artistId, 1);

      const tours = playlists
        .filter((playlist) => Boolean(playlist.tour?.name))
        .reduce((acc, playlist) => {
          acc.add(playlist.tour?.name as string);
          return acc;
        }, new Set<string>());

      return Array.from(tours);
    }),
  songsOfLastShows: publicProcedure
    .input(
      z.object({
        artistId: z.string(),
        top: z.coerce.number().min(1).max(10).default(5),
        tour: z.string().optional(),
        minOccurrences: z.coerce.number().default(3),
        withCovers: z
          .string()
          .transform((value) => value === "true")
          .default("false"),
      })
    )
    .query(async ({ input }) => {
      const { artistId, top, withCovers, minOccurrences, tour } = input;

      const playlistsWithIds = await getArtistSetlistsIds(artistId, 1, tour);

      const pastPlaylists = playlistsWithIds.filter(
        (playlist) => playlist.eventDate < new Date()
      );

      const playlistIds = pastPlaylists
        .map((playlist) => playlist.id)
        .slice(0, top);

      const playlists = await Promise.all(
        playlistIds.map(async (playlist) => {
          return await getSetlist(playlist);
        })
      );

      const songsOccurrences = playlists.reduce(
        (acc, playlist) => {
          playlist.set.forEach((set) => {
            set.song.forEach((song) => {
              if (song.tape) return;
              if (!withCovers && !!song.cover) return;
              if (acc.has(song.name)) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                acc.get(song.name)!.occurrences += 1;
              } else {
                acc.set(song.name, {
                  occurrences: 1,
                  coverOf: song.cover?.name,
                });
              }
            });
          });
          return acc;
        },
        new Map<
          string,
          {
            occurrences: number;
            coverOf?: string;
          }
        >()
      );

      const relevantSongs = Object.values(Array.from(songsOccurrences))
        .filter(([_, options]) => {
          return options.occurrences > (minOccurrences || top - 2);
        })
        .map(([song, options]) => ({
          name: song,
          cover: options.coverOf,
        }));

      return relevantSongs;
    }),
});
