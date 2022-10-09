import { AnimatePresence } from 'framer-motion'
import React, { FC, useState } from 'react'
import styled from 'styled-components'

const useTooltip = (): {
  Tooltip: FC<{ children: React.ReactNode }>
  handleMouseMove: (e: React.MouseEvent) => void
  setHover: React.Dispatch<React.SetStateAction<boolean>>
  hover: boolean
  ref: React.RefObject<HTMLDivElement>
} => {
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  const handleMouseMove = (e: React.MouseEvent) => {
    const node = e.target as HTMLElement
    const designatedElement = ref.current
    const closest = designatedElement ?? node
    const bounds = closest.getBoundingClientRect()
    setCoords({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    })
  }
  const Tooltip = ({ children }: { children: React.ReactNode }) => {
    return (
      <AnimatePresence>
        {hover && (
          <StyledTooltip x={coords.x} y={coords.y}>
            {children}
          </StyledTooltip>
        )}
      </AnimatePresence>
    )
  }
  return { Tooltip, handleMouseMove, setHover, hover, ref }
}

const StyledTooltip = styled.div<{
  x: number
  y: number
}>`
  background: var(--nav-background);
  border: 1px solid var(--border-color-primary);
  backdrop-filter: blur(20px);
  border-radius: 15px;
  padding: 10px 20px;
  height: fit-content;
  z-index: 1;
  opacity: 1;
  position: absolute;
  opacity: 1;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  transition: opacity 0.5s ease-in-out;
  pointer-events: none;
  font-size: 16px;
  z-index: 10;
  white-space: nowrap;
`

export default useTooltip
