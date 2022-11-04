import type { FC } from "react"
import React from "react"

import styled, { css, CSSProp } from "styled-components"
import type { FlattenSimpleInterpolation } from "styled-components"
import { CSSProps, SpotlightItem } from "./SpotlightItem"

const TextPill: FC<{
  children: React.ReactNode
  styledCSS?: FlattenSimpleInterpolation
}> = ({ children, styledCSS }) => {
  
  return (
    <SpotlightItem css={css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 40px;
    border-radius: 1000px;
    border-color: var(--font-color-secondary);
    opacity: 0.8;
    cursor: pointer;
    word-break: keep-all;
    white-space: nowrap;
    transition: border-color 0.4s ease-in-out;
    &:hover {
     border-color: var(--font-color-primary);
    } 
    ${styledCSS}
     `}>
      <PillText>{children}</PillText>
  </SpotlightItem>
  )
}



const PillText = styled.span`
  font-size: 16px;
  color: var(--font-color-primary);
  font-weight: 700;
  position: relative;
`

export default TextPill
