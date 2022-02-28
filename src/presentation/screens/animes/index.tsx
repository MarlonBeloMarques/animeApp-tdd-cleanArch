import React from 'react';
import { NativeScrollEvent } from 'react-native';
import { AnimeModelDocument } from '~/domain/models';
import { ModelDocumentImageList } from '~/presentation/protocols';
import Animes from './animes';

type Props = {
  animeList: Array<
    ModelDocumentImageList.ModelDocumentImage<AnimeModelDocument>
  >;
  onPressDetailAnime: () => void;
  getMoreAnime: () => void;
  onEndReached: (
    onEndReachedThreshold: number,
    nativeEvent: NativeScrollEvent,
  ) => boolean;
  onEndReachedThreshold: number;
  isLoading: boolean;
};

const AnimesContainer: React.FC<Props> = ({
  animeList,
  onPressDetailAnime,
  getMoreAnime,
  onEndReachedThreshold,
  onEndReached,
  isLoading,
}) => {
  return (
    <Animes
      animeList={animeList}
      getMoreAnime={getMoreAnime}
      onPressDetailAnime={onPressDetailAnime}
      onEndReachedThreshold={onEndReachedThreshold}
      onEndReached={onEndReached}
      isLoading={isLoading}
    />
  );
};

export default AnimesContainer;
