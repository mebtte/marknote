import React, { useCallback } from 'react';
import Types from 'prop-types';
import styled from 'styled-components';

import AppBar from './AppBar';
import Content from './Content';

import exportNote from '../../utils/exportNote';

const Style = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: white;
  transition: transform 0.3s ease-in-out;
  transform: translateY(${(props) => (props.open ? 0 : '100%')});
  z-index: 3;
  display: flex;
  flex-direction: column;
`;

const Preview = ({ open, note, onClose, openEditor, onDelete }) => {
  const onEdit = useCallback(() => openEditor(note), [note, openEditor]);
  const onExport = useCallback(() => exportNote(note), [note]);
  const onDeleteNote = useCallback(() => onDelete(note), [note]);

  return (
    <Style open={open}>
      <Content note={note} />
      <AppBar
        onExport={onExport}
        onBack={onClose}
        onEdit={onEdit}
        onDelete={onDeleteNote}
      />
    </Style>
  );
};
Preview.propTypes = {
  open: Types.bool.isRequired,
  note: Types.object,
  onClose: Types.func.isRequired,
  openEditor: Types.func.isRequired,
  onDelete: Types.func.isRequired,
};
Preview.defaultProps = {
  note: null,
};

export default Preview;
