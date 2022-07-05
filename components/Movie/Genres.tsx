import React from 'react'
import styled from 'styled-components'

import { Genres } from '@customTypes/MovieTypes'
import { motion } from 'framer-motion'
import useScrollCheck from '~/hooks/useScrollCheck'

import TextPill from '@reusable/TextPill'

const Genres = ({ genres }: { genres: Genres[] }) => {
  const { scrollRef, scrollX, scrollEnd, scrollCheck } = useScrollCheck()
  return (
    <Container>
      {scrollX > 0 && <GradientLeft />}
      {!scrollEnd && <Gradient />}
      <GenreContainer ref={scrollRef} onScroll={scrollCheck}>
        {genres.map((genre: Genres) => (
          <TextPill key={genre.id}>{genre.name}</TextPill>
        ))}
      </GenreContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
`

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

const Gradient = styled(motion.div)`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 5vw;
  z-index: 5;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0%,
    var(--background-primary) 100%
  );
`
const GradientLeft = styled(Gradient)`
  left: 0;
  right: auto;
  background: linear-gradient(
    -90deg,
    rgba(0, 0, 0, 0) 0%,
    var(--background-primary) 100%
  );
`

export default Genres
