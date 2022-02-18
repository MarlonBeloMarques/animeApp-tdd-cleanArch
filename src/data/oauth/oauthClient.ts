export interface OAuthClient {
  redirect(data: OAuthClient.Request): Promise<void>;
}

export namespace OAuthClient {
  export type Request = {
    url: string;
  };
}
