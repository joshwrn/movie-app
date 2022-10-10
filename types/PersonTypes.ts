import type { BaseMovie } from "./MovieTypes"

export interface PersonSocials {
  facebook_id?: string | null
  freebase_id?: string | null
  freebase_mid?: string | null
  id: number
  imdb_id?: string | null
  instagram_id?: string | null
  tvrage_id?: number | null
  twitter_id?: string | null
}

export interface PersonDetails {
  adult?: boolean
  also_known_as?: string[]
  biography?: string
  birthday?: string | null
  deathday?: string | null
  gender?: number
  homepage?: string | null
  id?: number
  imdb_id?: string
  known_for_department?: string
  name?: string
  place_of_birth?: string | null
  popularity?: number
  profile_path?: string | null
}

export interface PersonCastCredit extends BaseMovie {
  character?: string
  order?: number
  credit_id?: string
}

export interface PersonCrewCredit extends BaseMovie {
  department?: string
  job?: string
  credit_id?: string
}

export interface PersonCredits {
  cast: PersonCastCredit[]
  crew: PersonCrewCredit[]
}
