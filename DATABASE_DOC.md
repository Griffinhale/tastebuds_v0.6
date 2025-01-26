# Tastebuds Database Structure

Below is a high-level overview of each table in the **Tastebuds** schema, along with a description of how they interrelate. The overarching design concept is that **shared fields** (title, description, release_date, etc.) live in an **`items`** table, while **medium-specific** fields (for movies, shows, books, games, albums) live in **sub-tables**. Users can **save** items in their library, **create** platters of items, and **assign** genres to items via join tables. 

In addition, we include **optional social features** such as `follows`, `activities`, `reviews`, and `ratings`. These can be added now or in a future iteration.

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
  - **One-to-Many** with `reviews` (if each review links to a single item).

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
Extends `items` with **book-specific** fields (e.g., from Google Books).

- **Key Columns**:  
  - `item_id` (PK & FK → `items.id`)  
  - `google_volume_id`, `authors`, `publisher`, `page_count`, `categories`, `average_rating`, etc.  
  - JSON fields (e.g., `authors`, `categories`)

- **Relationships**:  
  - **One-to-One** with `items`.

---

## 5. `games`
Extends `items` with **game-specific** fields (e.g., from IGDB).

- **Key Columns**:  
  - `item_id` (PK & FK → `items.id`)  
  - `igdb_id`, `summary`, `storyline`, `rating`, `aggregated_rating`, `genres`, `themes`, `platforms`, etc.  
  - JSON fields for arrays (`game_modes`, `involved_companies`)

- **Relationships**:  
  - **One-to-One** with `items`.

---

## 6. `albums`
Extends `items` with **album-specific** fields (e.g., from MusicBrainz).

- **Key Columns**:  
  - `item_id` (PK & FK → `items.id`)  
  - `musicbrainz_id`, `artist`, `label`, `track_count`  
  - JSON fields for track list, multiple artists, etc.

- **Relationships**:  
  - **One-to-One** with `items`.

---

## 7. `genres`
Stores a **list of genres** (e.g., “Action,” “Rock,” “Sci-Fi,” etc.).

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
  - **One-to-Many** with `platters` (a user can have multiple platters).  
  - **One-to-Many** with `reviews` if you want to link user → review.  
  - **One-to-Many** with `activities` for user actions.  
  - **Many-to-Many** with `follows` (user follows another user).

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
  - **Many-to-One** with `users`  
  - **Many-to-Many** with `items` via `platter_items`.

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

## 13. `activities` (Optional Social Feature)
Logs user actions (e.g., “user X added item Y to platter Z”).

- **Key Columns**:  
  - `id` (PK)  
  - `user_id` (FK → `users.id`)  
  - `item_id` (FK → `items.id`, nullable if the action doesn’t involve a specific item)  
  - `action_type` (e.g., “searched,” “viewed,” “liked,” “added_to_platter”)  
  - `created_at` (timestamp)

- **Relationships**:  
  - **Many-to-One** with `users`  
  - **Optional Many-to-One** with `items` if the action involves an item.

---

## 14. `follows` (Optional Social Feature)
Tracks which users follow which other users.

- **Key Columns**:  
  - `follower_id` (FK → `users.id`)  
  - `followed_id` (FK → `users.id`)  
  - `created_at` (timestamp)

- **Composite PK** on (`follower_id`, `followed_id`).  
- **Relationships**:  
  - **Many-to-Many** style within `users` (user can follow multiple users, can be followed by multiple users).

---

## 15. `reviews` (Optional Social Feature)
Users can write textual **reviews** of items.

- **Key Columns**:  
  - `id` (PK)  
  - `user_id` (FK → `users.id`)  
  - `item_id` (FK → `items.id`)  
  - `content` (TEXT)  
  - `created_at`, `updated_at`

- **Relationships**:  
  - **Many-to-One** from `reviews` to `users`  
  - **Many-to-One** from `reviews` to `items`.

---

## 16. `ratings` (Optional Social Feature)
Tracks users’ **numeric ratings** of items (e.g., 1–5 stars).

- **Key Columns**:  
  - `user_id` (FK → `users.id`)  
  - `item_id` (FK → `items.id`)  
  - `rating` (e.g., INT or NUMERIC, range 1–5 or 1–10)  
  - `created_at`, `updated_at`

- **Composite PK** on (`user_id`, `item_id`).  
- **Relationships**:  
  - **Many-to-Many** style between `users` and `items` with an additional rating value.

---

## Relationships in Brief

- **One-to-One**: `items` ↔ (`movies`, `shows`, `books`, `games`, `albums`).  
- **One-to-Many**: 
  - `users` → `platters`, `reviews`, `activities`.  
- **Many-to-Many**: 
  - `items` ↔ `genres` via `item_genres`;  
  - `items` ↔ `users` via `user_library`;  
  - `items` ↔ `platters` via `platter_items`;  
  - `users` ↔ `users` via `follows` (self-referential many-to-many);  
  - `users` ↔ `items` via `ratings` (storing a numeric score).

This final design accommodates **search/browse** across multiple media types, user **curation** of items into platters, and additional **social** elements (activities, follows, reviews, ratings) for richer user interaction.
