export interface Authentication {
  authenticate(): Promise<void>;

  completeUrlWithParam(params: Authentication.Params): void;
}

export namespace Authentication {
  export type Params = {
    responseType: string;
    clientId: string;
    redirectUri: string;
  };
}
