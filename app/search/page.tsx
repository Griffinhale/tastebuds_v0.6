// app/search/page.tsx (Server Component)

import { Suspense } from "react";
//import LocalSearchResults from "./LocalSearchResults";
//import ExternalSearchResults from "./ExternalSearchResults";

// This is the route’s entry point. Next.js can show loading.tsx
// while it fetches the code + SSR data.
export default async function SearchPage() {
  // We could read a query param from the URL:
  // e.g., const searchTerm = searchParams.get("q") || "";
  // For simplicity, let's hardcode or assume we have one
  const searchTerm = "avengers";
  const req = new Request(searchTerm)
  const d = await fetch(req);
  console.log(d);
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] gap-16 p-8 sm:p-20">
      <h1 className="mb-4 text-xl font-bold">Search Results for {searchTerm}</h1>

      {/* Suspense #1: local results stream in first */}
      <Suspense fallback={<p>Loading local results...</p>}>
        {/* 
          <LocalSearchResults /> is also a server component that 
          queries Supabase and returns a list of items 
        */}
      </Suspense>

      {/* Suspense #2: external results stream in after local finishes or in parallel */}
      <Suspense fallback={<p>Loading external results...</p>}>
      </Suspense>
    </div>
  );
}
