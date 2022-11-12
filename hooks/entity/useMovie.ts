import type { Movie } from "@customTypes/MovieTypes"
import { DEFAULT_MOVIE } from "@customTypes/MovieTypes"
import type { AsyncStateHook } from "@hooks/useAsyncState"
import { useAsyncState } from "@hooks/useAsyncState"
import { getMovie } from "@lib/tmdb"

export const useMovie: AsyncStateHook<Movie> = (props) => {
  const { state: movie } = useAsyncState({
    get: getMovie,
    initial: DEFAULT_MOVIE,
    ...props,
  })
  return { movie }
}
