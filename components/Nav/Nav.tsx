import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const Nav = ({ top }: { top: string }) => {
  return (
    <NavWrapper top={top}>
      <StyledNav top={top}>
        <Link href={`/`} passHref>
          <NavItem>Home</NavItem>
        </Link>
        <NavItem>Popular</NavItem>
        <NavItem>Genres</NavItem>
        <NavItem>User</NavItem>
        <NavItem>Search</NavItem>
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
  color: ${({ theme }) => theme.fontColor.primary};
  width: 630px;
  height: 60px;
  overflow: hidden;
  border-radius: 18px;
  gap: 70px;

  background-color: ${({ top }) =>
    top === 'false' ? '#0000006a' : '#ffffff0'};
`

const Blur = styled.div<{ top: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${({ top }) => (top === 'false' ? 1 : 0)};
  backdrop-filter: blur(30px);
  z-index: -1;
`

const NavItem = styled.p`
  color: ${({ theme }) => theme.fontColor.primary};
  font-size: 18px;
  cursor: pointer;
`

export default Nav
