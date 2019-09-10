import React from 'react';
import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';

const Style = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingDisplay = (props) => (
  <Style {...props}>
    <CircularProgress />
  </Style>
);

export default LoadingDisplay;
