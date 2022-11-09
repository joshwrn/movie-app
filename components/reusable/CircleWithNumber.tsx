import type { FC } from "react"
import React, { useMemo, useRef } from "react"

import styled from "styled-components"

import CircularProgress from "./Circle"

export const CircleWithNumber: FC<{
  number: number
  progress?: number
  accentColors: string[]
  fontSize?: number
  rounded?: boolean
  size?: string
  cursor?: string
  stroke?: number
}> = ({
  number,
  accentColors,
  fontSize = 30,
  progress = number * 10,
  rounded = true,
  size = `100px`,
  cursor = `pointer`,
  stroke = 4,
}) => {
  const circleRef = useRef<HTMLDivElement>(null)
  const radius = useMemo(() => {
    if (size === `100%` && circleRef.current) {
      const width = circleRef.current.offsetWidth
      const height = circleRef.current.offsetHeight
      return width > height ? height / 2 : width / 2
    }
    return parseInt(size) / 2
  }, [circleRef, size])
  return (
    <Wrapper ref={circleRef} size={size} cursor={cursor}>
      <h3
        style={{
          fontSize,
        }}
      >
        {rounded ? Math.round(number) : number?.toFixed(1)}
      </h3>
      <CircularProgress
        radius={radius}
        stroke={stroke}
        progress={progress > 100 ? 100 : progress}
        accentColors={accentColors}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div<{ size: string; cursor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-shrink: 0;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  cursor: ${({ cursor }) => cursor};
  h3 {
    position: absolute;
    font-weight: bold;
  }
`
