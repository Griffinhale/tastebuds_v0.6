/* eslint-disable @typescript-eslint/no-explicit-any */
 
// app/search/page.tsx (Server Component)
import React from "react";
const getApiUrl = (query: string) => {
  // Use environment variable for base URL
  // In .env.local: NEXT_PUBLIC_APP_URL=http://localhost:3000
  // In Vercel: This will automatically be set to your deployment URL
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  return `${baseUrl}/search/api?query=${query}`
}

export default async function SearchPage() {
  // Hardcode the search term (in a real app, you might read this from URL query params)
  const searchTerm = "avengers";
  
  
  const data = await fetch(getApiUrl(encodeURIComponent(searchTerm)));
  console.log(data);
  const { results } = await data.json();
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
              // eslint-disable-next-line @next/next/no-img-element
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
