import { SORT_OPTIONS, usePodcastContext } from "../podcastContext.jsx";

/**
 * Top toolbar for searching, filtering by genre and sorting.
 *
 * @param {{ genres: {id:number,title:string}[] }} props
 */
export default function PodcastToolbar({ genres }) {
  const { search, setSearch, sortKey, setSortKey, genre, setGenre } =
    usePodcastContext();

  return (
    <section className="podcast-toolbar">
      {/* Search input */}
      <input
        type="text"
        className="toolbar__search"
        placeholder="Search podcasts…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Genre filter */}
      <select
        className="toolbar__select"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      >
        <option value="all">All genres</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.title}
          </option>
        ))}
      </select>

      {/* Sort options */}
      <select
        className="toolbar__select"
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value)}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.key} value={opt.key}>
            {opt.label}
          </option>
        ))}
      </select>
    </section>
  );
}
