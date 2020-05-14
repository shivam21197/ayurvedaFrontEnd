import React from 'react';
import {SafeAreaView, StyleSheet, KeyboardAvoidingView} from 'react-native';
import StateAwareComponent from '@components/organisms/StateAwareComponent';
import {theme} from '@styles/theme';
import {Formik, FormikProps, FormikValues} from 'formik';
import FormTextInput from '@components/molecules/FormTextInput';
import EntityTextInput from '@components/molecules/EntityTextInput';
import {ScrollView} from 'react-native-gesture-handler';
import * as yup from 'yup';
import FormSubmitButton from '@components/molecules/FormSubmitButton';
import {Text} from '@components/atoms/Text';
import Button from '@components/atoms/Button';

interface ICreateEntity {
  entityName: string;
  requestedAmount: number;
  unitType: string;
  currentPrice: number;
  currency: string;
}

export interface INewCampaignRequest {
  title: string;
  subTitle: string;
  entities: [ICreateEntity];
}

interface IDistributorState {
  campaignForm: INewCampaignRequest;
  entityCount: number;
}

const entity = {
  entityName: '',
  requestedAmount: 0,
  unitType: '',
  currentPrice: 0,
  currency: 'INR',
};

class DistributorScreen extends React.PureComponent<any, IDistributorState> {
  constructor(props: any) {
    super(props);
    this.state = {
      campaignForm: {
        title: '',
        subTitle: '',
        entities: [entity],
      },
      entityCount: 0,
    };
  }

  render() {
    const {isNearestCampaignsLoading, nearestCampaignsError} = this.props;
    return (
      <SafeAreaView style={[styles.container, styles.flexOne]}>
        <StateAwareComponent
          loading={isNearestCampaignsLoading}
          error={nearestCampaignsError}
          renderComponent={this.renderScreen()}
          onErrorPress={() => null}
        />
      </SafeAreaView>
    );
  }

  public renderScreen = (): React.ReactElement => {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.flexOne}>
        <ScrollView
          style={[styles.flexOne, styles.screenConatiner]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {this.renderCreateCampaign()}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  //   _id: string;
  //   title: string;
  //   subTitle?: string;
  //   entities?: IEntity[];
  //   status: campaignStatus;
  //   creatorId: IUser;
  //   donerIds?: IUser[];
  //   groupMemberIds?: IUser[];
  //   thumbnails?: IThumbnail[];
  //   description?: string;

  public renderCreateCampaign = () => {
    return (
      <Formik
        initialValues={this.state.campaignForm}
        validationSchema={this.getCampaignValidationSchema()}
        onSubmit={this.onSubmitCreateCampaign}>
        {(formProps: FormikProps<FormikValues>) => {
          const entities = [];
          for (let i = 0; i <= this.state.entityCount; i++) {
            entities.push(
              <EntityTextInput
                key={`${i}-entityInput`}
                formProps={formProps}
                entityCount={i}
              />,
            );
          }

          return (
            <>
              <FormTextInput
                label={'Title:'}
                formProps={formProps}
                inputName="title"
                placeholder="Enter the title of Campaign."
                textInputStyle={styles.textInput}
              />
              <FormTextInput
                label={'Sub Title:'}
                formProps={formProps}
                inputName="subTitle"
                placeholder="Enter Sub title of Campaign."
                textInputStyle={styles.textInput}
              />
              <Text containerStyle={[styles.label]}>{'Entities:'}</Text>
              {entities}
              <Button
                iconName="plus-circle"
                iconSize={20}
                onPress={this.onAddEntity}
              />
              <FormSubmitButton
                formProps={formProps}
                buttonTitle={'Add Campaign'}
              />
            </>
          );
        }}
      </Formik>
    );
  };

  public onAddEntity = () => {
    const {campaignForm, entityCount} = this.state;
    campaignForm.entities.push(entity);

    this.setState({
      entityCount: entityCount + 1,
      campaignForm: {
        ...campaignForm,
        entities: campaignForm.entities,
      },
    });
  };

  public getCampaignValidationSchema = () => {
    return yup.object().shape({
      title: yup.string().trim().required('Title is required'),
      subTitle: yup.string().trim(),
      entities: yup.array().of(
        yup.object().shape({
          entityName: yup.string().trim().required('entity Name is required'),
          requestedAmount: yup
            .number()
            .moreThan(0, 'Amount cant be zero')
            .required('Amount cant be blank.'),
          unitType: yup.string().trim().required('Unit type cant be blank'),
          currentPrice: yup
            .number()
            .moreThan(0, 'Current Price cant be zero')
            .required('Current Price cant be blank.'),
          currency: yup.string().trim().required('Currency cant be blank'),
        }),
      ),
    });
  };

  public onSubmitCreateCampaign = (values: FormikProps<FormikValues>) => {
    console.log(values, 'values@@');
  };
}

export default DistributorScreen;

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
    marginHorizontal: theme.layout.screenHorizontalMargin,
    marginVertical: theme.layout.screenVerticalMargin,
  },
  textInput: {
    color: 'white',
  },
  label: {
    marginTop: 8,
    marginBottom: 8,
  },
});
