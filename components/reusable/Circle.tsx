import type { FC } from "react"
import React, { useState, useEffect } from "react"

import styled from "styled-components"

interface Props {
  radius: number
  stroke: number
  progress: number
  accentColors: string[]
}

const CircularProgress: FC<Props> = ({
  radius,
  stroke,
  progress,
  accentColors,
}) => {
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashOffset = circumference - (progress / 100) * circumference

  const gradientId = `movie-rating-gradient-${accentColors[0]}-${accentColors[1]}`

  return (
    <svg height={radius * 2} width={radius * 2}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={accentColors[1]} />
          <stop offset="100%" stopColor={accentColors[0]} />
        </linearGradient>
      </defs>
      <BackgroundCircle
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ` ` + circumference}
        stroke-width={stroke}
        r={normalizedRadius > 0 ? normalizedRadius : 0}
        cx={radius}
        cy={radius}
        strokeDashoffset={0}
      />
      <Circle
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ` ` + circumference}
        stroke-width={stroke}
        stroke={`url(#${gradientId})`}
        r={normalizedRadius > 0 ? normalizedRadius : 0}
        cx={radius}
        cy={radius}
        strokeDashoffset={strokeDashOffset}
        strokeLinecap="round"
      />
    </svg>
  )
}

const Circle = styled.circle`
  transition: stroke-dashoffset 1s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
`

const BackgroundCircle = styled(Circle)`
  stroke: var(--circle-background);
`

export default CircularProgress
