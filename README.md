# 📘 DJS04 – React Podcast App: Search, Sort, Filter & Pagination

## 📌 Project Overview

DJS04 extends the podcast preview application built in DJS03 by introducing dynamic UI controls and a global state management layer.
The app now supports live searching, sorting, genre filtering, and pagination, all synchronised through a custom React Context provider.

This project demonstrates my ability to manage complex UI interactions, centralise global state, and build a scalable front-end architecture.

---

## 🚀 Core Features

### 🔍 Live Search

- Search updates podcast results in real time.

- Matches any part of a podcast title (case-insensitive).

- Search works together with filters, sorting, and pagination.

---

### ↕️ Sorting Options

Users can sort podcasts by:

- Newest first (last updated date)

- Oldest first

- Title A → Z

- Title Z → A

- Default order

Sorting never resets the UI state — results stay consistent.

---

### 🎭 Genre Filtering

- Users can filter podcasts by genre using a dropdown.

- Genre titles come from the provided data.js file.

- Filters stack with search, sort, and pagination.

- The selected filter persists while navigating pages.

---

### 📄 Pagination System

- Results are displayed in manageable pages.

- Pagination respects search, sort, and filter states.

- Number of items per page adapts to screen width:

  - Mobile/Tablet: fixed 10 items

  - Desktop: dynamically calculated based on available space

---

### 🧠 Global State Management (React Context)

A custom PodcastContext provides centralised state for:

- search

- sortKey

- genre

- page

- pageSize

- Filtered/sorted/paginated podcast data

All UI components stay perfectly synchronised.

---

## 🏗️ Technical Implementation

### 🎯 React Functional Components

The UI is built using modular, reusable components:

- PodcastGrid

- PodcastCard

- PodcastToolbar

- PaginationControls

- Header

PodcastContext

---

### 🛠️ Setup Instructions

1️⃣ Install dependencies
npm install

2️⃣ Start the development server
npm run dev

3️⃣ Open in browser

---

### 🔧 React Hooks

The app makes extensive use of:

- useState()

- useEffect()

- useMemo()

- Custom hook: usePodcastContext()

---

### 🌐 Fetching Data

All podcast previews are fetched from:

https://podcast-api.netlify.app/

Fetched data is passed into the context provider for processing.

---
