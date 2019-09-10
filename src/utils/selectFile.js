export default ({ accept = '*', onSelect }) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = accept;
  input.onchange = () => {
    const { files } = input;
    if (!files.length) {
      return;
    }
    onSelect(files[0]);
    return setTimeout(() => input.remove(), 0);
  };
  input.click();
};
