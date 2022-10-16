import type { FC } from "react"
import React, { useState } from "react"

import type { MovieReviewTypes } from "@customTypes/MovieTypes"
import { getBackdropImage, getImage } from "@lib/tmdb"
import { CircleWithNumber } from "@reusable/CircleWithNumber"
import { device } from "@styles/devices"
import { trimContent } from "@utils/strings"
import { ColorExtractor } from "react-color-extractor"
import styled from "styled-components"

const checkFirstLetter = (string?: string | null): boolean => {
  if (!string) return true
  return string.charAt(1) === `h` || string.charAt(0) === `h`
}

const ReviewCard: FC<{ review: MovieReviewTypes }> = ({ review }) => {
  const { content, author } = review.reviewInfo
  const { title, image: backdrop } = review
  const { rating, avatar_path } = review.reviewInfo.author_details

  const [color, setColor] = useState([])

  const avatar = checkFirstLetter(avatar_path)
    ? `https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png`
    : getImage(`w185`, avatar_path)
  const overview = trimContent(content, 123)
  return (
    <ReviewContainer color={color[0]}>
      <InfoContainer>
        <TopSection>
          <Details>
            <Avatar src={avatar} />
            <Author>{author}</Author>
          </Details>
          <CircleWithNumber
            number={rating}
            progress={rating * 10}
            accentColors={color}
            size="65px"
            fontSize={18}
            stroke={5}
          />
        </TopSection>
        <Title>{title}</Title>
        <Content>{overview}</Content>
      </InfoContainer>
      <BlackGradient />
      <Gradient color={color[0]} />
      <ColorExtractor
        src={getBackdropImage(`w300`, backdrop)}
        getColors={(colors: string[]) => setColor([colors[0], colors[1]])}
      />
      <BackgroundImage src={getBackdropImage(`w1280`, backdrop)} />
    </ReviewContainer>
  )
}

const ReviewContainer = styled.div`
  display: flex;
  font-size: 18px;
  flex: 1;
  min-width: 360px;
  height: 550px;
  border-radius: 18px;
  position: relative;
  background: ${({ color }) => color};
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
  @media ${device.tablet} {
    width: 100%;
    flex-shrink: 0;
    flex: 0;
    :not(:first-child) {
      margin-top: 30px;
    }
    &:hover {
      transform: translateY(0);
    }
  }
`

const TopSection = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  min-height: 200px;
  justify-content: center;
  bottom: 0;
  z-index: 3;
  font-size: 18px;
  padding: 0 36px 50px 36px;
  gap: 24px;
`

const Details = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 15px;
`

const Author = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: var(--font-color-content-secondary);
`
const Title = styled.p`
  font-size: 23px;
  font-weight: bold;
  color: var(--font-color-content-primary);
`

const Avatar = styled.img`
  width: 86px;
  height: 86px;
  border-radius: 100%;
  object-fit: cover;
  object-position: center;
`

const Content = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;
  color: var(--font-color-content-secondary);
`

const Gradient = styled.div`
  position: absolute;
  background: linear-gradient(
    180deg,
    rgba(6, 5, 30, 0) 0%,
    ${({ color }) => color} 100%
  );
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 80%;
`

const BlackGradient = styled.div`
  position: absolute;
  background: var(--review-card-gradient);
  border-radius: 16px;
  z-index: 2;
  width: 100%;
  height: 100%;
`

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
  object-fit: cover;
  object-position: center;
  height: 80%;
  border-radius: 18px 18px 0 0;
`

export default ReviewCard
