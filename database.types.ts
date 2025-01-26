export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activities: {
        Row: {
          action_type: string
          created_at: string | null
          id: number
          item_id: number | null
          platter_id: number | null
          user_id: string
        }
        Insert: {
          action_type: string
          created_at?: string | null
          id?: never
          item_id?: number | null
          platter_id?: number | null
          user_id: string
        }
        Update: {
          action_type?: string
          created_at?: string | null
          id?: never
          item_id?: number | null
          platter_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_platter_id_fkey"
            columns: ["platter_id"]
            isOneToOne: false
            referencedRelation: "platters"
            referencedColumns: ["id"]
          },
        ]
      }
      albums: {
        Row: {
          annotation: string | null
          artist_credit: Json | null
          asin: string | null
          barcode: string | null
          country: string | null
          cover_art_archive: Json | null
          created_at: string | null
          disambiguation: string | null
          item_id: number
          musicbrainz_id: string | null
          packaging: string | null
          primary_type: string | null
          rating: number | null
          rating_count: number | null
          release_events: Json | null
          release_group_id: string | null
          secondary_types: Json | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          annotation?: string | null
          artist_credit?: Json | null
          asin?: string | null
          barcode?: string | null
          country?: string | null
          cover_art_archive?: Json | null
          created_at?: string | null
          disambiguation?: string | null
          item_id: number
          musicbrainz_id?: string | null
          packaging?: string | null
          primary_type?: string | null
          rating?: number | null
          rating_count?: number | null
          release_events?: Json | null
          release_group_id?: string | null
          secondary_types?: Json | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          annotation?: string | null
          artist_credit?: Json | null
          asin?: string | null
          barcode?: string | null
          country?: string | null
          cover_art_archive?: Json | null
          created_at?: string | null
          disambiguation?: string | null
          item_id?: number
          musicbrainz_id?: string | null
          packaging?: string | null
          primary_type?: string | null
          rating?: number | null
          rating_count?: number | null
          release_events?: Json | null
          release_group_id?: string | null
          secondary_types?: Json | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "albums_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: true
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      books: {
        Row: {
          authors: Json | null
          average_rating: number | null
          canonical_volume_link: string | null
          categories: Json | null
          created_at: string | null
          google_volume_id: string | null
          image_links: Json | null
          industry_identifiers: Json | null
          info_link: string | null
          item_id: number
          language: string | null
          maturity_rating: string | null
          page_count: number | null
          preview_link: string | null
          published_date: string | null
          publisher: string | null
          ratings_count: number | null
          subtitle: string | null
          updated_at: string | null
        }
        Insert: {
          authors?: Json | null
          average_rating?: number | null
          canonical_volume_link?: string | null
          categories?: Json | null
          created_at?: string | null
          google_volume_id?: string | null
          image_links?: Json | null
          industry_identifiers?: Json | null
          info_link?: string | null
          item_id: number
          language?: string | null
          maturity_rating?: string | null
          page_count?: number | null
          preview_link?: string | null
          published_date?: string | null
          publisher?: string | null
          ratings_count?: number | null
          subtitle?: string | null
          updated_at?: string | null
        }
        Update: {
          authors?: Json | null
          average_rating?: number | null
          canonical_volume_link?: string | null
          categories?: Json | null
          created_at?: string | null
          google_volume_id?: string | null
          image_links?: Json | null
          industry_identifiers?: Json | null
          info_link?: string | null
          item_id?: number
          language?: string | null
          maturity_rating?: string | null
          page_count?: number | null
          preview_link?: string | null
          published_date?: string | null
          publisher?: string | null
          ratings_count?: number | null
          subtitle?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "books_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: true
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      follows: {
        Row: {
          created_at: string | null
          followed_id: string
          follower_id: string
        }
        Insert: {
          created_at?: string | null
          followed_id: string
          follower_id: string
        }
        Update: {
          created_at?: string | null
          followed_id?: string
          follower_id?: string
        }
        Relationships: []
      }
      games: {
        Row: {
          aggregated_rating: number | null
          aggregated_rating_count: number | null
          cover: Json | null
          created_at: string | null
          first_release_date: string | null
          game_modes: Json | null
          genres: Json | null
          igdb_id: number | null
          involved_companies: Json | null
          item_id: number
          platforms: Json | null
          player_perspectives: Json | null
          rating: number | null
          rating_count: number | null
          screenshots: Json | null
          storyline: string | null
          summary: string | null
          themes: Json | null
          total_rating: number | null
          total_rating_count: number | null
          updated_at: string | null
          videos: Json | null
          websites: Json | null
        }
        Insert: {
          aggregated_rating?: number | null
          aggregated_rating_count?: number | null
          cover?: Json | null
          created_at?: string | null
          first_release_date?: string | null
          game_modes?: Json | null
          genres?: Json | null
          igdb_id?: number | null
          involved_companies?: Json | null
          item_id: number
          platforms?: Json | null
          player_perspectives?: Json | null
          rating?: number | null
          rating_count?: number | null
          screenshots?: Json | null
          storyline?: string | null
          summary?: string | null
          themes?: Json | null
          total_rating?: number | null
          total_rating_count?: number | null
          updated_at?: string | null
          videos?: Json | null
          websites?: Json | null
        }
        Update: {
          aggregated_rating?: number | null
          aggregated_rating_count?: number | null
          cover?: Json | null
          created_at?: string | null
          first_release_date?: string | null
          game_modes?: Json | null
          genres?: Json | null
          igdb_id?: number | null
          involved_companies?: Json | null
          item_id?: number
          platforms?: Json | null
          player_perspectives?: Json | null
          rating?: number | null
          rating_count?: number | null
          screenshots?: Json | null
          storyline?: string | null
          summary?: string | null
          themes?: Json | null
          total_rating?: number | null
          total_rating_count?: number | null
          updated_at?: string | null
          videos?: Json | null
          websites?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "games_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: true
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      genres: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      item_genres: {
        Row: {
          genre_id: number
          item_id: number
        }
        Insert: {
          genre_id: number
          item_id: number
        }
        Update: {
          genre_id?: number
          item_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "item_genres_genre_id_fkey"
            columns: ["genre_id"]
            isOneToOne: false
            referencedRelation: "genres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_genres_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      items: {
        Row: {
          cover_url: string | null
          created_at: string | null
          description: string | null
          id: number
          rating: number | null
          release_date: string | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          rating?: number | null
          release_date?: string | null
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          rating?: number | null
          release_date?: string | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      movies: {
        Row: {
          adult: boolean | null
          backdrop_path: string | null
          budget: number | null
          created_at: string | null
          homepage: string | null
          imdb_id: string | null
          item_id: number
          popularity: number | null
          production_companies: Json | null
          revenue: number | null
          runtime: number | null
          spoken_languages: Json | null
          status: string | null
          tagline: string | null
          tmdb_id: number | null
          updated_at: string | null
          vote_average: number | null
          vote_count: number | null
        }
        Insert: {
          adult?: boolean | null
          backdrop_path?: string | null
          budget?: number | null
          created_at?: string | null
          homepage?: string | null
          imdb_id?: string | null
          item_id: number
          popularity?: number | null
          production_companies?: Json | null
          revenue?: number | null
          runtime?: number | null
          spoken_languages?: Json | null
          status?: string | null
          tagline?: string | null
          tmdb_id?: number | null
          updated_at?: string | null
          vote_average?: number | null
          vote_count?: number | null
        }
        Update: {
          adult?: boolean | null
          backdrop_path?: string | null
          budget?: number | null
          created_at?: string | null
          homepage?: string | null
          imdb_id?: string | null
          item_id?: number
          popularity?: number | null
          production_companies?: Json | null
          revenue?: number | null
          runtime?: number | null
          spoken_languages?: Json | null
          status?: string | null
          tagline?: string | null
          tmdb_id?: number | null
          updated_at?: string | null
          vote_average?: number | null
          vote_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "movies_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: true
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      platter_items: {
        Row: {
          course_name: string
          display_order: number | null
          item_id: number
          platter_id: number
        }
        Insert: {
          course_name: string
          display_order?: number | null
          item_id: number
          platter_id: number
        }
        Update: {
          course_name?: string
          display_order?: number | null
          item_id?: number
          platter_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "platter_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "platter_items_platter_id_fkey"
            columns: ["platter_id"]
            isOneToOne: false
            referencedRelation: "platters"
            referencedColumns: ["id"]
          },
        ]
      }
      platters: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ratings: {
        Row: {
          created_at: string | null
          item_id: number
          rating: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          item_id: number
          rating: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          item_id?: number
          rating?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ratings_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          content: string
          created_at: string | null
          id: number
          item_id: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: never
          item_id: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: never
          item_id?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      shows: {
        Row: {
          backdrop_path: string | null
          created_at: string | null
          first_air_date: string | null
          homepage: string | null
          in_production: boolean | null
          item_id: number
          last_air_date: string | null
          number_of_episodes: number | null
          number_of_seasons: number | null
          original_name: string | null
          popularity: number | null
          production_companies: Json | null
          spoken_languages: Json | null
          status: string | null
          tagline: string | null
          tmdb_id: number | null
          updated_at: string | null
          vote_average: number | null
          vote_count: number | null
        }
        Insert: {
          backdrop_path?: string | null
          created_at?: string | null
          first_air_date?: string | null
          homepage?: string | null
          in_production?: boolean | null
          item_id: number
          last_air_date?: string | null
          number_of_episodes?: number | null
          number_of_seasons?: number | null
          original_name?: string | null
          popularity?: number | null
          production_companies?: Json | null
          spoken_languages?: Json | null
          status?: string | null
          tagline?: string | null
          tmdb_id?: number | null
          updated_at?: string | null
          vote_average?: number | null
          vote_count?: number | null
        }
        Update: {
          backdrop_path?: string | null
          created_at?: string | null
          first_air_date?: string | null
          homepage?: string | null
          in_production?: boolean | null
          item_id?: number
          last_air_date?: string | null
          number_of_episodes?: number | null
          number_of_seasons?: number | null
          original_name?: string | null
          popularity?: number | null
          production_companies?: Json | null
          spoken_languages?: Json | null
          status?: string | null
          tagline?: string | null
          tmdb_id?: number | null
          updated_at?: string | null
          vote_average?: number | null
          vote_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "shows_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: true
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      user_library: {
        Row: {
          added_at: string | null
          item_id: number
          user_id: string
        }
        Insert: {
          added_at?: string | null
          item_id: number
          user_id: string
        }
        Update: {
          added_at?: string | null
          item_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_library_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
