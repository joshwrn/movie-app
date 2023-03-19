import type { FC } from "react"
import React from "react"

import { getAccentColorByPopularity } from "@components/Person/PersonInfo"
import type { MovieTypes, BasePersonType } from "@customTypes/MovieTypes"
import {
  useFloating,
  autoUpdate,
  useFloatingPortalNode,
} from "@floating-ui/react"
import { getPosterImage, getProfileImage } from "@lib/tmdb"
import { CircleWithNumber } from "@reusable/CircleWithNumber"
import ReactDOM from "react-dom"
import styled, { css } from "styled-components"

const StyledResult = css`
  gap: 20px;
  width: 100%;
  padding: 10px 10px;
  cursor: pointer;
  border-radius: 10px;
  height: 100px;
  flex-shrink: 0;
  scroll-snap-align: start;
  scroll-margin-top: 10px;
`
const TextWrapper = styled.div`
  margin-right: auto;
  p {
    :last-of-type {
      color: var(--font-color-secondary);
      font-size: 14px;
    }
  }
`
const StyledPerson = css`
  ${StyledResult}
  > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`
const StyledMovie = css`
  ${StyledResult}
  > img {
    height: 75px;
    max-width: 50px;
    border-radius: 5px;
    object-fit: cover;
  }
`
const Container = styled.div<{ css: any }>`
  width: 100%;
  display: flex;
  z-index: 999999;
  position: relative;
  isolation: isolate;
  ${({ css }) => css}
`
const Test = styled.div`
  pointer-events: none;
  background-color: red;
  mix-blend-mode: screen;
  isolation: isolate;
  z-index: 1001;
`

export const Portal = ({
  show,
  children,
}: {
  show: boolean
  children: React.ReactNode
}): React.ReactPortal | null => {
  const portalNode = useFloatingPortalNode({
    enabled: show,
  })

  if (portalNode) {
    return ReactDOM.createPortal(<div>{children}</div>, portalNode)
  }

  return null
}

const Wrapper = ({ children, index, css, id, type }) => {
  const { x, y, reference, floating, strategy, elements, refs } =
    useFloating<HTMLElement>({
      whileElementsMounted: autoUpdate,
    })
  return (
    <>
      {/* <Portal show={true}>
        <Test
          ref={floating}
          id={id}
          style={{
            position: `absolute`,
            top: y ?? 0,
            left: x ?? 0,
            transform: `translateY(-100%)`,
            width: refs.reference?.current?.getBoundingClientRect().width,
            height: refs.reference?.current?.getBoundingClientRect().height,
            border: `1px solid red`,
          }}
        />
      </Portal> */}
      <Container ref={reference} css={css}>
        {children}
      </Container>
    </>
  )
}

const PersonResult = ({ result }: { result: BasePersonType }) => {
  return (
    <>
      <img src={getProfileImage(`w45`, result.profile_path)} alt={result.name} />
      <TextWrapper>
        <p>{result.name}</p>
        <p>{result.known_for_department}</p>
      </TextWrapper>
      <CircleWithNumber
        number={result.popularity}
        progress={result.popularity}
        accentColors={getAccentColorByPopularity(101)}
        fontSize={16}
        size={`60px`}
        stroke={3}
      />
    </>
  )
}

const MovieResult = ({ result }: { result: MovieTypes }) => {
  return (
    <>
      <img src={getPosterImage(`w92`, result.poster_path)} alt={result.title} />
      <TextWrapper>
        <p>{result.title}</p>
        <p>{result.release_date?.slice(0, 4)}</p>
      </TextWrapper>
      <CircleWithNumber
        number={result.vote_average}
        progress={result.vote_average * 10}
        accentColors={getAccentColorByPopularity(50)}
        fontSize={16}
        rounded={false}
        size={`60px`}
        stroke={3}
      />
    </>
  )
}

const SearchResult: FC<{
  result: BasePersonType | MovieTypes
  type: string
  index: number
}> = ({ result, type, index }) => {
  let css = null
  let Component = null

  if (type === `person`) {
    css = StyledPerson
    Component = <PersonResult result={result as BasePersonType} />
  }

  if (type === `movie`) {
    css = StyledMovie
    Component = <MovieResult result={result as MovieTypes} />
  }

  return (
    <Wrapper index={index} css={css} id={result.id} type={type}>
      {Component}
    </Wrapper>
  )
}

const variants = {
  initial: {
    opacity: 1,
  },
  animate: (index: number) => ({
    opacity: 1,
    transition: {
      delay: index < 5 ? index * 0.1 : 0,
      duration: 0.2,
    },
  }),
  exit: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
}

export default SearchResult
