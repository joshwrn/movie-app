import React, { useRef, useState } from 'react'
import styled from 'styled-components'

const Tooltip = ({ children }: { children: React.ReactNode }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const tooltipRef = useRef<HTMLDivElement>(null)
  return (
    <TooltipContainer
      onMouseMove={(e) => {
        const node = e.target as HTMLElement
        const bounds = node.getBoundingClientRect()
        setCoords({
          x: e.clientX - bounds.left,
          y: e.clientY - bounds.top,
        })
      }}
      ref={tooltipRef}
    >
      <StyledTooltip x={coords.x} y={coords.y}>
        {children}
      </StyledTooltip>
    </TooltipContainer>
  )
}
const StyledTooltip = styled.div<{ x: number; y: number }>`
  background: var(--nav-background);
  border: 1px solid var(--border-color-primary);
  backdrop-filter: blur(20px);
  border-radius: 15px;
  padding: 10px 20px;
  height: fit-content;
  z-index: 1;
  opacity: 0;
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  transition: opacity 0.5s ease-in-out;
  pointer-events: none;
`
const TooltipContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  font-size: 16px;
  &:hover {
    ${StyledTooltip} {
      opacity: 1;
    }
  }
`

export default Tooltip
