import React, { useMemo, useState, useEffect, useCallback } from 'react';
import Types from 'prop-types';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';

import AppBar from './AppBar';
import Content from './Content';

import logger from '../../utils/logger';

const Style = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: white;
  transition: transform 0.3s ease-in-out;
  transform: translateY(${(props) => (props.open ? 0 : '100%')});
  z-index: 2;
  display: flex;
  flex-direction: column;
`;
const titleStyle = {
  width: 'calc(100% - 40px)',
  margin: 20,
};

const Editor = ({ open, onClose, note, onDelete, updateNote, openPreview }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  const onBack = useCallback(() => {
    // 没有编辑不需要更新
    if (note.title === title && note.content === content) {
      return onClose();
    }
    setSaving(true);
    updateNote(note.id, { title, content })
      .then(() => onClose())
      .catch((error) => logger.error(error, '保存笔记失败', { dialog: true }))
      .finally(() => setSaving(false));
  }, [note, updateNote, onClose, title, content]);
  const onDeleteNote = useCallback(() => onDelete(note), [note, onDelete]);
  const onPreview = useCallback(() => {
    // 没有编辑不需要更新
    if (note.title === title && note.content === content) {
      return onPreview(note);
    }
    setSaving(true);
    updateNote(note.id, { title, content })
      .then((n) => openPreview(n))
      .catch((error) => logger.error(error, '保存笔记失败', { dialog: true }))
      .finally(() => setSaving(false));
  }, [updateNote, openPreview, note, title, content]);
  const onTitleChange = useCallback(
    (event) => setTitle(event.target.value),
    [],
  );
  const onContentChange = useCallback(
    (event) => setContent(event.target.value),
    [],
  );

  useEffect(() => {
    if (open && note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [open, note]);

  // 内容发生变化稍后自动保存
  useEffect(() => {
    if (!note) {
      return undefined;
    }
    const timer = setTimeout(() => {
      updateNote(note.id, { title, content }).catch((error) =>
        logger.error(error, '自动保存笔记失败', { dialog: true }),
      );
    }, 10 * 1000);
    return () => clearTimeout(timer);
  }, [note, title, content, updateNote]);

  return (
    <Style open={open}>
      {useMemo(
        () => (
          <TextField
            label="标题"
            value={title}
            onChange={onTitleChange}
            style={titleStyle}
          />
        ),
        [title, onTitleChange],
      )}
      {useMemo(
        () => (
          <Content
            placeholder="在这输入内容"
            value={content}
            onChange={onContentChange}
          />
        ),
        [content, onContentChange],
      )}
      <AppBar
        saving={saving}
        onBack={onBack}
        onPreview={onPreview}
        onDelete={onDeleteNote}
      />
    </Style>
  );
};
Editor.propTypes = {
  open: Types.bool.isRequired,
  onClose: Types.func.isRequired,
  note: Types.object,
  onDelete: Types.func.isRequired,
  updateNote: Types.func.isRequired,
  openPreview: Types.func.isRequired,
};
Editor.defaultProps = {
  note: null,
};

export default Editor;
