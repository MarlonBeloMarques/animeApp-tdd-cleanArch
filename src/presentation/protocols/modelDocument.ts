import { Anime } from '~/domain/useCases';

export interface ModelDocument {
  toModelDocument(): Anime.ModelDocument;
}
