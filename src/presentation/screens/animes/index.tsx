import React, { useEffect, useState } from 'react';
import { NativeScrollEvent } from 'react-native';
import { UnexpectedError } from '~/data/errors';
import { AnimeDetailToNavigation } from '~/data/useCases';
import { AnimeModel, AnimeModelDocument } from '~/domain/models';
import { Anime, AnimeList } from '~/domain/useCases';
import { NavigationActions, Routes } from '~/main/navigation';
import { ModelDocumentListMapperDecorator } from '~/presentation/decorators';
import {
  AnimeModelImageMapper,
  AnimeModelMapper,
} from '~/presentation/mappers';
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
  remoteAnimeList: AnimeList;
  onEndReachedThreshold: number;
  onEndReached: (
    onEndReachedThreshold: number,
    waitForEndReached: boolean,
    { layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent,
  ) => boolean;
};

const AnimesContainer: React.FC<Props> = ({
  onEndReachedThreshold,
  remoteAnimeList,
  onEndReached,
}) => {
  const [anime, setAnime] = useState<AnimeModelImage.Model>(
    initialAnimeListResponse(''),
  );
  const [animeList, setAnimeList] = useState<
    ModelDocumentImageList.ModelDocumentImage<Anime.ModelDocument>[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [waitForEndReached, setWaitForEndReached] = useState(false);
  const [animeListIsEmpty, setAnimeListIsEmpty] = useState(false);
  const [page, setPage] = useState(1);

  const requestAnimeList = async (completeUrlWithParam: Anime.Params) => {
    remoteAnimeList.completeUrlWithParam(completeUrlWithParam);

    let listResponse = {} as AnimeModel;
    try {
      listResponse = await remoteAnimeList.list();
    } catch (error) {
      if (error instanceof Error) {
        listResponse = initialAnimeListResponse(error.message);
      } else {
        listResponse = initialAnimeListResponse(new UnexpectedError().message);
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

  const getMoreAnime = async (
    startComplete: () => { pageCurrent: number },
    finishComplete: () => void,
  ) => {
    const { pageCurrent } = startComplete();
    const listResponse = await requestAnimeList({
      locale: 'en',
      page: pageCurrent,
      per_page: 100,
    });

    const { animeModelImage, newAnimeList } =
      animeModelToAnimeModelImageList(listResponse);

    setAnime(animeModelImage);
    setAnimeList((animeListCurrent) => [...animeListCurrent, ...newAnimeList]);

    finishComplete();
  };

  const startGetMoreAnime = () => {
    setLoading(true);
    const pageCurrent = page + 1;
    setPage(pageCurrent);
    setWaitForEndReached(true);

    return { pageCurrent };
  };

  const animeModelToAnimeModelImageList = (anime: AnimeModel) => {
    const modelDocumentList = new ModelDocumentListMapperDecorator(
      anime.data.documents,
    );

    const animeModel = new AnimeModelMapper(anime, modelDocumentList);
    const animeModelImage = animeModel.toAnimeModelImage();

    const newAnimeList = animeModel.toAnimeModelImage().data.documents;

    return { animeModelImage, newAnimeList };
  };

  const finishGetMoreAnime = () => {
    setTimeout(() => {
      setWaitForEndReached(false);
      setLoading(false);
    }, 800);
  };

  const onPressDetailAnime = (
    modelDocumentImage: ModelDocumentImageList.ModelDocumentImage<AnimeModelDocument>,
  ) => {
    const animeModelImage = new AnimeModelImageMapper(modelDocumentImage);
    const animeDetail = new AnimeDetailToNavigation(
      animeModelImage.toModelDocument(),
    );
    const detail = animeDetail.get();
    NavigationActions.navigate(Routes.ANIME_DETAIL, { animeDetail: detail });
  };

  useEffect(() => {
    getAnimeList();
  }, []);

  useEffect(() => {
    setAnimeListIsEmpty(animeList.length === 0 && !loading);
  }, [animeList, loading]);

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
      animeListIsEmpty={animeListIsEmpty}
      startGetMoreAnime={startGetMoreAnime}
      finishGetMoreAnime={finishGetMoreAnime}
    />
  );
};

export default AnimesContainer;
