// adds a diary entry to diaryEntries
export const addDiaryEntry = (state, entry) => {
  state.diaryEntries.push(entry);
};

// adds a container for the provided ID
export const addContainer = (state, diaryEntryID) => {
  state.notes[diaryEntryID] = {};
};

// adds a note to the container corresponding to the ID
export const addNoteToContainer = (state, diaryEntryID) => {
  state.notes[diaryEntryID][state.currentNote.id] = state.currentNote;
};

export const deleteNote = (state, payload) => {
  let noteContainer = payload.noteContainer;
  let noteID = payload.noteID;
  delete noteContainer[noteID];
};

// resets current note
export const resetCurrentNote = (state) => {
  state.currentNote = {
    id: "",
    title: " ",
    mood: "",
    editor: "",
    createdOn: "",
    expanded: false,
  };
};

// sets expanded of a note; payload consists of diaryEntryID, noteID, expanded
export const setExpanded = (state, payload) => {
  if (payload.toggle) {
    state.notes[payload.diaryEntryID][payload.noteID].expanded =
      !state.notes[payload.diaryEntryID][payload.noteID].expanded;
  } else {
    state.notes[payload.diaryEntryID][payload.noteID].expanded =
      payload.expanded;
  }
};

export const overwriteNote = (state, payload) => {
  let noteContainer = payload.noteContainer;
  let noteID = payload.noteID;
  noteContainer[noteID] = state.currentNote;
};

export const setExpandedStatusOfEventsOnDiaryPage = (state, isExpanded) => {
  state.eventsOnDiaryPageAreExpanded = isExpanded;
};

export const updateExpanded = (state, value) => {
  state.currentNote.expanded = value;
};

export const updateTitle = (state, value) => {
  state.currentNote.title = value;
};

export const updateEditor = (state, value) => {
  state.currentNote.editor = value;
};

export const updateMood = (state, value) => {
  state.currentNote.mood = value;
};

export const updateCreatedOn = (state, value) => {
  state.currentNote.createdOn = value;
};

export const updateID = (state, value) => {
  state.currentNote.id = value;
};

export const updateCurrentNote = (state, payload) => {
  state.currentNote = payload.note;
  state.diaryEntryRef = payload.diaryEntry;
};
