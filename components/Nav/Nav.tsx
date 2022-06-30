import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { device } from '@styles/devices'

const Nav = ({ top }: { top: string }) => {
  return (
    <NavWrapper top={top}>
      <StyledNav top={top}>
        <Link href={`/`} passHref>
          <p>Home</p>
        </Link>
        <p>Popular</p>
        <p>Genres</p>
        <p>User</p>
        <p>Search</p>
        <Blur top={top} />
      </StyledNav>
    </NavWrapper>
  )
}

const NavWrapper = styled.div<{ top: string }>`
  display: flex;
  width: 100vw;
  margin-top: ${({ top }) => (top === 'false' ? '20px' : '58px')};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: margin-top ${({ top }) => (top === 'false' ? '0.55s' : '.35s')}
    ease-in-out;
`

const StyledNav = styled.nav<{ top: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  > p {
    color: ${({ theme, top }) =>
      theme.type === 'light' && top === 'true'
        ? 'white'
        : 'var(--font-color-primary)'};
    font-size: 18px;
    cursor: pointer;
  }
  width: 630px;
  height: 60px;
  overflow: hidden;
  border-radius: 18px;
  gap: 70px;
  background-color: ${({ top }) =>
    top === 'false' ? 'var(--nav-background)' : 'transparent'};
  @media ${device.tablet} {
    width: 100%;
    margin: 0 45px;
    gap: 10px;
    justify-content: space-around;
    padding: 0 var(--padding-h);
  }
`

const Blur = styled.div<{ top: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${({ top }) => (top === 'false' ? 1 : 0)};
  backdrop-filter: blur(30px);
  z-index: -1;
`

export default Nav
