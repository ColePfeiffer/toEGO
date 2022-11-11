import { uid, date } from "quasar";
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

export function convertDateViaNoteContainerDateToUnix({}, noteContainer) {
  let updatedNoteContainer = noteContainer;
  let noteContainerAsArray = Object.entries(noteContainer);

  noteContainerAsArray.forEach((note) => {
    console.log("converting date to unix for ", note[1]);
    let noteID = note[0];
    console.log("date o convert ", updatedNoteContainer[noteID].date);
    console.log(
      "converted date ",
      date.formatDate(noteContainer[noteID].date, "X")
    );
    updatedNoteContainer[noteID].date = date.formatDate(
      noteContainer[noteID].date,
      "X"
    );
  });
  return updatedNoteContainer;
}

export function convertDateViaNoteContainerUnixToDate(
  { getters },
  noteContainer
) {
  console.log("converting unix to date");
  let updatedNoteContainer = noteContainer;
  let noteContainerAsArray = Object.entries(noteContainer);
  noteContainerAsArray.forEach((note) => {
    let noteID = note[0];
    updatedNoteContainer[noteID].date = getters.convertUnixToDate(
      noteContainer[noteID].date
    );
  });
  return updatedNoteContainer;
}

export function firebaseReadData({ commit, dispatch, state, getters }) {
  let userID = firebaseAuth.currentUser.uid;
  let userNoteContainers = ref(firebaseDb, "notes/" + userID);

  // whenever a child gets added
  onChildAdded(userNoteContainers, (snapshot) => {
    console.log("Copying note from firebase to local notes.");
    let noteContainer = snapshot.val();
    let updatedNoteContainer = dispatch(
      "convertDateViaNoteContainerUnixToDate",
      noteContainer
    );
    let payload = {
      diaryEntryID: snapshot.key,
      noteContainer: updatedNoteContainer,
    };
    commit("addContainerFromDatabase", payload);
  });

  onChildChanged(userNoteContainers, (snapshot) => {
    let noteContainer = snapshot.val();
    // https://stackoverflow.com/questions/54963700/how-to-get-value-instead-of-promise-from-firebase
    console.log("note container changed ", noteContainer);
    let updatedNoteContainer = dispatch(
      "convertDateViaNoteContainerUnixToDate",
      noteContainer
    );
    console.log("updated container @ date", updatedNoteContainer);

    let payload = {
      diaryEntryID: snapshot.key,
      updatedContainer: updatedNoteContainer,
    };
    commit("updateNoteContainer", payload);
    console.log("local notes container", state.notes);
  });

  onChildRemoved(userNoteContainers, (snapshot) => {
    let diaryEntryID = snapshot.key;
    commit("deleteNoteContainer", diaryEntryID);
  });

  let userDiaryEntries = ref(firebaseDb, "diaryEntries/" + userID);

  onChildAdded(userDiaryEntries, (snapshot) => {
    let entry = snapshot.val();
    entry.date = getters.convertUnixToDate(entry.date);
    commit("addDiaryEntry", entry);
  });

  onChildChanged(userDiaryEntries, (snapshot) => {
    let index = getters.getIndexOfDiaryEntryByID(snapshot.key);
    let payload = {
      index: index,
      updatedDiaryEntry: snapshot.val(),
    };
    commit("updateDiaryEntry", payload);
  });

  onChildRemoved(userDiaryEntries, (snapshot) => {
    let index = getters.getIndexOfDiaryEntryByID(snapshot.key);
    commit("deleteDiaryEntry", index);
  });

  /*
    onValue(userTasks, snapshot=>{
            commit('setTasksDownloaded', true)
        }, error => {
            if (error){
                console.log('error message: ', error.message)
                showErrorMessage(error.message)
                this.$router.replace('/auth')
            }
        })                
  */
}

export function firebaseAddNoteToContainer(
  { state, getters, commit },
  diaryEntryID
) {
  console.log("* Creating Note to Container @ firebase ");
  let userId = firebaseAuth.currentUser.uid;
  let noteRef = ref(
    firebaseDb,
    "notes/" + userId + "/" + diaryEntryID + "/" + state.currentNote.id
  );
  let updatedDate = getters.convertDateToUnix(state.currentNote.date);
  commit("updateDate", updatedDate);
  set(noteRef, state.currentNote, (error) => {
    if (error) {
      //showErrorMessage(error.message)
    }
  });
}

export function firebaseAddNoteContainer({ state }, diaryEntryID) {
  console.log("* Creating Note-Container @ firebase ");
  let userId = firebaseAuth.currentUser.uid;
  let noteContainerRef = ref(
    firebaseDb,
    "notes/" + userId + "/" + diaryEntryID
  );
  let emptyNoteContainer = {};
  set(noteContainerRef, emptyNoteContainer, (error) => {
    if (error) {
      //showErrorMessage(error.message)
    }
  });
}

export function firebaseAddDiaryEntry({}, entry) {
  console.log("* Creating Entry @ firebase ");
  let userId = firebaseAuth.currentUser.uid;
  let diaryEntryRef = ref(
    firebaseDb,
    "diaryEntries/" + userId + "/" + entry.id
  );

  console.log(entry.date);

  set(diaryEntryRef, entry, (error) => {
    if (error) {
      //showErrorMessage(error.message)
    }
  });
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

export function addEntry({ dispatch, getters }, entry) {
  entry.date = getters.convertDateToUnix(entry.date);
  entry.id = uid();
  dispatch("firebaseAddDiaryEntry", entry);
}

export function createDataForNewNote({ commit }, dateNoteIsCreatedFor) {
  commit("updateDate", dateNoteIsCreatedFor);
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
      dispatch("firebaseAddNoteToContainer", diaryEntryID);
    } else {
      dispatch("firebaseAddNoteContainer", diaryEntryID);
      dispatch("firebaseAddNoteToContainer", diaryEntryID);
    }
  } else {
    console.log("date: ", dateNoteIsCreatedFor);
    let newDiaryEntry = {
      id: uid(),
      date: dateNoteIsCreatedFor,
      editor: "",
    };
    dispatch("addEntry", newDiaryEntry);
    dispatch("firebaseAddNoteContainer", newDiaryEntry.id);
    dispatch("firebaseAddNoteToContainer", newDiaryEntry.id);
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
  let diaryEntryID = getters.getDiaryEntryByDate(state.currentNote.date).id;
  let noteContainer = getters.getNoteContainerByDiaryEntryID(diaryEntryID);
  let payloadForMutation = {
    noteContainer: noteContainer,
    noteID: state.currentNote.id,
  };
  commit("overwriteNote", payloadForMutation);
}
