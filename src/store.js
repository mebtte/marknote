import localforage from 'localforage';

const store = localforage.createInstance({ name: 'note_list' });

async function getNoteList() {
  const noteList = [];
  await store.iterate((value, key) => {
    try {
      const note = JSON.parse(value);
      noteList.push({
        id: key,
        ...note,
      });
    } catch (error) {
      console.error(error);
    }
  });
  return noteList;
}

export default {
  getNoteList,
};
