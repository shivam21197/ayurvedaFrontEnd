import ProgressBar from '@components/atoms/ProgressBar';
import {IThumbnail} from '@domain/interfaces';
import React from 'react';
import {FlatList, Image, StyleProp, ViewStyle} from 'react-native';
import Video, {OnBufferData} from 'react-native-video';

export const thumbnailType = {
  IMAGE: 'Image',
  VIDEO: 'Video',
};

interface IThumbnailList {
  containerStyle?: StyleProp<ViewStyle>;
  data: IThumbnail[];
  numColumns?: number;
  isHorizontal?: boolean;
  cardIndex?: number;
}

const ThumbnailList = (props: IThumbnailList): React.ReactElement => {
  const {
    data,
    containerStyle = {},
    numColumns = 2,
    isHorizontal = false,
    cardIndex = 0,
  } = props;

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderThumbnail}
      contentContainerStyle={containerStyle}
      horizontal={isHorizontal}
      numColumns={numColumns}
      listKey={`tumbnailList-${cardIndex}`}
    />
  );
};

const keyExtractor = (item: IThumbnail, index: number): string =>
  `${item.url}-${index}`;

const onBuffer = (data: OnBufferData): React.ReactNode => {
  if (!data.isBuffering) {
    return null;
  }
  return <ProgressBar type={'circleSnail'} barProps={{indeterminate: true}} />;
};

const onVideoError = () => {
  // TODO: show retry button or something
};

const renderThumbnail = ({item}: {item: IThumbnail}): React.ReactElement => {
  const {url, type} = item;
  const {IMAGE} = thumbnailType;
  const isImage: boolean = type === IMAGE;
  return (
    <React.Fragment>
      {isImage ? (
        <Image source={{uri: url}} />
      ) : (
        <Video
          source={{uri: url}}
          onBuffer={onBuffer}
          controls={true}
          onError={onVideoError}
        />
      )}
    </React.Fragment>
  );
};

export default ThumbnailList;
