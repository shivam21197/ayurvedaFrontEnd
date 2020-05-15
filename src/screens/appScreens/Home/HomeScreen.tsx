import StateAwareComponent from '@components/organisms/StateAwareComponent';
import {theme} from '@styles/theme';
import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {Text} from '@components/atoms/Text';
import {ScrollView} from 'react-native-gesture-handler';

class HomeScreen extends React.PureComponent<any, any> {
  render() {
    return (
      <SafeAreaView style={[styles.container, styles.flexOne]}>
        <StateAwareComponent
          loading={false}
          error={''}
          renderComponent={this.renderScreen()}
          onErrorPress={() => {}}
        />
      </SafeAreaView>
    );
  }

  public renderScreen = (): React.ReactNode => {
    return (
      <ScrollView
        contentContainerStyle={[styles.flexOne, styles.screenConatiner]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsHorizontalScrollIndicator={false}>
        <Text>{'this is text screen'}</Text>
        <TextInput value={'search'} />
      </ScrollView>
    );
  };
}

export default connect(null, null)(HomeScreen);

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  container: {
    backgroundColor: theme.colors.white,
    borderBottomColor: theme.colors.white,
    borderBottomWidth: theme.layout.screenBottomBorderWidth,
  },
  screenConatiner: {
    marginHorizontal: theme.layout.screenHorizontalMargin,
    marginVertical: theme.layout.screenVerticalMargin,
  },
});
