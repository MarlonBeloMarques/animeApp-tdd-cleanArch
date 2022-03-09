import faker from 'faker';
import { render } from '@testing-library/react-native';
import { AnimeDetail } from '~/domain/useCases';
import { AnimeDetail as AnimeDetailView } from '~/presentation/screens';
import { renderWithParams } from '../helpers';

describe('UI: AnimeDetail', () => {
  test('should show image with success', () => {
    const animeDetail = makeAnimeDetail();
    const { getByTestId } = render(
      renderWithParams({
        screen: AnimeDetailView,
        screenProps: { animeDetail: animeDetail },
      }),
    );

    const animeImage = getByTestId('anime_image_id');
    expect(animeImage).toBeTruthy();
    expect(animeImage.props.width).toBeTruthy();
    expect(animeImage.props.height).toBeTruthy();
    expect(animeImage.props.source.uri).toEqual(animeDetail.banner_image);
  });

  test('should show title with success', () => {
    const animeDetail = makeAnimeDetail();
    const { getByTestId } = render(
      renderWithParams({
        screen: AnimeDetailView,
        screenProps: { animeDetail: animeDetail },
      }),
    );

    const animeTitle = getByTestId('anime_title_id');
    expect(animeTitle).toBeTruthy();
    expect(animeTitle.props.children).toEqual(animeDetail.titles.en);
  });

  test('should list with success the genres of anime', () => {
    const animeDetail = makeAnimeDetail();
    const { getByTestId } = render(
      renderWithParams({
        screen: AnimeDetailView,
        screenProps: { animeDetail: animeDetail },
      }),
    );

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
    const animeDetail = makeAnimeDetail();
    const { getByTestId } = render(
      renderWithParams({
        screen: AnimeDetailView,
        screenProps: { animeDetail: animeDetail },
      }),
    );

    const aboutAnime = getByTestId('about_anime_id');
    expect(aboutAnime).toBeTruthy();
    expect(aboutAnime.props.children).toEqual(animeDetail.descriptions.en);
  });

  test('should show the content of the amount of the anime episodes successfully', () => {
    const animeDetail = makeAnimeDetail();
    const { getByTestId } = render(
      renderWithParams({
        screen: AnimeDetailView,
        screenProps: { animeDetail: animeDetail },
      }),
    );

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
    const animeDetail = makeAnimeDetail();
    const { getByTestId } = render(
      renderWithParams({
        screen: AnimeDetailView,
        screenProps: { animeDetail: animeDetail },
      }),
    );

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

const makeAnimeDetail = (): AnimeDetail.Detail => {
  return {
    banner_image: faker.internet.url(),
    cover_image: faker.internet.url(),
    descriptions: { en: faker.commerce.productDescription() },
    episodes_count: faker.datatype.number(),
    genres: ['Adventure', 'Action'],
    start_date: faker.date.past().toISOString(),
    titles: {
      en: faker.name.title(),
    },
  };
};
