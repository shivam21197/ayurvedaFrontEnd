import Divider from '@components/atoms/Divider';
import ProgressBar from '@components/atoms/ProgressBar';
import {Label} from '@components/atoms/Text';
import StatusHeader from '@components/molecules/StatusHeader';
import {IEntity, IEntityAmount} from '@domain/interfaces';
import LocalService from '@services/Locale/LocaleService';
import {theme} from '@styles/theme';
import {Formik, FormikHelpers, FormikProps, FormikValues} from 'formik';
import React from 'react';
import {FlatList, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import * as yup from 'yup';
import FormSubmitButton from './FormSubmitButton';
import FormTextInput from './FormTextInput';
import {flashMessage} from '@utils/ErrorUtil';

interface IEntityList {
  containerStyle?: StyleProp<ViewStyle>;
  data: IEntity[];
  isHorizontal?: boolean;
  cardIndex?: number;
  onDonate: (entityAmount: IEntityAmount) => void;
}

let onDonateClick: (entityAmount: IEntityAmount) => void;

const EntityList = (props: IEntityList): React.ReactElement => {
  const {
    containerStyle = {},
    data,
    isHorizontal = false,
    cardIndex = 0,
    onDonate,
  } = props;

  onDonateClick = onDonate;

  return (
    <FlatList
      data={data}
      extraData={data}
      keyExtractor={keyExtractor}
      renderItem={renderEntity}
      ItemSeparatorComponent={renderSeperator}
      contentContainerStyle={containerStyle}
      horizontal={isHorizontal}
      listKey={`entityList-${cardIndex}-${Math.random().toString()}`}
    />
  );
};

const renderSeperator = (): React.ReactElement => <Divider />;

const keyExtractor = (item: IEntity, index: number): string =>
  `${item.title}-${index}`;

const renderEntity = ({item}: {item: IEntity}): React.ReactElement => {
  const {
    title,
    requestedAmount,
    availedAmount,
    status,
    unitType,
    currentPrice,
    currency,
  } = item;
  const {t} = LocalService;

  const entityValue = 0;
  // added 1 cuz, .lessThan in schema, to make it less than equal to
  const requiredValue = requestedAmount - availedAmount + 1;

  const unit = unitType ? unitType : t('Common.unit');
  const progress = availedAmount / requestedAmount;

  const onDonatePress = (
    values: FormikValues,
    formikHelpers: FormikHelpers<any>,
  ) => {
    try {
      onDonateClick({title, amount: values.entityValue});
      formikHelpers.setSubmitting(false);
      formikHelpers.resetForm({});
    } catch (e) {
      flashMessage({message: t('Common.donateError')});
      formikHelpers.resetForm({});
    }
  };

  return (
    <View style={styles.flexOne}>
      <View style={[styles.entityHeader, styles.flexOne]}>
        <StatusHeader
          title={title}
          status={status}
          containerStyle={styles.entityHeaderRight}
          titleContainer={styles.titleContainer}
        />
        {currentPrice && (
          <Label fontSize={'large'} fontWeight={'regular'}>
            {`${t('Common.currentPrice')} ${currentPrice} ${currency}/${unit}`}
          </Label>
        )}
      </View>
      <View style={[styles.quantityInfoContainer, styles.flexOne]}>
        <Label fontSize={'large'} fontWeight={'regular'}>
          {`${t('Common.requestedAmount')} ${requestedAmount} ${unit}`}
        </Label>
        <Label fontSize={'large'} fontWeight={'regular'}>
          {`${t('Common.availedAmount')} ${availedAmount} ${unit}`}
        </Label>
      </View>
      <ProgressBar
        type={'circle'}
        barProps={{
          showsText: true,
          progress,
          size: 60,
          fill: 'yellow',
          style: styles.progressBar,
        }}
      />
      {progress !== 1 && (
        <Formik
          initialValues={{entityValue, requiredValue}}
          onSubmit={onDonatePress}
          validationSchema={donateSchema()}>
          {(formProps: FormikProps<FormikValues>) => (
            <View>
              <FormTextInput
                formProps={formProps}
                inputName={'entityValue'}
                inputType={'number'}
                placeholder={t('Common.donatePlaceholder')}
                textInputStyle={styles.textInput}
              />
              <FormSubmitButton
                formProps={formProps}
                buttonTitle={t('Common.donate')}
                containerStyle={styles.donateButton}
              />
            </View>
          )}
        </Formik>
      )}
    </View>
  );
};

const donateSchema = () => {
  const {t} = LocalService;
  return yup.object({
    entityValue: yup
      .number()
      .required(t('Common.entityRequired'))
      .lessThan(yup.ref('requiredValue'), t('Common.entityValueGreater')),
  });
};

export default EntityList;

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  progressBar: {
    alignSelf: 'center',
  },
  quantityInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  entityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  entityHeaderRight: {
    justifyContent: 'flex-start',
  },
  titleContainer: {
    marginEnd: 4,
  },
  donateButton: {
    marginTop: 12,
  },
  textInput: {
    color: theme.colors.white,
  },
});
