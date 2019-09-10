import React from 'react';
import Types from 'prop-types';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';

import formatDate from '../../utils/formatDate';

const Style = styled.div`
  height: 70px;
  margin: 0 24px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
  > .info {
    flex: 1;
    min-width: 0;
    cursor: pointer;
    > .title {
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #333;
    }
    > .time {
      font-size: 12px;
      color: gray;
      margin-top: 5px;
    }
  }
`;

const Note = ({ note, onPreview, onOpenMenu }) => (
  <Style>
    <div className="info" onClick={() => onPreview(note)}>
      <div className="title">{note.title || '未设置标题'}</div>
      <div className="time">{formatDate(note.updateTime)}</div>
    </div>
    <IconButton onClick={(event) => onOpenMenu(event, note)}>
      <MoreIcon />
    </IconButton>
  </Style>
);
Note.propTypes = {
  note: Types.object.isRequired,
  onOpenMenu: Types.func.isRequired,
  onPreview: Types.func.isRequired,
};

export default Note;
