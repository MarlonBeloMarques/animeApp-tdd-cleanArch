import React, { useEffect, useState } from 'react';
import { RemoteAnimeList } from '~/data/useCases';
import { AnimeModel } from '~/domain/models';
import { AxiosAdapter } from '~/infra/http';
import { ModelDocumentListMapperDecorator } from '~/presentation/decorators';
import { AnimeModelMapper } from '~/presentation/mappers';
import { AnimeModelImage } from '~/presentation/protocols';
import Animes from './animes';

const initialAnimeListResponse = (message: string) => {
  return {
    data: {
      current_page: 0,
      count: 0,
      documents: [],
      last_page: 0,
    },
    message: message,
    status_code: 0,
  };
};

type Props = {
  url: string;
};

const AnimesContainer: React.FC<Props> = ({
  url = 'https://api.aniapi.com/v1/anime',
}) => {
  const [anime, setAnime] = useState<AnimeModelImage.Model>(
    initialAnimeListResponse(''),
  );
  const [loading, setLoading] = useState(true);

  const getAnimeList = async () => {
    const axiosAdapter = new AxiosAdapter();
    const remoteAnimeList = new RemoteAnimeList(url, axiosAdapter);

    let listResponse = {} as AnimeModel;
    try {
      listResponse = await remoteAnimeList.list();
    } catch (error) {
      if (error instanceof Error) {
        listResponse = initialAnimeListResponse(error.message);
      }
    }

    const modelDocumentList = new ModelDocumentListMapperDecorator(
      listResponse.data.documents,
    );

    const animeModel = new AnimeModelMapper(listResponse, modelDocumentList);

    setAnime(animeModel.toAnimeModelImage());

    setLoading(false);
  };

  useEffect(() => {
    getAnimeList();
  }, []);

  return (
    <Animes
      animeStatusMessage={anime.message}
      animeList={anime.data.documents}
      getMoreAnime={() => {}}
      onPressDetailAnime={() => {}}
      onEndReachedThreshold={0}
      onEndReached={() => false}
      isLoading={loading}
    />
  );
};

export default AnimesContainer;
