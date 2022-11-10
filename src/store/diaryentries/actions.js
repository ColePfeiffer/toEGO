import { uid } from "quasar";
import { firebaseDb, firebaseAuth } from "boot/firebase";
import {
  onValue,
  remove,
  update,
  set,
  ref,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "firebase/database";

export function firebaseReadData({ commit, dispatch }) {
  console.log("lol?");
  let userID = firebaseAuth.currentUser.uid;
  let userNotes = ref(firebaseDb, "tasks/" + userID);
  console.log(userID, userNotes);
  //let userNotes = firebaseDb.ref("notes/" + userID);
}

export function setExpandedStatusOfAllNotesForDiaryID(
  { commit, state },
  diaryEntryID
) {
  let test = Object.entries(state.notes[diaryEntryID]);

  test.forEach((note) => {
    let noteID = note[0];
    let payload = {
      noteID: noteID,
      diaryEntryID: diaryEntryID,
      toggle: false,
      expanded: false,
    };
    commit("setExpanded", payload);
  });
}

export function addEntry({ commit, dispatch }, entry) {
  entry.id = uid();
  commit("addDiaryEntry", entry);
}

export function createDataForNewNote({ commit }, dateNoteIsCreatedFor) {
  commit("updateCreatedOn", dateNoteIsCreatedFor);
  commit("updateID", uid());
  commit("updateExpanded", false);
}

export function createNoteContainerViaDate(
  { getters, commit },
  dateNoteIsCreatedFor
) {
  let diaryEntryID = getters.getDiaryEntryIDByDate(dateNoteIsCreatedFor);
  commit("addContainer", diaryEntryID);
}

export function addNote(
  { state, commit, dispatch, getters },
  dateNoteIsCreatedFor
) {
  dispatch("createDataForNewNote", dateNoteIsCreatedFor);
  let diaryEntryID;
  if (getters.doesDiaryEntryExistForProvidedDate(dateNoteIsCreatedFor)) {
    diaryEntryID = getters.getDiaryEntryIDByDate(dateNoteIsCreatedFor);
    if (getters.doesNoteContainerExistForDiaryEntryID(diaryEntryID)) {
      commit("addNoteToContainer", diaryEntryID);
    } else {
      commit("addContainer", diaryEntryID);
      commit("addNoteToContainer", diaryEntryID);
    }
  } else {
    let newDiaryEntry = {
      date: dateNoteIsCreatedFor,
      editor: "",
    };
    dispatch("addEntry", newDiaryEntry);
    diaryEntryID = getters.getDiaryEntryIDByDate(dateNoteIsCreatedFor);
    commit("addContainer", diaryEntryID);
    commit("addNoteToContainer", diaryEntryID);
  }
}

export function deleteNote({ getters, commit }, payload) {
  let noteContainer = getters.getNoteContainerByDiaryEntryID(
    payload.diaryEntryID
  );
  let noteID = payload.note.id;
  let payloadForMutation = { noteContainer: noteContainer, noteID: noteID };
  commit("deleteNote", payloadForMutation);
}

export function saveChangesToEditedNote({ state, getters, commit }) {
  let diaryEntryID = getters.getDiaryEntryByDate(
    state.currentNote.createdOn
  ).id;
  let noteContainer = getters.getNoteContainerByDiaryEntryID(diaryEntryID);
  let payloadForMutation = {
    noteContainer: noteContainer,
    noteID: state.currentNote.id,
  };
  commit("overwriteNote", payloadForMutation);
}
