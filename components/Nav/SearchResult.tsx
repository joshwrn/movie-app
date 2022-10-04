import React from 'react'
import { MovieTypes, BasePersonType } from '@customTypes/MovieTypes'
import styled from 'styled-components'
import { getPosterImage, getProfileImage } from '@lib/tmdb'
import Link from 'next/link'
import { searchBarIsOpenState } from './SearchBar'
import { useSetRecoilState } from 'recoil'

const StyledResult = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 10px 10px;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.2s ease-in-out;
  :hover {
    background-color: var(--nav-background);
  }
  > div {
    p {
      :last-of-type {
        color: var(--font-color-secondary);
        font-size: 14px;
      }
    }
  }
`

const StyledPerson = styled(StyledResult)`
  > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`

const StyledMovie = styled(StyledResult)`
  > img {
    height: 75px;
    max-width: 50px;
    border-radius: 5px;
    object-fit: cover;
  }
`

const PersonResult = ({ result }: { result: BasePersonType }) => {
  const setSearchBarIsOpen = useSetRecoilState(searchBarIsOpenState)
  return (
    <Link href={`/person/${result.id}`}>
      <StyledPerson onClick={() => setSearchBarIsOpen(false)}>
        <img
          src={getProfileImage('w45', result.profile_path)}
          alt={result.name}
        />
        <div>
          <p>{result.name}</p>
          <p>{result.known_for_department}</p>
        </div>
      </StyledPerson>
    </Link>
  )
}

const MovieResult = ({ result }: { result: MovieTypes }) => {
  const setSearchBarIsOpen = useSetRecoilState(searchBarIsOpenState)
  return (
    <Link href={`/movie/${result.id}`}>
      <StyledMovie onClick={() => setSearchBarIsOpen(false)}>
        <img
          src={getPosterImage('w92', result.poster_path)}
          alt={result.title}
        />
        <div>
          <p>{result.title}</p>
          <p>{result.release_date?.slice(0, 4)}</p>
        </div>
      </StyledMovie>
    </Link>
  )
}

const SearchResult = ({
  result,
  type,
}: {
  result: MovieTypes | BasePersonType
  type: string
}) => {
  if (type === 'person')
    return <PersonResult result={result as BasePersonType} />
  if (type === 'movie') return <MovieResult result={result as MovieTypes} />
  return null
}

export default SearchResult
