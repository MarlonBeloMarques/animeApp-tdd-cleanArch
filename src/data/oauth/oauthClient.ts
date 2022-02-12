export interface OAuthClient {
  redirect(data: OAuthRequest): Promise<void>;
}

export type OAuthRequest = {
  url: string;
};
