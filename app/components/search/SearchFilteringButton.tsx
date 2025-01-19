"use client";

import React, { useState } from "react";

interface Props {
  label: string;
}

const SearchFilteringButton: React.FC<Props> = ({ label }) => {
  const [selected, setSelected] = useState(false);

  return (
    <button
      onClick={() => setSelected(!selected)}
      className={`
        rounded-md border border-slate-400 px-2 py-1 text-sm 
        hover:bg-slate-100
        ${selected ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-white"}
      `}
    >
      {label}
    </button>
  );
};

export default SearchFilteringButton;