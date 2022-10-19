import type { FC } from "react"
import React, { useState } from "react"

import type { MotionProps } from "framer-motion"
import { motion } from "framer-motion"
import type { FlattenSimpleInterpolation } from "styled-components"
import styled from "styled-components"

import { Link } from "./Link"

const Wrapper = styled(motion.div)<{ css: FlattenSimpleInterpolation }>`
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  transition: background-color 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
  :hover {
    border: 1px solid var(--border-color-primary);
  }
  ${({ css }) => css}
`
const SpotLightContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 5;
  filter: blur(30px);
  :hover {
    > div {
      opacity: 1;
    }
  }
`

const SpotLight = styled(motion.div)`
  background: radial-gradient(#ffffff2b 0%, transparent);
  opacity: 0;
  position: absolute;
  pointer-events: none;
  width: 50%;
  height: 100%;
  z-index: -1;
  transition: opacity 0.25s ease-in-out;
`

export const SpotlightItem: FC<
  MotionProps &
    React.HTMLAttributes<HTMLDivElement> & {
      children: React.ReactNode
      css?: FlattenSimpleInterpolation
      link?: string
    }
> = ({ children, css, link, ...props }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const [hover, setHover] = useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  const handleMouseMove = (e: React.MouseEvent) => {
    const element = ref.current
    if (!hover || !element) return
    const bounds = element.getBoundingClientRect()
    const height = element.offsetHeight
    const width = element.offsetWidth
    const x = e.clientX - bounds.left - width / 2
    const y = e.clientY - bounds.top - height / 2
    setCoords({ x, y })
    const newScale = Math.sqrt(x * x + y * y * 15) / (width / 4)
    setScale(newScale > 0.8 ? newScale : 0.8)
  }
  const Inner = (
    <Wrapper css={css} {...props}>
      <SpotLightContainer
        ref={ref}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseMove={handleMouseMove}
      >
        <SpotLight
          transition={{ type: `spring`, damping: 40, stiffness: 300 }}
          animate={{ x: coords.x, y: coords.y, scale: scale }}
        />
      </SpotLightContainer>
      {children}
    </Wrapper>
  )

  if (!link) return Inner
  return (
    <Link passHref href={link}>
      {Inner}
    </Link>
  )
}
