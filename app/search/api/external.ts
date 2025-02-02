// app/search/api/external.ts

export interface ExternalItem {
    externalId: string;
    title: string;
    type: string;
    description: string;
    releaseDate?: string;
    coverUrl?: string | null;
  }
  
  /**
   * fetchFromExternalAPIs
   * Aggregates results from multiple external APIs.
   * Calls individual functions for TMDB, IGDB, Google Books, and MusicBrainz.
   */
  export async function fetchFromExternalAPIs(
    query: string,
    filters: { type?: string }
  ): Promise<ExternalItem[]> {
    let results: ExternalItem[] = [];
  
    // Build an array of promises based on the type filter.
    const promises: Promise<ExternalItem[]>[] = [];
  
    // For movies or TV shows: call TMDB.
    if (!filters.type || filters.type === "movie" || filters.type === "tv") {
      promises.push(fetchTmdbData(query, filters));
    }
  
    // For games: call IGDB.
    if (!filters.type || filters.type === "game") {
      promises.push(fetchIgdbData(query, filters));
    }
  
    // For books: call Google Books.
    if (!filters.type || filters.type === "book") {
      promises.push(fetchGoogleBooksData(query, filters));
    }
  
    // For albums: call MusicBrainz.
    if (!filters.type || filters.type === "album") {
      promises.push(fetchMusicBrainzData(query, filters));
    }
  
    // Wait for all external API calls to complete and merge the results.
    const resultsArrays = await Promise.all(promises);
    resultsArrays.forEach((arr) => {
      results = results.concat(arr);
    });
  
    return results;
  }
  
  /**
   * fetchTmdbData
   * Example implementation for querying TMDB (The Movie Database).
   */
  export async function fetchTmdbData(
    query: string,
    filters: { type?: string }
  ): Promise<ExternalItem[]> {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
      console.error("TMDB API key is missing");
      return [];
    }
  
    // Select endpoint based on type: default to "movie" unless type is "tv".
    const searchType = filters.type === "tv" ? "tv" : "movie";
    const url = `https://api.themoviedb.org/3/search/${searchType}?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error("TMDB API error:", response.statusText);
        return [];
      }
      const data = await response.json();
      if (!data || !data.results) {
        return [];
      }
      // Map TMDB results to the ExternalItem format.
      return data.results.map((item: any) => ({
        externalId: `tmdb-${item.id}`,
        title: item.title || item.name,
        type: filters.type || (searchType === "tv" ? "tv" : "movie"),
        description: item.overview,
        releaseDate: item.release_date || item.first_air_date,
        coverUrl: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
      }));
    } catch (err) {
      console.error("TMDB fetch error:", err);
      return [];
    }
  }
  
  /**
   * fetchIgdbData
   * Stub for querying IGDB for game data.
   */
  export async function fetchIgdbData(
    query: string,
    filters: { type?: string }
  ): Promise<ExternalItem[]> {
    // TODO: Implement IGDB API call.
    // For now, return a dummy result.
    return [
      {
        externalId: "igdb-1",
        title: "Dummy Game Title",
        type: "game",
        description: "Dummy description from IGDB",
        releaseDate: "2020-01-01",
        coverUrl: null,
      },
    ];
  }
  
  /**
   * fetchGoogleBooksData
   * Stub for querying Google Books for book data.
   */
  export async function fetchGoogleBooksData(
    query: string,
    filters: { type?: string }
  ): Promise<ExternalItem[]> {
    // TODO: Implement Google Books API call.
    // For now, return a dummy result.
    return [
      {
        externalId: "googlebooks-1",
        title: "Dummy Book Title",
        type: "book",
        description: "Dummy description from Google Books",
        releaseDate: "2019-01-01",
        coverUrl: null,
      },
    ];
  }
  
  /**
   * fetchMusicBrainzData
   * Stub for querying MusicBrainz for album data.
   */
  export async function fetchMusicBrainzData(
    query: string,
    filters: { type?: string }
  ): Promise<ExternalItem[]> {
    // TODO: Implement MusicBrainz API call.
    // For now, return a dummy result.
    return [
      {
        externalId: "musicbrainz-1",
        title: "Dummy Album Title",
        type: "album",
        description: "Dummy description from MusicBrainz",
        releaseDate: "2018-01-01",
        coverUrl: null,
      },
    ];
  }