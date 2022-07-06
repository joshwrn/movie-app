import { AnimatePresence, motion } from 'framer-motion'
import React, { FC, useState } from 'react'
import styled from 'styled-components'

const useTooltip = (): [
  FC<{ children: React.ReactNode }>,
  (e: React.MouseEvent) => void,
  React.Dispatch<React.SetStateAction<boolean>>,
  boolean
] => {
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)
  const handleMouseMove = (e: React.MouseEvent) => {
    const node = e.target as HTMLElement
    const closestDiv = node.closest('div')
    const bounds = closestDiv.getBoundingClientRect()
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
  return [Tooltip, handleMouseMove, setHover, hover]
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
