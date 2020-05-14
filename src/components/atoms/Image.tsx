import images from '@assets/images';
import * as React from 'react';
import {useState} from 'react';
import {
  Image as RNImgae,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native';

interface IImage {
  source?: ImageSourcePropType;
  resizeMode?: ImageResizeMode;
  width: number | string;
  height: number | string;
  style?: StyleProp<ImageStyle>;
}

const Image = (props: IImage): React.ReactElement => {
  const {source, resizeMode = 'stretch', style = {}, width, height} = props;

  const imageStyle: ImageStyle = createStyle(width, height).image;
  const [isLoaded, setLoaded] = useState(false);
  const onLoadEnd = () => setLoaded(true);

  if (!source) {
    return (
      <RNImgae
        source={images.splashBackgroundImage}
        style={[imageStyle, style]}
      />
    );
  }

  return (
    <View style={imageStyle}>
      {!isLoaded && (
        <RNImgae source={images.splashBackgroundImage} style={imageStyle} />
      )}
      <RNImgae
        source={source}
        resizeMode={resizeMode}
        style={[imageStyle, style, styles.loadedImage]}
        onLoadEnd={onLoadEnd}
      />
    </View>
  );
};

export default Image;

const createStyle = (width: number | string, height: number | string) => {
  return StyleSheet.create({
    image: {
      width,
      height,
    },
  });
};

const styles = StyleSheet.create({
  loadedImage: {
    position: 'absolute',
  },
});
