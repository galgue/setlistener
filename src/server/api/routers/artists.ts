import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  getSetlist,
  searchBands,
  getArtistSetlistsIds,
} from "../../setlistApi";
import { redis } from "~/redis";

const RelevantSongResultSchema = z.array(
  z.object({
    name: z.string(),
    occurrences: z.number(),
    cover: z.string().optional(),
  })
);

const ToursSchema = z.array(z.string());

export const artistsRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ text: z.string(), max: z.number().default(10) }))
    .query(async ({ input }) => {
      const artists = (await searchBands(input.text)).artist;
      const foundArtistNames = new Set<string>();

      const filteredArtists = artists.filter((artist) => {
        if (foundArtistNames.has(artist.name)) return false;
        foundArtistNames.add(artist.name);
        return true;
      });

      return filteredArtists.slice(0, input.max);
    }),
  tours: publicProcedure
    .input(z.object({ artistId: z.string() }))
    .query(async ({ input }) => {
      const cachedResult = await redis.zodGet(
        `tours:${input.artistId}`,
        ToursSchema
      );

      if (cachedResult) {
        return cachedResult;
      }

      const playlists = (
        await Promise.all([
          getArtistSetlistsIds(input.artistId, 1),
          getArtistSetlistsIds(input.artistId, 2),
          getArtistSetlistsIds(input.artistId, 3),
        ])
      ).flat();

      const now = Date.now();
      let timeToNextShow = 0;

      playlists.every((playlist) => {
        const date = new Date(playlist.eventDate);
        const diff = date.getTime() - now;
        if (diff < 0) return false;
        timeToNextShow = diff;
        return true;
      });

      const tours = playlists
        .filter((playlist) => Boolean(playlist.tour?.name))
        .reduce((acc, playlist) => {
          acc.add(playlist.tour?.name as string);
          return acc;
        }, new Set<string>());

      await redis.zodSet(
        `tours:${input.artistId}`,
        ToursSchema,
        Array.from(tours),
        timeToNextShow ? timeToNextShow / 1000 : 60 * 60 * 24
      );

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
          .default("true"),
        defaultSearch: z.boolean().default(false),
      })
    )
    .query(async ({ input }) => {
      const { artistId, top, withCovers, minOccurrences, tour, defaultSearch } =
        input;
      if (defaultSearch) {
        const cachedResult = await redis.zodGet(
          `playlist:${artistId}`,
          RelevantSongResultSchema
        );
        if (cachedResult) {
          return cachedResult;
        }
      }

      const playlistIds: string[] = [];

      const now = Date.now();

      let timeToNextShow = 0;

      for (let page = 1; playlistIds.length < top; page++) {
        const newPlaylists = await getArtistSetlistsIds(artistId, page, tour);

        if (newPlaylists.length === 0) break;

        const pastPlaylistsIds = newPlaylists
          .filter((playlist) => {
            if (playlist.eventDate.getTime() > now) {
              timeToNextShow = playlist.eventDate.getTime() - now;
              return false;
            }
            return true;
          })
          .map((playlist) => playlist.id);

        playlistIds.push(...pastPlaylistsIds);
      }

      const topPlaylistsIds = playlistIds.slice(0, top);

      const playlists: Awaited<ReturnType<typeof getSetlist>>[] = [];

      // request can't be parallelized because of rate limiting
      for (const playlistId of topPlaylistsIds) {
        const playlist = await getSetlist(playlistId);
        playlists.push(playlist);
      }

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

      const relevantSongs: z.infer<typeof RelevantSongResultSchema> =
        Object.values(Array.from(songsOccurrences))
          .filter(([_, options]) => {
            return (
              options.occurrences >=
              (top > topPlaylistsIds.length
                ? Math.max(0, topPlaylistsIds.length - (top - minOccurrences))
                : minOccurrences)
            );
          })
          .map(([song, options]) => ({
            name: song,
            cover: options.coverOf,
            occurrences: options.occurrences,
          }));

      if (defaultSearch) {
        await redis.zodSet(
          `playlist:${artistId}`,
          RelevantSongResultSchema,
          relevantSongs,
          timeToNextShow ? timeToNextShow / 1000 : 60 * 60 * 24
        );
      }

      return relevantSongs;
    }),
});
