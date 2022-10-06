import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { device } from '@styles/devices'
import { motion, AnimatePresence } from 'framer-motion'
import { IoSearch } from 'react-icons/io5'

import { Moon, Sun } from './NavIcons'
import { useRouter } from 'next/router'
import { SearchBar, searchBarIsOpenState } from './SearchBar'
import { useRecoilState } from 'recoil'
import { useOutsideClick } from '@hooks/useOutsideClick'
import { currentThemeState } from '@styles/theme'

const Nav = ({ top }: { top: string }) => {
  const [searchBarIsOpen, setSearchBarIsOpen] =
    useRecoilState(searchBarIsOpenState)
  const [currentTheme, setCurrentTheme] = useRecoilState(currentThemeState)
  const router = useRouter()
  const ref = useOutsideClick(() =>
    setSearchBarIsOpen(false)
  ) as React.RefObject<HTMLDivElement>
  return (
    <NavWrapper ref={ref} top={top}>
      <StyledNav path={router.pathname} top={top}>
        <AnimatePresence exitBeforeEnter>
          {searchBarIsOpen && <SearchBar key="search-bar" />}
          {!searchBarIsOpen && (
            <NavLinks
              initial="initial"
              animate="animate"
              exit="exit"
              variants={navLinkContainerVariants}
              path={router.pathname}
              top={top}
              key="nav-links"
            >
              <Link href={`/`} passHref>
                <p>Home</p>
              </Link>
              <p>Popular</p>
              <p>User</p>
              <IoSearch
                cursor="pointer"
                onClick={() => setSearchBarIsOpen(true)}
              />
            </NavLinks>
          )}
        </AnimatePresence>
        <IconContainer
          onClick={() =>
            setCurrentTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
          }
        >
          <AnimatePresence exitBeforeEnter>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '25px',
                width: '25px',
              }}
            >
              {currentTheme === 'dark' && <Moon key="moon" />}
              {currentTheme === 'light' && <Sun key="sun" />}
            </div>
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
  > svg {
    width: 21px;
    height: 21px;
  }
  > p {
    color: ${({ theme, top, path }) =>
      theme.type === 'light' && top === 'true' && path === '/'
        ? 'white'
        : 'var(--font-color-primary)'};
    font-size: 18px;
    cursor: pointer;
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
  border-radius: 18px;
`
const navLinkContainerVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
}

export default Nav
