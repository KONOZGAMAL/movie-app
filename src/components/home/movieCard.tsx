import { Movie } from "@/types/app";
import Image from "next/image";
import Link from "next/link";

const MovieCard = ({ movie }: { movie: Movie }) => (
  <Link
    href={`/movies/${movie.imdbID}`}
    key={movie.imdbID}
    className="group p-4 w-full max-w-[350px] bg-white rounded-xl border border-gray-200 
               shadow-sm hover:shadow-md transition-all duration-300 
               hover:border-gray-300 focus:outline-none focus:ring-2 
               focus:ring-blue-500 focus:border-transparent"
    aria-label={`${movie.Title}`}
  >
    <div className="relative overflow-hidden rounded-xl mb-3">
      <Image
        src={movie.Poster !== "N/A" ? movie.Poster : "/alt.jpg"}
        alt={`${movie.Title}`}
        width={350}
        height={200}
        className="w-full h-48 object-cover group-hover:scale-105 
                   transition-transform duration-500"
        loading="lazy"
      />
    </div>

    <div className="space-y-2">
      <h2
        className="text-xl font-bold text-gray-900 line-clamp-2 
                     group-hover:text-blue-600 transition-colors"
      >
        {movie.Title}
      </h2>
      <div className="flex items-center justify-between">
        <p className="text-gray-600 font-medium">{movie.Year}</p>
        {movie.Type && (
          <span
            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 
                           rounded-full capitalize"
          >
            {movie.Type}
          </span>
        )}
      </div>
    </div>
  </Link>
);

export default MovieCard;
