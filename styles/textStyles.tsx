import { device } from "@styles/devices"
import styled from "styled-components"

export const LargeHeading = styled.h1`
  font-size: 64px;
  font-weight: 700;
  color: var(--font-color-primary);
  @media ${device.tablet} {
    text-align: center;
  }
`

export const StandardText = styled.p`
  position: relative;
  line-height: 30px;
  font-size: 20px;
  color: var(--font-color-secondary);
  span {
    font-weight: bold;
  }
`

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
`
