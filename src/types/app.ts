interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Language?: string;
  Type?: string;
  Plot?: string;
}

interface SearchState {
  results: Movie[];
  searchTerm: string;
  error: string | null;
  loading: boolean;
}

interface ApiResponse {
  Response: string;
  Search?: Movie[];
  Error?: string;
}

export type { Movie, SearchState, ApiResponse };
