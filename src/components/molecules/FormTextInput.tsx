import {Text} from '@components/atoms/Text';
import {WithFieldError} from '@components/molecules/WithFieldError';
import {theme} from '@styles/theme';
import {FormikErrors, FormikProps, FormikValues} from 'formik';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

type SupportedInputType =
  | 'email'
  | 'password'
  | 'number'
  | 'phone'
  | 'grouped-number'
  | 'default';

interface IFromTextProps extends TextInputProps {
  formProps: FormikProps<FormikValues>;
  inputName: string;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  constainerStyle?: StyleProp<ViewStyle>;
  inputType?: SupportedInputType;
  entityCount?: number;
}

const FormTextInput = (props: IFromTextProps) => {
  const {
    label,
    labelStyle = {},
    constainerStyle = {},
    textInputStyle = {},
  } = props;

  const inputProps = getInputProps(props);

  const error:
    | string
    | FormikErrors<any>
    | string[]
    | FormikErrors<any>[]
    | undefined = getError(props);

  if (error) {
    // TODO: change textInput border
    inputProps.style = {...inputProps.style, ...styles.error};
  }
  inputProps.style = [inputProps.style, textInputStyle];

  return (
    <View style={constainerStyle}>
      {label && (
        <Text containerStyle={[styles.label, labelStyle]}>{label}</Text>
      )}
      <WithFieldError error={error as string}>
        <TextInput {...inputProps} />
      </WithFieldError>
    </View>
  );
};

const getInputProps = (props: IFromTextProps): FormikValues => {
  const {formProps, inputName, placeholder, inputType = 'default'} = props;
  const {values, handleChange} = formProps;

  let inputProps: TextInputProps = {
    value: values[inputName],
    placeholder,
    onChangeText: handleChange(inputName),
    style: styles.textInput,
    placeholderTextColor: theme.colors.white,
  };

  switch (inputType) {
    case 'email':
      inputProps = {...inputProps, ...{keyboardType: 'email-address'}};
      break;
    case 'password':
      inputProps = {
        ...inputProps,
        secureTextEntry: true,
      };
      break;
    case 'number':
      inputProps = {
        ...inputProps,
        ...{keyboardType: 'number-pad'},
      };
      break;
    default:
      break;
  }

  return inputProps;
};

const getError = (
  props: IFromTextProps,
): string | string[] | FormikErrors<any> | FormikErrors<any>[] | undefined => {
  const {formProps, inputName, entityCount = -1} = props;
  const {errors, touched} = formProps;

  if (entityCount >= 0) {
    const entityName = inputName.split('.')[1];

    const entityValue =
      errors.entities &&
      errors.entities[entityCount] &&
      errors.entities[entityCount][entityName]
        ? errors.entities[entityCount][entityName]
        : null;

    return entityValue ? entityValue : undefined;
  }

  return touched[inputName] && errors[inputName]
    ? errors[inputName]
    : undefined;
};

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 8,
    fontSize: 16,
    height: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.skyBlue,
    borderRadius: 2,
    marginBottom: 8,
  },
  label: {
    marginTop: 8,
    marginBottom: 8,
  },
  error: {
    borderColor: theme.colors.tomato,
  },
});

export default FormTextInput;
