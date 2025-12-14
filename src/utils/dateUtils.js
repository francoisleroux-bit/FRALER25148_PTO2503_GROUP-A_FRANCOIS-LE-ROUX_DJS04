/**
 * @function formatRelativeUpdated
 * Converts an ISO date string into a human-readable relative string
 * like "2 days ago" or "3 hours ago".
 *
 * @param {string} isoDateString - ISO formatted date string.
 * @returns {string} Human-readable relative time.
 */
export function formatRelativeUpdated(isoDateString) {
  if (!isoDateString) return "Unknown";

  const updatedDate = new Date(isoDateString);
  if (Number.isNaN(updatedDate.getTime())) return "Unknown";

  const now = new Date();
  const diffMs = now.getTime() - updatedDate.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 30) {
    // Fallback to a normal date if it's too far in the past
    return updatedDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  if (days >= 1) return `${days} day${days === 1 ? "" : "s"} ago`;
  if (hours >= 1) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  if (minutes >= 1) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  return "Just now";
}
