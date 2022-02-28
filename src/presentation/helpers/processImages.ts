import { Anime } from '~/domain/useCases';
import { ModelDocumentImageList } from '~/presentation/protocols';
import generateContentForImage from './generateContentForImage';

type ProcessImagesParams = {
  animeList: Array<
    ModelDocumentImageList.ModelDocumentImage<Anime.ModelDocument>
  >;
  targetWidth: number;
  height: {
    maxHeight: number;
    minHeight: number;
  };
};

const processImages = ({
  animeList,
  targetWidth,
  height,
}: ProcessImagesParams): Array<
  ModelDocumentImageList.ModelDocumentImage<Anime.ModelDocument>
> => {
  animeList.map((anime) => {
    const { aspectRatio, width } = generateContentForImage({
      width: targetWidth,
      maxHeight: height.maxHeight,
      minHeight: height.minHeight,
    });
    anime.cover_image_size.width = width;
    anime.cover_image_size.height = targetWidth * aspectRatio;
    return anime;
  });

  return animeList;
};

export default processImages;
