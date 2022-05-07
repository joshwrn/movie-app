import React from 'react';
import styled from 'styled-components';

const Divider = () => {
  return <StyledDivider />;
};

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  opacity: 0.25;
  background-color: ${({ theme }) => theme.fontColor.secondary};
`;

export default Divider;