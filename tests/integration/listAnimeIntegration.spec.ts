import { RemoteAnimeList } from '~/data/useCases';
import { AxiosAdapter } from '~/infra/http';

describe('Integration', () => {
  test('should list anime with success', async () => {
    const url = 'https://api.aniapi.com/v1/anime';
    const axiosAdapter = new AxiosAdapter();
    const sut = new RemoteAnimeList(url, axiosAdapter);
    const response = await sut.list();
    expect(response.status_code).toEqual(200);
    expect(response.data.current_page).toBeTruthy();
    expect(response.data.documents).toBeTruthy();
  });
});
