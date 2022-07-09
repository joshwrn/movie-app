import React, { useRef } from 'react'

import { LargeHeading, StandardText } from '@styles/textStyles'
import { getProfileImage } from '@lib/tmdb'
import { PersonDetails, PersonSocials } from '@customTypes/PersonTypes'
import CircularProgress from '@reusable/Circle'
import TextPill from '@reusable/TextPill'

import styled, { css } from 'styled-components'
import ExpandableText from '@reusable/ExpandableText'
import PersonSocialLinks from './PersonSocials'
import { formatISO } from '@utils/dates'
import DivWithTooltip from '@reusable/DivWithTooltip'
import { device } from '@styles/devices'

const getAccentColorByPopularity = (popularity: number) => {
  if (popularity > 100) {
    return ['#ff07ea', '#ff2b79']
  } else {
    return ['#6a07ff', '#aa2bff']
  }
}

const PersonInfo = ({
  details,
  socials,
}: {
  details: PersonDetails
  socials: PersonSocials
}) => {
  const circleRef = useRef<HTMLDivElement>(null)
  const accentColors = getAccentColorByPopularity(details.popularity)
  return (
    <Container>
      <Avatar src={getProfileImage('h632', details.profile_path)} />
      <InfoContainer>
        <LargeHeading>{details.name}</LargeHeading>
        <SubHeadingContainer>
          <DivWithTooltip text={'Popularity'}>
            <PopularityContainer ref={circleRef}>
              <h3>{Math.round(details.popularity)}</h3>
              <CircularProgress
                radius={
                  circleRef.current ? circleRef.current.clientWidth / 2 : 0
                }
                stroke={4}
                progress={details.popularity > 100 ? 100 : details.popularity}
                accentColor={accentColors}
              />
            </PopularityContainer>
          </DivWithTooltip>
          <DivWithTooltip text="Known For">
            <TextPill
              css={css`
                height: 45px;
              `}
            >
              {details.known_for_department}
            </TextPill>
          </DivWithTooltip>
        </SubHeadingContainer>
        <BornInfo>
          <span>Born </span>
          {formatISO(details.birthday) + ' in ' + details.place_of_birth}
        </BornInfo>
        <ExpandableText content={details.biography} length={250} />
        <PersonSocialLinks socials={socials} />
      </InfoContainer>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 200px;
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 75px;
  @media ${device.tablet} {
    flex-direction: column;
    align-items: center;
  }
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  flex-shrink: 0;
  gap: 30px;
  @media ${device.tablet} {
    width: 100%;
  }
`

const Avatar = styled.img`
  width: 350px;
  height: 350px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`
const SubHeadingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`

const PopularityContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100px;
  height: 100px;
  cursor: default;
  h3 {
    position: absolute;
    font-size: 30px;
    font-weight: bold;
  }
`
const BornInfo = styled(StandardText)`
  color: var(--font-color-primary);
`

export default PersonInfo
