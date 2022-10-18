import type { FC } from "react"
import React from "react"

import type { PersonSocials } from "@customTypes/PersonTypes"
import { StandardText } from "@styles/textStyles"
import { createValidSocialLink } from "@utils/createValidSocialLink"
import styled from "styled-components"

const urls = {
  instagram: `https://www.instagram.com/`,
  twitter: `https://www.twitter.com/`,
  imdb: `https://www.imdb.com/name/`,
  facebook: `https://www.facebook.com/`,
}

const PersonSocialLinks: FC<{ socials: PersonSocials }> = ({ socials }) => {
  const validSocials = [
    createValidSocialLink(`Instagram`, socials.instagram_id, urls),
    createValidSocialLink(`Twitter`, socials.twitter_id, urls),
    createValidSocialLink(`Facebook`, socials.facebook_id, urls),
    createValidSocialLink(`IMDB`, socials.imdb_id, urls),
  ]

  return (
    <SocialsContainer>
      {validSocials.map(
        ({ name, url }) =>
          url && (
            <StyledText as="a" key={url} href={url} target="_blank">
              {name}
            </StyledText>
          )
      )}
    </SocialsContainer>
  )
}

const SocialsContainer = styled.div`
  display: flex;
  gap: 30px;
`
const StyledText = styled(StandardText).attrs({
  as: `a`,
})`
  font-size: 20px;
  font-weight: bold;
  color: var(--font-color-primary);
`

export default PersonSocialLinks
