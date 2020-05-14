import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Bar,
  BarPropTypes,
  Circle,
  CirclePropTypes,
  CircleSnail,
  CircleSnailPropTypes,
  Pie,
  PiePropTypes,
} from 'react-native-progress';

interface IProgressBar {
  type: 'bar' | 'pie' | 'circle' | 'circleSnail';
  barProps:
    | BarPropTypes
    | CirclePropTypes
    | PiePropTypes
    | CircleSnailPropTypes;
}

const ProgressBar = (props: IProgressBar) => {
  const {type, barProps} = props;
  const {showsText, progress} = barProps as CirclePropTypes;
  let newProps = {...barProps};
  if (showsText && progress) {
    const formatText = () => {
      return `${Math.floor(progress * 100)} %`;
    };

    newProps = {
      ...barProps,
      style: [barProps.style, styles.progressBar],
      formatText,
      textStyle: {fontWeight: '800'},
    };
  }
  const BarTag = getBarTag(type);
  // @ts-ignore
  return <BarTag {...newProps} />;
};

const getBarTag = (type: string) => {
  switch (type) {
    case 'bar':
      return Bar;
    case 'pie':
      return Pie;
    case 'circle':
      return Circle;
    case 'circleSnail':
      return CircleSnail;
    default:
      return Bar;
  }
};

export default ProgressBar;

const styles = StyleSheet.create({
  progressBar: {
    marginVertical: 20,
  },
});
