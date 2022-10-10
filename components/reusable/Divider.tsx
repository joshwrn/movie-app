import type { FC } from "react"
import React from "react"

import styled from "styled-components"

const Divider: FC = () => {
  return <StyledDivider className="divider" />
}

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  opacity: 0.25;
  background-color: var(--font-color-secondary);
`

export default Divider
