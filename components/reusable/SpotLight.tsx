import type { FC } from "react"
import React, { useRef, useCallback } from "react"

import type { MotionProps, Variants } from "framer-motion"
import { motion } from "framer-motion"
import type { FlattenSimpleInterpolation } from "styled-components"
import styled from "styled-components"

export const SpotLightContainer = styled.div<{
  css?: FlattenSimpleInterpolation
}>`
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
  ${({ css }) => css}
`
export const StyledSpotLight = styled(motion.div)`
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
  position: absolute;
  pointer-events: none;
  width: 50%;
  height: 100%;
  z-index: -1;
`

const SpotLightComponent: FC<MotionProps> = ({ ...props }) => {
  return (
    <SpotLightContainer>
      <StyledSpotLight {...props} />
    </SpotLightContainer>
  )
}
export type Coords = { x: number; y: number }
interface SpotLightProps {
  action: VoidFunction
  scaleOnTap: boolean
  defaultScale: number
  opacity: number
}
interface SpotLightReturn {
  SpotLight: JSX.Element
  ref: React.RefObject<HTMLDivElement>
  handleMouse: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  setTap: React.Dispatch<React.SetStateAction<boolean>>
}

export const useSpotLight = ({
  action,
  scaleOnTap = true,
  defaultScale = 0.8,
  opacity = 0.25,
}: Partial<SpotLightProps>): SpotLightReturn => {
  const ref = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = React.useState({ x: 0, y: 0 })
  const [scale, setScale] = React.useState(defaultScale)
  const [tap, setTap] = React.useState(false)
  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const element = ref.current
      if (!element) return
      const bounds = element.getBoundingClientRect()
      const height = element.offsetHeight
      const width = element.offsetWidth
      const x = e.clientX - bounds.left - width / 2
      const y = e.clientY - bounds.top - height / 2
      setCoords({ x, y })

      const newScale = Math.sqrt(x * x + y * y * 15) / (width / 4)
      if (scaleOnTap) {
        setScale(newScale > 0.8 ? newScale : 0.8)
      }

      action?.()
    },
    [ref.current, setCoords, setScale]
  )
  const SpotLight = (
    <SpotLightComponent
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      custom={{ coords, scale, tap, opacity }}
    />
  )
  return { SpotLight, handleMouse, ref, setTap }
}

interface VariantProps {
  coords: Coords
  scale: number
  tap: boolean
  opacity: number
}
const variants: Variants = {
  initial: ({ coords, scale }: VariantProps) => ({
    opacity: 0,
    x: coords.x,
    y: coords.y,
    scale,
  }),
  animate: ({ coords, scale, tap, opacity }: VariantProps) => ({
    x: coords.x,
    y: coords.y,
    scale: tap ? 4 : scale,
    opacity: opacity,
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
