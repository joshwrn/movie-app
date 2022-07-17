import React from 'react'
import styled from 'styled-components'

const Divider = () => {
  return <StyledDivider className="divider" />
}

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  opacity: 0.25;
  background-color: var(--font-color-secondary);
`

export default Divider
