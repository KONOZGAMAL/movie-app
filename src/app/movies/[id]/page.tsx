import Link from "next/link";
import { getMovieDetails } from "@/utils/api";
import { Movie } from "@/types/app";
import Image from "next/image";
import { Metadata } from "next";

interface PageProps<T> {
  params: Promise<T>;
}

type Props = PageProps<{ id: string }>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const movieId = resolvedParams.id;
  const movie = await getMovieDetails(movieId);

  return {
    title: movie.Title || "Movie Details",
    description: movie.Plot || "Explore detailed information about this movie.",
  };
}

export default async function MovieDetails({ params }: Props) {
  const resolvedParams = await params;
  const movieId = resolvedParams.id;
  const dataMovies: Movie | null = await getMovieDetails(movieId);

  return (
    <div className="container mx-auto px-4">
      <p className="mb-4">
        <Link
          href={`/`}
          className="rounded-xl px-6 py-3 bg-blue-500 text-white"
        >
          Back
        </Link>
      </p>

      {dataMovies ? (
        <div className="my-8">
          <div className="flex flex-wrap justify-center md:flex-nowrap gap-4">
            <Image
              src={dataMovies.Poster !== "N/A" ? dataMovies.Poster : "/alt.jpg"}
              alt={`${dataMovies.Title}`}
              className=" h-[384px] object-cover group-hover:scale-105
                    transition-transform duration-500"
              loading="lazy"
              width={256}
              height={384}
            />

            <div>
              <h1 className="text-2xl font-bold text-black">
                Title: {dataMovies.Title}
              </h1>
              <p className="text-[#7f7a7a]">Year: {dataMovies.Year}</p>
              <p>Genre: {dataMovies.Genre}</p>
              <p>Director: {dataMovies.Director}</p>
              <p>Writer: {dataMovies.Writer}</p>
              <p>Language: {dataMovies.Language}</p>
              <span>Description: {dataMovies.Plot}</span>
            </div>
          </div>
        </div>
      ) : (
        <p>No movie data found.</p>
      )}
    </div>
  );
}
