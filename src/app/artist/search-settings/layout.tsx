import { PageWithHeader } from "~/components/pageWithHeader";
import "~/styles/globals.css";

export const metadata = {
  title: "Search Options",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PageWithHeader title={metadata.title}>{children}</PageWithHeader>;
}
