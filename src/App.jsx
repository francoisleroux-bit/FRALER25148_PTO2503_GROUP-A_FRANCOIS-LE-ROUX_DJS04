import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header.jsx";
import PodcastGrid from "./components/PodcastGrid.jsx";
import PodcastToolbar from "./components/PodcastToolbar.jsx";
import PaginationControls from "./components/PaginationControls.jsx";

import { genres } from "../data.js";
import { fetchPodcasts } from "./api/fetchPodcast.js";
import { PodcastProvider } from "./podcastContext.jsx";

export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading);
  }, []);

  return (
    <PodcastProvider initialPodcasts={podcasts}>
      <div className="app">
        <Header />

        <main className="app-main">
          {loading && (
            <p className="status status--loading">Loading podcasts…</p>
          )}

          {error && (
            <p className="status status--error">
              Something went wrong: {error}
            </p>
          )}

          {!loading && !error && podcasts.length === 0 && (
            <p className="status status--empty">No podcasts found.</p>
          )}

          {!loading && !error && podcasts.length > 0 && (
            <>
              <PodcastToolbar genres={genres} />
              <PodcastGrid podcasts={podcasts} genres={genres} />
              <PaginationControls />
            </>
          )}
        </main>
      </div>
    </PodcastProvider>
  );
}
