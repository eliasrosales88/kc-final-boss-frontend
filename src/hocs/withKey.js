import React from 'react';

export default function(propsToKey) {
  return function WithKey(WrappedComponent) {
    return function(props) {
      return <WrappedComponent {...props} key={propsToKey(props)} />;
    };
  };
}
