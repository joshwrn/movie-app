import type { FC } from "react"
import React, { useCallback } from "react"

import type { MovieTypes, BasePersonType } from "@customTypes/MovieTypes"
import { autoUpdate, useFloating } from "@floating-ui/react"
import { useOutsideClick } from "@hooks/useOutsideClick"
import { searchMulti } from "@lib/tmdb"
import useResizeObserver from "@react-hook/resize-observer"
import { AnimatePresence, motion } from "framer-motion"
import { debounce } from "lodash"
import { IoIosCloseCircleOutline as CloseIcon } from "react-icons/io"
import { IoSearch } from "react-icons/io5"
import { atom, useRecoilState } from "recoil"
import styled from "styled-components"

import SearchResult, { Portal } from "./SearchResult"

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
  position: relative;
  width: 100%;
  max-height: 510px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  background-color: var(--nav-background);
  border: 1px solid var(--border-color-primary);
  border-radius: 10px;
  /* transform: translateY(calc(50% + 40px)); */
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  z-index: 9999;
`

export interface SearchResult extends MovieTypes, BasePersonType {
  media_type: string
}

export const searchBarIsOpenState = atom({
  key: `searchBarIsOpen`,
  default: false,
})

export const SearchBarValueState = atom({
  key: `searchBarValue`,
  default: ``,
})

export const useSize = (
  target: React.RefObject<HTMLElement>
): DOMRect | null => {
  const [size, setSize] = React.useState<DOMRect | null>(null)

  React.useLayoutEffect(() => {
    if (!target.current) return
    setSize(target.current.getBoundingClientRect())
  }, [target])

  useResizeObserver(target, (entry) => setSize(entry?.contentRect))
  return size
}

export const SearchBar: FC = () => {
  const [searchBarIsOpen, setSearchBarIsOpen] =
    useRecoilState(searchBarIsOpenState)
  const [searchValue, setSearchValue] = useRecoilState(SearchBarValueState)
  const [results, setResults] = React.useState([])
  const ref = useOutsideClick(() =>
    setSearchBarIsOpen(false)
  ) as React.RefObject<HTMLDivElement>

  const fetchResults = async (val: string) => {
    if (val.length < 2) return
    const res = await fetch(searchMulti(val)).then((res) => res.json())
    if (!res.results) return
    const filter = res.results.filter(
      (result: Partial<SearchResult>) =>
        result.media_type === `person` || result.media_type === `movie`
    )
    setResults(filter)
  }

  React.useEffect(() => {
    fetchResults(searchValue)
  }, [])

  const debounceInput = useCallback(debounce(fetchResults, 750), [])

  const { x, y, reference, floating, strategy, elements, refs } =
    useFloating<HTMLElement>({
      whileElementsMounted: autoUpdate,
    })
  const size = useSize(ref)
  console.log(size)
  return (
    <>
      <Wrapper ref={reference}>
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
            onChange={(e) => (
              setSearchValue(e.target.value), debounceInput(e.target.value)
            )}
          />
          <CloseIcon
            style={{ cursor: `pointer` }}
            onClick={() => setSearchBarIsOpen(false)}
          />
        </Container>
      </Wrapper>
      <AnimatePresence>
        <Portal show={true}>
          {searchValue.length > 2 && results.length > 0 && searchBarIsOpen && (
            <ResOuter
              style={{
                top: y,
                left: x,
                position: `absolute`,
              }}
              ref={floating}
            >
              <ResultsContainer
                initial="initial"
                animate="animate"
                exit="exit"
                variants={resultsVariants}
              >
                <AnimatePresence>
                  {results.map((result, index) => {
                    return (
                      <SearchResult
                        key={result.id}
                        result={result}
                        type={result.media_type}
                        index={index}
                      />
                    )
                  })}
                </AnimatePresence>
              </ResultsContainer>
              <Blur />
            </ResOuter>
          )}
        </Portal>
      </AnimatePresence>
    </>
  )
}

const ResOuter = styled.div`
  border: 1px solid blue;
  position: absolute;
  width: calc(100% - 140px);
  max-height: 510px;
  z-index: 9999;
`

const Blur = styled.div`
  border-radius: 10px;
  backdrop-filter: blur(50px);
  width: 100%;
  height: 100%;
  border: 1px solid red;
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
`

const resultsVariants = {
  initial: {
    opacity: 0,
    padding: `0 10px`,
    transition: {
      duration: 0.4,
    },
  },
  animate: {
    opacity: 1,
    maxHeight: `510px`,
    padding: `10px 10px`,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    padding: `0 10px`,
    transition: {
      duration: 0.4,
      opacity: {
        delay: 0.1,
        duration: 0.3,
      },
    },
  },
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
      duration: 0.4,
    },
  },
}
