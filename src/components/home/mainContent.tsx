import React from "react";

import MovieCard from "./movieCard";
import { Movie } from "@/types/app";
import NoMovies from "./noMovies";

export default async function MainContent({
  dataMovies,
}: {
  dataMovies: Movie[];
}) {
  if (!dataMovies || dataMovies.length === 0) {
    return (
      <>
        <NoMovies />
      </>
    );
  }
  return (
    <div className="w-full flex justify-center items-center flex-wrap gap-3 max-w-6xl mx-auto mt-8">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                            gap-6 justify-items-center"
      >
        {dataMovies?.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}
