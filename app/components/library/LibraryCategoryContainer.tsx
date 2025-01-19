"use client";

import React from "react";

interface Props {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const LibraryCategoryContainer: React.FC<Props> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="rounded-xl border-2 border-slate-900 bg-white p-4">
      <h2 className="mb-3 text-lg font-semibold">Categories</h2>
      <div className="flex flex-col gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategorySelect(cat)}
            className={`
              rounded-md border border-slate-400 px-2 py-1 text-left 
              hover:bg-slate-200 
              ${
                cat === selectedCategory 
                  ? "bg-blue-500 text-white hover:bg-blue-600" 
                  : "bg-white"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LibraryCategoryContainer;