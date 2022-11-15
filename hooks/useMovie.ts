import type { Movie } from "@customTypes/MovieTypes"
import type { UrlArgs } from "@lib/tmdb"
import { getMovie } from "@lib/tmdb"
import { useQuery } from "react-query"

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

export const useMovie = (props: UrlArgs): { movie: Movie } => {
  const { data: movie } = useQuery(
    `movie-${props.id}`,
    async () => {
      const data = await getMovie(props)
      return data
    },
    {
      initialData: DEFAULT_MOVIE,
    }
  )

  return { movie }
}
