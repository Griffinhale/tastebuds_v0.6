"use client";

import React, { useState } from "react";
import SearchFilteringButton from "./SearchFilteringButton";

const SearchFilterContainer = () => {
  // Whether the extra filters are expanded
  const [expanded, setExpanded] = useState(false);

  // Example top-level filtering mediums
  const mediums = ["Music", "Movies", "Food", "Books"];

  // Additional filters revealed on expand
  const genres = ["Action", "Romance", "Horror", "Comedy", "Rock", "Pop"];
  const moods = ["Happy", "Sad", "Chill", "Romantic"];

  return (
    <div className="rounded border-2 border-slate-400 bg-white p-2">
      {/* Top Row: Medium filters + Expand Button */}
      <div className="flex flex-wrap items-center gap-2">
        {mediums.map((medium) => (
          <SearchFilteringButton key={medium} label={medium} />
        ))}

        <button
          onClick={() => setExpanded(!expanded)}
          className="rounded border border-slate-400 px-2 py-1 text-sm hover:bg-slate-100"
        >
          {expanded ? "Collapse Filters" : "More Filters"}
        </button>
      </div>

      {/* Expanded Section: Genre, Mood, etc. */}
      {expanded && (
        <div className="mt-2 flex flex-wrap gap-2 border-t border-slate-300 pt-2">
          {/* Genre Filters */}
          {genres.map((genre) => (
            <SearchFilteringButton key={genre} label={genre} />
          ))}
          {/* Mood Filters */}
          {moods.map((mood) => (
            <SearchFilteringButton key={mood} label={mood} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilterContainer;