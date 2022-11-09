import type { FC } from "react"
import React, { useState } from "react"

import type { MotionProps } from "framer-motion"
import { AnimatePresence, motion } from "framer-motion"
import type { FlattenInterpolation, ThemeProps } from "styled-components"
import styled from "styled-components"

import { Link } from "./Link"
import { StyledSpotLight, useSpotLight } from "./SpotLight"

export type CSSProps = FlattenInterpolation<ThemeProps<unknown>> | undefined

const Wrapper = styled(motion.div)<{ css: CSSProps }>`
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
      css?: CSSProps
      link?: string
      blur?: number
    }
> = ({ children, css, link, blur, ...props }) => {
  const [hover, setHover] = useState(false)
  const { ref, handleMouse, SpotLight, setTap } = useSpotLight({ blur })
  const Inner = (
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
  if (!link) return Inner
  return (
    <Link passHref href={link}>
      {Inner}
    </Link>
  )
}
