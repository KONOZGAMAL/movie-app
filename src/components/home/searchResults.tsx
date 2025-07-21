import React from "react";
import LoadingSpinner from "../common/loadingSpinner";
import { Movie } from "@/types/app";
import Image from "next/image";
import Link from "next/link";

interface SearchResultsProps {
  results?: Movie[];
  error?: string;
  loading?: boolean;
}

export default function SearchResults({
  results,
  error,
  loading,
}: SearchResultsProps) {
  return (
    <div className="absolute top-full left-0 w-full mt-3.5 bg-white rounded-xl shadow-lg z-10">
      <div className="max-h-[400px] overflow-auto m-3">
        {error && (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        )}
        {loading && <LoadingSpinner />}

        {results?.map((item, index) => (
          <Link
            href={`/movies/${item.imdbID}`}
            className="flex p-2 hover:bg-[#ddd] cursor-pointer duration-200 rounded-xl gap-3.5"
            key={index}
          >
            <Image
              src={item.Poster !== "N/A" ? item.Poster : "/alt.jpg"}
              alt={item.Title}
              width={50}
              height={25}
              className="rounded-xl object-cover group-hover:scale-105 
                               transition-transform duration-500"
              loading="lazy"
            />
            <div>
              <h2 className="font-bold">{item.Title}</h2>
              <p>Year: {item.Year}</p>
              <p>Type: {item.Type}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
