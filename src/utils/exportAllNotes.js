import { saveAs } from 'file-saver';
import JSZip from 'jszip';

import store from '../store';
import snackbar from './snackbar';
import logger from './logger';

export default async () => {
  snackbar.info('正在处理...');
  try {
    const noteList = await store.getNoteList();
    const zip = new JSZip();
    for (const note of noteList) {
      zip.file(`${note.title}.md`, note.content);
    }
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `marknote_${Date.now()}.zip`);
  } catch (error) {
    logger.error(error, '导出失败', { dialog: true });
  }
};
