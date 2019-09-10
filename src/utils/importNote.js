import selectFile from './selectFile';
import snackbar from './snackbar';
import store from '../store';
import logger from './logger';

const TYPE = 'text/*';

export default (onSuccess) =>
  selectFile({
    accept: TYPE,
    onSelect: (file) => {
      console.log(file);
      const { name, type } = file;
      // 移动设备markdown文件的type=‘’，所以需要通过文件名简单判断
      if (
        (type && type.indexOf('text/')) ||
        (!type && name.indexOf('.md') === -1)
      ) {
        return snackbar.error('仅支持文本文件');
      }
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result;
        store
          .createNote(name.split('.')[0], content)
          .then((note) => onSuccess(note))
          .catch((error) =>
            logger.error(error, '导入笔记失败', { dialog: true }),
          );
      };
      reader.onerror = () => snackbar.error('解析文件失败');
      reader.readAsText(file);
    },
  });
