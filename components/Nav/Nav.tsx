import type { FC } from "react"
import React, { useEffect } from "react"

import { useOutsideClick } from "@hooks/useOutsideClick"
import { device } from "@styles/devices"
import { currentThemeState } from "@styles/theme"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/router"
import { AiOutlineUser, AiOutlineHome } from "react-icons/ai"
import { IoSearch } from "react-icons/io5"
import { MdOutlineWhatshot } from "react-icons/md"
import { useInView } from "react-intersection-observer"
import { atom, useRecoilState, useRecoilValue } from "recoil"
import styled from "styled-components"

import { Moon, Sun } from "./NavIcons"
import { SearchBar, searchBarIsOpenState } from "./SearchBar"

export const topScrollState = atom({
  key: `topScroll`,
  default: `true`,
})

const Nav: FC = () => {
  const [searchBarIsOpen, setSearchBarIsOpen] =
    useRecoilState(searchBarIsOpenState)
  const [currentTheme, setCurrentTheme] = useRecoilState(currentThemeState)
  const router = useRouter()
  const ref = useOutsideClick(() =>
    setSearchBarIsOpen(false)
  ) as React.RefObject<HTMLDivElement>
  const [top, setTop] = useRecoilState(topScrollState)

  const [topRef, topView] = useInView({
    threshold: 0.1,
  })

  useEffect(() => {
    if (topView) {
      setTop(`true`)
    } else {
      setTop(`false`)
    }
  }, [topView, setTop])

  return (
    <>
      <NavRef ref={topRef} />
      <NavWrapper ref={ref} top={top}>
        <StyledNav path={router.pathname} top={top}>
          <AnimatePresence exitBeforeEnter>
            {searchBarIsOpen && <SearchBar key="search-bar" />}
            {!searchBarIsOpen && (
              <>
                <NavItem svgSize={23}>
                  <Link href={`/`} passHref>
                    <AiOutlineHome />
                  </Link>
                </NavItem>
                <NavItem svgSize={23}>
                  <MdOutlineWhatshot />
                </NavItem>
                <NavItem svgSize={23}>
                  <AiOutlineUser />
                </NavItem>
                <NavItem>
                  <IoSearch
                    cursor="pointer"
                    onClick={() => setSearchBarIsOpen(true)}
                  />
                </NavItem>
                <IconContainer
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={navLinkContainerVariants}
                  onClick={() =>
                    setCurrentTheme((prev) =>
                      prev === `dark` ? `light` : `dark`
                    )
                  }
                  key="theme-icon"
                >
                  <AnimatePresence exitBeforeEnter>
                    <StyledNavItem svgSize={19}>
                      {currentTheme === `dark` && <Moon key="moon" />}
                      {currentTheme === `light` && <Sun key="sun" />}
                    </StyledNavItem>
                  </AnimatePresence>
                </IconContainer>
              </>
            )}
          </AnimatePresence>

          <Blur top={top} />
        </StyledNav>
      </NavWrapper>
    </>
  )
}

const NavItem = ({
  children,
  svgSize,
}: {
  children: React.ReactNode
  svgSize?: number
}) => {
  const router = useRouter()
  const top = useRecoilValue(topScrollState)
  return (
    <StyledNavItem
      initial="initial"
      animate="animate"
      exit="exit"
      variants={navLinkContainerVariants}
      path={router.pathname}
      top={top}
      svgSize={svgSize}
    >
      {children}
    </StyledNavItem>
  )
}

const StyledNavItem = styled(motion.div)<{
  top?: string
  path?: string
  svgSize?: number
}>`
  color: ${({ theme, top, path }) =>
    theme.type === `light` && top === `true` && path === `/`
      ? `white`
      : `var(--font-color-primary)`};
  font-size: 18px;
  cursor: pointer;
  flex-shrink: 0;
  > svg {
    width: ${({ svgSize }) => svgSize ?? 21}px;
    height: ${({ svgSize }) => svgSize ?? 21}px;
  }
`

const NavWrapper = styled.div<{ top: string }>`
  display: flex;
  width: 100vw;
  margin-top: ${({ top }) => (top === `false` ? `20px` : `58px`)};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: margin-top ${({ top }) => (top === `false` ? `0.55s` : `.35s`)}
    ease-in-out;
`
const NavRef = styled.div`
  width: 100%;
  height: 100px;
  position: absolute;
  top: 0;
`
const StyledNav = styled.nav<{ top: string; path: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 658px;
  padding: 0 70px;
  height: 60px;
  border-radius: 18px;
  gap: 70px;
  background-color: ${({ top }) =>
    top === `false` ? `var(--nav-background)` : `transparent`};
  border: 1px solid
    ${({ top }) =>
      top === `false` ? `var(--border-color-primary)` : `transparent`};
  @media ${device.tablet} {
    width: 100%;
    margin: 0 45px;
    gap: 10px;
    justify-content: space-around;
    padding: 0 var(--padding-h);
  }
  svg {
    fill: ${({ theme, top, path }) =>
      theme.type === `light` && top === `true` && path === `/`
        ? `white`
        : `var(--font-color-primary)`};
  }
`
const IconContainer = styled(motion.div)`
  cursor: pointer;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`
const Blur = styled.div<{ top: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  opacity: ${({ top }) => (top === `false` ? 1 : 0)};
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
