import { saveAs } from 'file-saver';

export default (note) => {
  const blob = new Blob([note.content], { type: 'text/plain;charset=utf-8' });
  return saveAs(blob, `${note.title || '未设置标题'}.md`);
};
