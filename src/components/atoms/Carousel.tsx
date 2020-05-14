import React from 'react';
import RNCarousel from 'react-native-snap-carousel';

// T is the generic type of each card which is rendered.
interface ICarouselProps<T> {
  data: T[];
  itemWidth: number;
  sliderWidth: number;
  card: React.ReactNode;
}

function Carousel<T>(props: ICarouselProps<T>) {
  const {data, itemWidth, sliderWidth, card: Card} = props;

  const renderItem = ({item}: {item: T}): React.ReactElement => {
    // @ts-ignore
    return <Card {...item} />;
  };

  return (
    <RNCarousel
      data={data}
      itemWidth={itemWidth}
      sliderWidth={sliderWidth}
      renderItem={renderItem}
      scrollEnabled={true}
      useScrollView={true}
    />
  );
}

export default Carousel;
