import { UnexpectedError } from '~/data/errors';
import { Authentication } from '~/domain/useCases';
import { RemoteAuthentication } from '~/data/useCases';
import { OAuthClientSpy } from '../oauth';

describe('Data: RemoteAuthentication', () => {
  test('should authenticate with OAuthClient call correct url', () => {
    const url = 'http://any-url.com';
    const [sut, oAuthClientSpy] = makeSut(url);
    sut.authenticate();
    expect(oAuthClientSpy.url.length).not.toBe(0);
    expect(oAuthClientSpy.url).toMatch(new RegExp(url));
  });

  test('should authenticate with the correct parameters of the OAuthClient call', () => {
    const [sut, oAuthClientSpy] = makeSut('http://any-url.com');
    const params = makeAuthenticationParams();
    sut.completeUrlWithParam(params);
    sut.authenticate();
    expect(oAuthClientSpy.url.length).not.toBe(0);
    expect(oAuthClientSpy.url).toMatch(new RegExp(params.responseType));
    expect(oAuthClientSpy.url).toMatch(new RegExp(params.clientId));
    expect(oAuthClientSpy.url).toMatch(new RegExp(params.redirectUri));
  });

  test('should authentication with OAuthClient call response with expected error', async () => {
    const url = '//any-url.com';
    const [sut] = makeSut(url);
    try {
      await sut.authenticate();
      throw Error('an invalid url is expected');
    } catch (error) {
      expect(error).toEqual(new UnexpectedError());
    }
  });
});

const makeSut = (url: string): [RemoteAuthentication, OAuthClientSpy] => {
  const oAuthClientSpy = new OAuthClientSpy();
  const sut = new RemoteAuthentication(url, oAuthClientSpy);
  return [sut, oAuthClientSpy];
};

const makeAuthenticationParams = (): Authentication.Params => {
  return {
    responseType: 'response_type=token',
    clientId: 'client_id=any_client_id',
    redirectUri: 'redirect_uri=any_redirect_uri',
  };
};
