import selectFile from './selectFile';
import store from '../store';
import logger from './logger';

const TYPE = 'text/*';

export default (onSuccess) =>
  selectFile({
    accept: TYPE,
    multiple: true,
    onSelect: (files) => {
      const noteList = [];
      let errorCount = 0;
      Promise.all(
        Array.from(files).map(async (file) => {
          const { name, type } = file;
          // 移动设备markdown文件的type=‘’，所以需要通过文件名简单判断
          if (
            (type && type.indexOf('text/')) ||
            (!type && name.indexOf('.md') === -1)
          ) {
            return errorCount++;
          }
          try {
            const note = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                const content = reader.result;
                store
                  .createNote(name.split('.')[0], content)
                  .then(resolve)
                  .catch(reject);
              };
              reader.onerror = () => reject(new Error(`读取文件<${name}>失败`));
              reader.readAsText(file);
            });
            noteList.push(note);
          } catch (error) {
            errorCount++;
          }
        }),
      )
        .then(() => onSuccess(noteList))
        .catch((error) =>
          logger.error(error, '导入笔记失败', { dialog: true }),
        );
    },
  });
