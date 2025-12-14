import PropTypes from "prop-types";
import { formatRelativeUpdated } from "../utils/dateUtils";

/**
 * Podcast preview card used inside the grid.
 *
 * @param {Object} props
 * @param {Object} props.podcast - PREVIEW object from the API.
 * @param {Map<number,string>} props.genreMap - Map of genre id -> title.
 * @returns {JSX.Element} Card component.
 */
export default function PodcastCard({ podcast, genreMap }) {
  const { image, title, seasons, genres, updated } = podcast;

  const genreNames =
    Array.isArray(genres) && genres.length > 0
      ? genres.map((id) => genreMap.get(id)).filter(Boolean)
      : [];

  return (
    <article className="podcast-card">
      <div className="podcast-card__image-wrapper">
        <img
          src={image}
          alt={title}
          className="podcast-card__image"
          loading="lazy"
        />
      </div>

      <div className="podcast-card__body">
        <h2 className="podcast-card__title">{title}</h2>

        <p className="podcast-card__meta">
          {seasons} season{seasons === 1 ? "" : "s"}
        </p>

        {genreNames.length > 0 && (
          <ul className="podcast-card__genres">
            {genreNames.map((name) => (
              <li key={name} className="podcast-card__genre">
                {name}
              </li>
            ))}
          </ul>
        )}

        <p className="podcast-card__updated">
          Last updated: <span>{formatRelativeUpdated(updated)}</span>
        </p>
      </div>
    </article>
  );
}

PodcastCard.propTypes = {
  podcast: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    seasons: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.number).isRequired,
    updated: PropTypes.string.isRequired,
  }).isRequired,
  genreMap: PropTypes.instanceOf(Map).isRequired,
};
