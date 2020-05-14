import {theme} from '@styles/theme';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const Divider = (): React.ReactElement => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: theme.viewport.dividerHeight,
    backgroundColor: theme.colors.white,
    marginVertical: 20,
  },
});

export default Divider;
