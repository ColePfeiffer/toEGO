import { date } from "quasar";
import { useQuasar } from "quasar";

export const isDarkModeActive = (state) => {
  if (useQuasar().dark.isActive) {
    return true;
  } else {
    return false;
  }
};

// takes selectedDate as an argument and returns a diary entry, if a diary entry for the date exists
export const getDiaryEntryByDate = (state) => {
  return (selectedDate) => {
    let refToDiaryInStore = state.diaryEntries.find((diaryEntry) =>
      date.isSameDate(diaryEntry.date, selectedDate, "day")
    );
    if (refToDiaryInStore != undefined) {
      console.log("entry found: ", refToDiaryInStore);
    } else {
      console.log("no diary entry found, returning undefined.");
    }
    return refToDiaryInStore;
  };
};

export const getDefaultTemplate = (state) => {
  let defaultTemplate = state.diaryTemplates.find(
    (template) => template.isSetToDefault === true
  );

  if (defaultTemplate != undefined) {
    return defaultTemplate.text;
  } else {
    return undefined;
  }
};

// takes the method's ID as an argument and returns the matching method
export const getMethodById2 = (state) => {
  return (id) => {
    console.log("trying my best", id);
    let bla = state.eventData.methods.find((method) => method.id === id);
    console.log("found: ", bla);
    return state.eventData.methods.find((method) => method.id === id);
  };
};
