import type { FC } from "react"
import React, { useCallback, useState } from "react"

import type { MotionProps } from "framer-motion"
import { AnimatePresence, motion } from "framer-motion"
import type { FlattenSimpleInterpolation } from "styled-components"
import styled from "styled-components"

import { Link } from "./Link"
import { StyledSpotLight, useSpotLight } from "./SpotLight"

const Wrapper = styled(motion.div)<{ css: FlattenSimpleInterpolation }>`
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  transition: background-color 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
  :hover {
    border: 1px solid var(--border-color-primary);
    ${StyledSpotLight} {
      opacity: 0.25;
    }
  }
  ${({ css }) => css}
`

export const SpotlightItem: FC<
  MotionProps &
    React.HTMLAttributes<HTMLDivElement> & {
      children: React.ReactNode
      css?: FlattenSimpleInterpolation
      link?: string
    }
> = ({ children, css, link, ...props }) => {
  const [hover, setHover] = useState(false)
  const { ref, handleMouseClick, SpotLight, setTap } = useSpotLight({
    scaleOnTap: true,
    hover,
  })
  const Inner = (
    <Wrapper
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => (setHover(false), setTap(false))}
      onMouseMove={handleMouseClick}
      onMouseDown={() => setTap(true)}
      css={css}
      {...props}
    >
      {children}
      <AnimatePresence>{hover && SpotLight}</AnimatePresence>
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
  initial: ({ coords, scale }: VariantProps) => ({
    opacity: 0,
    x: coords.x,
    y: coords.y,
    scale,
  }),
  animate: ({ coords, scale, tap }: VariantProps) => ({
    x: coords.x,
    y: coords.y,
    scale: tap ? 4 : scale,
    opacity: 0.25,
    transition: {
      type: `spring`,
      damping: 22,
      stiffness: 300,
      opacity: {
        type: `tween`,
        duration: 0.2,
      },
    },
  }),
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      type: `tween`,
      duration: 0.8,
    },
  },
}
