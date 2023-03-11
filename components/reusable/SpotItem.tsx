import type { FC } from "react"
import React, { useState } from "react"

import type { MotionProps, Variants } from "framer-motion"
import { AnimatePresence, motion } from "framer-motion"
import type { FlattenInterpolation, ThemeProps } from "styled-components"
import styled from "styled-components"

import { useSpotLight } from "./Spot"

export type CSSProps = FlattenInterpolation<ThemeProps<unknown>> | undefined

const Wrapper = styled(motion.div)<{ css: CSSProps }>`
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  ${({ css }) => css}
`

export const SpotlightItem: FC<
  MotionProps &
    React.HTMLAttributes<HTMLDivElement> & {
      children?: React.ReactNode
      backgroundBlur?: number
      backgroundOpacity?: number
      showBackground?: boolean
      css?: CSSProps
      opacity?: number
      scaleOnTap?: boolean
      gradient?: string
    }
> = ({ children, css, opacity, scaleOnTap, gradient, ...props }) => {
  const [hover, setHover] = useState(true)
  const { ref, handleMouse, SpotLight, setTap } = useSpotLight({
    opacity,
    scaleOnTap,
    gradient,
  })
  return (
    <Wrapper
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => (setHover(false), setTap(false))}
      onMouseMove={handleMouse}
      onMouseDown={() => setTap(true)}
      css={css}
      {...props}
    >
      {children}
      <AnimatePresence>{hover && SpotLight}</AnimatePresence>
    </Wrapper>
  )
}

const variants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      type: `tween`,
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      type: `tween`,
      duration: 0.8,
    },
  },
}
