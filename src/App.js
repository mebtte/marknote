import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

import NoteList from './containers/NoteList';
import Editor from './containers/Editor';
import Preview from './containers/Preview';

import { STATUS } from './constants';
import store from './store';
import logger from './utils/logger';
import dialog from './utils/dialog';
import importNote from './utils/importNote';
import snackbar from './utils/snackbar';

const Style = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const App = () => {
  const [status, setStatus] = useState(STATUS.LOADING); // 初始化状态
  const [noteList, setNoteList] = useState([]); // 所有笔记列表
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null); // 正在编辑的笔记
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewingNote, setPreviewingNote] = useState(null); // 正在预览的笔记

  // 从本地取出笔记列表
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
  const openEditor = useCallback((n) => {
    setEditingNote(n);
    setEditorOpen(true);
    setPreviewOpen(false);
  }, []);
  const closeEditor = useCallback(() => setEditorOpen(false), []);
  const createNote = useCallback(async () => {
    const note = await store.createNote();
    setNoteList((noteList) => [note, ...noteList]);
    return note;
  }, []);
  const updateNote = useCallback(async (id, { title, content }) => {
    const newNote = await store.updateNote(id, { title, content });
    setNoteList((nl) =>
      nl
        .map((n) => {
          if (n.id === id) {
            return newNote;
          }
          return n;
        })
        .sort((a, b) => b.updateTime - a.updateTime),
    );
    return newNote;
  }, []);
  const openPreview = useCallback((note) => {
    setPreviewingNote(note);
    setPreviewOpen(true);
  }, []);
  const closePreview = useCallback(() => setPreviewOpen(false), []);
  const onDelete = useCallback(
    (note) =>
      dialog.confirm({
        title: '确定删除这篇笔记吗',
        message: '请注意，删除后不可恢复',
        onConfirm: () => {
          setPreviewOpen(false);
          setEditorOpen(false);
          const { id } = note;
          setNoteList((nl) => nl.filter((n) => n.id !== id));
          // 删除失败重新放回列表
          store.deleteNote(id).catch((error) => {
            logger.error(error, '删除笔记失败', { dialog: true });
            return setNoteList((nl) =>
              [note, ...nl].sort((a, b) => b.createTime - a.createTime),
            );
          });
        },
      }),
    [],
  );
  const onImport = useCallback(
    () =>
      importNote((n) => {
        setNoteList((nl) => [n, ...nl]);
        return snackbar.info('导入成功');
      }),
    [],
  );

  useEffect(() => {
    getNoteList();
  }, [getNoteList]);

  return (
    <Style>
      <NoteList
        status={status}
        reload={getNoteList}
        noteList={noteList}
        openEditor={openEditor}
        createNote={createNote}
        openPreview={openPreview}
        onDelete={onDelete}
        onImport={onImport}
      />
      <Editor
        open={editorOpen}
        onClose={closeEditor}
        note={editingNote}
        onDelete={onDelete}
        updateNote={updateNote}
        openPreview={openPreview}
      />
      <Preview
        open={previewOpen}
        note={previewingNote}
        onClose={closePreview}
        openEditor={openEditor}
        onDelete={onDelete}
      />
    </Style>
  );
};

export default App;
