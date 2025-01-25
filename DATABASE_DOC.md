# Tastebuds Database Structure

Below is a high-level overview of each table in the **Tastebuds** schema, along with a description of how they interrelate. The overarching design concept is that **shared fields** (title, description, release_date, etc.) live in an **`items`** table, while **medium-specific** fields (for movies, shows, books, games, albums) live in **subtables**. Users can **save** items in their library, **create** platters of items, and **assign** genres to items via join tables.

---

## 1. `items`
Holds **core information** for any media type.

- **Key Columns**:  
  - `id` (PK)  
  - `type` (e.g., `'movie'`, `'show'`, `'book'`, `'game'`, `'album'`)  
  - `title`, `description`, `release_date`, `cover_url`  
  - `created_at`, `updated_at`

- **Relationships**:  
  - **One-to-One** with medium-specific tables: `movies`, `shows`, `books`, `games`, `albums` (via `item_id`).  
  - **Many-to-Many** with `genres` through `item_genres`.  
  - **Many-to-Many** with `users` through `user_library`.  
  - **Many-to-Many** with `platters` through `platter_items`.

---

## 2. `movies`
Extends `items` with **movie-specific** fields (e.g., `director`, `budget`, `revenue`, etc.).

- **Key Columns**:  
  - `item_id` (PK & FK → `items.id`)  
  - `tmdb_id`, `imdb_id`, `runtime`, `budget`, `revenue`, `status`, `tagline`, `popularity`, `vote_average`, etc.  
  - JSON fields for arrays (e.g., `spoken_languages`, `production_companies`)

- **Relationships**:  
  - **One-to-One** with `items` (linked by `item_id`).

---

## 3. `shows`
Extends `items` with **TV show–specific** fields.

- **Key Columns**:  
  - `item_id` (PK & FK → `items.id`)  
  - `tmdb_id`, `first_air_date`, `last_air_date`, `number_of_episodes`, `number_of_seasons`, `popularity`, etc.  
  - JSON fields for arrays (e.g., `spoken_languages`, `production_companies`)

- **Relationships**:  
  - **One-to-One** with `items`.

---

## 4. `books`
Extends `items` with **book-specific** fields (integrated with Google Books or similar).

- **Key Columns**:  
  - `item_id` (PK & FK → `items.id`)  
  - `google_volume_id`, `authors`, `publisher`, `page_count`, `categories`, `average_rating`, etc.  
  - JSON fields for arrays (`authors`, `categories`) or additional metadata

- **Relationships**:  
  - **One-to-One** with `items`.

---

## 5. `games`
Extends `items` with **game-specific** fields (IGDB or similar).

- **Key Columns**:  
  - `item_id` (PK & FK → `items.id`)  
  - `igdb_id`, `summary`, `storyline`, `rating`, `aggregated_rating`, `genres`, `themes`, `platforms`, etc.  
  - JSON fields for arrays (`game_modes`, `involved_companies`, etc.)

- **Relationships**:  
  - **One-to-One** with `items`.

---

## 6. `albums`
Extends `items` with **album-specific** fields (MusicBrainz, Last.fm, etc.).

- **Key Columns**:  
  - `item_id` (PK & FK → `items.id`)  
  - `musicbrainz_id` (or `external_id`), `artist`, `label`, `track_count`, JSONB fields for `track_list`, multiple artists, etc.  
  - Optionally store rating/popularity if the API provides it

- **Relationships**:  
  - **One-to-One** with `items`.

---

## 7. `genres`
Stores a **list of genres** (e.g., “Action,” “Romance,” “Rock,” “Sci-Fi”).

- **Key Columns**:  
  - `id` (PK)  
  - `name` (unique)

- **Relationships**:  
  - **Many-to-Many** with `items` via `item_genres`.

---

## 8. `item_genres`
**Join table** to associate **items** with **genres**.

- **Key Columns**:  
  - `item_id` (FK → `items.id`)  
  - `genre_id` (FK → `genres.id`)

- **Composite PK** on (`item_id`, `genre_id`).

---

## 9. `users`
Stores basic user data.

- **Key Columns**:  
  - `id` (PK)  
  - `username`, `email`, `password_hash` (or external auth tokens)  
  - `created_at`

- **Relationships**:  
  - **Many-to-Many** with `items` via `user_library`.  
  - **One-to-Many** with `platters` (a user can create multiple platters).

---

## 10. `user_library`
**Join table** to track items in each user’s library (saved or “owned”).

- **Key Columns**:  
  - `user_id` (FK → `users.id`)  
  - `item_id` (FK → `items.id`)  
  - `added_at` (timestamp)

- **Composite PK** on (`user_id`, `item_id`).

---

## 11. `platters`
Allows users to create or “curate” **collections** of items, sometimes grouped by “courses.”

- **Key Columns**:  
  - `id` (PK)  
  - `user_id` (FK → `users.id`)  
  - `name`, `description`  
  - `created_at`

- **Relationships**:  
  - **Many-to-One** with `users` (a user can have multiple platters).  
  - **Many-to-Many** with `items` through `platter_items`.

---

## 12. `platter_items`
**Join table** that references items in each platter, optionally including a “course name.”

- **Key Columns**:  
  - `platter_id` (FK → `platters.id`)  
  - `item_id` (FK → `items.id`)  
  - `course_name` (optional text label)  
  - `display_order` (optional ordering within a course)

- **Composite PK** on (`platter_id`, `item_id`, `course_name`).

---

## Relationships in Brief

- **One-to-One**: `items` ↔ (`movies`, `shows`, `books`, `games`, `albums`)  
- **One-to-Many**: `users` can have many `platters`.  
- **Many-to-Many**:  
  - `items` ↔ `genres` (via `item_genres`),  
  - `items` ↔ `users` (via `user_library`),  
  - `items` ↔ `platters` (via `platter_items`).

This structure ensures **shared fields** are unified in `items`, while **medium-specific attributes** live in their own tables. Relationships (genres, libraries, platters) are handled by **join tables** to keep data normalized and flexible for future expansions.
