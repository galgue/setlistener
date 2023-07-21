import { PageWithHeader } from "~/layouts";
import "~/styles/globals.css";

export const metadata = {
  title: "Select Artist",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PageWithHeader title={metadata.title}>{children}</PageWithHeader>;
}
