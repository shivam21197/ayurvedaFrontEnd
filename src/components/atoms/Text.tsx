import * as React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text as RNText,
  TextProps,
  TextStyle,
} from 'react-native';

export interface IFontWeight {
  fontWeight: 'regular' | 'medium' | 'bold';
}

export type TextType = 'text' | 'label';

export type FontSize = 'small' | 'medium' | 'large';

export type FontWeight = 'regular' | 'medium' | 'bold';

interface IText extends TextProps {
  containerStyle?: StyleProp<TextStyle>;
  children: string | React.ReactNode;
  fontSize?: FontSize;
  fontWeight?: FontWeight;
}

export const Text = (props: IText) => {
  const {
    children,
    fontSize = 'small',
    fontWeight = 'regular',
    containerStyle = {},
  } = props;
  const style: TextStyle = getStyles(fontWeight, fontSize).text;

  return <RNText style={[style, containerStyle]}>{children}</RNText>;
};

export const Label = (props: IText) => {
  const {
    children,
    fontSize = 'small',
    fontWeight = 'regular',
    containerStyle = {},
  } = props;
  const style: TextStyle = getStyles(fontWeight, fontSize).label;

  return <RNText style={[style, containerStyle]}>{children}</RNText>;
};

const textFontSize = {
  small: 20,
  medium: 24,
  large: 28,
};

const labelFontSize = {
  small: 8,
  medium: 12,
  large: 16,
};

const getTextStyle = (
  fontWeight: string,
  fontSize: string,
  isLabel = false,
): {fontSize: number; fontWeight: any} => {
  let weight;
  let size;
  let fontSizes = textFontSize;
  if (isLabel) {
    fontSizes = labelFontSize;
  }
  const {small, medium, large} = fontSizes;

  switch (fontWeight) {
    case 'medium':
      weight = '400';
      break;
    case 'bold':
      weight = '700';
      break;
    default:
      weight = 'normal';
  }

  switch (fontSize) {
    case 'medium':
      size = medium;
      break;
    case 'large':
      size = large;
      break;
    default:
      size = small;
  }
  return {
    fontSize: size,
    fontWeight: weight,
  };
};

const getStyles = (fontWeight: string, fontSize: string) =>
  StyleSheet.create({
    text: {
      ...getTextStyle(fontWeight, fontSize),
      color: 'white',
    },
    label: {
      ...getTextStyle(fontWeight, fontSize, true),
      color: 'white',
    },
  });
