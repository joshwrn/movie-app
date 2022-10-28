import type { FC } from "react"
import React, { useRef, useCallback } from "react"

import { motion } from "framer-motion"
import styled from "styled-components"

export const SpotLightContainer = styled.div`
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
  opacity: 0.5;
`

const SpotLightComponent: FC<{
  coords: { x: number; y: number }
  scale: number
  tap: boolean
}> = ({ coords, scale, tap }) => {
  return (
    <SpotLightContainer>
      <StyledSpotLight
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        custom={{ coords, scale, tap }}
      />
    </SpotLightContainer>
  )
}
export const useSpotLight = ({
  action,
  scaleOnTap,
}: {
  action?: VoidFunction
  scaleOnTap?: boolean
  hover?: boolean
}): {
  SpotLight: JSX.Element
  ref: React.RefObject<HTMLDivElement>
  handleMouseClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  setTap: React.Dispatch<React.SetStateAction<boolean>>
} => {
  const ref = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = React.useState({ x: 0, y: 0 })
  const [scale, setScale] = React.useState(0.8)
  const [tap, setTap] = React.useState(false)
  const handleMouseClick = useCallback(
    (e: React.MouseEvent) => {
      const element = ref.current
      if (!element) return
      const bounds = element.getBoundingClientRect()
      const height = element.offsetHeight
      const width = element.offsetWidth
      const x = e.clientX - bounds.left - width / 2
      const y = e.clientY - bounds.top - height / 2
      setCoords({ x, y })
      action?.()
      const newScale = Math.sqrt(x * x + y * y * 15) / (width / 4)
      setScale(newScale > 0.8 ? newScale : 0.8)
    },
    [ref.current, setCoords, setScale]
  )
  const SpotLight = (
    <SpotLightComponent coords={coords} scale={scale} tap={tap} />
  )
  return { SpotLight, handleMouseClick, ref, setTap }
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
