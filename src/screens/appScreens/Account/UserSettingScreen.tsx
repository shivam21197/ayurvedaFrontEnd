import Button from '@components/atoms/Button';
import Image from '@components/atoms/Image';
import {Text} from '@components/atoms/Text';
import FormSubmitButton from '@components/molecules/FormSubmitButton';
import FormTextInput from '@components/molecules/FormTextInput';
import StateAwareComponent from '@components/organisms/StateAwareComponent';
import {IUser} from '@domain/interfaces';
import {patchedUserData} from '@domain/userRepository';
import {IState} from '@modules/interfaces';
import UserActions from '@modules/user/actions';
import UserSelector from '@modules/user/selectors';
import LocalService from '@services/Locale/LocaleService';
import {theme} from '@styles/theme';
import {Formik, FormikProps, FormikValues} from 'formik';
import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
// @ts-ignore
import Lightbox from 'react-native-lightbox';
// @ts-ignore
import Slider from 'react-native-slider';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {connect} from 'react-redux';
import * as yup from 'yup';

interface ISettingProps {
  navigation: NavigationScreenProp<NavigationState>;
  isUserLoading: boolean;
  userData: IUser | null;
  userError: string;
  setUserDataSuccess: (userData: IUser) => void;
  setUserDataError: (string: string) => void;
  getUserAccountData: () => void;
}

interface ISettingState {
  userDetails: {
    name: string;
    username: string;
    email: string;
    maxDistance: number;
    contactNumber: string;
    DOB: string;
    oldPassword: string;
    newPassword: string;
    isChangePasswordPress: boolean;
  };
  isScreenLoading: boolean;
}

class UserSettingScreen extends React.PureComponent<
  ISettingProps,
  ISettingState
> {
  constructor(props: ISettingProps) {
    super(props);
    const {userData} = this.props;

    if (userData) {
      const {name, username, email, contactNumber, DOB, maxDistance} = userData;

      this.state = {
        userDetails: {
          name,
          username,
          email,
          contactNumber,
          maxDistance,
          DOB,
          oldPassword: '',
          newPassword: '',
          isChangePasswordPress: false,
        },
        isScreenLoading: false,
      };
    }
  }

  static getDerivedStateFromProps(
    nextProps: ISettingProps,
    prevProps: ISettingState,
  ) {
    const {userData} = nextProps;
    const {isScreenLoading} = prevProps;

    if (userData && isScreenLoading) {
      const {name, username, email, contactNumber, DOB, maxDistance} = userData;

      return {
        userDetails: {
          name,
          username,
          email,
          contactNumber,
          maxDistance,
          DOB,
          oldPassword: '',
          newPassword: '',
          isChangePasswordPress: false,
        },
      };
    }
    return null;
  }

  public getUserData = (): void => {
    this.props.getUserAccountData();
  };

  render() {
    const {isUserLoading, userError} = this.props;
    const {isScreenLoading} = this.state;

    return (
      <SafeAreaView style={[styles.container, styles.flexOne]}>
        <StateAwareComponent
          loading={isUserLoading || isScreenLoading}
          error={userError}
          renderComponent={this.renderScreen()}
          onErrorPress={this.getUserData}
        />
      </SafeAreaView>
    );
  }

  public renderScreen = (): React.ReactNode => {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.flexOne}>
        <ScrollView
          contentContainerStyle={[styles.screenConatiner, styles.flexOne]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.flexOne}>
            {this.renderUserImage()}
            {this.renderDetails()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  public renderUserImage = (): React.ReactNode => {
    const {userData} = this.props;
    if (!userData) {
      return null;
    }
    const {userImage} = userData;
    return (
      <View style={styles.userImageContainer}>
        <Lightbox renderContent={this.onUserImage}>
          <Image
            source={userImage ? {uri: userImage} : undefined}
            style={styles.image}
            width={100}
            height={100}
          />
        </Lightbox>
      </View>
    );
  };

  public onUserImage = () => {
    const {userData} = this.props;
    if (!userData) {
      return null;
    }
    const {userImage} = userData;

    return (
      <Image
        source={userImage ? {uri: userImage} : undefined}
        style={styles.image}
        width={'100%'}
        height={'50%'}
      />
    );
  };

  // TODO: location: String, idProofType: String, idProofImageUrl: String

  public renderDetails = (): React.ReactNode => {
    const {t} = LocalService;
    const {userDetails} = this.state;

    return (
      <View style={styles.flexOne}>
        <Formik
          initialValues={this.state.userDetails}
          onSubmit={this.onUserDetailSubmit}
          validationSchema={this.formSchema()}>
          {(formProps: FormikProps<FormikValues>) => {
            const onSilderChange = (value: number) =>
              this.onSliderValueChange(value, formProps);

            return (
              <React.Fragment>
                <FormTextInput
                  formProps={formProps}
                  inputName="name"
                  textInputStyle={[styles.textInput, styles.userNameInput]}
                />
                <View style={styles.inputGroupsContainer}>
                  <View style={styles.inputGroups}>
                    <FormTextInput
                      label={t('Setting.username')}
                      formProps={formProps}
                      inputName="username"
                      textInputStyle={styles.textInput}
                      constainerStyle={styles.textInputContainer}
                    />
                    <View style={styles.seprator} />
                    <FormTextInput
                      label={t('Setting.email')}
                      formProps={formProps}
                      inputName="email"
                      textInputStyle={styles.textInput}
                      constainerStyle={styles.textInputContainer}
                    />
                  </View>
                  <View style={styles.inputGroups}>
                    <FormTextInput
                      label={t('Setting.contactNumber')}
                      formProps={formProps}
                      inputType="number"
                      inputName="contactNumber"
                      textInputStyle={styles.textInput}
                      constainerStyle={styles.textInputContainer}
                    />
                    <View style={styles.seprator} />
                    <FormTextInput
                      label={t('Setting.DOB')}
                      formProps={formProps}
                      inputName="DOB"
                      textInputStyle={styles.textInput}
                      constainerStyle={styles.textInputContainer}
                    />
                  </View>
                  <React.Fragment>
                    <View style={styles.sliderHeading}>
                      <Text>{t('Setting.distributionRange')}</Text>
                      <Text>{formProps.values.maxDistance}</Text>
                    </View>
                    <Slider
                      value={userDetails.maxDistance}
                      onValueChange={onSilderChange}
                      step={1}
                      minimumValue={0}
                      maximumValue={100}
                      minimumTrackTintColor={theme.colors.orange}
                      maximumTrackTintColor={theme.colors.white}
                    />
                  </React.Fragment>
                  {userDetails.isChangePasswordPress ? (
                    <React.Fragment>
                      <FormTextInput
                        label={t('Setting.oldPassword')}
                        formProps={formProps}
                        inputName="oldPassword"
                        placeholder={t('Setting.oldPasswordPlaceholed')}
                        textInputStyle={styles.textInput}
                      />
                      <View style={styles.seprator} />
                      <FormTextInput
                        label={t('Setting.newPassword')}
                        formProps={formProps}
                        placeholder={t('Setting.newPasswordPlaceholed')}
                        inputName="newPassword"
                        textInputStyle={styles.textInput}
                      />
                    </React.Fragment>
                  ) : (
                    <Button
                      title={'Change Password'}
                      onPress={this.onChangePassword}
                      containerStyle={styles.changePasswordButton}
                    />
                  )}
                  {this.renderSubmitButton(formProps)}
                </View>
              </React.Fragment>
            );
          }}
        </Formik>
      </View>
    );
  };

  public formSchema = () => {
    const {t} = LocalService;
    return yup.object().shape({
      name: yup.string().trim().required(t('Setting.requiredName')),
      email: yup
        .string()
        .trim()
        .email(t('Setting.invalidEmail'))
        .required(t('Setting.requiredEmail')),
      username: yup.string().trim().required(t('Setting.requiredUserName')),
      contactNumber: yup
        .string()
        .trim()
        .required(t('Setting.requiredContactNumber')),
      DOB: yup.string().trim().required(t('Setting.requiredDOB')),
      maxDistance: yup.number().required(t('Setting.requiredMaxDistance')),
      oldPassword: yup.string().when('isChangePasswordPress', {
        is: true,
        then: yup.string().trim().required(t('Setting.requiredOldPassword')),
      }),
      newPassword: yup.string().when('isChangePasswordPress', {
        is: true,
        then: yup.string().trim().required(t('Setting.requiredNewPassword')),
      }),
    });
  };

  public onSliderValueChange = (
    value: number,
    formProps: FormikProps<FormikValues>,
  ) => {
    formProps.setFieldValue('maxDistance', value);
  };

  public renderSubmitButton = (
    formProps: FormikProps<FormikValues>,
  ): React.ReactNode => {
    const {values} = formProps;
    const {
      userDetails: {
        name,
        username,
        email,
        contactNumber,
        DOB,
        maxDistance,
        oldPassword,
        newPassword,
      },
    } = this.state;

    const isPasswordChanged =
      values.oldPassword !== oldPassword && values.newPassword !== newPassword;

    const showButton =
      values.name !== name ||
      values.username !== username ||
      values.email !== email ||
      values.contactNumber !== contactNumber ||
      values.DOB !== DOB ||
      values.maxDistance !== maxDistance ||
      isPasswordChanged;

    if (showButton) {
      return <FormSubmitButton formProps={formProps} buttonTitle={'Save'} />;
    }

    return null;
  };

  // TODO: catch error from the response, checkout apolo error handling library
  public onUserDetailSubmit = async (values: FormikValues) => {
    const {setUserDataError, setUserDataSuccess} = this.props;

    const {
      name,
      username,
      email,
      maxDistance,
      contactNumber,
      DOB,
      oldPassword,
      newPassword,
    } = values;

    this.setState({isScreenLoading: true});
    try {
      const userResponse = await patchedUserData({
        name,
        username,
        email,
        maxDistance,
        contactNumber,
        DOB,
        oldPassword,
        newPassword,
      });

      const {
        data: {
          data: {patchUserData},
        },
      } = userResponse;

      setUserDataSuccess(patchUserData);
      this.setState({isScreenLoading: false});
    } catch (e) {
      setUserDataError(e.message);
      this.setState({isScreenLoading: false});
    }
  };

  public onChangePassword = (): void => {
    const {userDetails} = this.state;
    const newUserDetails = {...userDetails, isChangePasswordPress: true};

    this.setState({userDetails: newUserDetails});
  };
}

const mapStateToProps = (state: IState) => {
  const {getUserData, getUserError, getUserLoading} = UserSelector;

  return {
    isUserLoading: getUserLoading(state),
    userData: getUserData(state),
    userError: getUserError(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  const {
    setUserDataSuccess,
    setUserDataError,
    getUserAccountData,
  } = UserActions;

  return {
    setUserDataSuccess: (payload: IUser) =>
      dispatch(setUserDataSuccess(payload)),
    setUserDataError: (error: string) => dispatch(setUserDataError(error)),
    getUserAccountData: () => dispatch(getUserAccountData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingScreen);

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  container: {
    backgroundColor: theme.colors.raisinBlack,
    borderBottomColor: theme.colors.white,
    borderBottomWidth: theme.layout.screenBottomBorderWidth,
  },
  screenConatiner: {
    marginVertical: theme.layout.screenVerticalMargin,
    marginHorizontal: theme.layout.screenHorizontalMargin,
  },
  image: {
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  userName: {
    marginTop: 12,
    alignSelf: 'center',
  },
  userImageContainer: {
    alignSelf: 'center',
  },
  textInput: {
    color: 'white',
  },
  inputGroups: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textInputContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  userNameInput: {
    borderWidth: 0,
    fontSize: 24,
    alignSelf: 'center',
  },
  seprator: {
    width: 12,
  },
  inputGroupsContainer: {
    marginTop: '20%',
  },
  changePasswordButton: {
    marginTop: 16,
  },
  sliderHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
});
