import React from 'react'
import styled from 'styled-components'

import { Genres } from '../../types/MovieTypes'

const Genres = ({ genres }: { genres: Genres[] }) => {
  return (
    <GenreContainer>
      {genres.map((genre: Genres) => (
        <Genre key={genre.id} genre={genre.name} />
      ))}
    </GenreContainer>
  )
}

const Genre = ({ genre }: { genre: string }) => {
  return (
    <GenrePill>
      <GenrePillText>{genre}</GenrePillText>
    </GenrePill>
  )
}

// Genres

const GenreContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  overflow-x: scroll;
  position: relative;
  z-index: 2;
`

const GenrePill = styled.div`
  display: flex;
  padding: 10px 40px;
  border-radius: 1000px;
  border: 2px solid;
  border-color: ${({ theme }) => theme.fontColor.secondary};
  opacity: 0.8;
  cursor: pointer;
  transition: border-color 0.4s ease-in-out;
  &:hover {
    border-color: ${({ theme }) => theme.fontColor.primary};
  }
`

const GenrePillText = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.fontColor.primary};
  font-weight: 700;
`

export default Genres
