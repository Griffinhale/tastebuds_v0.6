"use client";

import React, { useState } from "react";
import DetailCoverContainer from "./DetailCoverContainer";
import DetailCreatorContainer from "./DetailCreatorContainer";
import DetailPlatterContainer from "./DetailPlatterContainer";

// Optional placeholders for the detail modules you will create later
// import DetailGenreContainer from "./DetailGenreContainer";
// import DetailTrackListContainer from "./DetailTrackListContainer";
// import DetailDescriptionContainer from "./DetailDescriptionContainer";
// etc...

const CB_ItemDetail = () => {
  // Example state: in a real app, this might come from a fetch or route param
  const [itemData] = useState({
    coverUrl: "/some/cover/image.jpg",
    title: "Example Item Title",
    subtitle: "Subtitle or tagline",
    creator: "Creator Name",
    // etc...
  });

  // Example detail modules. You could store them in state or load them dynamically.
  // For now, just placeholders for how you'd eventually render them.
  const detailModules = [
    { type: "genre", content: ["Rock", "Alternative"] },
    { type: "tracklist", content: ["Track 1", "Track 2"] },
    { type: "description", content: "This is a sample description." },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* UPPER SECTION: cover, title/creator, detail modules */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Cover on the left */}
        <div className="lg:col-span-3">
          <DetailCoverContainer coverUrl={itemData.coverUrl} />
        </div>

        {/* Title, Subtitle, Creator in the center */}
        <div className="lg:col-span-5">
          <DetailCreatorContainer
            title={itemData.title}
            subtitle={itemData.subtitle}
            creator={itemData.creator}
          />
        </div>

        {/* Right column: dynamic detail modules */}
        <div className="lg:col-span-4 space-y-4">
          {/* You could map over detailModules to dynamically load different containers */}
          {detailModules.map((module, idx) => (
            <div
              key={idx}
              className="rounded-md border border-slate-300 bg-white p-2"
            >
              <h3 className="mb-2 text-sm font-semibold uppercase">{module.type}</h3>
              <div className="text-sm">
                {Array.isArray(module.content) ? (
                  <ul className="list-disc ml-5">
                    {module.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{module.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LOWER SECTION: Platter container(s) for item */}
      <DetailPlatterContainer itemTitle={itemData.title} />
    </div>
  );
};

export default CB_ItemDetail;