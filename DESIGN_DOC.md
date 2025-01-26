# Tastebuds – DESIGN_DOC

## Project Overview & Scope

“Tastebuds” is a **Next.js** application that helps users **discover**, **curate**, and **pair** different media items (movies, albums, books, games, TV, and user-created **platters**). The core objective is to allow users to **search**, **filter**, **combine**, and **share** their favorite items creatively. 

We are now moving toward a **multi-route** structure in Next.js (App Router) so that each major feature (e.g. search, library, platters) has its own route (e.g. `/search`, `/library`) rather than a single-page setup. This approach improves usability, shareability (unique URLs), and SEO.

---

## Core Features & Routes

1. **Header & Navigation**  
   - A shared header that links to `/home`, `/search`, `/platters`, `/library`, etc.  
   - Shows the currently active route (highlighted or otherwise).  
   - Includes an **auth** section (log in/out) and optional user profile link.

2. **Search (`/search`)**  
   - A search bar for entering terms.  
   - A filter container to toggle mediums (music, movies, etc.) plus extra filters (genre, mood).  
   - Search results laid out in columns (or containers) by filter combination.  
   - Clicking a search result may open a detail view (e.g., a popup or link to `/detail/:id` in the future).

3. **Platters (`/platters`)**  
   - Users can browse or create “platters” (collections of items).  
   - A category container (Mine, Saved, Popular, Random) to switch sets of platters.  
   - Each platter can hold multiple “courses” (sections) with an arbitrary number of items.

4. **Library (`/library`)**  
   - Shows the user’s personal or global library of items (movies, albums, books, games, TV).  
   - A category container to filter items by type, or view “All.”  
   - Each item appears as a “library card” with a cover and title.

5. **Profile (`/profile`)**  
   - Displays user info like username, avatar, joined date, etc.  
   - May include a summary of recent activities or followed users (in a future iteration).

6. **Auth (`/auth`)**  
   - A dedicated route for login and signup flows, or an embedded Auth Modal can route here as a fallback.  
   - Integrates with Supabase’s Auth system.  

7. **Home (`/home`)**  
   - A landing or welcome page. Could be a feed of top or trending items, or a simple welcome message.  
   - Possibly the default route (e.g. root `/` could redirect to `/home`).

8. **Item Detail (Future)**  
   - Might live at a route like `/detail/[id]` or `/items/[id]`.  
   - Shows cover image, title, subtitle, creators, and detail modules (genres, tracklists, descriptions, etc.).  
   - Also displays platters containing the item.  

---

## UI & Component Architecture

- **Layouts & Shared Components**  
  - A top-level **layout** that includes the **header** (navigation) and a **footer**. Each route’s `page.tsx` is nested within this layout.  

- **Context & State**  
  - We may still use contexts for global data (like user session or search filters).  
  - Route-specific logic can go in each page or a custom hook.  

- **Reusable Subcomponents**  
  - **Buttons** (`HeaderButtonSingle`, `HeaderButtonDouble`).  
  - **Filtering** (`SearchFilteringButton`, `PlatterCategoryContainer`, `LibraryCategoryContainer`).  
  - **List Items** (`SearchItem`, `LibraryItem`, `PlatterContainer`).  
  - **Popups** (`SearchContainerPopup`) for quick details or actions.

---

## Database & API Considerations

- **Relational Database** (Supabase / Postgres)  
  - Central `items` table for all media types.  
  - Medium-specific subtables (`movies`, `shows`, `books`, `games`, `albums`).  
  - `platters` table, plus `platter_items` for many-to-many with courses.  
  - `user_library` for user-saved items.  
  - Optional social features: `activities`, `follows`, `reviews`, `ratings`.

- **Caching & Distribution**  
  - Potentially cache popular or trending items in Redis or within Supabase’s built-in caching.  
  - “Creative joins” across mediums, genres, moods for flexible user-defined pairings.

- **External APIs**  
  - Integrate with external data providers (TMDB, MusicBrainz, Google Books, IGDB) to populate or update item info.  
  - Normalize data into the local schema for consistent queries and caching.

---

## Summary

We have a **multi-route** Next.js structure that provides clear navigation (`/home`, `/search`, `/library`, `/platters`, `/profile`, `/auth`) while retaining a cohesive UI. The **header** coordinates page transitions, and each route handles its specific logic (search, library display, platter management, etc.). Database integration remains consistent across routes, focusing on relational best practices and caching for performance.

---

## TODO

1. **Create `/search` Route**  
   - Implement a page that renders the **Search** component, filter containers, and results.  
   - May use a serverless function or client-side fetch to query local DB + external APIs.

2. **Create `/library` Route**  
   - Show the user’s library of items, with categories for different media.  
   - Integrate with Supabase for real data in `user_library`.

3. **Create `/profile` Route**  
   - Display user information, possibly pulling from a `profiles` table or Supabase `auth.users`.  
   - Include an option to edit user details or view user-specific data.

4. **Create `/auth` Route**  
   - Dedicated sign-up / login page (or embed the modal).  
   - Hooks into Supabase for email/password, OAuth, or other forms of auth.

5. **Create `/platters` Route**  
   - Page for browsing, creating, and editing user platters.  
   - Integrate `PlatterCategoryContainer` (Mine, Saved, Popular, Random).

6. **Create `/home` Route**  
   - A simple landing page (welcome, trending items, call-to-action, or user feed).  
   - Could serve as the default page for “/”.
   
7. **Create `/detail` Route**  
   - Dynamic child routes based off item id so that detail links can be shared  
