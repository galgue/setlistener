import { PageWithHeader } from "~/layouts";
import "~/styles/globals.css";

export const metadata = {
  title: "Playlist",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PageWithHeader title="">{children}</PageWithHeader>;
}
