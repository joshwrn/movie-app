import React from 'react'

import { getImage } from '@lib/tmdb'
import styled from 'styled-components'
import { ColorExtractor } from 'react-color-extractor'

import { useColor } from '@contexts/MovieInfoContext'
import { MovieTypes } from '@customTypes/MovieTypes'

import { CastTypes, CrewTypes } from '@customTypes/MovieTypes'

import { addCommas, addZero } from '@utils/numbers'
import { device } from '@styles/devices'

interface Props {
  movie: MovieTypes
  credits: {
    cast: CastTypes[]
    crew: CrewTypes[]
  }
}

const MovieDetailHero = ({ movie, credits }: Props) => {
  const { setColor } = useColor()

  return (
    <HeroContainer>
      <LeftContainer>
        <MoviePosterContainer>
          <ColorExtractor getColors={(colors: string[]) => setColor(colors)}>
            <img
              style={moviePoster}
              src={getImage('w780', movie.poster_path)}
            />
          </ColorExtractor>
        </MoviePosterContainer>
        <MovieInfo>
          <MovieTitle>{movie.title}</MovieTitle>
          <MovieInfoSection>
            <MovieInfoSectionTitle>
              {movie.release_date.slice(0, 4)}
            </MovieInfoSectionTitle>
            <MovieInfoSectionTitle>
              <MovieInfoSectionSub>Directed By </MovieInfoSectionSub>
              {credits.crew.find((p) => p.job === 'Director').name}
            </MovieInfoSectionTitle>
          </MovieInfoSection>
        </MovieInfo>
      </LeftContainer>
      <RatingInfo>
        <Rating>
          <RatingLabel>Rating </RatingLabel>
          {addZero(movie.vote_average)}
        </Rating>
        <MovieInfoSectionTitle>
          <MovieInfoSectionSub>Total Votes</MovieInfoSectionSub>
          {addCommas(movie.vote_count)}
        </MovieInfoSectionTitle>
      </RatingInfo>
      <BackdropGradient />
      <Backdrop src={getImage('w1280', movie.backdrop_path)} />
    </HeroContainer>
  )
}

const HeroContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: fit-content;
  color: var(--font-color-primary);
  margin-top: 190px;
  width: 100%;
  @media ${device.tablet} {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`

const BackdropGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 80vh;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.88) 0%,
    rgba(0, 0, 0, 0.72) 52.89%,
    #000000 100%
  );
`

const Backdrop = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 80vh;
  object-fit: cover;
  z-index: -3;
`

const LeftContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 50px;
  z-index: 2;
  @media ${device.tablet} {
    flex-direction: column;
    align-items: center;
  }
`

const MoviePosterContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  max-width: 342px;
  width: 25vw;
  @media ${device.tablet} {
    width: 60vw;
  }
`

const moviePoster = {
  borderRadius: '18px',
  cursor: 'pointer',
  flex: 1,
  width: '100%',
  height: '100%',
  objectPosition: 'center',
}

const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 750px;
  @media ${device.tablet} {
    align-items: center;
  }
`

const MovieTitle = styled.h1`
  font-size: 64px;
  font-weight: 700;
  color: var(--font-color-primary);
`

const MovieInfoSection = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 20px;
`

const MovieInfoSectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  display: flex;
  gap: 12px;
`

const MovieInfoSectionSub = styled.span`
  font-size: 24px;
  font-weight: 300;
  color: var(--font-color-secondary);
`

const RatingInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  z-index: 2;
  @media ${device.tablet} {
    flex-direction: row;
    gap: 20px;
  }
`

const Rating = styled.h1`
  font-size: 36px;
  color: var(--font-color-primary);
`

const RatingLabel = styled.span`
  font-weight: 300;
  color: var(--font-color-secondary);
`

export default MovieDetailHero
