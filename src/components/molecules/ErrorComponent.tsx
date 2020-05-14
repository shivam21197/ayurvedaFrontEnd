import Button from '@components/atoms/Button';
import {Text} from '@components/atoms/Text';
import LocalService from '@services/Locale/LocaleService';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface IErrorComponentProps {
  text: string;
  onPress: () => void;
}

const ErrorComponent = (props: IErrorComponentProps) => {
  const {text, onPress} = props;
  const {t} = LocalService;

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <Button
        onPress={onPress}
        title={t('Common.retry')}
        iconName={'exclamation-circle'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ErrorComponent;
