import "~/styles/globals.css";
import { ClientProvider } from "~/utils/trpcClient";
import { NextAuthProvider } from "~/providers";

export const metadata = {
  title: "Setlister",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <html lang="en">
        <body className="select-none">
          <div className="flex h-screen items-center justify-center bg-spotify-header">
            <div className="relative h-[95vh] w-[95vw] rounded-lg bg-spotify-background px-4 py-4 shadow-md md:h-[40rem] md:w-96">
              <NextAuthProvider>{children}</NextAuthProvider>
            </div>
          </div>
        </body>
      </html>
    </ClientProvider>
  );
}
