import React from 'react'
import styled from 'styled-components'

import { Genres } from '@customTypes/MovieTypes'

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
  border-color: var(--font-color-secondary);
  opacity: 0.8;
  cursor: pointer;
  word-break: keep-all;
  white-space: nowrap;
  transition: border-color 0.4s ease-in-out;
  &:hover {
    border-color: var(--font-color-primary);
  }
`

const GenrePillText = styled.span`
  font-size: 16px;
  color: var(--font-color-primary);
  font-weight: 700;
`

export default Genres
