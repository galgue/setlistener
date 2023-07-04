import { PageWithHeader } from "~/components/pageWithHeader";
import { SearchArtistSection } from "./SearchArtistSection";

const Home = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="h-10 w-full">
        <PageWithHeader withoutBackButton={true} />
      </div>
      <div className="flex-1">
        <div className="flex pt-5">
          <h1 className="text-center text-7xl font-bold text-spotify-green">
            Set
          </h1>
          <h1 className="text-center text-7xl font-bold text-white">list</h1>
          <h1 className="text-center text-7xl font-bold text-spotify-green">
            er
          </h1>
        </div>
      </div>
      <SearchArtistSection />
    </div>
  );
};

export default Home;
