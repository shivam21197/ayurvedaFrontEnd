import rootReducer from '@modules/reducers';
import AppNavigation from '@navigation/index';
import {LocalService} from '@services/Locale/LocaleService';
import {StoreProviderService} from '@services/StoreProviderService';
import {flashMessage} from '@utils/ErrorUtil';
import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import 'react-native-gesture-handler';
import * as RNLocalize from 'react-native-localize';
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

export class App extends React.PureComponent {
  constructor(props: any) {
    super(props);

    StoreProviderService.init(() => {
      const middleware = applyMiddleware(thunk);
      const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
      // added thunk middleware
      return createStore(rootReducer, composeEnhancers(middleware));
    });
    LocalService.init();
  }

  private handleLocalizationChange = (): void => {
    try {
      LocalService.init();
    } catch (e) {
      flashMessage({message: e.message});
    }
  };

  componentDidMount() {
    RNLocalize.addEventListener('change', this.handleLocalizationChange);
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange);
  }

  render() {
    return (
      <Provider store={StoreProviderService.getStore()}>
        <View style={styles.container}>
          <StatusBar barStyle={'light-content'} />
          <AppNavigation />
          <FlashMessage />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
