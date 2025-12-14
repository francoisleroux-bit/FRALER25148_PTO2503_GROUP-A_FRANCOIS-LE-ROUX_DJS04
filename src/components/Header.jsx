/**
 * App header for the podcast landing page.
 *
 * @returns {JSX.Element} Header component.
 */
export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <h1 className="app-header__title">React Podcast Discovery</h1>
        <p className="app-header__subtitle">
          Browse curated podcasts, explore genres, and discover your next
          favourite show.
        </p>
      </div>
    </header>
  );
}
