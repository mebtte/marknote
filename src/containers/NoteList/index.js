import React, { useState, useCallback } from 'react';
import Types from 'prop-types';
import styled from 'styled-components';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppBar from './AppBar';
import Empty from './Empty';
import LoadingDisplay from '../../components/LoadingDisplay';
import ErrorDisplay from '../../components/ErrorDisplay';
import NoteList from './NoteList';

import { STATUS } from '../../constants';
import snackbar from '../../utils/snackbar';
import logger from '../../utils/logger';

const Style = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;
const displayStyle = {
  flex: 1,
  minHeight: 0,
};
const fabStyle = {
  position: 'absolute',
  bottom: 80,
  right: 30,
};

const Wrapper = ({
  status,
  reload,
  noteList,
  createNote,
  openEditor,
  openPreview,
  onDelete,
  onImport,
}) => {
  const [creating, setCreating] = useState(false);
  const [keyword, setKeyword] = useState('');

  const onEditNode = useCallback((note) => openEditor(note), [openEditor]);
  const onPreview = useCallback((note) => openPreview(note), [openPreview]);
  const onCreateNode = useCallback(() => {
    if (creating) {
      return snackbar.error('正在创建新的笔记...');
    }
    setCreating(true);
    createNote()
      .then(openEditor)
      .catch((error) =>
        logger.error(error, '创建新的笔记失败', { dialog: true }),
      )
      .finally(() => setCreating(false));
  }, [createNote, creating, openEditor]);
  const onKeywordChange = useCallback(
    (event) => setKeyword(event.target.value),
    [],
  );

  const lowerCaseKeyword = keyword.toLowerCase();
  return (
    <Style>
      <AppBar onImport={onImport} onKeywordChange={onKeywordChange} />
      {status === STATUS.SUCCESS ? (
        noteList.length ? (
          <>
            <NoteList
              noteList={noteList.filter(
                (n) =>
                  n.title.toLowerCase().includes(lowerCaseKeyword) ||
                  n.content.toLowerCase().includes(lowerCaseKeyword),
              )}
              onEdit={onEditNode}
              onPreview={onPreview}
              onDelete={onDelete}
            />
            <Fab
              color="primary"
              aria-label="add"
              style={fabStyle}
              onClick={onCreateNode}
            >
              {creating ? (
                <CircularProgress color="secondary" size={24} />
              ) : (
                <AddIcon />
              )}
            </Fab>
          </>
        ) : (
          <Empty onCreateNote={onCreateNode} />
        )
      ) : status === STATUS.LOADING ? (
        <LoadingDisplay style={displayStyle} />
      ) : (
        <ErrorDisplay reload={reload} style={displayStyle} />
      )}
    </Style>
  );
};
Wrapper.propTypes = {
  status: Types.oneOf(Object.values(STATUS)).isRequired,
  noteList: Types.arrayOf(Types.object).isRequired,
  reload: Types.func.isRequired,
  openEditor: Types.func.isRequired,
  createNote: Types.func.isRequired,
  openPreview: Types.func.isRequired,
  onDelete: Types.func.isRequired,
  onImport: Types.func.isRequired,
};

export default Wrapper;
