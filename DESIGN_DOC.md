# Tastebuds – DESIGN_DOC

## Project Overview & Scope

“Tastebuds” is a single-page React-based application (using Next.js) that helps users **discover**, **curate**, and **pair** different items (movies, albums, books, games, TV, and user-created “platters”). The end goal is to allow users to **search**, **filter**, **combine**, and **share** their favorite items or media in creative ways.

---

## Core Features & Pages

1. **Header & Navigation**  
   - A shared header component with buttons for **Search**, **Platters**, **Library**, etc.  
   - Highlights the currently selected page/section and provides quick navigation.

2. **Search (CB_Search)**  
   - **Search bar** for entering terms.  
   - **Filter container** to toggle different mediums (music, movies, etc.) and additional filters (genre, mood).  
   - **Search results** arranged in multiple columns, each possibly representing a different filter combination.  
   - Clicking a search result opens a **detail popup** for more information or actions.

3. **Platters (CB_Platters)**  
   - Users can **create** or **browse** platters (collections of items).  
   - **Category container** (Mine, Saved, Popular, Random) to switch between different platter sets.  
   - Each platter may contain multiple “courses” (sections), each with a dynamic number of items.

4. **Library (CB_Library)**  
   - A personal or global library of items (movies, albums, games, books, TV, platters, etc.).  
   - **Category container** to filter by media type or show “All.”  
   - A grid of “library items,” each showing a cover and title.

5. **Item Detail (CB_ItemDetail)**  
   - Shows **cover image**, **title**, **subtitle**, **creator**, and various **detail modules** (genres, track lists, descriptions, etc.).  
   - Displays **related platters** that include the item, with options to filter these platters by Mine, Saved, Popular, or Random.

6. **User Profile / User Info**  
   - A top-right component for user avatar, name, and sign-out (not fully fleshed out yet).

---

## UI & Component Architecture

- **Context & State**  
  - A shared context (`SelectedPageContext`) to manage which page/section is active.  
  - Each page manages its own local states (filters, search terms, selected items) or eventually pulls from a global store/DB.

- **Reusable sub-components**  
  - **Buttons** (`HeaderButtonSingle`, `HeaderButtonDouble`).  
  - **Filter Buttons** (`SearchFilteringButton`).  
  - **Containers** for categories (`PlatterCategoryContainer`, `LibraryCategoryContainer`).  
  - **List Items** (`SearchItem`, `LibraryItem`, `PlatterContainer`).  
  - **Popups** (`SearchContainerPopup`) for quick item details or actions.

---

## Future Database & API Considerations

- **Relational Model**  
  - **Items** table for movies, music albums, books, etc. (storing title, creator, cover URL, medium).  
  - **Platters** table linking to multiple items (possibly via a join table to handle “courses” and items).  
  - **Users** and a **User Library** relationship for saved items.  
  - Potential attributes like **genre**, **mood**, **popularity metrics** for flexible queries.

- **Caching & Distribution**  
  - Frequently accessed data (e.g., popular items, trending searches) may be cached in Redis or similar.  
  - “Creative joins” enabling cross-medium searches by user-defined categories (genre, mood, pairings).

- **External APIs**  
  - Integrations with external services (e.g., TMDB, Spotify) to populate item data.  
  - Normalizing external data to a local schema for efficient lookups and relational querying.

---

## Summary

The **core UI layout** is established for a platform where users can navigate, filter, and explore items. Next steps involve designing a **robust backend** with a **relational database** (or a hybrid approach), setting up **API integrations**, and **caching** strategies. This will enable a smooth experience in discovering, curating, and sharing cross-medium “pairings” via Tastebuds.
