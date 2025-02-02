# Tastebuds – Refined Design Document
## Project Overview & Scope

Tastebuds is a multi-route Next.js application that enables users to discover, curate, and pair various media items (movies, TV shows, albums, books, games) along with user-created platters. The app’s primary goal is to offer creative ways for users to search, filter, combine, and share media content.

### Key points:
Multi-route architecture: Each major feature (search, library, platters, etc.) has its own route for better usability, shareability (unique URLs), and SEO.

Integrated Data Pipeline: External APIs (TMDB, Google Books, IGDB, MusicBrainz) feed into an internal DB (Supabase/Postgres) via upsert operations, allowing fast, consistent queries and caching.

User Engagement: Users can manage their personal libraries, create custom platters, and (optionally) engage with social features such as reviews, ratings, and follows.

## Core Functionality Recap

### Header & Navigation
Consistent UI: A persistent header displays navigation buttons (e.g. /home, /search, /library, /platters).
User Authentication: Includes a User Info component (e.g., HeaderUserInfo.tsx) to manage log in/out (using Supabase).
Active State: Highlights the currently active route.

### Search

Components:

Main: CB_Search.tsx
Filter components for medium types, genres, and moods.

Behavior:

Primary search queries run against the local DB.

Fallback to external APIs if results are sparse.

Results are displayed in multiple, filter-combined containers.

### Platters
Components:

Main: CB_Platters.tsx

Containers: PlatterCategoryContainer.tsx (for Mine, Saved, Popular, Random) and PlatterContainer.tsx (for displaying items in “courses”).

Behavior:

Users can browse, create, and edit platters.

Platters support multiple “courses” or sections.

### Library

Components:

Main: CB_Library.tsx

Container: LibraryCategoryContainer.tsx (for filtering by medium)

Display: LibraryItem.tsx (cards showing cover images and titles)

Behavior:

Displays items saved by the user.

Supports different views (grid or list).

### Item Detail

Components:

Main: CB_ItemDetail.tsx

Subcomponents: For cover images, track lists, genre tags, etc.

Behavior:

Provides a detailed view of an item (and potentially related platters).

### Authentication

Components:

Auth Modal: AuthModal.tsx (for sign-up/log-in flows)

Dedicated Auth Page: app/auth/page.tsx (if needed)

Behavior:

Uses Supabase for managing sessions and user data.

Supports email/password and OAuth.

## Routes & Navigation Structure

Define distinct routes to separate concerns and improve UX:

Home (/home or /):

Landing page (welcome message, trending items, or user feed).

Search (/search):

Renders <CB_Search /> with search input and filtering options.

Should support serverless API routes to combine local DB queries with external API fallbacks.

Library (/library):

Renders <CB_Library /> showing user-saved items.

Incorporates category filtering (e.g., by medium).

Platters (/platters):

Renders <CB_Platters /> for browsing and creating platters.

Includes a category selector (Mine, Saved, Popular, Random).

Profile (/profile):

Displays user profile details, recent activity, and possibly an edit interface.

Auth (/auth):

Dedicated login/sign-up page or a fallback for the Auth Modal.

Item Detail (Future - /detail/[id]):

Dynamic route for detailed item views, including media-specific data and related platters.

## Database & API Integration

### Local Database

Backend: Supabase/Postgres.

Schema Highlights:

items: Central table for shared media info.

Subtables: movies, shows, books, games, albums (each with medium-specific fields).

Join Tables: item_genres, user_library, platter_items.

Optional Social Tables: activities, follows, reviews, ratings.

### API Pipeline

Upsert Mechanism:

External API data (TMDB, Google Books, IGDB, MusicBrainz) is normalized and inserted/updated in the local DB.

Use serverless routes (e.g., app/api/search/route.ts) to mediate between client queries and the internal DB.

Caching Considerations:

Consider using Redis or Supabase caching for popular/trending items.

Support creative joins and flexible user-defined pairings across multiple media types.


## UI & Component Architecture

Layouts & Shared Components

Global Layout:

Wraps all routes with a shared header (and footer if needed).

Uses a layout file in the new App Router (e.g., app/layout.tsx).

Component Organization

Reusable Components:

Navigation: Header.tsx, HeaderButtons.tsx, HeaderUserInfo.tsx

Lists & Items: SearchItem.tsx, LibraryItem.tsx, PlatterContainer.tsx

Filtering & Category Containers: SearchFilteringButton.tsx, PlatterCategoryContainer.tsx, LibraryCategoryContainer.tsx

Popups: SearchContainerPopup.tsx (for additional item details or actions)

State Management & Context

Global State:

Use React Context or a state management library for user sessions, search filters, or theme settings.

Local Logic:

Each page/component handles its own data fetching, either through Next.js server components or via client-side hooks (SWR, React Query).

## Implementation TODOs & Prioritized Checklist
### A. Route & Navigation Setup

Create Route Files:

app/home/page.tsx → Render <CB_Homepage />.

app/search/page.tsx → Render <CB_Search />. (updated to use search/api?query)

app/library/page.tsx → Render <CB_Library />.

app/profile/page.tsx → Render user profile details.

app/auth/page.tsx → Render <AuthModal /> or a dedicated auth form.

app/platters/page.tsx → Render <CB_Platters />.

Hook Up Navigation:

Update navigation components (e.g., HeaderButtons.tsx) to use Next.js <Link> components.

Ensure each button correctly routes to /home, /search, /library, /platters, etc.

### B. API & Database Integration

Implement DB Queries:

Develop serverless API routes in app/api/ to fetch, upsert, and update data.

Create secure DB utility functions (e.g., in a shared server.ts) for internal operations.

Re-integrate external API calls:

Query external APIs when local results are insufficient.

Upsert external data into the internal DB for caching and consistency.

### C. Auth & Protected Routes

Enhance Authentication:

Integrate Supabase authentication in AuthModal.tsx and/or app/auth/page.tsx.

Implement session checks in server components or API routes to protect sensitive pages (e.g., Library, Platters, Profile).

### D. Detail & Dynamic Routing

Create Dynamic Detail Routes:

Set up a dynamic route (e.g., app/detail/[id]/page.tsx) for item details.

Render <CB_ItemDetail /> with data loaded from the internal DB (or external API as fallback).

### E. UI Enhancements & Component Refinement

Review & Refine Components:

Ensure consistent styling and responsive design.

Verify that shared components (header, footer, navigation) integrate seamlessly across all pages.

Build reusable filtering, list, and popup components to reduce redundancy.

## Summary & Next Steps

Architecture: We are moving to a multi-route structure with clear separation between features (search, library, platters, etc.) for better UX and SEO.

Data Flow: External API data is now funneled into an internal DB (via Supabase), with serverless routes handling the unification of local queries and external fallback.

UI & Navigation: A shared header/navigation system ensures consistency, while each route handles its specific logic and component rendering.

Immediate Priorities:

Set up and verify all routes.

Re-integrate external API calls into the DB pipeline.

Ensure secure and smooth data fetching with appropriate caching and upsert logic.