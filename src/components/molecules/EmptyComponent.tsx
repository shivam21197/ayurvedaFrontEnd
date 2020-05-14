import {Text} from '@components/atoms/Text';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export interface IEmptyComponentProps {
    text?: string;
}

const DEFAULT_MESSAGE = 'No Data';

const EmptyComponent = (props: IEmptyComponentProps) => {
    const {text = DEFAULT_MESSAGE} = props;

    return (
        <View style={styles.container}>
            <Text>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default EmptyComponent;
