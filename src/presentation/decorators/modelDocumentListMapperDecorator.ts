import { Dimensions } from 'react-native';
import { Anime } from '~/domain/useCases';
import { getTheme, processImages } from '../helpers';
import { ModelDocumentListMapper } from '../mappers';
import { ModelDocumentImageList } from '../protocols';

const { width } = Dimensions.get('screen');

export class ModelDocumentListMapperDecorator extends ModelDocumentListMapper {
  toModelDocumentImageList = () => {
    const modelDocumentImageList: Array<
      ModelDocumentImageList.ModelDocumentImage<Anime.ModelDocument>
    > = [];

    this.modelDocumentList.map((modelDocument) => {
      modelDocumentImageList.push(this.toModelDocumentImage(modelDocument));
    });

    return processImages({
      animeList: modelDocumentImageList,
      height: { maxHeight: 220, minHeight: 120 },
      targetWidth: width / 2 - getTheme('sceneSpacing'),
    });
  };
}
