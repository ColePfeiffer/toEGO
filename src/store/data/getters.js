import { date } from "quasar";

export const getMethodById = (state, id) => {
  console.log("trying my best");
  return state.eventData.methods.find((method) => method.id === id);
};

export const getCurrentDiaryEntry = (state) => {
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

export const getMethodById2 = (state) => {
  return (id) => {
    console.log("trying my best", id);
    let bla = state.eventData.methods.find((method) => method.id === id);
    console.log("found: ", bla);
    return state.eventData.methods.find((method) => method.id === id);
  };
};

/*
export function someGetter (state) {
}
*/
