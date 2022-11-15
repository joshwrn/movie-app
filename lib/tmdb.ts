import type {
  BaseMovie,
  CastTypes,
  CreditTypes,
  Movie,
  MovieTypes,
  ReviewInfoTypes,
  TrailerTypes,
} from "@customTypes/MovieTypes"
import type {
  PersonCredits,
  PersonDetails,
  PersonSocials,
} from "@customTypes/PersonTypes"

export const MOVIE_API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY

const DEFAULT_IMAGE = `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`

type ProfileImageSizes = `h632` | `original` | `w45` | `w185`
type BackdropImageSizes = `original` | `w300` | `w780` | `w1280`
type LogoImageSizes =
  | `original`
  | `w45`
  | `w92`
  | `w154`
  | `w185`
  | `w300`
  | `w500`
type PosterImageSizes =
  | `original`
  | `w92`
  | `w154`
  | `w185`
  | `w342`
  | `w500`
  | `w780`
type StillImageSizes = `original` | `w92` | `w185` | `w300`
export const getImage = (
  size: string,
  path: string,
  alt: string = DEFAULT_IMAGE
): string => {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : alt
}
export const getProfileImage = (
  size: ProfileImageSizes,
  path: string
): string => {
  return getImage(size, path)
}
export const getBackdropImage = (
  size: BackdropImageSizes,
  path: string
): string => {
  return getImage(size, path)
}
export const getLogoImage = (size: LogoImageSizes, path: string): string => {
  return getImage(size, path)
}
export const getPosterImage = (size: PosterImageSizes, path: string): string => {
  return getImage(size, path)
}
export const getStillImage = (size: StillImageSizes, path: string): string => {
  return getImage(size, path)
}

export type Id = number | string
export type UrlArgs = { id: Id; page?: number }
type UrlFn<T = unknown> = (args: UrlArgs) => Promise<T>

type DataWithResults<T> = {
  id: Id
  results: T[]
}
interface Url {
  id: Id
  mediaType: string
  property?: string
  page?: number
}

const BASE_URL = `https://api.themoviedb.org/3`
const buildUrl = ({ id, property, mediaType, page }: Url): string =>
  `${BASE_URL}/${mediaType}/${id}${
    property ? `/${property}` : ``
  }?api_key=${MOVIE_API_KEY}&language=en-US${page ? `&page=${page}` : ``}`

const fetcher = async <T>({
  id,
  property,
  mediaType,
  page,
}: Url): Promise<T> => {
  const res = await fetch(buildUrl({ id, mediaType, property, page }))
  if (!res.ok) {
    throw new Error(`An error occurred while fetching the data.`)
  }
  return res.json()
}
export const getMovie: UrlFn<Movie> = async ({ id }) =>
  fetcher({ id, mediaType: `movie` })

export const getCredits: UrlFn<CreditTypes> = (props) =>
  fetcher({
    mediaType: `movie`,
    property: `credits`,
    ...props,
  })
export const getCast: UrlFn<CastTypes[]> = async (props) => {
  const { cast } = await getCredits(props)
  return cast
}
export const getTrailers: UrlFn<TrailerTypes[]> = async (props) => {
  const data = await fetcher<DataWithResults<TrailerTypes>>({
    mediaType: `movie`,
    property: `videos`,
    ...props,
  })
  return data.results ?? []
}

export const getRelated: UrlFn<BaseMovie[]> = async (props) => {
  const data = await fetcher<DataWithResults<BaseMovie>>({
    mediaType: `movie`,
    property: `similar`,
    ...props,
  })
  return data.results
}

export const getReviews: UrlFn<ReviewInfoTypes[]> = async (props) => {
  const data = await fetcher<DataWithResults<ReviewInfoTypes>>({
    mediaType: `movie`,
    property: `reviews`,
    ...props,
  })
  return data.results
}

// people
export const getPersonCredits: UrlFn<PersonCredits> = (props) =>
  fetcher({
    mediaType: `person`,
    property: `movie_credits`,
    ...props,
  })
export const getPersonSocials: UrlFn<PersonSocials> = (props) =>
  fetcher({
    mediaType: `person`,
    property: `external_ids`,
    ...props,
  })
export const getPersonDetails: UrlFn<PersonDetails> = (props) =>
  fetcher({
    mediaType: `person`,
    ...props,
  })

export const getPopular = async (): Promise<MovieTypes[]> => {
  const data = await fetch(`
  ${BASE_URL}/trending/movie/day?api_key=${MOVIE_API_KEY}`)
  const json = await data.json()
  return json.results ?? []
}

// search
export const searchMulti = (query: string): string => {
  return `${BASE_URL}/search/multi?api_key=${MOVIE_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
}
