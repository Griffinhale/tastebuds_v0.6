"use client";

import React from "react";

interface Props {
  itemLabel: string;
  onClick: () => void;
}

const SearchItem: React.FC<Props> = ({ itemLabel, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="block w-full rounded-md bg-slate-100 p-2 text-left hover:bg-slate-200"
    >
      {itemLabel}
    </button>
  );
};

export default SearchItem;