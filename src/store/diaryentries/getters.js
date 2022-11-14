import { date } from "quasar";

export const convertDateToUnix = () => {
  return (providedDate) => {
    return date.formatDate(providedDate, "X");
  };
};

export const convertUnixToDate = () => {
  return (providedDate) => {
    return new Date(providedDate * 1000);
  };
};

export const getNotesAsRevertedArrayByDiaryEntryID = (state, getters) => {
  return (diaryEntryID) => {
    let notesContainer = getters.getNotesByDiaryEntryID(diaryEntryID);
    if (notesContainer != undefined) {
      let array = Object.values(notesContainer);
      array.sort((a, b) => a.date - b.date);
      return array.slice().reverse();
    } else {
      return undefined;
    }
  };
};

export const getIndexOfNote = (state) => {
  return (note) => {
    return state.notes.indexOf(note);
  };
};

export const getNotesByDiaryEntryID = (state) => {
  return (diaryEntryID) => {
    let notesContainerForDiaryEntryID = state.notes[diaryEntryID];
    return notesContainerForDiaryEntryID;
  };
};

export const getDiaryEntryIDByDate = (state) => {
  return (providedDate) => {
    let diaryentry = state.diaryEntries.find((diaryEntry) =>
      date.isSameDate(diaryEntry.date, providedDate, "day")
    );
    let indexOfDiaryEntry = state.diaryEntries.indexOf(diaryentry);
    return state.diaryEntries[indexOfDiaryEntry].id;
  };
};

export const getNoteContainerByDiaryEntryID = (state) => {
  return (diaryEntryID) => {
    let notesContainerForDiaryEntryID = state.notes[diaryEntryID];
    if (notesContainerForDiaryEntryID != undefined) {
    } else {
    }
    return notesContainerForDiaryEntryID;
  };
};

export const doesNoteContainerExistForDiaryEntryID = (state) => {
  return (diaryEntryID) => {
    let notesContainerForDiaryEntryID = state.notes[diaryEntryID];
    if (notesContainerForDiaryEntryID != undefined) {
      return true;
    } else {
      return false;
    }
  };
};

export const doesDiaryEntryExistForProvidedDate = (state) => {
  return (providedDate) => {
    for (let i = 0; i < state.diaryEntries.length; i++) {
      if (date.isSameDate(state.diaryEntries[i].date, providedDate, "day")) {
        return true;
      }
    }
    return false;
  };
};

// takes selectedDate as an argument and returns a diary entry, if a diary entry for the date exists
export const getDiaryEntryByID = (state) => {
  return (ID) => {
    let ref = state.diaryEntries.find((diaryEntry) => diaryEntry.id === ID);
    return ref;
  };
};

export const getIndexOfDiaryEntryByID = (state) => {
  return (ID) => {
    let index = state.diaryEntries.findIndex(
      (diaryEntry) => diaryEntry.id === ID
    );
    return index;
  };
};

// takes selectedDate as an argument and returns a diary entry, if a diary entry for the date exists
export const getDiaryEntryByDate = (state) => {
  return (selectedDate) => {
    let refToDiaryInStore = state.diaryEntries.find((diaryEntry) =>
      date.isSameDate(diaryEntry.date, selectedDate, "day")
    );
    if (refToDiaryInStore != undefined) {
      //console.log("* * Entry found: ", refToDiaryInStore);
    } else {
      //console.log("* * No Entry found.");
    }
    return refToDiaryInStore;
  };
};
