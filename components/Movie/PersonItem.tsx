import type { FC } from "react"
import React from "react"

import { getProfileImage } from "@lib/tmdb"
import { SpotlightItem } from "@reusable/SpotlightItem"
import { getFirstRole } from "@utils/getFirstRole"
import styled, { css } from "styled-components"

export const PersonItem: FC<{
  name: string
  role: string
  id: number
  profilePath: string
}> = ({ role, name, profilePath, id }) => {
  return (
    <SpotlightItem link={`/person/${id}`} css={PersonItemContainer}>
      <PersonImage src={getProfileImage(`w185`, profilePath)} />
      <PersonInfoContainer>
        <PersonName>{name}</PersonName>
        <PersonRole>{getFirstRole(role)}</PersonRole>
      </PersonInfoContainer>
    </SpotlightItem>
  )
}

const PersonItemContainer = css`
  width: 100%;
  max-width: 300px;
  gap: 20px;
  padding: 10px;
  cursor: pointer;
  border-radius: 18px;
  background-color: none;
  transition: background-color 0.35s, transform 0.35s;
  &:hover {
    transform: translateY(-2px);
  }
`
const PersonImage = styled.img`
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  object-fit: cover;
`
const PersonInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const PersonName = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: var(--font-color-primary);
`
const PersonRole = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: var(--font-color-secondary);
`
