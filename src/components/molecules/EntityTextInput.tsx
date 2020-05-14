import {FormikProps, FormikValues} from 'formik';
import React from 'react';
import FormTextInput from './FormTextInput';
import {StyleSheet, View} from 'react-native';

interface IEntityInput {
  formProps: FormikProps<FormikValues>;
  entityCount: number;
}

const EntityTextInput = (props: IEntityInput) => {
  const {formProps, entityCount} = props;

  return (
    <>
      <FormTextInput
        formProps={formProps}
        inputName={`entities[${entityCount}].entityName`}
        label="Entity Name:"
        placeholder="Enter the title of entity"
        textInputStyle={styles.textInput}
        entityCount={entityCount}
      />
      <View style={styles.entityRow}>
        <FormTextInput
          formProps={formProps}
          inputName={`entities[${entityCount}].requestedAmount`}
          label="Requested Amount:"
          placeholder="Enter Requested amount"
          inputType={'number'}
          constainerStyle={styles.textInputContainer}
          textInputStyle={styles.textInput}
          entityCount={entityCount}
        />
        <View style={styles.seprator} />
        <FormTextInput
          formProps={formProps}
          inputName={`entities[${entityCount}].unitType`}
          label="Unit:"
          placeholder="Enter Unit type. eg- kg, unit."
          textInputStyle={styles.textInput}
          constainerStyle={styles.textInputContainer}
          entityCount={entityCount}
        />
      </View>
      <View style={styles.entityRow}>
        <FormTextInput
          formProps={formProps}
          inputName={`entities[${entityCount}].currentPrice`}
          label="Current Price:"
          placeholder="Enter Current price"
          inputType={'number'}
          constainerStyle={styles.textInputContainer}
          textInputStyle={styles.textInput}
          entityCount={entityCount}
        />
        <View style={styles.seprator} />
        <FormTextInput
          formProps={formProps}
          inputName={`entities[${entityCount}].currency`}
          label="Currency:"
          placeholder="Enter the currency. eg-INR"
          constainerStyle={styles.textInputContainer}
          textInputStyle={styles.textInput}
          entityCount={entityCount}
        />
      </View>
    </>
  );
};

export default EntityTextInput;

const styles = StyleSheet.create({
  entityRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textInputContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  seprator: {
    width: 12,
  },
  textInput: {
    color: 'white',
  },
});
