export interface Authentication {
  authenticate(): Promise<void>;
}

export namespace Authentication {
  export type Params = {
    responseType: string;
    clientId: string;
    redirectUri: string;
  };
}
