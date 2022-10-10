import type { FC, ReactNode } from "react"

import useScrollCheck from "@hooks/useScrollCheck"
import { AnimatePresence, motion } from "framer-motion"
import { FiArrowRight, FiArrowLeft } from "react-icons/fi"
import styled from "styled-components"

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
    scale: { type: `spring`, stiffness: 100, damping: 15 },
  },
}

const Carousel: FC<{ children: ReactNode }> = ({ children }) => {
  const { scrollRef, wrapperRef, scrollX, scrollEnd, slide, scrollCheck } =
    useScrollCheck()
  return (
    <Wrapper ref={wrapperRef}>
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
        {children}
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
  width: 100%;
  justify-content: flex-start;
  overflow-x: scroll;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  gap: var(--padding-h);
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
  box-shadow: 0 5px 10px rgb(0, 0, 0, 0.75);
  right: 0;
  z-index: 2;
  cursor: pointer;
`
const ArrowIconLeft = styled(ArrowIcon)`
  left: -3px;
`

export default Carousel
