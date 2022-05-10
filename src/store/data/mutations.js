import { Dialog } from "quasar";
import { uid } from "quasar";
import state from "./state";
import shared from "../../shared.js";
import { date } from "quasar";
import getters from "./getters";

export const updateDrawerState = (state, opened) => {
  state.drawerState = opened;
};

// EVENT DATA MUTATIONS
export const resetEventData = (state) => {
  state.eventData = {
    id: "",
    title: " ",
    mood: "",
    text: "",
    tags: "",
    createdOn: "",
    createdBy: "me", // ref or id
    expanded: false,
    methods: [
      {
        id: 1,
        textInput1: "",
        textInput2: "",
      },
      {},
    ],
  };
};
export const setExpandedStatusOfEvents = (state, bool) => {
  console.log("in mutations: setExpandedStatusOfEvents");
  state.events.forEach((event) => {
    event.expanded = bool;
  });
};

// if there is no
// if there is an entry existing already, it gets set to that
export const initiateDay = (state) => {
  let currentDate = new Date();

  state.diaryEntries.forEach((diaryEntry) => {
    // check if there is an entry for this day
    if (date.isSameDate(diaryEntry.date, currentDate, "day")) {
      state.diaryEntryForCurrentDay = diaryEntry;
      // no entry exists yet, so a temp one is created
    } else {
      state.diaryEntryForCurrentDay = {
        id: "temp",
        date: new Date(),
        editor: "Nothing here yet!",
        events: [],
      };
    }
  });
  console.log(state.diaryEntryForCurrentDay);
};

export const updateTitle = (state, value) => {
  state.eventData.title = value;
};

export const updateDiaryEntry = (state, updatedDiaryEntry) => {
  state.currentDiaryEntry = updatedDiaryEntry;
};

export const updateText = (state, value) => {
  state.eventData.text = value;
};

export const updateMood = (state, value) => {
  state.eventData.mood = value;
};

export const updateExpandedByEventID = (state, eventID) => {
  let event = state.events.find((event) => event.id === eventID);
  let newExpandedStatus = !event.expanded;
  event.expanded = newExpandedStatus;
};

export const addEntryToDiaryEntries = (state, entry) => {
  //state.eventData.id = uid();
  state.diaryEntries.push(entry);
  console.log("saved entry");
};

export const addEventToEvents = (state, createdOn) => {
  let newEntry = "";

  // setting date and ID for the new event
  state.eventData.createdOn = createdOn;
  state.eventData.id = uid();

  let entryFound = false;
  for (let i = 0; i < state.diaryEntries.length; i++) {
    let diaryEntry = state.diaryEntries[i];
    console.log("current diaryEntry in loop: ", diaryEntry);
    if (date.isSameDate(diaryEntry.date, createdOn, "day")) {
      console.log("diaryEntry found for this day. Adding event.....");
      diaryEntry.events.push(state.eventData);
      entryFound = true;
      break;
    }
  }
  if (entryFound === false) {
    newEntry = {
      id: uid(),
      date: createdOn,
      editor: "biepo",
      events: [],
    };
    newEntry.events.push(state.eventData);
    state.diaryEntries.push(newEntry);
    console.log("new entry created and added.");
  }
  console.log("Showing Events: ", state.events);
};

export const changeButtonColorOnClick = (state, buttonID) => {
  if (state.lastButtonClicked === buttonID) {
    state.lastButtonClicked = buttonID;
  } else {
    state.lastButtonClicked = buttonID;
  }
};

export const setDialogVisibility = (state, isVisible) => {
  state.newEventDialogIsOpen = isVisible;
  console.log(
    "@Mutations: SetDialogVisibility() to: ",
    state.newEventDialogIsOpen
  );
};

export const showModal = (state, componentName) => {
  state.modalVisible = true;
  state.modalComponent = componentName;
};
export const hideModal = (state) => {
  state.modalVisible = false;
};

// METHODS
// Handling Emotions
export const updateTextWhatICanDo = (state, { value, id }) => {
  let methodInEvent = state.eventData.methods.find(
    (method) => method.id === id
  );
  methodInEvent.textWhatICanDo = value;
};

export const updateRadioButtonIsBeyondControl = (state, { value, id }) => {
  let methodInEvent = state.eventData.methods.find(
    (method) => method.id === id
  );
  methodInEvent.radioButtonIsBeyondControl = value;
};
