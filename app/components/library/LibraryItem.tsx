"use client";

import React from "react";

interface Props {
  title: string;
  cover: string;
}

const LibraryItem: React.FC<Props> = ({ title, cover }) => {
  return (
    <div className="rounded-xl border-2 border-slate-900 bg-white p-2">
      {/* Cover image */}
      <img
        src={cover}
        alt={title}
        className="mb-2 h-40 w-full object-cover"
      />
      {/* Title */}
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
    </div>
  );
};

export default LibraryItem;