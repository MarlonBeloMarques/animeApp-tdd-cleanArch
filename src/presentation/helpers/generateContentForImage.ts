type ContentImage = {
  width: number;
  height: number;
  aspectRatio: number;
};

type generateContentForImageParams = {
  width: number;
  maxHeight: number;
  minHeight: number;
};

const generateContentForImage = ({
  width,
  maxHeight,
  minHeight,
}: generateContentForImageParams): ContentImage => {
  const height = Math.random() * (maxHeight - minHeight) + minHeight;
  return {
    height: height,
    width: width,
    aspectRatio: width / height,
  };
};

export default generateContentForImage;
