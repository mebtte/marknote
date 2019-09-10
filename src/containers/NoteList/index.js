import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import AppBar from './AppBar';
import LoadingDisplay from '../../components/LoadingDisplay';
import ErrorDisplay from '../../components/ErrorDisplay';

import { STATUS } from '../../constants';
import store from '../../store';
import logger from '../../utils/logger';

const Style = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
`;
const displayStyle = {
  flex: 1,
  minHeight: 0,
};
const fabStyle = {
  position: 'absolute',
  bottom: 50,
  right: 50,
};

const NoteList = () => {
  const [status, setStatus] = useState(STATUS.LOADING);
  const [noteList, setNoteList] = useState([]);
  const getNoteList = useCallback(() => {
    setStatus(STATUS.LOADING);
    store
      .getNoteList()
      .then((nl) => {
        setNoteList(nl);
        setStatus(STATUS.SUCCESS);
      })
      .catch((error) => {
        logger.error(error, '获取笔记列表失败', { dialog: true });
        setStatus(STATUS.FAILED);
      });
  }, []);

  useEffect(() => {
    getNoteList();
  }, [getNoteList]);

  console.log(noteList);

  return (
    <Style>
      <AppBar />
      {status === STATUS.SUCCESS ? (
        <>
          <Fab color="primary" aria-label="add" style={fabStyle}>
            <AddIcon />
          </Fab>
        </>
      ) : status === STATUS.LOADING ? (
        <LoadingDisplay style={displayStyle} />
      ) : (
        <ErrorDisplay reload={getNoteList} style={displayStyle} />
      )}
    </Style>
  );
};

export default NoteList;
