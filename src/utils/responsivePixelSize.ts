import {Dimensions} from 'react-native';

const baseScreenSize = 687;

const responsivePixelSize = (pixels: number): string => {
  const windowHeight = Dimensions.get('window').height;
  const ratio = baseScreenSize / pixels;

  return String(Math.floor(windowHeight / ratio));
};

export default responsivePixelSize;
