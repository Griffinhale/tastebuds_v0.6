// app/search/api/route.ts
"use server";

import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";
import { fetchFromExternalAPIs, ExternalItem } from "./external";

/**
 * GET /search/api?query=<search-term>&type=<optional-type>
 *
 * 1. Query the local Supabase DB for matching items.
 * 2. If the number of local results is below a threshold, call external APIs.
 * 3. For each external result, upsert it into the local DB if it does not exist.
 * 4. Return the combined list of results.
 */
export async function GET(request: Request) {
  // Create the Supabase server client using cookies from the request.
  const supabase = await createClient();

  // Parse query parameters.
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const typeFilter = searchParams.get("type") || undefined;

  if (!query) {
    return NextResponse.json(
      { error: "Missing search query parameter" },
      { status: 400 }
    );
  }

  // Query the local 'items' table.
  let queryBuilder = supabase.from("items").select().ilike("title", `%${query}%`);
  if (typeFilter) {
    queryBuilder = queryBuilder.eq("type", typeFilter);
  }
  const { data: localData, error: localError } = await queryBuilder;
  if (localError) {
    console.error("Supabase query error:", localError);
  }
  const results = localData || [];

  // If local results are below the threshold, call external APIs.
  const threshold = 5;
  let externalResults: ExternalItem[] = [];
  if (results.length < threshold) {
    externalResults = await fetchFromExternalAPIs(query, { type: typeFilter });

    // Upsert each external result into the local DB if it doesn't already exist.
    for (const extItem of externalResults) {
      const { data: existingData } = await supabase
        .from("items")
        .select("id")
        .eq("external_id", extItem.externalId)
        .maybeSingle();

      if (!existingData) {
        const { error: insertError } = await supabase.from("items").insert([
          {
            title: extItem.title,
            type: extItem.type,
            description: extItem.description,
            release_date: extItem.releaseDate
              ? new Date(extItem.releaseDate).toISOString()
              : null,
            cover_url: extItem.coverUrl || null,
            external_id: extItem.externalId,
          },
        ]);
        if (insertError) {
          console.error("Error upserting external item:", insertError);
        }
      }
    }
  }

  // Combine local and external results.
  const combinedResults = [...results, ...externalResults];
  return NextResponse.json({ results: combinedResults });
}
