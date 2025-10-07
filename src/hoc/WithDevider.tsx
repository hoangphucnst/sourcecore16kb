import React from 'react';
import Components from '~/components';

interface WithDividerProps {
  isLast?: boolean;
}

const WithDevider = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const WithDivider: React.FC<P & WithDividerProps> = props => {
    const {isLast, ...restProps} = props;
    return (
      <React.Fragment>
        <WrappedComponent {...(restProps as P)} />
        {!isLast && <Components.Devider />}
      </React.Fragment>
    );
  };

  // Set display name for the component
  WithDivider.displayName = `WithDivider(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return WithDivider;
};

export default WithDevider;
