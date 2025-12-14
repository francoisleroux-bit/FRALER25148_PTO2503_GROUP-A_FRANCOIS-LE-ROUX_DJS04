import { usePodcastContext } from "../podcastContext.jsx";

export default function PaginationControls() {
  const { page, setPage, totalPages, totalItems } = usePodcastContext();

  const goPrev = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  const goNext = () => {
    setPage((p) => Math.min(totalPages, p + 1));
  };

  if (totalItems === 0) return null;

  return (
    <div className="pagination">
      <button
        type="button"
        onClick={goPrev}
        disabled={page === 1}
        className="pagination__btn"
      >
        ← Previous
      </button>

      <span className="pagination__info">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        onClick={goNext}
        disabled={page === totalPages}
        className="pagination__btn"
      >
        Next →
      </button>
    </div>
  );
}
