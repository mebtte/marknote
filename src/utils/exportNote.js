import { saveAs } from 'file-saver';

import { DEFAULT_TITLE } from '../constants';

export default (note) => {
  const blob = new Blob([note.content], { type: 'text/plain;charset=utf-8' });
  return saveAs(blob, `${note.title || DEFAULT_TITLE}.md`);
};
