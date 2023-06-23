import { z } from "zod";

const RedirectFetchSchema = z.object({
  redirectUrl: z.string().url(),
  searchParams: z.record(z.string()),
});

export type RedirectFetchResponse = z.infer<typeof RedirectFetchSchema>;

export const redirectFetch = async (url: string, init?: RequestInit) => {
  const response = await fetch(url, init);

  if (response.status === 200) {
    const { redirectUrl, searchParams } = RedirectFetchSchema.parse(
      await response.json()
    );

    const url = new URL(redirectUrl);

    Object.entries(searchParams).forEach(([key, value]) =>
      url.searchParams.append(key, value)
    );

    window.location.assign(url.toString());
  }
};
