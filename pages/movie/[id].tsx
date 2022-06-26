import React from 'react'
import styled from 'styled-components'

import MovieDetailHero from '@components/Movie/Hero'
import MovieInfoSection from '@components/Movie/MovieInfoSection'

import {
  getMovie,
  getCredits,
  getTrailers,
  getRelated,
  getReviews,
} from '@lib/tmdb'

import { ColorProvider } from '@contexts/MovieInfoContext'

import type {
  MovieTypes,
  OneMovie,
  CreditTypes,
  ReviewInfoTypes,
  TrailerTypes,
} from '@customTypes/MovieTypes'

import { GetServerSideProps } from 'next'

interface Props {
  movie: OneMovie
  credits: CreditTypes
  reviews: ReviewInfoTypes[]
  trailer?: string
  related: MovieTypes[]
}

const MovieDetail = ({ movie, credits, trailer, related, reviews }: Props) => {
  return (
    <PageContainer>
      <ColorProvider>
        <MovieDetailHero movie={movie} credits={credits} />
        <MovieInfoSection
          movie={movie}
          credits={credits}
          trailer={trailer}
          related={related}
          reviews={reviews}
        />
      </ColorProvider>
    </PageContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string

  const [movieData, creditsData, trailerData, relatedData, reviewsData] =
    await Promise.all([
      fetch(getMovie(id)).then((res) => res.json()),
      fetch(getCredits(id)).then((res) => res.json()),
      fetch(getTrailers(id)).then((res) => res.json()),
      fetch(getRelated(id)).then((res) => res.json()),
      fetch(getReviews(id)).then((res) => res.json()),
    ])

  const trailer = trailerData.results.find(
    (v: TrailerTypes) => v.type === 'Trailer' && v.site === 'YouTube'
  )

  return {
    props: {
      movie: movieData,
      credits: creditsData,
      trailer: trailer?.key ?? '',
      related: relatedData?.results,
      reviews: reviewsData?.results,
    },
  }
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 75px;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1440px;
`

export default MovieDetail
