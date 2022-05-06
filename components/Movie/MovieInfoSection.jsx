import React from 'react';
import styled from 'styled-components';
import { getImage } from '../../lib/tmdb';

const getTime = (runtime) => {
  if (!runtime) return '';
  const hours = (runtime / 60).toString().slice(0, 1);
  let minutes = (runtime % 60).toString().slice(0, 1);
  if (minutes.length === 1) {
    minutes = '0' + minutes;
  }
  return hours + 'H ' + minutes + 'M';
};

const getFirstRole = (roles) => {
  if (!roles) return '';
  for (let i = 0; i < roles.length; i++) {
    if (roles[i] === '/' || roles[i] === '(') {
      return roles.slice(0, i - 1);
    }
  }
  return roles;
};

const MovieInfoSection = ({ movie, trailer, credits }) => {
  const time = getTime(movie.runtime);
  const creditsShort =
    credits.cast.length > 5 ? credits.cast.slice(0, 5) : credits.cast;
  return (
    <Container>
      <GenreContainer>
        {movie.genres.map((genre) => (
          <Genre key={genre.id} genre={genre.name} />
        ))}
      </GenreContainer>
      <DetailsContainer>
        <MainContainer>
          <InfoContainer>
            <RatingContainer>
              <RatingText>PG-13</RatingText>
              <RatingText>{time}</RatingText>
            </RatingContainer>
            <StoryLineContainer>
              <SectionTitle>Storyline</SectionTitle>
              <StoryLine>{movie.overview}</StoryLine>
            </StoryLineContainer>
          </InfoContainer>
          <Divider />
          <TrailerContainer>
            <SectionTitle>Watch Trailer</SectionTitle>
            <VideoContainer>
              <Video
                src={`https://www.youtube.com/embed/${trailer}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></Video>
            </VideoContainer>
          </TrailerContainer>
        </MainContainer>
        <SidebarContainer>
          <SectionTitle>Cast</SectionTitle>
          <CastContainer>
            {creditsShort.map((cast) => (
              <CastItemContainer key={cast.id}>
                <CastImage src={getImage('w185', cast.profile_path)} />
                <CastInfoContainer>
                  <CastName>{cast.name}</CastName>
                  <CastRole>{getFirstRole(cast.character)}</CastRole>
                </CastInfoContainer>
              </CastItemContainer>
            ))}
          </CastContainer>
        </SidebarContainer>
      </DetailsContainer>
    </Container>
  );
};

const Genre = ({ genre }) => {
  return (
    <GenrePill>
      <GenrePillText>{genre}</GenrePillText>
    </GenrePill>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 50px;
  padding-bottom: 300px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  opacity: 0.25;
  background-color: ${({ theme }) => theme.fontColor.secondary};
`;

// Genres

const GenreContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  overflow-x: scroll;
`;

const GenrePill = styled.div`
  display: flex;
  padding: 10px 40px;
  border-radius: 1000px;
  border: 2px solid;
  border-color: ${({ theme }) => theme.fontColor.secondary};
  opacity: 0.8;
  cursor: pointer;
  transition: border-color 0.4s ease-in-out;
  &:hover {
    border-color: ${({ theme }) => theme.fontColor.primary};
  }
`;

const GenrePillText = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.fontColor.primary};
  font-weight: 700;
`;

const DetailsContainer = styled.div`
  display: flex;
  gap: 80px;
`;

// Main

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const InfoContainer = styled.div`
  display: flex;
  gap: 60px;
`;

// Rating

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 24px;
  white-space: nowrap;
`;

const RatingText = styled.p`
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.fontColor.primary};
`;

// Storyline

const StoryLineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;
const StoryLine = styled.p`
  font-size: 20px;
  color: ${({ theme }) => theme.fontColor.secondary};
`;

// Trailer

const TrailerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
`;

const Video = styled.iframe`
  position: absolute;
  border: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 18px;
`;

// Sidebar

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  flex-shrink: 0;
  gap: 20px;
`;

// cast

const CastContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const CastItemContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  align-items: center;
`;

const CastImage = styled.img`
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  object-fit: cover;
`;

const CastInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CastName = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.fontColor.primary};
`;

const CastRole = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.fontColor.secondary};
`;

export default MovieInfoSection;
