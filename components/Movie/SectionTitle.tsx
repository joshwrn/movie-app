import React from 'react';
import styled from 'styled-components';

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return <StyledSectionTitle>{children}</StyledSectionTitle>;
};

const StyledSectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;

export default SectionTitle;
