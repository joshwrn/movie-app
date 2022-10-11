import type { FC } from "react"
import React from "react"

import { useColor } from "@contexts/color/MovieInfoContext"
import type { MovieTypes, CastTypes, CrewTypes } from "@customTypes/MovieTypes"
import { getImage, getPosterImage } from "@lib/tmdb"
import { device } from "@styles/devices"
import { LargeHeading } from "@styles/textStyles"
import { addCommas, addZero } from "@utils/numbers"
import { ColorExtractor } from "react-color-extractor"
import styled from "styled-components"

interface MovieDetails {
  movie: MovieTypes
  credits: {
    cast: CastTypes[]
    crew: CrewTypes[]
  }
}

const MovieDetailHero: FC<MovieDetails> = ({ movie, credits }) => {
  const { setColor } = useColor()
  const director = credits.crew.find((p) => p.job === `Director`)?.name
  const releaseDate = movie.release_date?.slice(0, 4)
  const rating = movie.vote_average
  const totalVotes = movie.vote_count

  return (
    <HeroContainer>
      <LeftContainer>
        <MoviePosterContainer>
          <ColorExtractor
            src={getPosterImage(`w92`, movie.poster_path)}
            getColors={(colors: string[]) => setColor(colors)}
          />
          <img style={moviePoster} src={getImage(`w780`, movie.poster_path)} />
        </MoviePosterContainer>
        <MovieInfo>
          <LargeHeading>{movie.title}</LargeHeading>
          <MovieInfoSection>
            <MovieInfoSectionTitle>{releaseDate}</MovieInfoSectionTitle>
            {director && (
              <MovieInfoSectionTitle>
                <MovieInfoSectionSub>Directed By </MovieInfoSectionSub>
                {director}
              </MovieInfoSectionTitle>
            )}
          </MovieInfoSection>
        </MovieInfo>
      </LeftContainer>
      {rating ? (
        <RatingInfo>
          <Rating>
            <RatingLabel>Rating </RatingLabel>
            {addZero(rating)}
          </Rating>
          <MovieInfoSectionTitle>
            <MovieInfoSectionSub>Total Votes</MovieInfoSectionSub>
            {addCommas(totalVotes)}
          </MovieInfoSectionTitle>
        </RatingInfo>
      ) : null}
      <BackdropGradient />
      <Backdrop src={getImage(`w1280`, movie.backdrop_path)} />
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
  background: var(--gradient-hero);
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
  borderRadius: `18px`,
  cursor: `pointer`,
  flex: 1,
  width: `100%`,
  height: `100%`,
  objectPosition: `center`,
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

const MovieInfoSection = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 20px;
  @media ${device.mobile} {
    flex-direction: column;
    align-items: center;
  }
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
  white-space: nowrap;
`

const RatingInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  gap: 5px;
  z-index: 2;
  white-space: nowrap;
  @media ${device.tablet} {
    flex-direction: row;
    gap: 20px;
  }
  @media ${device.mobile} {
    flex-direction: column;
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
