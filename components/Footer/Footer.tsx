import type { FC } from "react"
import React from "react"

import styled from "styled-components"

import { device } from "~/styles/devices"

const Footer: FC = () => {
  return (
    <FooterContainer>
      <SectionContainer>
        <Logo
          src={`https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg`}
        />
        <SmallText>Used the TMDB API</SmallText>
      </SectionContainer>
      <SectionContainer>
        <SmallText>Designed By Josh Warren</SmallText>
        <NormalText>
          Built with Next.js, MongoDB, GraphQL, React.js, Styled Components.
        </NormalText>
      </SectionContainer>
      <SectionContainer>
        <LinksContainer>
          <SmallText>Full Portfolio</SmallText>
          <a target="_blank" href="https://joshw.io" rel="noopener noreferrer">
            <BoldText>joshw.io</BoldText>
          </a>
        </LinksContainer>
      </SectionContainer>
    </FooterContainer>
  )
}

const FooterContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  height: 400px;
  padding-bottom: 150px;
  @media ${device.tablet} {
    flex-direction: column;
    align-items: center;
    height: fit-content;
    gap: 50px;
    padding: 100px 0;
    p {
      text-align: center;
    }
  }
`

const Text = styled.p`
  color: var(--font-color-primary);
  font-weight: 400;
`

const SmallText = styled(Text)`
  font-size: 14px;
  color: var(--font-color-secondary);
`

const NormalText = styled(Text)`
  font-size: 24px;
  line-height: 30px;
`

const BoldText = styled(Text)`
  font-size: 24px;
`

const Logo = styled.img``

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  gap: 10px;
`

const LinksContainer = styled(SectionContainer)`
  gap: 0;
`

export default Footer
