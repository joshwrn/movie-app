import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { device } from '@styles/devices'
import { AnimatePresence } from 'framer-motion'

import { Moon, Sun } from './NavIcons'
import { useRouter } from 'next/router'

const Nav = ({
  top,
  setCurrentTheme,
  currentTheme,
}: {
  top: string
  currentTheme: string
  setCurrentTheme: Dispatch<SetStateAction<string>>
}) => {
  const router = useRouter()
  return (
    <NavWrapper top={top}>
      <StyledNav path={router.pathname} top={top}>
        <Link href={`/`} passHref>
          <p>Home</p>
        </Link>
        <p>Popular</p>
        <p>User</p>
        <p>Search</p>
        <IconContainer
          onClick={() =>
            setCurrentTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
          }
        >
          <AnimatePresence exitBeforeEnter>
            {currentTheme === 'dark' && <Moon key="moon" />}
            {currentTheme === 'light' && <Sun key="sun" />}
          </AnimatePresence>
        </IconContainer>
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
const StyledNav = styled.nav<{ top: string; path: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  > p {
    color: ${({ theme, top, path }) =>
      theme.type === 'light' && top === 'true' && path === '/'
        ? 'white'
        : 'var(--font-color-primary)'};
    font-size: 18px;
    cursor: pointer;
  }
  > div {
    cursor: pointer;
  }
  width: fit-content;
  padding: 0 70px;
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
  svg {
    fill: ${({ theme, top, path }) =>
      theme.type === 'light' && top === 'true' && path === '/'
        ? 'white'
        : 'var(--font-color-primary)'};
  }
`
const IconContainer = styled.div`
  cursor: pointer;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
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
