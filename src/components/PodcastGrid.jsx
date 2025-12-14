import { useMemo } from "react";
import PodcastCard from "./PodcastCard";
import { usePodcastContext } from "../PodcastContext";

/**
 * Renders the responsive grid of podcast previews.
 *
 * @param {Object} props
 * @param {Object[]} props.genres - Local genre data array from data.js.
 * @returns {JSX.Element}
 */
export default function PodcastGrid({ genres }) {
  const { podcastsPage, allFilteredPodcasts } = usePodcastContext();

  // Build a Map for quick id -> title lookups
  const genreMap = useMemo(() => {
    const map = new Map();
    genres.forEach((g) => map.set(g.id, g.title));
    return map;
  }, [genres]);

  return (
    <section className="podcast-grid">
      <div className="podcast-grid__header">
        <h2 className="podcast-grid__title">Browse all shows</h2>
        <p className="podcast-grid__count">
          {allFilteredPodcasts.length} podcast
          {allFilteredPodcasts.length === 1 ? "" : "s"} found
        </p>
      </div>

      <div className="podcast-grid__list">
        {podcastsPage.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} genreMap={genreMap} />
        ))}
      </div>
    </section>
  );
}
