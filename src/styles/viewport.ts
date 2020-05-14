import {Dimensions, StyleSheet} from 'react-native';
import layout from './layout';

const defaultHeight = Dimensions.get('window').height;
const defaultWidth = Dimensions.get('window').width;

export const viewport = {
  width: defaultWidth,
  height: defaultHeight,
  dividerWidth: defaultWidth - layout.screenHorizontalMargin,
  dividerHeight: StyleSheet.hairlineWidth,
};
