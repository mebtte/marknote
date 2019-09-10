import React from 'react';
import Types from 'prop-types';
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloudDownloadcon from '@material-ui/icons/CloudDownload';

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

const Wrapper = ({ onBack, onDelete, onEdit, onExport }) => (
  <AppBar position="static">
    <Toolbar variant="dense">
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={onBack}
      >
        <ArrowBackIcon />
      </IconButton>
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
        <Tooltip title="导出">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onExport}
            style={buttonStyle}
          >
            <CloudDownloadcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="编辑">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onEdit}
            style={buttonStyle}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </CustomToolbar>
    </Toolbar>
  </AppBar>
);
Wrapper.propTypes = {
  onBack: Types.func.isRequired,
  onDelete: Types.func.isRequired,
  onEdit: Types.func.isRequired,
  onExport: Types.func.isRequired,
};

export default Wrapper;
