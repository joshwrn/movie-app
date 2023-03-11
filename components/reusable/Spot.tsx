import type { FC } from "react"
import React, { useRef, useCallback } from "react"

import type { MotionProps, Variants } from "framer-motion"
import { motion } from "framer-motion"
import styled from "styled-components"

const DEFAULT_GRADIENT = `radial-gradient(
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
  )`

export const SpotLightContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  /* background: rgb(0, 0, 0); */
  background: red;
  border-radius: 21px;
  overflow: hidden;
  z-index: -15;
  mix-blend-mode: screen;
`
const BorderSpotLight = styled(motion.div)`
  opacity: 1;
  background: radial-gradient(
    closest-side,
    rgba(255, 255, 255, 1) 50%,
    transparent 100%
  );
  position: absolute;
  pointer-events: none;
  z-index: -1;
  aspect-ratio: 1/1;
`
const HideBorderGradient = styled(motion.div)`
  position: absolute;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  background: black;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`
const MiddleGradient = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 80%;
  background: black;
  pointer-events: none;
  z-index: 5;
`

const SpotLightComponent: FC<
  MotionProps & {
    blur: number
    gradient?: string
    coords: Coords
    timesTaller: number
    scale: number
    gradientBlur: number
  }
> = ({ blur, timesTaller, coords, gradient, scale, gradientBlur, ...props }) => {
  return (
    <SpotLightContainer>
      <BorderSpotLight
        style={{
          width: `${timesTaller * 70}%`,
        }}
        {...props}
      />
      <HideBorderGradient>
        <MiddleGradient
          style={{
            filter: `blur(${gradientBlur}px)`,
          }}
        />
      </HideBorderGradient>
      <motion.div
        {...props}
        style={{
          position: `absolute`,
          width: `100%`,
          aspectRatio: `3/2`,
          borderRadius: `20px`,
          background: gradient ?? DEFAULT_GRADIENT,
          x: coords.x,
          y: coords.y,
          filter: `blur(${blur}px)`,
        }}
      />
    </SpotLightContainer>
  )
}
export type Coords = { x: number; y: number }
export type Dimensions = { width: number; height: number }
interface SpotLightProps {
  action: VoidFunction
  scaleOnTap: boolean
  defaultScale: number
  opacity: number
  blur: number
  ground: string
  gradient: string
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
  opacity = 0.1,
  gradient,
}: Partial<SpotLightProps>): SpotLightReturn => {
  const ref = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = React.useState({ x: 0, y: 0 })
  const [scale, setScale] = React.useState(defaultScale)
  const [blur, setBlur] = React.useState(30)
  const [gradientBlur, setGradientBlur] = React.useState(30)
  const [tap, setTap] = React.useState(false)
  const [timesTaller, setTimesTaller] = React.useState(1)
  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const element = ref.current
      if (!element) return
      const bounds = element.getBoundingClientRect()
      const height = element.offsetHeight
      const width = element.offsetWidth
      const larger =
        height >= width
          ? { side: `height`, value: height }
          : { side: `width`, value: width }
      const area = width * height

      const x = e.clientX - bounds.left - width / 2
      const y = e.clientY - bounds.top - height / 2
      setCoords({ x, y })
      const scale = x * x + y * y * 2
      const newScale = Math.sqrt(scale) / (larger.value / 4)
      const adjustedScale = newScale > 0.8 ? newScale : 0.8

      setBlur(area / (4 * adjustedScale * Math.sqrt(area)))
      setGradientBlur(area / (Math.PI * 1.5 * Math.sqrt(area)))
      setScale(adjustedScale)
      const divided = height / width

      setTimesTaller(divided > 1 ? divided : 1)
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
      custom={{ coords, scale, tap, opacity, scaleOnTap }}
      blur={blur}
      gradientBlur={gradientBlur}
      scale={scale}
      coords={coords}
      gradient={gradient}
      timesTaller={timesTaller}
    />
  )
  return { SpotLight, handleMouse, ref, setTap }
}

interface VariantProps {
  coords: Coords
  scale: number
  tap: boolean
  opacity: number
  scaleOnTap: boolean
}
const variants: Variants = {
  initial: ({ coords, scale }: VariantProps) => ({
    opacity: 0,
    x: coords.x,
    y: coords.y,
    scale,
  }),
  animate: ({ coords, scale, tap, scaleOnTap, opacity }: VariantProps) => ({
    x: coords.x,
    y: coords.y,
    scale: tap && scaleOnTap ? 4 : scale,
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
