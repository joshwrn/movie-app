import type { CastTypes } from "@customTypes/MovieTypes"
import type { AsyncStateHook } from "@hooks/useAsyncState"
import { useAsyncState } from "@hooks/useAsyncState"
import { getCast } from "@lib/tmdb"

export const useCast: AsyncStateHook<CastTypes[]> = (props) => {
  const { state: cast } = useAsyncState({
    get: getCast,
    initial: [],
    ...props,
  })
  return { cast }
}
