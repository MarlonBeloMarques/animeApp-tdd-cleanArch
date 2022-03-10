import React from 'react';
import { AnimeDetail as AnimeDetailUseCase } from '~/domain/useCases';
import AnimeDetail from './animeDetail';

type Props = {
  animeDetail: AnimeDetailUseCase.Detail;
};

const AnimeDetailContainer: React.FC<Props> = ({ animeDetail }) => {
  return <AnimeDetail animeDetail={animeDetail} />;
};

export default AnimeDetailContainer;
