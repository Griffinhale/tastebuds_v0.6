"use client";
import React from "react";

const Following = () => {
  const updates = [
    "Alice posted a new pairing",
    "Bob shared a new platter",
    "Carol is now following you",
    "Dave liked your recipe"
  ];

  return (
    <div className="rounded-xl border-2 border-slate-900 bg-white p-4">
      <h2 className="mb-2 text-lg font-semibold">Following Updates</h2>
      <ul className="space-y-1">
        {updates.map((update, idx) => (
          <li
            key={idx}
            className="rounded-md bg-slate-100 p-2 hover:bg-slate-200"
          >
            {update}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Following;