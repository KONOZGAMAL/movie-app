import { Movie } from "@/types/app";

export async function getAllMovies(): Promise<Movie[]> {
  try {
    const res = await fetch(
      "https://www.omdbapi.com/?s=batman&apikey=5c9b4185",
      {
        cache: "force-cache",
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) {
      console.error("Failed to fetch movies, status:", res.status);
      return [];
    }
    const dataMovies = await res.json();
    console.log("dataMovies from API:", dataMovies);

    return dataMovies.Search || [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const getMovieDetails = async (movieId: string) => {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?i=${movieId}&apikey=5c9b4185`
    );
    const dataMovies = await res.json();
    console.log("dataMovies from API:", dataMovies);
    return dataMovies;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllMoviesFromSearch = async (searchTerm: string) => {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?s=${searchTerm}&apikey=5c9b4185`
    );
    const dataMovies = await res.json();
    console.log("here search:", dataMovies);
    return dataMovies;
  } catch (error) {
    console.log(error);
  }
};
