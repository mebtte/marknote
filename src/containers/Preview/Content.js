import React from 'react';
import Types from 'prop-types';
import styled from 'styled-components';

import Markdown from 'react-markdown';

import { DEFAULT_TITLE } from '../../constants';

const Style = styled.div`
  flex: 1;
  min-height: 0;
  padding: 20px;
  overflow: auto;
`;

const Content = ({ note }) => {
  return (
    <Style className="markdown-body">
      <h1>{note ? note.title || DEFAULT_TITLE : DEFAULT_TITLE}</h1>
      <Markdown source={note ? note.content : ''} linkTarget="_blank" />
    </Style>
  );
};
Content.propTypes = {
  note: Types.object,
};
Content.defaultProps = {
  note: null,
};

export default Content;
