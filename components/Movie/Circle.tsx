import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

interface Props {
  radius: number
  stroke: number
  progress: number
  accentColor: string[]
}

const CircularProgress = ({ radius, stroke, progress, accentColor }: Props) => {
  const [normalizedRadius, setNormalizedRadius] = useState(0)
  const [circumference, setCircumference] = useState(0)
  const [strokeDashOffset, setStrokeDashOffset] = useState(0)

  useEffect(() => {
    setNormalizedRadius(radius - stroke * 2)
  }, [radius, stroke])

  useEffect(() => {
    setCircumference(normalizedRadius * 2 * Math.PI)
  }, [normalizedRadius])

  useEffect(() => {
    setStrokeDashOffset(circumference - (progress / 100) * circumference)
  }, [circumference, progress])

  return (
    <svg height={radius * 2} width={radius * 2}>
      <defs>
        <linearGradient
          id="movie-rating-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stop-color={accentColor[1]} />
          <stop offset="100%" stop-color={accentColor[0]} />
        </linearGradient>
      </defs>
      <BackgroundCircle
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        stroke-width={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        strokeDashoffset={0}
      />
      <Circle
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        stroke-width={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        strokeDashoffset={strokeDashOffset}
      />
    </svg>
  )
}

const Circle = styled.circle<{ strokeDashoffset: number }>`
  stroke-dashoffset: ${({ strokeDashOffset }) => strokeDashOffset};
  transition: stroke-dashoffset 1s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  stroke: url(#movie-rating-gradient);
`

const BackgroundCircle = styled(Circle)`
  stroke: #2e2e2e;
`

export default CircularProgress
