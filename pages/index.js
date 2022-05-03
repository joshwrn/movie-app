import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';

const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const search = `
https://api.themoviedb.org/3/trending/movie/day?api_key=${MOVIE_API_KEY}`;
const img = (path) => {
  return `https://image.tmdb.org/t/p/w342/${path}`;
};

const Index = ({ movies }) => {
  console.log('movies', movies);
  return (
    <Container>
      <GlobalStyles />
      <h1>Trending Movies</h1>
      <MovieList>
        {movies.results.map((movie) => (
          <div key={movie.id}>
            <p>{movie.title}</p>
            <img src={img(movie.poster_path)} />
          </div>
        ))}
      </MovieList>
    </Container>
  );
};

export async function getStaticProps() {
  const popularRes = await fetch(search);
  const popular = await popularRes.json();
  return {
    props: {
      movies: popular,
    },
  };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  width: 100vw;
  background-color: black;
  color: white;
`;

const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export default Index;
