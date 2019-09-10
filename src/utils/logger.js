import dialog from './dialog';

export default {
  error: (error, description, options = {}) => {
    if (options.dialog) {
      dialog.alert({ title: description, message: error.message });
    }
    console.group(description);
    console.error(error);
    console.groupEnd();
  },
};
