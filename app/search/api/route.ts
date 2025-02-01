// app/api/search/route.ts
"use server";
import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';

/**
 * GET /api/search?query=<search-term>&type=<optional-type>
 *
 * 1. Uses Supabase’s server client (with cookies) to query the local DB.
 * 2. If the local results are below a threshold, falls back to external APIs.
 * 3. Upserts any new external items into the local DB.
 * 4. Returns the combined results.
 */
export async function GET(request: Request) {
  // Create the Supabase server client using cookies from the request.
  const supabase = await createClient();

  // Parse query parameters from the URL.
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const typeFilter = searchParams.get('type') || undefined;

  if (!query) {
    return NextResponse.json(
      { error: 'Missing search query parameter' },
      { status: 400 }
    );
  }

  // 1. Build the query for the local DB (cached results) from the 'items' table.
  let queryBuilder = supabase.from('items').select().ilike('title', `%${query}%`);
  if (typeFilter) {
    queryBuilder = queryBuilder.eq('type', typeFilter);
  }
  const { data: localData, error: localError } = await queryBuilder;

  if (localError) {
    console.error('Supabase query error:', localError);
  }
  const results = localData || [];

  // 2. If local results are fewer than our threshold, fetch from external APIs.
  const threshold = 5;
  let externalResults: any[] = [];
  if (results.length < threshold) {
    externalResults = await fetchFromExternalAPIs(query, { type: typeFilter });

    // 3. For each external result, upsert into the local DB if not already present.
    for (const extItem of externalResults) {
      // Check for an existing record using a unique external identifier.
      const { data: existingData } = await supabase
        .from('items')
        .select('id')
        .eq('external_id', extItem.externalId)
        .maybeSingle();

      if (!existingData) {
        // Map external item fields to your local DB schema.
        const { error: insertError } = await supabase
          .from('items')
          .insert([
            {
              title: extItem.title,
              type: extItem.type,
              description: extItem.description,
              // Convert the external release date if present.
              release_date: extItem.releaseDate
                ? new Date(extItem.releaseDate).toISOString()
                : null,
              cover_url: extItem.coverUrl || null,
              external_id: extItem.externalId,
              // Add any additional fields as needed.
            },
          ]);

        if (insertError) {
          console.error('Error upserting external item:', insertError);
        }
      }
    }
  }

  // 4. Combine local and external results.
  // (Optionally, you could deduplicate items if needed.)
  const combinedResults = [...results, ...externalResults];

  return NextResponse.json({ results: combinedResults });
}

/**
 * Stub for fetching data from external APIs.
 * Replace this stub with your actual API calls (e.g., TMDB, IGDB, etc.)
 * and standardize the output to match your local schema.
 */
async function fetchFromExternalAPIs(
  query: string,
  filters: { type?: string }
): Promise<any[]> {
  // Example: Call multiple APIs in parallel and combine the results.
  // const [tmdbData, igdbData] = await Promise.all([
  //   fetchTmdbData(query, filters),
  //   fetchIgdbData(query, filters),
  // ]);
  // return [...tmdbData, ...igdbData];

  // For demonstration purposes, return a dummy external item.
  return [
    {
      externalId: 'ext-1', // Ensure this key matches what you check in the DB.
      title: 'External Title 1',
      type: filters.type || 'movie',
      description: 'Fetched from external API.',
      releaseDate: '2021-01-01',
      coverUrl: 'https://example.com/cover.jpg',
    },
    // You can add more dummy items as needed.
  ];
}
