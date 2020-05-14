import {Label} from '@components/atoms/Text';
import {theme} from '@styles/theme';
import React, {Fragment} from 'react';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';

interface IProps {
  children: string | React.ReactNode | null;
  error?: string;
  hideError?: boolean;
  labelStyle?: StyleProp<TextStyle>;
}

export const WithFieldError = (props: IProps) => {
  const {children, error, hideError = false, labelStyle = {}} = props;
  const hasError = !!error;
  // @ts-ignore
  return (
    <Fragment>
      {children}
      {hasError && !hideError && (
        <Label fontSize={'medium'} containerStyle={[styles.label, labelStyle]}>
          {error}
        </Label>
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.tomato,
    marginTop: 3,
  },
});
