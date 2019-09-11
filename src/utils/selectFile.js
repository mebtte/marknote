/**
 * 生成input元素
 * 通过input.click方法调起文件选择器
 * 这个方法不稳定，偶尔情况下选取文件无效，onchange事件不会触发
 * 这可能是浏览器的一个bug
 */
export default ({ accept = '*', onSelect, multiple }) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = accept;
  input.multiple = multiple;
  input.onchange = () => {
    const { files } = input;
    if (!files.length) {
      return;
    }
    if (multiple) {
      onSelect(files);
    } else {
      onSelect(files[0]);
    }
    return setTimeout(() => input.remove(), 1000);
  };
  input.click();
};
