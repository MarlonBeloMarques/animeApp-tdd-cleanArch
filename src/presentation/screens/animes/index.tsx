import React, { useEffect, useState } from 'react';
import { RemoteAnimeList } from '~/data/useCases';
import { AnimeModelDocument } from '~/domain/models';
import { AxiosAdapter } from '~/infra/http';
import { ModelDocumentListMapper } from '~/presentation/mappers';
import { ModelDocumentImageList } from '~/presentation/protocols';
import Animes from './animes';

type Props = {
  url: string;
};

const AnimesContainer: React.FC<Props> = ({
  url = 'https://api.aniapi.com/v1/anime',
}) => {
  const [animeList, setAnimeList] = useState<
    Array<ModelDocumentImageList.ModelDocumentImage<AnimeModelDocument>>
  >([]);
  const [loading, setLoading] = useState(true);

  const getAnimeList = async () => {
    const axiosAdapter = new AxiosAdapter();
    const remoteAnimeList = new RemoteAnimeList(url, axiosAdapter);
    const animeList = await remoteAnimeList.list();
    const modelDocumentList = new ModelDocumentListMapper(
      animeList.data.documents,
    );

    setAnimeList(modelDocumentList.toModelDocumentImageList());
    setLoading(false);
  };

  useEffect(() => {
    getAnimeList();
  }, []);

  return (
    <Animes
      animeList={animeList}
      getMoreAnime={() => {}}
      onPressDetailAnime={() => {}}
      onEndReachedThreshold={0}
      onEndReached={() => false}
      isLoading={loading}
    />
  );
};

export default AnimesContainer;
