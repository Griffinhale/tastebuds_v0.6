"use client";

import React from "react";

interface Props {
  title: string;
  subtitle: string;
  creator: string;
}

const DetailCreatorContainer: React.FC<Props> = ({ title, subtitle, creator }) => {
  return (
    <div className="rounded-xl border-2 border-slate-900 bg-white p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <h3 className="text-sm italic text-slate-700">{subtitle}</h3>
      <p className="mt-2 text-sm text-slate-600">by {creator}</p>
    </div>
  );
};

export default DetailCreatorContainer;