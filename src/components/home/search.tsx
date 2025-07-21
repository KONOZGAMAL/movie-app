"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchResults from "./searchResults";
import { getAllMoviesFromSearch } from "@/utils/api";
import { ApiResponse, SearchState } from "@/types/app";

export default function Search() {
  const [state, setState] = useState<SearchState>({
    results: [],
    searchTerm: "",
    error: null,
    loading: false,
  });
  const { results, searchTerm, error, loading } = state;

  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    if (!searchTerm) {
      setState((prev) => ({
        ...prev,
        results: [],
        error: null,
      }));
      return;
    }

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(async () => {
      try {
        setState((prev) => ({ ...prev, loading: true }));
        const res: ApiResponse = await getAllMoviesFromSearch(searchTerm);

        if (res?.Response === "False") {
          setState((prev) => ({
            ...prev,
            loading: false,
            results: [],
            error: res.Error ?? "No results found.",
          }));
          return;
        }

        setState((prev) => ({
          ...prev,
          loading: false,
          results: res.Search || [],
          error: null,
        }));
      } catch {
        setState((prev) => ({
          ...prev,
          loading: false,
          results: [],
          error: "Failed to fetch movies. Please try again later.",
        }));
      }
    }, 500);

    setTypingTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({
        ...prev,
        searchTerm: e.target.value,
        results: [],
        error: null,
      }));
    },
    []
  );

  const shouldShowResults = useMemo(() => {
    return loading || results.length > 0 || !!error;
  }, [loading, results.length, error]);

  return (
    <div>
      <div className="relative w-full max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search movies ..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full bg-gray-800 !mr-4 text-white px-6 py-1.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-200"
          aria-label="Search for movies"
        />
        <FaSearch className="absolute right-3 top-2 text-gray-400 text-sm" />

        {shouldShowResults && (
          <SearchResults
            results={state.results}
            error={state.error ?? undefined}
            loading={state.loading}
          />
        )}
      </div>
    </div>
  );
}
