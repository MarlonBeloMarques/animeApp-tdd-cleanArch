import React, { useEffect, useState } from 'react';
import { NativeScrollEvent } from 'react-native';
import { RemoteAnimeList } from '~/data/useCases';
import { AnimeModel } from '~/domain/models';
import { Anime } from '~/domain/useCases';
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
  onEndReachedThreshold: number;
};

const AnimesContainer: React.FC<Props> = ({
  url = 'https://api.aniapi.com/v1/anime',
  onEndReachedThreshold = 20,
}) => {
  const [anime, setAnime] = useState<AnimeModelImage.Model>(
    initialAnimeListResponse(''),
  );
  const [loading, setLoading] = useState(true);

  const requestAnimeList = async (completeUrlWithParam?: Anime.Params) => {
    const axiosAdapter = new AxiosAdapter();
    const remoteAnimeList = new RemoteAnimeList(url, axiosAdapter);

    if (completeUrlWithParam)
      remoteAnimeList.completeUrlWithParam(completeUrlWithParam);

    let listResponse = {} as AnimeModel;
    try {
      listResponse = await remoteAnimeList.list();
    } catch (error) {
      if (error instanceof Error) {
        listResponse = initialAnimeListResponse(error.message);
      }
    } finally {
      return listResponse;
    }
  };

  const getAnimeList = async () => {
    const listResponse = await requestAnimeList();
    const modelDocumentList = new ModelDocumentListMapperDecorator(
      listResponse.data.documents,
    );

    const animeModel = new AnimeModelMapper(listResponse, modelDocumentList);

    setAnime(animeModel.toAnimeModelImage());

    setLoading(false);
  };

  const getMoreAnime = async () => {
    await requestAnimeList({ locale: 'en', page: 2, per_page: 50 });
  };

  const onEndReached = (
    onEndReachedThreshold: number,
    { layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent,
  ) => {
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - onEndReachedThreshold
    );
  };

  useEffect(() => {
    getAnimeList();
  }, []);

  return (
    <Animes
      animeStatusMessage={anime.message}
      animeList={anime.data.documents}
      getMoreAnime={getMoreAnime}
      onPressDetailAnime={() => {}}
      onEndReachedThreshold={onEndReachedThreshold}
      onEndReached={onEndReached}
      isLoading={loading}
    />
  );
};

export default AnimesContainer;
