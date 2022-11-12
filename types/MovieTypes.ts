import type { Id } from "@lib/tmdb"

export const DEFAULT_MOVIE: Movie = {
  overview: ``,
  release_date: ``,
  id: ``,
  adult: false,
  backdrop_path: ``,
  genre_ids: [],
  vote_count: 0,
  original_language: ``,
  original_title: ``,
  poster_path: ``,
  title: ``,
  video: false,
  vote_average: 0,
  popularity: 0,
  media_type: ``,
  budget: 0,
  genres: [],
  homepage: ``,
  imdb_id: ``,
  production_companies: [],
  production_countries: [],
  belongs_to_collection: {
    backdrop_path: ``,
    id: 0,
    name: ``,
    poster_path: ``,
  },
  revenue: 0,
  runtime: 0,
  spoken_languages: [],
  status: ``,
  tagline: ``,
}

export interface BaseMovie {
  overview: string
  release_date: string
  id: Id
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  vote_count: number
  original_language: string
  original_title: string
  poster_path: string
  title: string
  video: boolean
  vote_average: number
  popularity: number
  media_type: string
}

interface ProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface Genres {
  id: number
  name: string
}

export interface Movie extends BaseMovie {
  budget: number
  genres: Genres[]
  homepage: string
  imdb_id: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  belongs_to_collection: {
    backdrop_path: string
    id: number
    name: string
    poster_path: string
  }
  revenue: number
  runtime: number
  spoken_languages: {
    iso_639_1: string
    name: string
    english_name: string
  }[]
  status: string
  tagline: string
}

export interface MovieTypes extends BaseMovie {
  media_type: string
}

// Reviews
export interface ReviewInfoTypes {
  author: string
  author_details: {
    name: string
    username: string
    avatar_path: string
    rating: number
  }
  content: string
  created_at: string
  id: string
  updated_at: string
  url: string
}

export interface MovieReviewTypes {
  reviewInfo: ReviewInfoTypes
  title: string
  image: string
}

export interface BasePersonType {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  credit_id: string
}

// Cast and Crew
export interface CastTypes extends BasePersonType {
  cast_id: number
  character: string
  order: number
}

export interface CrewTypes extends BasePersonType {
  department: string
  job: string
}

export interface CreditTypes {
  cast: CastTypes[]
  crew: CrewTypes[]
}

// Trailer
export interface TrailerTypes {
  id: string
  iso_639_1: string
  iso_3166_1: string
  key: string
  name: string
  site: string
  size: number
  type: string
  official: boolean
}
