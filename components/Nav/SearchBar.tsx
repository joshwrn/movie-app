import React from 'react'
import { IoSearch } from 'react-icons/io5'
import { IoIosCloseCircleOutline as CloseIcon } from 'react-icons/io'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  /* border-radius: 15px; */
  border-bottom: 1px solid var(--border-color-primary);
  /* padding: 0 15px; */
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60%;
  gap: 15px;
  > input {
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    font-size: 16px;
    background-color: transparent;
  }
  > svg {
    width: 25px;
    height: 25px;
  }
`

export const SearchBar = ({
  setSearchIsOpen,
}: {
  setSearchIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <Container>
      <IoSearch />
      <input type="text" />
      <CloseIcon
        style={{ cursor: 'pointer' }}
        onClick={() => setSearchIsOpen(false)}
      />
    </Container>
  )
}
