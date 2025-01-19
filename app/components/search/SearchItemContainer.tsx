"use client";

import React from "react";
import SearchItem from "./SearchItem";

interface Props {
  title: string;
  items: string[];
  onItemClick: (item: string) => void;
}

const SearchItemContainer: React.FC<Props> = ({ title, items, onItemClick }) => {
  return (
    <div className="rounded-xl border-2 border-slate-900 bg-white p-4">
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item}>
            <SearchItem itemLabel={item} onClick={() => onItemClick(item)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchItemContainer;