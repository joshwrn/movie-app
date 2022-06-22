import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'

const arrowVariants = {
  animate: {
    opacity: 1,
  },
  initial: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
  },
}
const arrowTransition = {
  transition: {
    opacity: { duration: 0.25 },
    scale: { type: 'spring', stiffness: 100, damping: 15 },
  },
}

const Carousel = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef(null)
  const [scrollX, setScrollX] = useState<number>(0)
  const [scrollEnd, setScrollEnd] = useState<boolean>(false)

  //Slide click
  const slide = (direction: number) => {
    const shift = scrollRef.current.clientWidth * direction
    scrollRef.current.scrollLeft += shift
    setScrollX(scrollX + shift)
    scrollCheck()
  }

  const scrollCheck = () => {
    setScrollX(scrollRef.current.scrollLeft)
    if (
      Math.floor(
        scrollRef.current.scrollWidth - scrollRef.current.scrollLeft
      ) <= scrollRef.current.offsetWidth
    ) {
      setScrollEnd(true)
    } else {
      setScrollEnd(false)
    }
  }

  return (
    <Wrapper>
      <AnimatePresence>
        {scrollX > 0 && (
          <ArrowIconLeft
            variants={arrowVariants}
            animate="animate"
            initial="initial"
            exit="exit"
            transition={arrowTransition}
            whileTap={{ scale: 0.95 }}
            onClick={() => slide(-1)}
          >
            <StyledArrowIcon size={36} as={FiArrowLeft} />
          </ArrowIconLeft>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!scrollEnd && (
          <ArrowIcon
            variants={arrowVariants}
            animate="animate"
            initial="initial"
            exit="exit"
            transition={arrowTransition}
            whileTap={{ scale: 0.9 }}
            onClick={() => slide(1)}
          >
            <StyledArrowIcon size={36} />
          </ArrowIcon>
        )}
      </AnimatePresence>
      <Container ref={scrollRef} onScroll={scrollCheck}>
        <List>{children}</List>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  overflow: visible;
  padding: 0 var(--padding-h);
`
const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  overflow-x: scroll;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
`
const List = styled.div`
  display: flex;
  gap: var(--padding-h);
  width: 100%;
`

const StyledArrowIcon = styled(FiArrowRight)`
  stroke: var(--font-color-content-primary);
`
const ArrowIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  border-radius: 100%;
  width: 70px;
  height: 70px;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(60px);
  border: 1px solid var(--border-color-primary);
  right: 0;
  z-index: 2;
  cursor: pointer;
`
const ArrowIconLeft = styled(ArrowIcon)`
  left: -3px;
`

const Gradient = styled(motion.div)`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 5vw;
  z-index: 1;
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

export default Carousel
