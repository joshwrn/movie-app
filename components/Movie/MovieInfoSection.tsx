import React from 'react'
import styled from 'styled-components'
import Divider from '@reusable/Divider'
import Genres from './Genres'
import Info from './Info'
import Sidebar from './Sidebar'
import Trailer from './Trailer'
import Reviews from './Reviews'

import {
  MovieTypes,
  OneMovie,
  CreditTypes,
  ReviewInfoTypes,
} from '@customTypes/MovieTypes'

interface Props {
  movie: OneMovie
  credits: CreditTypes
  reviews: ReviewInfoTypes[]
  trailer?: string
  related: MovieTypes[]
}

const MovieInfoSection = ({
  movie,
  trailer,
  credits,
  related,
  reviews,
}: Props) => {
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
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
`

export default MovieInfoSection
