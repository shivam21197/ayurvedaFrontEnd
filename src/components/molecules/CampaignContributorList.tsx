import Button from '@components/atoms/Button';
import Divider from '@components/atoms/Divider';
import Image from '@components/atoms/Image';
import {Text} from '@components/atoms/Text';
import {IUser} from '@domain/interfaces';
import LocalService from '@services/Locale/LocaleService';
import * as React from 'react';
import {FlatList, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

interface IConstributoList {
  data: IUser[];
  isHorizontal?: boolean;
  title?: string;
  onViewAllPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  campaignListkey: string;
}
const CampaignContributorList = (
  props: IConstributoList,
): React.ReactElement => {
  const {
    data,
    isHorizontal = true,
    title,
    onViewAllPress,
    containerStyle = {},
    campaignListkey,
  } = props;

  const {t} = LocalService;

  return (
    <React.Fragment>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={[styles.listContainer, styles.flexOne, containerStyle]}>
        <View style={[styles.flexOne]}>
          <FlatList
            data={data}
            horizontal={isHorizontal}
            keyExtractor={keyExtractor}
            renderItem={
              isHorizontal ? renderHorizontalItems : renderVerticalItems
            }
            ItemSeparatorComponent={
              isHorizontal ? renderHorizontalSeperator : renderVerticalSeperator
            }
            listKey={`${campaignListkey}-contributorList-${Math.random().toString()}`}
          />
        </View>
        {isHorizontal && (
          <Button
            title={t('Common.viewAll')}
            showBorder={false}
            onPress={onViewAllPress}
            needPadding={false}
          />
        )}
      </View>
    </React.Fragment>
  );
};

const keyExtractor = (item: IUser, index: number): string =>
  `${item._id}-${index}`;

const renderHorizontalSeperator = (): React.ReactElement => (
  <View style={styles.horizontalSeperator} />
);

const renderVerticalSeperator = (): React.ReactElement => <Divider />;

const renderHorizontalItems = ({
  item,
  index,
}: {
  item: IUser;
  index: number;
}): React.ReactElement => {
  const {userImage} = item;
  return (
    <Image
      source={userImage ? {uri: userImage} : undefined}
      width={30}
      height={30}
      key={`${index}`}
    />
  );
};

const renderVerticalItems = ({
  item,
  index,
}: {
  item: IUser;
  index: number;
}): React.ReactElement => {
  const {userImage, name} = item;

  return (
    <View style={[styles.verticalItems, styles.flexOne]} key={`${index}`}>
      <Image
        source={userImage ? {uri: userImage} : undefined}
        width={50}
        height={50}
      />
      <Text fontSize={'medium'} containerStyle={styles.text}>
        {name}
      </Text>
    </View>
  );
};

export default CampaignContributorList;

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  horizontalSeperator: {
    width: 4,
  },
  verticalItems: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  title: {
    marginBottom: 4,
  },
  listContainer: {
    flexDirection: 'row',
  },
  text: {
    marginStart: 40,
    alignSelf: 'center',
  },
});
