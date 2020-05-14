import LoadingSpinner from '@components/atoms/LoadingSpinner';
import EmptyComponent from '@components/molecules/EmptyComponent';
import ErrorComponent from '@components/molecules/ErrorComponent';
import React from 'react';

export interface IStateAwareComponentProps {
  loading: boolean;
  error?: string;
  empty?: boolean;
  renderComponent: any | null;
  emptyText?: string;
  onErrorPress: () => void;
}

const StateAwareComponent = (
  props: IStateAwareComponentProps,
): React.ReactElement => {
  const {
    loading,
    error,
    empty,
    onErrorPress,
    emptyText,
    renderComponent,
  } = props;

  let renderView;

  if (error && error.length > 0) {
    renderView = <ErrorComponent text={error} onPress={onErrorPress} />;
  } else if (loading) {
    renderView = <LoadingSpinner />;
  } else if (empty) {
    renderView = <EmptyComponent text={emptyText} />;
  } else {
    renderView = renderComponent;
  }

  return renderView;
};

export default StateAwareComponent;
