// app/search/page.tsx (Server Component)
import React from "react";

export default async function SearchPage() {
  // Hardcode the search term (in a real app, you might read this from URL query params)
  const searchTerm = "avengers";
  
  // Fetch the search results from the API route.
  // The relative URL works for server components.
  const response = await fetch(`/api/search?query=${encodeURIComponent(searchTerm)}`, {
    // Disable any caching to always get the fresh dummy response.
    cache: "no-store",
  });
  const { results } = await response.json();

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] gap-16 p-8 sm:p-20">
      <h1 className="mb-4 text-xl font-bold">Search Results for {searchTerm}</h1>
      
      {/* Display the combined results */}
      <ul>
        {results.map((item: any) => (
          <li key={item.externalId || item.id}>
            <h2>{item.title}</h2>
            <p>Type: {item.type}</p>
            <p>{item.description}</p>
            {item.coverUrl && (
              <img
                src={item.coverUrl}
                alt={item.title}
                style={{ maxWidth: "200px" }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
