import React from 'react';
import Types from 'prop-types';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

const Style = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Empty = ({ onCreateNote }) => (
  <Style>
    <Button variant="contained" color="primary" onClick={onCreateNote}>
      创建笔记
    </Button>
  </Style>
);
Empty.propTypes = {
  onCreateNote: Types.func.isRequired,
};

export default Empty;
