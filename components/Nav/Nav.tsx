import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { device } from '@styles/devices'
import { motion, AnimatePresence } from 'framer-motion'

import { Moon, Sun } from './NavIcons'
import { useRouter } from 'next/router'
import { SearchBar } from './SearchBar'

const Nav = ({
  top,
  setCurrentTheme,
  currentTheme,
}: {
  top: string
  currentTheme: string
  setCurrentTheme: Dispatch<SetStateAction<string>>
}) => {
  const [searchIsOpen, setSearchIsOpen] = React.useState(false)
  const router = useRouter()
  return (
    <NavWrapper top={top}>
      <StyledNav path={router.pathname} top={top}>
        <AnimatePresence exitBeforeEnter>
          {searchIsOpen && (
            <SearchBar key="search-bar" setSearchIsOpen={setSearchIsOpen} />
          )}
          {!searchIsOpen && (
            <NavLinks path={router.pathname} top={top}>
              <Link href={`/`} passHref>
                <p>Home</p>
              </Link>
              <p>Popular</p>
              <p>User</p>
              <p onClick={() => setSearchIsOpen(true)}>Search</p>
            </NavLinks>
          )}
        </AnimatePresence>

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
const NavLinks = styled(motion.div)<{ top: string; path: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 70px;
  width: 100%;
  > p {
    color: ${({ theme, top, path }) =>
      theme.type === 'light' && top === 'true' && path === '/'
        ? 'white'
        : 'var(--font-color-primary)'};
    font-size: 18px;
    cursor: pointer;
  }
  @media ${device.tablet} {
    gap: 10px;
  }
`
const StyledNav = styled.nav<{ top: string; path: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 658px;
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
