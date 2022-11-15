import type { FC } from "react"
import React from "react"

import type {
  MovieTypes,
  Movie,
  CreditTypes,
  ReviewInfoTypes,
} from "@customTypes/MovieTypes"
import Divider from "@reusable/Divider"
import { DEVICE } from "@styles/devices"
import styled from "styled-components"

import Genres from "./Genres"
import Info from "./Info"
import Related from "./Related"
import Reviews from "./Reviews"
import Sidebar from "./Sidebar"
import Trailer from "./Trailer"

interface MovieInfo {
  movie: Movie
  credits: CreditTypes
  reviews: ReviewInfoTypes[]
  trailer?: string
  related: MovieTypes[]
}

const MovieInfoSection: FC<MovieInfo> = ({
  trailer,
  credits,
  related,
  reviews,
  movie,
}) => {
  // const { data: movie } = useQuery(`movie-${id}`, { initialData: DEFAULT_MOVIE })
  return (
    <Container>
      <Genres genres={movie.genres} />
      <DetailsContainer>
        <MainContainer>
          <Info runtime={movie.runtime} overview={movie.overview} />
          <Divider />
          <Trailer trailer={trailer} />
          <Divider />
          <Reviews reviews={reviews} />
          <Divider />
          <Related related={related} />
        </MainContainer>
        <Sidebar credits={credits} />
      </DetailsContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 50px;
  padding-bottom: 100px;
`

// Main

const DetailsContainer = styled.div`
  display: flex;
  gap: 80px;
  @media ${DEVICE.tablet} {
    flex-direction: column;
    gap: 20px;
  }
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
`

export default MovieInfoSection
