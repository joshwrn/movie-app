import type { FC } from "react"
import React from "react"

import { device } from "@styles/devices"
import { SectionTitle } from "@styles/textStyles"
import { formatRuntime } from "@utils/formatRuntime"
import styled from "styled-components"

const Info: FC<{ runtime: number; overview: string }> = ({
  runtime,
  overview,
}) => {
  const time = formatRuntime(runtime)
  return (
    <InfoContainer>
      <RatingContainer>
        <RatingText>PG-13</RatingText>
        <RatingText>{time}</RatingText>
      </RatingContainer>
      <StoryLineContainer>
        <SectionTitle>Storyline</SectionTitle>
        <StoryLine>{overview}</StoryLine>
      </StoryLineContainer>
    </InfoContainer>
  )
}

const InfoContainer = styled.div`
  display: flex;
  gap: 60px;
  width: 100%;
  @media ${device.mobile} {
    flex-direction: column;
  }
`

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 24px;
  white-space: nowrap;
`

const RatingText = styled.p`
  font-size: 36px;
  font-weight: 700;
  color: var(--font-color-primary);
`

// Storyline

const StoryLineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const StoryLine = styled.p`
  line-height: 30px;
  font-size: 20px;
  color: var(--font-color-secondary);
`

export default Info
