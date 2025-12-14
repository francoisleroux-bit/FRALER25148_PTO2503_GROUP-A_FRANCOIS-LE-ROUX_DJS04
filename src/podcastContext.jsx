import { createContext, useContext, useEffect, useMemo, useState } from "react";

/**
 * Sort options available in the UI.
 */
export const SORT_OPTIONS = [
  { key: "default", label: "Default" },
  { key: "date-desc", label: "Newest" },
  { key: "date-asc", label: "Oldest" },
  { key: "title-asc", label: "Title A → Z" },
  { key: "title-desc", label: "Title Z → A" },
];

const PodcastContext = createContext(null);

/**
 * Central provider that holds search, sort, filter and pagination state.
 *
 * @param {Object} props
 * @param {Object[]} props.initialPodcasts - Raw array returned by the API.
 * @param {import("react").ReactNode} props.children
 * @returns {JSX.Element}
 */
export function PodcastProvider({ initialPodcasts, children }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("date-desc");
  const [genre, setGenre] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Dynamically calculate a nice page size based on screen width.
  useEffect(() => {
    const calculatePageSize = () => {
      const screenW = window.innerWidth;

      // Tablet and smaller (≤ 1024px): always show 10 cards
      if (screenW <= 1024) {
        setPageSize(10);
        return;
      }

      // For larger screens, calculate based on available width and 2 rows
      const cardWidth = 260;
      const maxRows = 2;
      const columns = Math.max(1, Math.floor(screenW / cardWidth));
      const newPageSize = columns * maxRows;

      setPageSize(newPageSize);
    };

    calculatePageSize();
    window.addEventListener("resize", calculatePageSize);
    return () => window.removeEventListener("resize", calculatePageSize);
  }, []);

  /**
   * Apply search, genre filter and sorting to the raw podcast data.
   */
  const filteredAndSorted = useMemo(() => {
    let data = [...initialPodcasts];

    // Search by title (case-insensitive, partial match)
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter((p) => p.title.toLowerCase().includes(q));
    }

    // Filter by genre id
    if (genre !== "all") {
      const gId = Number(genre);
      data = data.filter(
        (p) => Array.isArray(p.genres) && p.genres.includes(gId)
      );
    }

    // Sort
    switch (sortKey) {
      case "title-asc":
        data.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        data.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "date-asc":
        data.sort(
          (a, b) =>
            new Date(a.updated).getTime() - new Date(b.updated).getTime()
        );
        break;
      case "date-desc":
        data.sort(
          (a, b) =>
            new Date(b.updated).getTime() - new Date(a.updated).getTime()
        );
        break;
      case "default":
      default:
        break;
    }

    return data;
  }, [initialPodcasts, search, genre, sortKey]);

  const totalItems = filteredAndSorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // If filters shrink the list and our current page is now out of range, reset to page 1
  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [page, totalPages]);

  const podcastsPage = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredAndSorted.slice(start, start + pageSize);
  }, [filteredAndSorted, page, pageSize]);

  const value = {
    search,
    setSearch,
    sortKey,
    setSortKey,
    genre,
    setGenre,
    page,
    setPage,
    pageSize,
    totalItems,
    totalPages,
    podcastsPage,
    allFilteredPodcasts: filteredAndSorted,
  };

  return (
    <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>
  );
}

/**
 * Convenience hook for consuming the podcast context.
 */
export function usePodcastContext() {
  const ctx = useContext(PodcastContext);
  if (!ctx) {
    throw new Error("usePodcastContext must be used within a PodcastProvider");
  }
  return ctx;
}
