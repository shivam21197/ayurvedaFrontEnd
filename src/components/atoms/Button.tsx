import Icon from '@components/atoms/Icon';
import {FontSize, FontWeight, Text} from '@components/atoms/Text';
import {theme} from '@styles/theme';
import {PlatformUtils} from '@utils/PlatformUtil';
import * as React from 'react';
import {StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import LoadingSpinner from './LoadingSpinner';

interface IButtonProps {
  title?: string;
  iconName?: string;
  isDisabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textFontSize?: FontSize;
  textFontWeight?: FontWeight;
  iconSize?: number;
  onPress?: () => void;
  isLoading?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  showBorder?: boolean;
  needPadding?: boolean;
}

export const Touchable = PlatformUtils.isAndroid()
  ? TouchableNativeFeedback
  : TouchableOpacity;

const Button = (props: IButtonProps): React.ReactElement => {
  const {
    title,
    iconName,
    isDisabled = false,
    containerStyle = {},
    textFontWeight = 'medium',
    textFontSize = 'small',
    iconSize = 26,
    onPress,
    isLoading = false,
    titleStyle = {},
    showBorder = true,
    needPadding = true,
  } = props;

  const container: ViewStyle = createStyle(
    isDisabled,
    showBorder,
    needPadding,
    iconName,
  ).container;

  return (
    // @ts-ignore
    <Touchable
      style={[container, containerStyle]}
      disabled={isDisabled}
      onPress={onPress}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          {title && (
            <Text
              fontSize={textFontSize}
              fontWeight={textFontWeight}
              containerStyle={titleStyle}>
              {title}
            </Text>
          )}
          {iconName && <Icon name={iconName} size={iconSize} />}
        </React.Fragment>
      )}
    </Touchable>
  );
};

export default Button;

const createStyle = (
  isDisabled: boolean,
  showBorder: boolean,
  needPadding: boolean,
  iconName?: string,
) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: iconName ? 'center' : 'space-around',
      backgroundColor: isDisabled
        ? theme.colors.whiteSmoke
        : theme.colors.transparent,
      borderColor: showBorder ? theme.colors.white : theme.colors.nero,
      borderWidth: showBorder ? StyleSheet.hairlineWidth : 0,
      paddingVertical: needPadding ? 8 : 0,
      paddingHorizontal: needPadding ? 4 : 0,
    },
  });
