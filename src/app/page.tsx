import MainContent from "@/components/home/mainContent";
import NoMovies from "@/components/home/noMovies";
import Search from "@/components/home/search";
import { Movie } from "@/types/app";
import { getAllMovies } from "@/utils/api";

export default async function Home() {
  let dataMovies: Movie[] = [];
  try {
    dataMovies = await getAllMovies();
  } catch {
    return (
      <>
        <NoMovies />
      </>
    );
  }

  return (
    <main className="">
      <Search />
      <MainContent dataMovies={dataMovies} />
    </main>
  );
}
