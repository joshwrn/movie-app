import React, { useRef } from 'react'
import styled from 'styled-components'
import CircularProgress from './Circle'

export const CircleWithNumber = ({
  number,
  accentColors,
  fontSize = 30,
  progress,
  rounded = true,
  size = '100px',
  cursor = 'pointer',
  stroke = 4,
}: {
  number: number
  progress: number
  accentColors: string[]
  fontSize?: number
  rounded?: boolean
  size?: string
  cursor?: string
  stroke?: number
}) => {
  const circleRef = useRef<HTMLDivElement>(null)
  const [radius, setRadius] = React.useState(0)
  React.useEffect(() => {
    if (circleRef.current) {
      const width = circleRef.current.offsetWidth
      const height = circleRef.current.offsetHeight
      setRadius(width > height ? height / 2 : width / 2)
    }
  }, [circleRef])
  return (
    <Wrapper ref={circleRef} size={size} cursor={cursor}>
      <h3
        style={{
          fontSize,
        }}
      >
        {rounded ? Math.round(number) : number}
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
