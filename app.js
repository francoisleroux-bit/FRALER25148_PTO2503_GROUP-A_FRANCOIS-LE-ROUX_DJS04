import { podcasts, genres, seasons } from "./data.js";

/* ---------- Helpers ---------- */

/** Convert ISO date string -> "Updated X days ago" OR "Last updated: Month DD, YYYY" */
function formatRelative(dateStr, mode = "card") {
  const updatedDate = new Date(dateStr);
  const now = new Date();
  const diffMs = now - updatedDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (mode === "card") {
    if (diffDays === 0) return "Updated today";
    if (diffDays === 1) return "Updated 1 day ago";
    if (diffDays < 7) return `Updated ${diffDays} days ago`;
    if (diffDays < 14) return "Updated 1 week ago";
    return `Updated ${Math.floor(diffDays / 7)} weeks ago`;
  }

  // modal full date
  const opts = { year: "numeric", month: "long", day: "numeric" };
  return "Last updated: " + updatedDate.toLocaleDateString(undefined, opts);
}

/** Get genre objects for a podcast (array of ids in podcast.genres) */
function getGenresForPodcast(podcast) {
  return podcast.genres
    .map((id) => genres.find((g) => g.id === id))
    .filter(Boolean);
}

/** Get seasonDetails for a podcast id */
function getSeasonDetails(podcastId) {
  const match = seasons.find((s) => s.id === podcastId);
  return match ? match.seasonDetails : [];
}

/* ---------- DOM Refs ---------- */

const genreSelect = document.getElementById("genreSelect");
const sortSelect = document.getElementById("sortSelect");
const podcastGrid = document.getElementById("podcastGrid");

const modalEl = document.getElementById("podcastModal");
const backdropEl = document.getElementById("modalBackdrop");
const modalCloseBtn = document.getElementById("modalCloseBtn");

const modalTitle = document.getElementById("modalTitle");

// mobile/tablet refs
const modalCoverMobile = document.getElementById("modalCoverMobile");
const modalDescriptionMobile = document.getElementById(
  "modalDescriptionMobile"
);
const modalGenresMobile = document.getElementById("modalGenresMobile");
const modalUpdatedMobile = document.getElementById("modalUpdatedMobile");
const modalSeasonsMobile = document.getElementById("modalSeasonsMobile");

// desktop refs
const modalCoverDesktop = document.getElementById("modalCoverDesktop");
const modalDescriptionDesktop = document.getElementById(
  "modalDescriptionDesktop"
);
const modalGenresDesktop = document.getElementById("modalGenresDesktop");
const modalUpdatedDesktop = document.getElementById("modalUpdatedDesktop");
const modalSeasonsDesktop = document.getElementById("modalSeasonsDesktop");

/* ---------- State ---------- */

let activeGenreFilter = "all";
let activeSort = "recent";

/* ---------- Init Genre Dropdown ---------- */

function populateGenreDropdown() {
  // "All Genres" first
  const optAll = document.createElement("option");
  optAll.value = "all";
  optAll.textContent = "All Genres";
  genreSelect.appendChild(optAll);

  // then each genre from data.js
  genres.forEach((g) => {
    const opt = document.createElement("option");
    opt.value = g.id;
    opt.textContent = g.title;
    genreSelect.appendChild(opt);
  });
}

/* ---------- Filtering & Sorting ---------- */

function filterPodcasts() {
  let list = [...podcasts];

  // genre filter
  if (activeGenreFilter !== "all") {
    const gID = Number(activeGenreFilter);
    list = list.filter((p) => p.genres.includes(gID));
  }

  // sort
  if (activeSort === "recent") {
    list.sort((a, b) => new Date(b.updated) - new Date(a.updated));
  } else if (activeSort === "popular") {
    // No "popularity" metric in data, so for now: higher seasons first.
    list.sort((a, b) => b.seasons - a.seasons);
  } else if (activeSort === "newest") {
    // We'll treat "newest" also by updated date (same as recent)
    list.sort((a, b) => new Date(b.updated) - new Date(a.updated));
  }

  return list;
}

/* ---------- Render Cards ---------- */

function renderPodcasts() {
  const list = filterPodcasts();
  podcastGrid.innerHTML = "";

  list.forEach((p) => {
    const podGenres = getGenresForPodcast(p);

    const card = document.createElement("article");
    card.className = "podcast-card";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.addEventListener("click", () => openModal(p.id));
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter") openModal(p.id);
    });

    // cover
    const coverDiv = document.createElement("div");
    coverDiv.className = "card-cover";
    if (p.image) {
      const img = document.createElement("img");
      img.src = p.image;
      img.alt = `${p.title} cover`;
      coverDiv.textContent = "";
      coverDiv.appendChild(img);
    } else {
      coverDiv.textContent = "Podcast Cover";
    }

    // title
    const titleEl = document.createElement("h3");
    titleEl.className = "card-title";
    titleEl.textContent = p.title;

    // seasons row
    const metaRow = document.createElement("div");
    metaRow.className = "card-row-meta";
    metaRow.innerHTML = `
      <span class="seasons-icon" aria-hidden="true">📅</span>
      <span>${p.seasons} season${p.seasons === 1 ? "" : "s"}</span>
    `;

    // genre chips
    const tagsRow = document.createElement("div");
    tagsRow.className = "tag-row";
    podGenres.forEach((g) => {
      const chip = document.createElement("span");
      chip.className = "tag-chip";
      chip.textContent = g.title;
      tagsRow.appendChild(chip);
    });

    // updated text
    const updatedEl = document.createElement("div");
    updatedEl.className = "card-updated";
    updatedEl.textContent = formatRelative(p.updated, "card");

    // assemble
    card.appendChild(coverDiv);
    card.appendChild(titleEl);
    card.appendChild(metaRow);
    card.appendChild(tagsRow);
    card.appendChild(updatedEl);

    podcastGrid.appendChild(card);
  });
}

/* ---------- Modal Logic ---------- */

function openModal(podcastId) {
  const p = podcasts.find((pod) => pod.id === podcastId);
  if (!p) return;

  const podGenres = getGenresForPodcast(p);
  const podSeasons = getSeasonDetails(p.id);

  // Shared
  modalTitle.textContent = p.title;

  // Mobile/tablet block content
  fillModalBlock(
    {
      coverEl: modalCoverMobile,
      descEl: modalDescriptionMobile,
      genresEl: modalGenresMobile,
      updatedEl: modalUpdatedMobile,
      seasonsEl: modalSeasonsMobile,
    },
    p,
    podGenres,
    podSeasons
  );

  // Desktop block content
  fillModalBlock(
    {
      coverEl: modalCoverDesktop,
      descEl: modalDescriptionDesktop,
      genresEl: modalGenresDesktop,
      updatedEl: modalUpdatedDesktop,
      seasonsEl: modalSeasonsDesktop,
    },
    p,
    podGenres,
    podSeasons
  );

  backdropEl.classList.remove("hidden");
  modalEl.classList.remove("hidden");
  // lock scroll
  document.body.style.overflow = "hidden";
}

/**
 * Fill modal sections for either layout version.
 */
function fillModalBlock(blockRefs, p, podGenres, podSeasons) {
  const { coverEl, descEl, genresEl, updatedEl, seasonsEl } = blockRefs;

  // cover
  coverEl.innerHTML = "";
  coverEl.classList.add("modal-cover-lg", "modal-cover-desktop"); // whichever applies will show
  if (p.image) {
    const img = document.createElement("img");
    img.src = p.image;
    img.alt = `${p.title} large cover`;
    coverEl.appendChild(img);
  } else {
    coverEl.textContent = "Large Cover Image";
  }

  // description
  descEl.textContent = p.description;

  // genres
  genresEl.innerHTML = "";
  podGenres.forEach((g) => {
    const chip = document.createElement("span");
    chip.className = "tag-chip";
    chip.textContent = g.title;
    genresEl.appendChild(chip);
  });

  // updated
  updatedEl.textContent = formatRelative(p.updated, "modal");

  // seasons list (desktop version = stacked list items, each row showing title + episodes)
  seasonsEl.innerHTML = "";
  if (podSeasons.length === 0) {
    const li = document.createElement("li");
    li.className = "season-item";
    li.innerHTML = `
      <div class="season-left">
        <span>No seasons found</span>
      </div>
      <div class="season-episodes"></div>
    `;
    seasonsEl.appendChild(li);
  } else {
    podSeasons.forEach((sObj, i) => {
      const li = document.createElement("li");
      li.className = "season-item";

      const left = document.createElement("div");
      left.className = "season-left";

      const title = document.createElement("span");
      title.textContent = sObj.title || `Season ${i + 1}`;

      // OPTIONAL: short desc under season title (screenshot desktop shows a subtitle like "Introduction to the fundamentals")
      // We don't have custom descriptions per season in data, so we'll generate something light:
      const desc = document.createElement("span");
      desc.className = "season-desc";
      desc.textContent =
        i === 0
          ? "Introduction to the fundamentals"
          : i === 1
          ? "Deep dives into complex subjects"
          : i === 2
          ? "Expert perspectives and case studies"
          : "Episode collection";

      left.appendChild(title);
      left.appendChild(desc);

      const right = document.createElement("div");
      right.className = "season-episodes";
      right.textContent = `${sObj.episodes} episode${
        sObj.episodes === 1 ? "" : "s"
      }`;

      li.appendChild(left);
      li.appendChild(right);

      seasonsEl.appendChild(li);
    });
  }
}

function closeModal() {
  backdropEl.classList.add("hidden");
  modalEl.classList.add("hidden");
  document.body.style.overflow = "";
}

/* ---------- Event Listeners ---------- */

genreSelect.addEventListener("change", (e) => {
  activeGenreFilter = e.target.value;
  renderPodcasts();
});

sortSelect.addEventListener("change", (e) => {
  activeSort = e.target.value;
  renderPodcasts();
});

modalCloseBtn.addEventListener("click", closeModal);
backdropEl.addEventListener("click", closeModal);
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalEl.classList.contains("hidden")) {
    closeModal();
  }
});

/* ---------- Boot ---------- */

populateGenreDropdown();
renderPodcasts();
