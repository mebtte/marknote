import React from 'react';
import Types from 'prop-types';
import styled from 'styled-components';

import Fab from '@material-ui/core/Fab';
import RefreshIcon from '@material-ui/icons/Refresh';

const Style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ErrorDisplay = ({ reload, ...props }) => (
  <Style {...props}>
    <Fab color="secondary" aria-label="add" onClick={reload}>
      <RefreshIcon />
    </Fab>
  </Style>
);
ErrorDisplay.propTypes = {
  reload: Types.func.isRequired,
};

export default ErrorDisplay;
