import Button from '@components/atoms/Button';
import {FormikProps, FormikValues} from 'formik';
import React from 'react';
import {StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface IFormButton {
  formProps: FormikProps<FormikValues>;
  buttonTitle: string;
  isLoading?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const FormSubmitButton = (props: IFormButton) => {
  const {
    buttonTitle,
    formProps,
    isLoading = false,
    titleStyle = {},
    containerStyle = {},
  } = props;
  const {handleSubmit, isSubmitting} = formProps;

  return (
    <Button
      isDisabled={isLoading || isSubmitting}
      onPress={handleSubmit}
      title={buttonTitle}
      containerStyle={[styles.container, containerStyle]}
      isLoading={isLoading || isSubmitting}
      titleStyle={titleStyle}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    width: 150,
    alignSelf: 'center',
  },
});

export default FormSubmitButton;
