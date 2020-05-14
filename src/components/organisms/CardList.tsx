import {ICampaignRequest, IDonationHistory} from '@domain/interfaces';
import {theme} from '@styles/theme';
import React from 'react';
import {FlatList, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

interface ICardList {
  data: ICampaignRequest[] | IDonationHistory[];
  contentContainerStyle?: StyleProp<ViewStyle>;
  isHorizontal?: boolean;
  renderItem: ({
    item,
    index,
  }: {
    item: ICampaignRequest;
    index: number;
  }) => React.ReactElement;
  cardListkey: string;
}

const CardList = (props: ICardList): React.ReactElement => {
  const {
    contentContainerStyle = {},
    data,
    isHorizontal = true,
    renderItem,
    cardListkey,
  } = props;

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeperator}
      contentContainerStyle={[
        contentContainerStyle,
        isHorizontal ? styles.HorizontalContent : {},
      ]}
      horizontal={isHorizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      listKey={`${cardListkey}-cardList-${Math.random().toString()}`}
    />
  );
};

const renderSeperator = (): React.ReactElement => (
  <View style={styles.separator} />
);

const keyExtractor = (item: ICampaignRequest, index: number): string =>
  `${item._id}-${index}`;

export default CardList;

const styles = StyleSheet.create({
  separator: {
    height: 20,
    width: 20,
  },
  HorizontalContent: {
    paddingHorizontal: theme.layout.screenHorizontalMargin,
  },
});
