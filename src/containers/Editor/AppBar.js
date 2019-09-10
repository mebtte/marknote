import React from 'react';
import Types from 'prop-types';
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import CircularProgress from '@material-ui/core/CircularProgress';

const CustomToolbar = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const buttonStyle = {
  marginLeft: 1,
};

const Wrapper = ({ saving, onBack, onDelete, onPreview }) => (
  <AppBar position="static">
    <Toolbar variant="dense">
      {saving ? (
        <CircularProgress color="inherit" size={24} />
      ) : (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onBack}
        >
          <ArrowBackIcon />
        </IconButton>
      )}
      <CustomToolbar>
        <Tooltip title="删除">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onDelete}
            style={buttonStyle}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        {saving ? (
          <CircularProgress color="inherit" size={24} />
        ) : (
          <Tooltip title="预览">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={onPreview}
              style={buttonStyle}
            >
              <RemoveRedEyeIcon />
            </IconButton>
          </Tooltip>
        )}
      </CustomToolbar>
    </Toolbar>
  </AppBar>
);
Wrapper.propTypes = {
  onBack: Types.func.isRequired,
  onDelete: Types.func.isRequired,
  onPreview: Types.func.isRequired,
  saving: Types.bool.isRequired,
};

export default Wrapper;
