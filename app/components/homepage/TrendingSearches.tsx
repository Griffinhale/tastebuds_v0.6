"use client";
import React from "react";

const TrendingSearches = () => {
  const trending = ["Coffee and Cake", "Cheese and Wine", "Tacos and Salsa", "PB & Jelly"];

  return (
    <div className="rounded-xl border-2 border-slate-900 bg-white p-4">
      <h2 className="mb-2 text-lg font-semibold">Trending Searches</h2>
      <ul className="space-y-1">
        {trending.map((item, idx) => (
          <li
            key={idx}
            className="rounded-md bg-slate-100 p-2 hover:bg-slate-200"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingSearches;