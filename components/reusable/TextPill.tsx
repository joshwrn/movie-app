import type { FC } from "react"
import React from "react"

import styled from "styled-components"
import type { FlattenSimpleInterpolation } from "styled-components"

const TextPill: FC<{
  children: React.ReactNode
  css?: FlattenSimpleInterpolation
}> = ({ children, css }) => {
  return (
    <Pill css={css}>
      <PillText>{children}</PillText>
    </Pill>
  )
}

const Pill = styled.div<{ css?: FlattenSimpleInterpolation }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 40px;
  border-radius: 1000px;
  border: 2px solid;
  border-color: var(--font-color-secondary);
  opacity: 0.8;
  cursor: pointer;
  word-break: keep-all;
  white-space: nowrap;
  transition: border-color 0.4s ease-in-out;
  &:hover {
    border-color: var(--font-color-primary);
  }
  ${({ css }) => css}
`

const PillText = styled.span`
  font-size: 16px;
  color: var(--font-color-primary);
  font-weight: 700;
  position: relative;
`

export default TextPill
