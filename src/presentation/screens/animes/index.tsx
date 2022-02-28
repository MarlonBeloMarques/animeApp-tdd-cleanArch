import React from 'react';
import Animes from './animes';

const AnimesContainer: React.FC = () => {
  return (
    <Animes
      animeList={[]}
      getMoreAnime={() => {}}
      onPressDetailAnime={() => {}}
      onEndReachedThreshold={0}
      onEndReached={() => false}
      isLoading={true}
    />
  );
};

export default AnimesContainer;
