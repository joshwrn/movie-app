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
    > div > div {
      opacity: 0.25;
    }
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
  z-index: -15;
  filter: blur(30px) saturate(0.85);
`
const SpotLight = styled(motion.div)`
  background: radial-gradient(
    closest-side,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 0, 0, 1) 55%,
    rgba(255, 154, 0, 1) 60%,
    rgba(208, 222, 33, 1) 65%,
    rgba(79, 220, 74, 1) 70%,
    rgba(63, 218, 216, 1) 75%,
    rgba(47, 201, 226, 1) 80%,
    rgba(28, 127, 238, 1) 85%,
    rgba(95, 21, 242, 1) 90%,
    rgba(186, 12, 248, 1) 95%,
    rgba(251, 7, 217, 1) 98%,
    transparent 100%
  );
  opacity: 0;
  position: absolute;
  pointer-events: none;
  width: 50%;
  height: 100%;
  z-index: -1;
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
  const [scale, setScale] = useState(0.8)
  const [hover, setHover] = useState(false)
  const [tap, setTap] = useState(false)
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
    <Wrapper
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => (setHover(false), setTap(false))}
      onMouseMove={handleMouseMove}
      onMouseDown={() => setTap(true)}
      css={css}
      {...props}
    >
      {children}
      <SpotLightContainer>
        <SpotLight
          initial="initial"
          animate="animate"
          variants={variants}
          custom={{ coords, scale, hover, tap }}
        />
      </SpotLightContainer>
    </Wrapper>
  )

  if (!link) return Inner
  return (
    <Link passHref href={link}>
      {Inner}
    </Link>
  )
}

interface VariantProps {
  coords: { x: number; y: number }
  scale: number
  hover: boolean
  tap: boolean
}
const variants = {
  initial: {
    opacity: 0,
  },
  animate: ({ coords, scale, tap, hover }: VariantProps) => ({
    x: coords.x,
    y: coords.y,
    scale: scale,
    opacity: tap ? 0.75 : hover ? 0.25 : 0,
    transition: {
      type: `spring`,
      damping: 22,
      stiffness: 300,
      opacity: { damping: 5, stiffness: 9999 },
    },
  }),
}
