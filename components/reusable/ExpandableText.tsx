import React, { useState } from 'react'
import styled from 'styled-components'
import { StandardText } from '@styles/textStyles'

const ExpandableText = ({
  content,
  length,
}: {
  content: string
  length: number
}) => {
  const [open, setOpen] = useState(false)
  const contentShort =
    content?.length > length ? content.slice(0, length) + '... ' : content
  return (
    <>
      <StandardText>
        {open ? content : contentShort}
        <ReadMore onClick={() => setOpen(!open)}>
          {!open && content?.length > length && ' Read More'}
        </ReadMore>
      </StandardText>
      {open && (
        <ReadMore onClick={() => setOpen(!open)}>{'Show Less'}</ReadMore>
      )}
    </>
  )
}

const ReadMore = styled.span`
  font-weight: bold;
  color: var(--font-color-primary);
  opacity: 0.8;
  cursor: pointer;
  transition: color 0.35s;
  width: fit-content;
  font-size: 20px;
`

export default ExpandableText
