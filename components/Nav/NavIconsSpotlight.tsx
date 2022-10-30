/* eslint-disable max-lines */
import type { FC } from "react"
import React from "react"

import type { Coords } from "@reusable/SpotLight"
import { StyledSpotLight, SpotLightContainer } from "@reusable/SpotLight"
import type { Variants } from "framer-motion"
import { atom, useRecoilValue } from "recoil"
import styled, { css } from "styled-components"

export const spotLightCoordsState = atom({
  key: `spotLightCoords`,
  default: { x: 0, y: 0 },
})

export const NavSpotlight: FC = () => {
  const coords = useRecoilValue(spotLightCoordsState)
  const ref = React.useRef<HTMLDivElement>(null)
  return (
    <OverflowContainer>
      <SpotLightContainer
        css={css`
          filter: blur(6px);
        `}
        ref={ref}
      >
        <StyledSpotLight
          initial="initial"
          animate="animate"
          exit="exit"
          variants={spotlightVariants}
          custom={{ coords: coords }}
        />
      </SpotLightContainer>
    </OverflowContainer>
  )
}

const OverflowContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  left: 0;
  top: 0;
  border-radius: 18px;
  z-index: 6;
`
const spotlightVariants: Variants = {
  initial: ({ coords }: { coords: Coords }) => ({
    opacity: 0,
    y: coords.y,
    x: coords.x,
    scaleX: 0.1,
    scaleY: 0.8,
  }),
  animate: ({ coords }: { coords: Coords }) => ({
    y: coords.y,
    x: coords.x,
    opacity: 0.7,
    scaleX: 0.1,
    scaleY: 0.1,
    transition: {
      type: `spring`,
      damping: 22,
      stiffness: 300,
      opacity: {
        type: `tween`,
        duration: 0.2,
      },
    },
  }),
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      type: `tween`,
      duration: 0,
    },
  },
}

// set coords example

// onClick={() => {
//     if (ref.current && navRef?.current) {
//       const icon = ref.current
//       const nav = navRef.current
//       const bounds = icon.getBoundingClientRect()
//       const navBounds = nav.getBoundingClientRect()
//       setSpotLightCoords({
//         x:
//           bounds.x - navBounds.left - navBounds.width / 2 + bounds.width / 2,
//         y: bounds.y - navBounds.top + navBounds.height / 2 - bounds.height,
//       })
//     }
//   }}
