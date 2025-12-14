### React Podcast Discovery App

A responsive React application that fetches podcast data from an external API and displays a dynamic grid of podcast previews. Built as part of the DJS03: React Podcast Landing Page project.

---

## 📌 Overview

This project is a podcast discovery landing page built with React.
It fetches podcast previews from an external API and displays them in a clean, responsive grid layout. Each podcast preview card shows the podcast image, the number of seasons, genre tags, and a human-readable “last updated” date.

The app includes complete loading, error, and empty states, and is built with fully modular components and clean, documented code.

---

## 🚀 Features

# ✔ Data Fetching

- Fetches podcast data from:
  https://podcast-api.netlify.app/

- Fetch runs automatically on page load using useEffect().

- Handles loading, error, and fallback (empty) states.

# ✔ Reusable Podcast Preview Card

Each card displays:

- Podcast image

- Podcast title

- Number of seasons

- Associated genre names

- Formatted “last updated” date (e.g., “2 days ago”)

# ✔ Responsive Grid Layout

1 column on mobile

2 columns on small tablets

3 columns on medium screens

4 columns on larger desktops

Built using CSS Grid + media queries

# ✔ Clean & Modular Codebase

- Component-based structure

- Utility functions separated (e.g., date formatter)

- API calls isolated in their own module

- Organized CSS files

---

## 🧪 States Implemented

# Loading State

- Displays a loading message while fetching data.

- Error State

- Shows a meaningful error message if the API request fails.

- Empty State

- If no podcasts are returned, a user-friendly fallback message appears.

---

## 🏗 Technologies Used

- React (functional components)

- Vite

- JavaScript (ES modules)

- CSS Grid / Flexbox

- Fetch API

- Date formatting utilities

---
