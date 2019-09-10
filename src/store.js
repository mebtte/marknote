import localforage from 'localforage';

import getRandomString from './utils/getRandomString';

const store = localforage.createInstance({ name: 'note_list_v1' });

async function getNoteList() {
  const noteList = [];
  await store.iterate((value, key) => {
    try {
      const note = JSON.parse(value);
      noteList.push({
        ...note,
        id: key,
        createTime: new Date(note.createTime),
        updateTime: new Date(note.updateTime),
      });
    } catch (error) {
      console.error(error);
    }
  });
  return noteList.sort((a, b) => b.updateTime - a.updateTime);
}

async function createNote(title = '', content = '') {
  const id = getRandomString();
  const date = new Date();
  const note = { title, content, createTime: date, updateTime: date };
  await store.setItem(id, JSON.stringify(note));
  return {
    ...note,
    id,
  };
}

function deleteNote(id) {
  return store.removeItem(id);
}

async function updateNote(id, { title, content }) {
  const noteString = await store.getItem(id);
  const note = {
    ...JSON.parse(noteString),
    title,
    content,
    updateTime: new Date(),
  };
  await store.setItem(id, JSON.stringify(note));
  return {
    ...note,
    id,
  };
}

export default {
  getNoteList,
  createNote,
  deleteNote,
  updateNote,
};
