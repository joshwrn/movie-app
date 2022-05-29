import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'

const Carousel = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef(null)
  const [scrollX, setScrollX] = useState<number>(0)
  const [scrollEnd, setScrollEnd] = useState<boolean>(false)

  //Slide click
  const slide = (shift: number) => {
    scrollRef.current.scrollLeft += shift
    setScrollX(scrollX + shift)

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
    <TrendingWrapper>
      <AnimatePresence>
        {scrollX > 0 && (
          <ArrowIconLeft
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.25 },
              scale: { type: 'spring', stiffness: 100, damping: 15 },
            }}
            whileTap={{ scale: 1.1 }}
            whileHover={{ x: -3 }}
            onClick={() => slide(-532)}
          >
            <StyledArrowIcon size={36} as={FiArrowLeft} />
          </ArrowIconLeft>
        )}
      </AnimatePresence>
      <TrendingContainer ref={scrollRef} onScroll={scrollCheck}>
        <TrendingList>{children}</TrendingList>
      </TrendingContainer>
      <AnimatePresence>
        {!scrollEnd && (
          <ArrowIcon
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.25 },
              scale: { type: 'spring', stiffness: 100, damping: 15 },
            }}
            whileTap={{ scale: 1.1 }}
            whileHover={{ x: 3 }}
            onClick={() => slide(+532)}
          >
            <StyledArrowIcon size={36} />
          </ArrowIcon>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {scrollX !== 0 && (
          <TrendingGradientLeft
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!scrollEnd && (
          <TrendingGradient
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          />
        )}
      </AnimatePresence>
    </TrendingWrapper>
  )
}

const TrendingWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`

const TrendingContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  overflow-x: scroll;
  scroll-behavior: smooth;
`

const StyledArrowIcon = styled(FiArrowRight)`
  color: ${({ theme }) => theme.fontColor.primary};
`

const ArrowIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  border-radius: 100%;
  width: 80px;
  height: 80px;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(60px);
  right: 27px;
  z-index: 2;
  cursor: pointer;
`

const ArrowIconLeft = styled(ArrowIcon)`
  left: 27px;
`

const TrendingGradient = styled(motion.div)`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 215px;
  z-index: 1;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
`

const TrendingGradientLeft = styled(TrendingGradient)`
  left: 0;
  right: auto;
  background: linear-gradient(-90deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
`

const TrendingList = styled.div`
  display: flex;
  gap: 83px;
  width: 100%;
`

export default Carousel
