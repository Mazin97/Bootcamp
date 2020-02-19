import React from 'react';
import PropTypes from 'prop-types';

import WebView from 'react-native-webview';

import { Container } from './styles';

export default function Repository({
  route: {
    params: { url },
  },
}) {
  return <Container as={WebView} source={{ uri: url }} />;
}

Repository.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
};
