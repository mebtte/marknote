import React, { useState, useCallback } from 'react';
import Types from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Input from '@material-ui/core/InputBase';

import exportAllNotes from '../../utils/exportAllNotes';

const inputStyle = {
  flex: 1,
  minWidth: 0,
  color: 'inherit',
};

const Wrapper = ({ onImport, onKeywordChange }) => {
  const [anchor, setAnchor] = useState(null);

  const openMenu = useCallback((event) => setAnchor(event.currentTarget), []);
  const closeMenu = useCallback(() => setAnchor(null), []);
  const onImportNote = useCallback(() => {
    setAnchor(null);
    return onImport();
  }, [onImport]);
  const onExportAll = useCallback(() => {
    setAnchor(null);
    return exportAllNotes();
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Input
          type="search"
          placeholder="搜索笔记"
          style={inputStyle}
          onChange={onKeywordChange}
        />
        <IconButton color="inherit" onClick={openMenu}>
          <MoreIcon />
        </IconButton>
      </Toolbar>
      <Menu
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={closeMenu}
      >
        <MenuItem onClick={onImportNote}>
          <ListItemIcon>
            <CloudUploadIcon />
          </ListItemIcon>
          <Typography variant="inherit">导入笔记</Typography>
        </MenuItem>
        <MenuItem onClick={onExportAll}>
          <ListItemIcon>
            <CloudDownloadIcon />
          </ListItemIcon>
          <Typography variant="inherit">导出全部笔记</Typography>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};
Wrapper.propTypes = {
  onImport: Types.func.isRequired,
  onKeywordChange: Types.func.isRequired,
};

export default Wrapper;
