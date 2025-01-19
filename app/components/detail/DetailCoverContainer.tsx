"use client";

import React from "react";

interface Props {
  coverUrl: string;
}

const DetailCoverContainer: React.FC<Props> = ({ coverUrl }) => {
  return (
    <div className="rounded-xl border-2 border-slate-900 bg-white p-2">
      <img
        src={coverUrl}
        alt="Detail Cover"
        className="mx-auto h-64 w-auto object-cover"
      />
    </div>
  );
};

export default DetailCoverContainer;