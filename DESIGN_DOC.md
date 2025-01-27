# Tastebuds – DESIGN_DOC

## Project Overview & Scope

“Tastebuds” is a **Next.js** application that helps users **discover**, **curate**, and **pair** different media items (movies, albums, books, games, TV, and user-created **platters**). The core objective is to allow users to **search**, **filter**, **combine**, and **share** their favorite items creatively. 

We are now moving toward a **multi-route** structure in Next.js (App Router) so that each major feature (e.g. search, library, platters) has its own route (e.g. `/search`, `/library`) rather than a single-page setup. This approach improves usability, shareability (unique URLs), and SEO.

---

## Core Functionality Recap

1. **Header & Navigation**  
   - The user sees a consistent header with navigation buttons (`Header.tsx`, `HeaderButtons.tsx`).  
   - A **User Info** component (`HeaderUserInfo.tsx`) handles log in / log out flows (via Supabase).

2. **Search**  
   - **`CB_Search.tsx`** plus filter components let users find items.  
   - Could query your local DB and fallback to external APIs if few results are found.  
   - Displays results in multiple containers by filter combination.

3. **Platters**  
   - **`CB_Platters.tsx`** for browsing or creating.  
   - **`PlatterCategoryContainer.tsx`** for selecting (Mine, Saved, Popular, Random).  
   - **`PlatterContainer.tsx`** for displaying items in “courses.”

4. **Library**  
   - **`CB_Library.tsx`** shows user-saved items in a grid or list.  
   - **`LibraryCategoryContainer.tsx`** toggles item mediums.  
   - **`LibraryItem.tsx`** displays covers, titles.

5. **Item Detail**  
   - **`CB_ItemDetail.tsx`** shows cover image, description, etc.  
   - Sub-components in `detail/` break down the layout (cover, track list, genre tags, etc.).

6. **Auth**  
   - **`AuthModal.tsx`** provides a minimal sign-up/log-in flow (email/password, or OAuth).  
   - The user’s session is managed by Supabase (`utils/supabase/client.ts` or `server.ts`).

---

## Database & API

- **Local DB** (Supabase Postgres) storing `items`, medium-specific subtables, user relationships, etc.  
- **Upsert** external API results (TMDB, Google Books, IGDB, MusicBrainz) into `items` to cache them for future queries.  
- **Serverless Route** approach (e.g., `app/api/search/route.ts`) to unify local queries + external fetching.

---

## TODO

1. **Create Route Files**  
   - `app/home/page.tsx` → Render `<CB_Homepage />`.  
   - `app/search/page.tsx` → Render `<CB_Search />`.  
   - `app/library/page.tsx` → Render `<CB_Library />`.  
   - `app/profile/page.tsx` → Could display or edit user data.  
   - `app/auth/page.tsx` → Render `<AuthModal />` or a dedicated form.  
   - `app/platters/page.tsx` → Render `<CB_Platters />`.

2. **Hook Up Navigation**  
   - Update `HeaderButtons.tsx` or `HeaderSimplified.tsx` to link to each route (e.g. “/search”, “/library”, “/platters”) with Next.js `<Link>` components instead of a single-page context.

3. **Implement DB Queries**  
   - In route handlers (`app/api/...`) or server components, fetch or upsert data as needed.  
   - Possibly create **`server.ts`** imports for secure DB operations.

4. **Enhance Auth**  
   - Add sign-up, log-in, or OAuth flows in **`AuthModal.tsx`** or `app/auth/page.tsx`.  
   - Protect certain routes (e.g. library, platters) with a server-side session check or a client-guard approach.

5. **Detail Routes**  
   - Consider a dynamic route for item details at `app/detail/[id]/page.tsx`.  
   - Render `<CB_ItemDetail />`, pulling data from your DB or external sources.

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
