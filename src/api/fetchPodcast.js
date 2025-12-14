/**
 * @function fetchPodcasts
 * Fetches podcast preview data from the external API and updates React state.
 *
 * Handles:
 * - setting loading to true before the request
 * - clearing any previous error
 * - updating podcasts on success
 * - storing an error message on failure
 * - turning loading off in all cases
 *
 * @param {Function} setPodcasts - React state setter for the podcasts array.
 * @param {Function} setError - React state setter for an error message string.
 * @param {Function} setLoading - React state setter for the loading boolean.
 * @returns {Promise<void>} A promise that resolves when the fetch completes.
 */
export async function fetchPodcasts(setPodcasts, setError, setLoading) {
  setLoading(true);
  setError(null);

  try {
    const res = await fetch("https://podcast-api.netlify.app/");

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    setPodcasts(data);
  } catch (err) {
    console.error("Failed to fetch podcasts:", err);
    setError(
      err?.message ||
        "Something went wrong while fetching podcasts. Please try again."
    );
  } finally {
    setLoading(false);
  }
}
