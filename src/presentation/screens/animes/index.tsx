import React, { useEffect, useState } from 'react';
import { NativeScrollEvent } from 'react-native';
import { RemoteAnimeList } from '~/data/useCases';
import { AnimeModel } from '~/domain/models';
import { Anime } from '~/domain/useCases';
import { AxiosAdapter } from '~/infra/http';
import { ModelDocumentListMapperDecorator } from '~/presentation/decorators';
import { AnimeModelMapper } from '~/presentation/mappers';
import {
  AnimeModelImage,
  ModelDocumentImageList,
} from '~/presentation/protocols';
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
  const [animeList, setAnimeList] = useState<
    ModelDocumentImageList.ModelDocumentImage<Anime.ModelDocument>[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [waitForEndReached, setWaitForEndReached] = useState(false);
  const [page, setPage] = useState(1);

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
    const listResponse = await requestAnimeList({
      locale: 'en',
      page: page,
      per_page: 100,
    });
    const modelDocumentList = new ModelDocumentListMapperDecorator(
      listResponse.data.documents,
    );

    const animeModel = new AnimeModelMapper(listResponse, modelDocumentList);

    setAnime(animeModel.toAnimeModelImage());
    setAnimeList(animeModel.toAnimeModelImage().data.documents);

    setLoading(false);
  };

  const getMoreAnime = async () => {
    const pageCurrent = page + 1;
    setPage(pageCurrent);
    setWaitForEndReached(true);
    const listResponse = await requestAnimeList({
      locale: 'en',
      page: pageCurrent,
      per_page: 100,
    });

    const modelDocumentList = new ModelDocumentListMapperDecorator(
      listResponse.data.documents,
    );

    const animeModel = new AnimeModelMapper(listResponse, modelDocumentList);
    const animeModelImage = animeModel.toAnimeModelImage();

    const newAnimeList = animeModel.toAnimeModelImage().data.documents;

    setAnime(animeModelImage);
    setAnimeList((animeListCurrent) => [...animeListCurrent, ...newAnimeList]);

    const timeout = setTimeout(() => {
      setWaitForEndReached(false);
    }, 100);

    clearTimeout(timeout);
  };

  const onEndReached = (
    onEndReachedThreshold: number,
    { layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent,
  ) => {
    if (waitForEndReached || loading) {
      return false;
    }

    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - onEndReachedThreshold
    );
  };

  const onPressDetailAnime = () => {};

  useEffect(() => {
    getAnimeList();
  }, []);

  return (
    <Animes
      page={page}
      waitForEndReached={waitForEndReached}
      animeStatusMessage={anime.message}
      animeList={animeList}
      getMoreAnime={getMoreAnime}
      onPressDetailAnime={onPressDetailAnime}
      onEndReachedThreshold={onEndReachedThreshold}
      onEndReached={onEndReached}
      isLoading={loading}
    />
  );
};

export default AnimesContainer;
