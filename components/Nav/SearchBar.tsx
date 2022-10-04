import React from 'react'
import { IoSearch } from 'react-icons/io5'
import { IoIosCloseCircleOutline as CloseIcon } from 'react-icons/io'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { searchMulti } from '@lib/tmdb'
import SearchResult from './SearchResult'
import { MovieTypes, BasePersonType } from '@customTypes/MovieTypes'
import { atom, useSetRecoilState } from 'recoil'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`
const Container = styled(motion.div)`
  display: flex;
  border-bottom: 1px solid var(--border-color-primary);
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60%;
  gap: 15px;
  > input {
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    font-size: 16px;
    background-color: transparent;
  }
  > svg {
    width: 25px;
    height: 25px;
  }
`
const ResultsContainer = styled(motion.div)`
  position: absolute;
  transform: translateY(calc(50% + 35px));
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  background-color: var(--nav-background);
  border: 1px solid var(--border-color-primary);
  border-radius: 10px;
  backdrop-filter: blur(50px);
`

export interface SearchResult extends MovieTypes, BasePersonType {
  media_type: string
}

export const searchBarIsOpenState = atom({
  key: 'searchBarIsOpen',
  default: false,
})

export const SearchBar = () => {
  const setSearchBarIsOpen = useSetRecoilState(searchBarIsOpenState)
  const [searchValue, setSearchValue] = React.useState('')
  const [results, setResults] = React.useState([])
  React.useEffect(() => {
    const fetchResults = async () => {
      if (searchValue.length < 2) return
      const res = await fetch(searchMulti(searchValue)).then((res) =>
        res.json()
      )
      if (!res.results) return
      const filter = res.results.filter(
        (result: Partial<SearchResult>) =>
          result.media_type === 'person' || result.media_type === 'movie'
      )
      setResults(filter.slice(0, 5))
    }
    fetchResults()
  }, [searchValue])
  return (
    <Wrapper>
      <Container
        initial="initial"
        animate="animate"
        exit="exit"
        variants={searchBarVariants}
      >
        <IoSearch />
        <input
          autoFocus
          type="text"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
          }}
        />
        <CloseIcon
          style={{ cursor: 'pointer' }}
          onClick={() => setSearchBarIsOpen(false)}
        />
      </Container>
      {searchValue.length > 2 && results.length > 0 && (
        <ResultsContainer>
          {results.map((result) => {
            return (
              <SearchResult
                key={result.id}
                result={result}
                type={result.media_type}
              />
            )
          })}
        </ResultsContainer>
      )}
    </Wrapper>
  )
}

const searchBarVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
}
