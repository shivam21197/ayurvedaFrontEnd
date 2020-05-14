import images from '@assets/images';
import Carousel from '@components/atoms/Carousel';
import {Text} from '@components/atoms/Text';
import React from 'react';
import {ImageSourcePropType, StyleSheet, View} from 'react-native';

interface IOnboardCard {
  imageSource: ImageSourcePropType;
  description: string;
}

const onBoardCardData: IOnboardCard[] = [
  {
    imageSource: images.splashBackgroundImage,
    description: 'this is first screen',
  },
  {
    imageSource: images.splashBackgroundImage,
    description: 'this is secod screen',
  },
];

const onBoardCard = (card: IOnboardCard) => {
  const {imageSource, description} = card;
  return (
    <View style={{backgroundColor: 'blue'}}>
      <Text>{description}</Text>
    </View>
  );
};

const onBoardingScreen = (): React.ReactElement => {
  return (
    <View style={styles.constainer}>
      <Carousel<IOnboardCard>
        data={onBoardCardData}
        itemWidth={100}
        sliderWidth={500}
        card={onBoardCard}
      />
    </View>
  );
};

export default onBoardingScreen;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
});

/* <ProgressBar type={'bar'} barProps={{}} />
        <ProgressBar
          type={'circle'}
          barProps={{
            progress: 0.5,
            showsText: true,
            strokeCap: 'square',
            size: 100,
          }}
        />
        <ProgressBar
          type={'circle'}
          barProps={{
            progress: 0.7,
            showsText: true,
            fill: 'yellow',
            thickness: 0,
            size: 100,
          }}
        /> */
