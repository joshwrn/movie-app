import type { FC } from "react"
import React from "react"

import { Backdrop, BackdropGradient } from "@styles/Backdrop"
import styled from "styled-components"

const HeroContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100%;
  position: relative;
`
const Avatar = styled.img`
  width: 300px;
  height: 300px;
  position: relative;
  object-fit: cover;
  border-radius: 100%;
`

export const Hero: FC = () => {
  return (
    <HeroContainer>
      <Avatar src="https://image.tmdb.org/t/p/w185/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg" />
      <BackdropGradient />
      <Backdrop src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80" />
    </HeroContainer>
  )
}
