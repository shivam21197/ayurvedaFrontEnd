import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';

interface IIcon {
  name: string;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const Icon = (props: IIcon) => {
  const {name, color = 'white', size = 26, style = {}} = props;
  return (
    <FontIcon
      name={name}
      solid={true}
      color={color}
      size={size}
      style={style}
    />
  );
};

export default Icon;
