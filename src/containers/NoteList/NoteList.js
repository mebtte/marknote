import React, { useState, useCallback } from 'react';
import Types from 'prop-types';
import styled from 'styled-components';

import List from 'react-list';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import Note from './Note';

import exportNote from '../../utils/exportNote';

const Style = styled.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
`;

const NoteList = ({ onPreview, onEdit, onDelete, noteList }) => {
  const [note, setNote] = useState(null);
  const [anchor, setAnchor] = useState(null);

  const onOpenMenu = useCallback((event, note) => {
    setNote(note);
    setAnchor(event.currentTarget);
  }, []);
  const onCloseMenu = useCallback(() => setAnchor(null), []);
  const itemRenderer = useCallback(
    (index, key) => (
      <Note
        key={key}
        note={noteList[index]}
        onOpenMenu={onOpenMenu}
        onPreview={onPreview}
      />
    ),
    [noteList, onOpenMenu, onPreview],
  );
  const onEditNote = useCallback(() => {
    setAnchor(null);
    onEdit(note);
  }, [note, onEdit]);
  const onExport = useCallback(() => {
    setAnchor(null);
    exportNote(note);
  }, [note]);
  const onDeleteNote = useCallback(() => {
    setAnchor(null);
    onDelete(note);
  }, [note, onDelete]);

  return (
    <Style>
      <List
        type="uniform"
        length={noteList.length}
        itemRenderer={itemRenderer}
      />
      <Menu
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={onCloseMenu}
      >
        <MenuItem onClick={onEditNote}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <Typography variant="inherit">编辑</Typography>
        </MenuItem>
        <MenuItem onClick={onExport}>
          <ListItemIcon>
            <CloudDownloadIcon />
          </ListItemIcon>
          <Typography variant="inherit">导出</Typography>
        </MenuItem>
        <MenuItem onClick={onDeleteNote}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <Typography variant="inherit">删除</Typography>
        </MenuItem>
      </Menu>
    </Style>
  );
};
NoteList.propTypes = {
  noteList: Types.arrayOf(Types.object).isRequired,
  onPreview: Types.func.isRequired,
  onEdit: Types.func.isRequired,
  onDelete: Types.func.isRequired,
};

export default NoteList;
