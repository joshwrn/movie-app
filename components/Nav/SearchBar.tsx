import React from 'react'
import { IoSearch } from 'react-icons/io5'
import { IoIosCloseCircleOutline as CloseIcon } from 'react-icons/io'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { searchMulti } from '@lib/tmdb'
import SearchResult from './SearchResult'

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
  transform: translateY(calc(100% + 30px));
  width: 100%;
`

export const SearchBar = ({
  setSearchIsOpen,
}: {
  setSearchIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [searchValue, setSearchValue] = React.useState('')
  const [results, setResults] = React.useState([])
  React.useEffect(() => {
    const fetchResults = async () => {
      const res = await fetch(searchMulti(searchValue)).then((res) =>
        res.json()
      )
      console.log(res)
      setResults(res.results.slice(0, 5))
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
          type="text"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
          }}
        />
        <CloseIcon
          style={{ cursor: 'pointer' }}
          onClick={() => setSearchIsOpen(false)}
        />
      </Container>
      <ResultsContainer>
        {results.map((result) => {
          return <SearchResult />
        })}
      </ResultsContainer>
    </Wrapper>
  )
}

const searchBarVariants = {
  initial: {
    opacity: 0,
    width: 0,
  },
  animate: {
    opacity: 1,
    width: '100%',
    transition: {
      duration: 0.1,
    },
  },
  exit: {
    opacity: 0,
    width: 0,
    transition: {
      duration: 0.1,
    },
  },
}
