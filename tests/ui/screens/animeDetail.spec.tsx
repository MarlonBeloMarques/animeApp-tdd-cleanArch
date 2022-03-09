import { render } from '@testing-library/react-native';
import { AnimeDetail as AnimeDetailView } from '~/presentation/screens';
import { makeAnimeDetail, renderWithParams } from '../helpers';

describe('UI: AnimeDetail', () => {
  test('should show image with success', () => {
    const { getByTestId, animeDetail } = makeSut();

    const animeImage = getByTestId('anime_image_id');
    expect(animeImage).toBeTruthy();
    expect(animeImage.props.width).toBeTruthy();
    expect(animeImage.props.height).toBeTruthy();
    expect(animeImage.props.source.uri).toEqual(animeDetail.banner_image);
  });

  test('should show title with success', () => {
    const { getByTestId, animeDetail } = makeSut();

    const animeTitle = getByTestId('anime_title_id');
    expect(animeTitle).toBeTruthy();
    expect(animeTitle.props.children).toEqual(animeDetail.titles.en);
  });

  test('should list with success the genres of anime', () => {
    const { getByTestId, animeDetail } = makeSut();

    const animeGenresScroll = getByTestId('anime_genres_scroll_id');
    expect(animeGenresScroll).toBeTruthy();

    const keyFirstAnimeGenre = animeDetail.genres.indexOf(
      animeDetail.genres[0],
    );
    const firstAnimeGenre = getByTestId(`anime_genre_${keyFirstAnimeGenre}`);
    expect(firstAnimeGenre).toBeTruthy();
    expect(firstAnimeGenre.props.children).toEqual(
      animeDetail.genres[keyFirstAnimeGenre],
    );
  });

  test('should show description about the anime with success', () => {
    const { getByTestId, animeDetail } = makeSut();

    const aboutAnime = getByTestId('about_anime_id');
    expect(aboutAnime).toBeTruthy();
    expect(aboutAnime.props.children).toEqual(animeDetail.descriptions.en);
  });

  test('should show the content of the amount of the anime episodes successfully', () => {
    const { getByTestId, animeDetail } = makeSut();

    const quantityEpisodesIcon = getByTestId('quantity_episodes_icon_id');
    const episodesQuantity = getByTestId('episodes_quantity_id');
    expect(quantityEpisodesIcon).toBeTruthy();
    expect(quantityEpisodesIcon.props.name).toEqual('video-collection');
    expect(quantityEpisodesIcon.props.size).toEqual(14);
    expect(episodesQuantity).toBeTruthy();
    expect(episodesQuantity.props.children).toEqual(
      `${animeDetail.episodes_count} episodes`,
    );
  });

  test('should show anime release date content successfully', () => {
    const { getByTestId, animeDetail } = makeSut();

    const dateReleaseIcon = getByTestId('date_release_icon_id');
    const dateRelease = getByTestId('date_release_id');
    expect(dateReleaseIcon).toBeTruthy();
    expect(dateReleaseIcon.props.name).toEqual('calendar-today');
    expect(dateReleaseIcon.props.size).toEqual(14);
    expect(dateRelease.props.children).toEqual(
      new Date(animeDetail.start_date).toLocaleDateString(),
    );
  });
});

const makeSut = () => {
  const animeDetail = makeAnimeDetail();

  const { getByTestId } = render(
    renderWithParams({
      screen: AnimeDetailView,
      screenProps: { animeDetail: animeDetail },
    }),
  );

  return { getByTestId, animeDetail };
};
