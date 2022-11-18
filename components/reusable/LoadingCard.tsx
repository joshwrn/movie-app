import type { FC } from "react"
import React from "react"

import styled from "styled-components"

export const LOADING_COLORS = [`#242424`, `#0f0f0f`]

export const LoadingCard: FC = () => {
  return <Inner color1={LOADING_COLORS[0]} color2={LOADING_COLORS[1]}></Inner>
}

const Inner = styled.div<{ color1: string; color2: string }>`
  cursor: pointer;
  flex: 1;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${({ color1, color2 }) => `linear-gradient(
    180deg,
    ${color1} 50%,
    ${color2} 100%
    );`};
  padding-bottom: 150%;
  border-radius: 18px;
`
