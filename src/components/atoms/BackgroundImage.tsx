import React from 'react';
import {
  ImageBackground,
  ImageResizeMode,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';

interface IImageBackground {
  source: ImageSourcePropType;
  resizeMode?: ImageResizeMode;
  children?: React.ReactNode;
}
const BackgroundImage = ({
  source,
  resizeMode = 'cover',
  children,
}: IImageBackground): React.ReactElement => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={source}
        resizeMode={resizeMode}
        style={styles.image}>
        {children}
      </ImageBackground>
    </View>
  );
};

export default BackgroundImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'grey',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
