import { useEffect, useState } from "react";

function useLSQuery() {
  const [query, setQuery] = useState<string>(() => {
    return localStorage.kaliganoffQuery ? localStorage.kaliganoffQuery : "";
  });

  useEffect(() => {
    return () => {
      localStorage.kaliganoffQuery = query;
    };
  });

  return [query, setQuery] as const;
}

export default useLSQuery;
