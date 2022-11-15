import type { CastTypes } from "@customTypes/MovieTypes"
import type { UrlArgs } from "@lib/tmdb"
import { getCast } from "@lib/tmdb"
import { asyncDataModifier } from "@utils/asyncDataModifier"
import { trimArray } from "@utils/trimArray"
import { useQuery } from "react-query"

export const useCast = (props: UrlArgs): { cast: CastTypes[] } => {
  const { data: cast } = useQuery(
    `movie-${props.id}-cast`,
    async () => {
      const data = await asyncDataModifier<CastTypes[]>({
        get: () => getCast(props),
        modifier: (data: CastTypes[]) => trimArray(data, 0, 3),
      })
      return data
    },
    {
      initialData: [],
    }
  )
  return { cast }
}
