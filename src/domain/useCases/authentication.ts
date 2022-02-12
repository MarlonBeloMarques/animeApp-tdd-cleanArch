export interface Authentication {
  authenticate(): void;
}

export namespace Authentication {
  export type Params = {
    responseType: string;
    clientId: string;
    redirectUri: string;
  };
}
