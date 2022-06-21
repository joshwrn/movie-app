import Carousel from '@reusable/Carousel'
import WideMoviePoster from '@components/Home/WideMoviePoster'
import { MovieTypes } from '@customTypes/MovieTypes'
import React from 'react'
import { SectionTitle, SectionContainer } from './styles'

const Related = ({ related }: { related: MovieTypes[] }) => {
  return (
    <SectionContainer>
      <SectionTitle>Related</SectionTitle>
      <Carousel>
        {related.map((movie) => (
          <WideMoviePoster
            key={movie.id}
            id={movie.id}
            title={movie.title}
            backdrop_path={movie.backdrop_path}
          />
        ))}
      </Carousel>
    </SectionContainer>
  )
}

export default Related
