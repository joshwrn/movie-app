import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { getImage } from '@lib/tmdb'
import { MovieTypes } from '@customTypes/MovieTypes'

const WideMoviePoster = ({ backdrop_path, title, id }: Partial<MovieTypes>) => {
  const src = getImage('w1280', backdrop_path)
  return (
    <Link href={`/movie/${id}`} passHref>
      <WidePosterContainer>
        <WidePosterTitleContainer>
          <WidePosterTitle>{title}</WidePosterTitle>
        </WidePosterTitleContainer>
        <WidePosterGradient />
        <WidePosterImage src={src} />
      </WidePosterContainer>
    </Link>
  )
}

const WidePosterContainer = styled.div`
  width: 532px;
  height: 299px;
  border-radius: 18px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  cursor: pointer;
  user-select: none;
  border: 4px solid rgba(0, 0, 0, 0);
  transition: border-color 0.3s;
  &:hover {
    border-color: #ffffff21;
  }
`

const WidePosterTitleContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 2;
  padding: 32px 40px;
`

const WidePosterTitle = styled.p`
  color: ${({ theme }) => theme.fontColor.primary};
  font-size: 20px;
`

const WidePosterGradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 32.57%, #000000 100%);
  z-index: 1;
`

const WidePosterImage = styled.img`
  position: absolute;
  width: 100%;
  top: 0;
  height: 100%;
`

export default WideMoviePoster
