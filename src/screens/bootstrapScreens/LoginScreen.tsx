import FormSubmitButton from '@components/molecules/FormSubmitButton';
import FormTextInput from '@components/molecules/FormTextInput';
import {postLogin} from '@domain/graphQueries';
import RoutesNames from '@navigation/routes';
import {baseUrl, DEFAULT_API_TIMEOUT} from '@network/Constants';
import LocalService from '@services/Locale/LocaleService';
import {theme} from '@styles/theme';
import {flashMessage} from '@utils/ErrorUtil';
import {LocalStorage, LocalStorageKeys} from '@utils/LoacalStorage';
import axios from 'axios';
import {Formik, FormikProps, FormikValues} from 'formik';
import React from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import * as yup from 'yup';

interface ILoginState {
  login: {
    email: string;
    password: string;
  };
}

interface ILoginProps {
  navigation: NavigationScreenProp<NavigationState>;
}

class LoginScreen extends React.PureComponent<ILoginProps, ILoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      login: {
        email: '',
        password: '',
      },
    };
  }

  render() {
    return (
      <View style={[styles.flexOne, styles.container]}>
        <Formik
          initialValues={this.state.login}
          onSubmit={this.onSubmitHandler}
          validationSchema={formSchema()}>
          {this.renderLoginForm}
        </Formik>
      </View>
    );
  }

  public renderLoginForm = (formProps: FormikProps<FormikValues>) => {
    const {t} = LocalService;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.flexOne}>
        <ScrollView
          contentContainerStyle={[styles.flexOne, styles.loginForm]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsHorizontalScrollIndicator={false}>
          <FormTextInput
            formProps={formProps}
            inputName={'email'}
            placeholder={t('Login.emailPlaceHolder')}
            label={t('Login.emailLabel')}
            labelStyle={styles.titleColor}
          />
          <FormTextInput
            formProps={formProps}
            inputType={'password'}
            inputName={'password'}
            placeholder={t('Login.passwordPlaceHolder')}
            label={t('Login.passwordLabel')}
            labelStyle={styles.titleColor}
          />
          <FormSubmitButton
            formProps={formProps}
            buttonTitle={t('Login.login')}
            titleStyle={styles.titleColor}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  public onSubmitHandler = async (values: FormikValues) => {
    const {navigation} = this.props;
    const {email, password} = values;

    try {
      const res = await axios.request({
        method: 'post',
        baseURL: baseUrl,
        timeout: DEFAULT_API_TIMEOUT,
        headers: {'Content-type': 'application/json'},
        data: postLogin(email, password),
      });
      const {
        data: {
          data: {
            login: {token},
          },
        },
      } = res;
      await LocalStorage.set(LocalStorageKeys.TOKEN, token);
      navigation.navigate(RoutesNames.AppRootStack);
    } catch (e) {
      flashMessage({message: e.message, type: 'info'});
    }
  };
}

const formSchema = () => {
  const {t} = LocalService;
  return yup.object().shape({
    email: yup.string().trim().required(t('Login.requiredEmail')),
    password: yup.string().trim().required(t('Login.requiredPassword')),
  });
};

export default LoginScreen;

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  container: {
    marginHorizontal: theme.layout.screenHorizontalMargin,
    marginVertical: theme.layout.screenVerticalMargin,
  },
  loginForm: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  titleColor: {
    color: theme.colors.black,
  },
});
