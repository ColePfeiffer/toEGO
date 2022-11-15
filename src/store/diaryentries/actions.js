import { uid, date, Notify } from "quasar";
import { showErrorMessage } from "src/functions/function-show-error-message";
import { firebaseApp, firebaseDb, firebaseAuth } from "boot/firebase";
import {
  onValue,
  remove,
  update,
  set,
  ref,
  getChildren,
  serverTimestamp,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "firebase/database";

export function resetDiaryEntriesAndNotes({ commit }) {
  commit("setNotesDownloaded", false);
  commit("setDiaryEntriesDownloaded", false);
  commit("resetDiaryEntriesAndNotes");
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
      dispatch("firebaseCreateNote", diaryEntryID);
    } else {
      dispatch("firebaseCreateNoteContainer", diaryEntryID);
      dispatch("firebaseCreateNote", diaryEntryID);
    }
  } else {
    let newDiaryEntry = {
      id: uid(),
      date: dateNoteIsCreatedFor,
      editor: "",
    };
    dispatch("addEntry", newDiaryEntry);
    dispatch("firebaseCreateNoteContainer", newDiaryEntry.id);
    dispatch("firebaseCreateNote", newDiaryEntry.id);
  }
}
export function addEntry({ dispatch, getters }, entry) {
  entry.date = getters.convertDateToUnix(entry.date);
  entry.id = uid();
  dispatch("firebaseCreateDiaryEntry", entry);
}

// checks if the diaryentry is empty; if so, deletes it.
export function checkIfDiaryEntryIsEmpty(
  { dispatch, state, getters },
  diaryEntryID
) {
  if (state.notes[diaryEntryID] === undefined) {
    let diaryEntry = getters.getDiaryEntryByID(diaryEntryID);
    if (diaryEntry != undefined) {
      if (diaryEntry.editor === "") {
        dispatch("firebaseDeleteDiaryEntry", diaryEntryID);
      }
    }
  }
}

export function saveChangesToEditedNote({ state, getters, dispatch }) {
  let diaryEntryID = getters.getDiaryEntryByDate(state.currentNote.date).id;
  dispatch("firebaseUpdateNote", diaryEntryID);
}
export function createDataForNewNote({ commit }, dateNoteIsCreatedFor) {
  commit("updateDate", dateNoteIsCreatedFor);
  commit("updateID", uid());
  commit("updateExpanded", false);
}
// NOTE: Reading data -----------
export function firebaseReadData({ commit, dispatch, state, getters }) {
  let userID = firebaseAuth.currentUser.uid;
  let userNoteContainers = ref(firebaseDb, "notes/" + userID);

  // only fires once
  onValue(
    userNoteContainers,
    (snapshot) => {
      commit("setNotesDownloaded", true);
    },
    { onlyOnce: true },
    (error) => {
      if (error) {
        this.$router.replace("/loginRegister");
        showErrorMessage(error.message);
      }
    }
  );

  // whenever a child gets added
  onChildAdded(userNoteContainers, (snapshot) => {
    let noteContainer = snapshot.val();
    let payload = {
      diaryEntryID: snapshot.key,
      noteContainer: noteContainer,
    };
    dispatch("addNoteContainerToStore", payload);
  });

  onChildChanged(userNoteContainers, (snapshot) => {
    let noteContainer = snapshot.val();
    let payload = {
      diaryEntryID: snapshot.key,
      noteContainer: noteContainer,
    };
    dispatch("updateStoredNoteContainer", payload);
  });

  onChildRemoved(userNoteContainers, (snapshot) => {
    let diaryEntryID = snapshot.key;
    commit("deleteNoteContainer", diaryEntryID);
  });

  let userDiaryEntries = ref(firebaseDb, "diaryEntries/" + userID);

  // only fires once
  onValue(
    userDiaryEntries,
    (snapshot) => {
      commit("setDiaryEntriesDownloaded", true);
    },
    { onlyOnce: true },
    (error) => {
      if (error) {
        showErrorMessage(error.message);
      }
    }
  );

  onChildAdded(userDiaryEntries, (snapshot) => {
    let entry = snapshot.val();
    entry.date = getters.convertUnixToDate(entry.date);
    commit("addDiaryEntry", entry);
  });

  onChildChanged(userDiaryEntries, (snapshot) => {
    let index = getters.getIndexOfDiaryEntryByID(snapshot.key);
    let updatedDiaryEntry = snapshot.val();
    updatedDiaryEntry.date = getters.convertUnixToDate(updatedDiaryEntry.date);
    let payload = {
      index: index,
      updatedDiaryEntry: updatedDiaryEntry,
    };
    commit("updateDiaryEntry", payload);
  });

  onChildRemoved(userDiaryEntries, (snapshot) => {
    let index = getters.getIndexOfDiaryEntryByID(snapshot.key);
    commit("deleteDiaryEntry", index);
  });
}
// adds a note from firebase to our vuex store
export function addNoteContainerToStore({ getters, commit, state }, payload) {
  let updatedNoteContainer = payload.noteContainer;
  let noteContainerAsArray = Object.entries(payload.noteContainer);
  noteContainerAsArray.forEach((note) => {
    let noteID = note[0];
    updatedNoteContainer[noteID].date = getters.convertUnixToDate(
      payload.noteContainer[noteID].date
    );
  });

  let payloadForMutation = {
    diaryEntryID: payload.diaryEntryID,
    noteContainer: updatedNoteContainer,
  };
  commit("addContainerFromDatabase", payloadForMutation);
}
// updates a note from firebase
export function updateStoredNoteContainer({ getters, commit }, payload) {
  let noteContainer = payload.noteContainer;
  let noteContainerAsArray = Object.entries(payload.noteContainer);
  noteContainerAsArray.forEach((note) => {
    let noteID = note[0];
    noteContainer[noteID].date = getters.convertUnixToDate(
      payload.noteContainer[noteID].date
    );
  });
  let payloadForMutation = {
    diaryEntryID: payload.diaryEntryID,
    noteContainer: noteContainer,
  };
  commit("updateNoteContainer", payloadForMutation);
}
// ---------- Writing data -----------
export function firebaseCreateNoteContainer({}, diaryEntryID) {
  let userId = firebaseAuth.currentUser.uid;

  let noteContainerRef = ref(
    firebaseDb,
    "notes/" + userId + "/" + diaryEntryID
  );
  let emptyNoteContainer = {};
  showErrorMessage("bleh, container creation");
  set(noteContainerRef, emptyNoteContainer, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
}
export function firebaseCreateNote(
  { state, getters, commit, rootGetters },
  diaryEntryID
) {
  let userId = firebaseAuth.currentUser.uid;
  let noteRef = ref(
    firebaseDb,
    "notes/" + userId + "/" + diaryEntryID + "/" + state.currentNote.id
  );
  let updatedDate = getters.convertDateToUnix(state.currentNote.date);
  commit("updateDate", updatedDate);
  set(noteRef, state.currentNote, (error) => {
    if (error) {
      showErrorMessage(error.message);
    } else {
      Notify.create({
        icon: "bi-x",
        color: "secondary",
        textColor: rootGetters["layout/getTextColorOnSecondary"],
        message: "Note added.",
      });
    }
  });
}
export function firebaseUpdateNote({ getters, state, commit }, diaryEntryID) {
  let noteID = state.currentNote.id;
  // convert date to unix
  commit("updateDate", getters.convertDateToUnix(state.currentNote.date));
  let userId = firebaseAuth.currentUser.uid;
  let noteRef = ref(
    firebaseDb,
    "notes/" + userId + "/" + diaryEntryID + "/" + noteID
  );
  set(noteRef, state.currentNote, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
}
export function firebaseDeleteNote({ state, dispatch }) {
  let userId = firebaseAuth.currentUser.uid;
  let diaryEntryID = state.diaryEntryRef.id;
  let noteRef = ref(
    firebaseDb,
    "notes/" + userId + "/" + diaryEntryID + "/" + state.currentNote.id
  );
  remove(noteRef, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
  dispatch("checkIfDiaryEntryIsEmpty", diaryEntryID);
}
export function firebaseCreateDiaryEntry({ getters }, entry) {
  let userId = firebaseAuth.currentUser.uid;
  let diaryEntryRef = ref(
    firebaseDb,
    "diaryEntries/" + userId + "/" + entry.id
  );

  set(diaryEntryRef, entry, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
}
export function firebaseUpdateDiaryEntry({ getters }, updatedEntry) {
  updatedEntry.date = getters.convertDateToUnix(updatedEntry.date); // convert date to unix
  let userId = firebaseAuth.currentUser.uid;
  let diaryEntryRef = ref(
    firebaseDb,
    "diaryEntries/" + userId + "/" + updatedEntry.id + "/editor"
  );
  set(diaryEntryRef, updatedEntry.editor, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
}
export function firebaseDeleteDiaryEntry({ state }, diaryEntryID) {
  let userId = firebaseAuth.currentUser.uid;
  let diaryEntryToDelete = ref(
    firebaseDb,
    "diaryEntries/" + userId + "/" + diaryEntryID
  );
  remove(diaryEntryToDelete, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
}
export function setExpandedStatusOfAllNotesForDiaryID(
  { commit, state },
  payload
) {
  let test = Object.entries(state.notes[payload.diaryEntry.id]);
  test.forEach((note) => {
    let noteID = note[0];
    let payloadForMutation = {
      noteID: noteID,
      diaryEntryID: payload.diaryEntry.id,
      toggle: false,
      expanded: payload.isExpanded,
    };
    commit("setExpanded", payloadForMutation);
  });
}
