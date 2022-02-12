export interface OAuthClient {
  redirect(data: OAuthRequest): void;
}

export type OAuthRequest = {
  url: string;
};
