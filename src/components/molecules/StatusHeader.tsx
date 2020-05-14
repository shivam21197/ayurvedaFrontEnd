import Icon from '@components/atoms/Icon';
import {Text} from '@components/atoms/Text';
import {campaignStatus} from '@domain/interfaces';
import {theme} from '@styles/theme';
import * as React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

interface IStatusHeader {
  title: string;
  subTitle?: string;
  status: campaignStatus;
  containerStyle?: StyleProp<ViewStyle>;
  titleContainer?: StyleProp<ViewStyle>;
}
const StatusHeader = (props: IStatusHeader) => {
  const {
    title,
    subTitle,
    status,
    containerStyle = {},
    titleContainer = {},
  } = props;

  return (
    <React.Fragment>
      <View style={[styles.cardHeader, containerStyle]}>
        <Text fontWeight={'bold'} containerStyle={titleContainer}>
          {title}
        </Text>
        <Icon
          name={'circle'}
          color={getStatusColor(status)}
          size={15}
          style={styles.icon}
        />
      </View>
      {subTitle ? (
        <Text fontWeight={'medium'} containerStyle={styles.cardHeader}>
          {subTitle}
        </Text>
      ) : null}
    </React.Fragment>
  );
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Completed':
      return theme.colors.screamingGreen;
    case 'Availed':
      return theme.colors.mustard;
    default:
      return theme.colors.skyBlue;
  }
};

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  icon: {
    alignSelf: 'center',
  },
});

export default StatusHeader;
