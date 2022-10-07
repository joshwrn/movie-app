export interface BaseMovie {
  overview: string
  release_date: string
  id: number
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

export interface OneMovie extends BaseMovie {
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
  profile_path: null | string
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
