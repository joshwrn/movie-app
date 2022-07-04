import React from 'react'
import styled from 'styled-components'
import { SectionTitle } from '@styles/textStyles'

const Trailer = ({ trailer }: { trailer: string }) => {
  return (
    <TrailerContainer>
      <SectionTitle>Watch Trailer</SectionTitle>
      <VideoContainer>
        <Video
          src={`https://www.youtube.com/embed/${trailer}`}
          title="Movie Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"
        ></Video>
      </VideoContainer>
    </TrailerContainer>
  )
}

const TrailerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
`

const Video = styled.iframe`
  position: absolute;
  border: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 18px;
`

export default Trailer
