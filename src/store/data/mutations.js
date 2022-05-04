import { Dialog } from "quasar";
import { uid } from "quasar";
import state from "./state";
import shared from "../../shared.js";

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

export const addEventToEvents = (state) => {
  console.log("Adding Date and ID to event.");
  state.eventData.createdOn = new Date();
  state.eventData.id = uid();
  console.log("Adding Event to Events-List.");

  // später in die DB!
  state.events.push(state.eventData);
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
