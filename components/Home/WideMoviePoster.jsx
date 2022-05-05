import React from 'react';
import styled from 'styled-components';

const WideMoviePoster = ({ src, title }) => {
  return (
    <WidePosterContainer>
      <WidePosterTitleContainer>
        <WidePosterTitle>{title}</WidePosterTitle>
      </WidePosterTitleContainer>
      <WidePosterGradient />
      <WidePosterImage src={src} />
    </WidePosterContainer>
  );
};
const WidePosterContainer = styled.div`
  width: 532px;
  height: 299px;
  border-radius: 18px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  cursor: pointer;
  user-select: none;
`;

const WidePosterTitleContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 1;
  padding: 32px 40px;
`;

const WidePosterTitle = styled.p`
  color: ${({ theme }) => theme.fontColor.primary};
  font-size: 20px;
`;

const WidePosterGradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 32.57%, #000000 100%);
`;

const WidePosterImage = styled.img`
  position: absolute;
  width: 100%;
  top: 0;
  height: 100%;
  z-index: -1;
`;

export default WideMoviePoster;
