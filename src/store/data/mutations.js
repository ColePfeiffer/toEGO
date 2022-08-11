import { Dialog } from "quasar";
import { uid } from "quasar";
import state from "./state";
import shared from "../../shared.js";
import { date } from "quasar";
import getters from "./getters";

// payload consists of categoryName and type; type can be "DIARY" or "EVENT"
export const addNewCategory = (state, payload) => {
  let categories;
  if (payload.type === "DIARY") {
    categories = state.categoriesForDiary;
  } else {
    categories = state.categoriesForEvents;
  }
  let newCategory = {
    id: uid(),
    name: payload.categoryName,
    templatesByID: [],
    isInFolder: false,
  };
  categories.push(newCategory);
};

export const resetCategorySettingsForTemplate = (state, payload) => {
  let templateID = payload.templateID;
  let categories = payload.categories;
  let quicklist = payload.quicklist;

  categories.forEach((category) => {
    // if template id exists in category, delete it
    if (category.templatesByID.includes(templateID)) {
      category.templatesByID.splice(
        category.templatesByID.indexOf(templateID),
        1
      );
    }
  });

  if (quicklist.templatesById.includes(templateID)) {
    quicklist.templatesById.splice(
      quicklist.templatesById.indexOf(templateID),
      1
    );
  }
};

//payload consists of templateID and either diary's or event's quicklist
export const manageQuicklistStatusOfTemplate = (state, payload) => {
  let templateID = payload.templateID;
  let type = payload.type;

  if (type === "DIARY") {
    if (state.quicklistForDiary.templatesById.includes(templateID)) {
      state.quicklistForDiary.templatesById.splice(
        state.quicklistForDiary.templatesById.indexOf(templateID),
        1
      ); //deleting
    } else {
      state.quicklistForDiary.templatesById.push(templateID);
    }
  } else {
    if (state.quicklistForEvents.templatesById.includes(templateID)) {
      state.quicklistForEvents.templatesById.splice(
        state.quicklistForEvents.templatesById.indexOf(templateID),
        1
      ); //deleting
    } else {
      state.quicklistForEvents.templatesById.push(templateID);
    }
  }
};

// payload consists of category and templateID
export const addTemplateToCategory = (state, payload) => {
  let category = payload.category;
  let template = payload.template;
  template.isInCategory = true;
  category.templatesByID.push(template.id);
};

// payload consists of category, templateID
export const removeTemplateFromCategory = (state, payload) => {
  let category = payload.category;
  let template = payload.template;

  // Remove template from array
  console.log(category, template);
  var filteredArray = category.templatesByID.filter(function (templateID) {
    return templateID != template.id;
  });

  category.templatesByID = filteredArray;

  // if template isnt in any other category, set isInCategory to false
};

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
    editor: "",
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

// mode can either be CREATE or EDIT
export const setModeForNewEvent = (state, mode) => {
  if (mode === "CREATE") {
    state.newEventIsInCreationMode = true;
  } else {
    state.newEventIsInCreationMode = false;
  }
};

export const toggleExpandButtonForEventsOnDiaryPage = (state) => {
  state.isShowingExpandButtonOfEventCardsOnDiaryPage =
    !state.isShowingExpandButtonOfEventCardsOnDiaryPage;
};

/*
export const updateExpandedStatusOfEventViaEventID = (state, eventID) => {
  let event = state.events.find((event) => event.id === eventID);
  let newExpandedStatus = !event.expanded;
  event.expanded = newExpandedStatus;
};
*/

export const updateExpandedStatusOfEventViaEventID = (state, payload) => {
  let event = payload.diaryEntryRef.events.find(
    (event) => event.id === payload.eventID
  );

  let newExpandedStatus = !event.expanded;
  event.expanded = newExpandedStatus;
};

export const setExpandedStatusOfAllEvents = (state, payload) => {
  /*  payload uses the following keys:
      diaryEntryRef: current diaryEntry
      isExpanded: true / false
  */
  if (payload.diaryEntryRef != undefined) {
    payload.diaryEntryRef.events.forEach((event) => {
      event.expanded = payload.isExpanded;
      console.log("set expanded");
    });
  }
};

export const setExpandedStatusOfEventsOnDiaryPage = (state, isExpanded) => {
  state.eventsOnDiaryPageAreExpanded = isExpanded;
};

// if there is no
// if there is an entry existing already, it gets set to that
export const initiateDay = (state) => {
  console.log("initiating day");
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
};

export const deleteEvent = (state, payload) => {
  let indexOfEvent = payload.diaryEntryRef.events.indexOf(payload.eventData);
  payload.diaryEntryRef.events.splice(indexOfEvent, 1);
};

export const updateTitle = (state, value) => {
  state.eventData.title = value;
};

export const updateText = (state, value) => {
  state.eventData.text = value;
};

export const updateEditor = (state, value) => {
  state.eventData.editor = value;
};

export const updateMood = (state, value) => {
  state.eventData.mood = value;
};

export const updateCreatedOn = (state, value) => {
  state.eventData.createdOn = value;
};

export const updateLastSelectedDate = (state, value) => {
  state.lastSelectedDate = value;
};

export const updateID = (state, value) => {
  state.eventData.id = value;
};

export const updateEventData = (state, payload) => {
  state.eventData = payload.eventData;
  state.diaryEntryRef = payload.diaryEntryRef;
};

// updates the editor property of an entry
export const updateDiaryEntry = (state, payload) => {
  payload.diaryEntryRef.editor = payload.newData.editor;
};

// adds a new entry to the list
export const addEntryToDiaryEntries = (state, entry) => {
  entry.id = uid();
  state.diaryEntries.push(entry);
};

export const createTemplateAndAddToList = (state, payload) => {
  let newTemplate = {
    id: uid(),
    name: payload.name,
    text: payload.text,
    isSetToDefault: false,
  };
  console.log(payload.text);
  if (payload.type === "DIARY") {
    state.diaryTemplates.push(newTemplate);
  } else {
    state.eventTemplates.push(newTemplate);
  }
};

export const deleteTemplate = (state, payload) => {
  let templateList;
  if (payload.templateListType === "DIARY") {
    templateList = state.diaryTemplates;
  } else {
    templateList = state.eventTemplates;
  }
  let indexOfTemplate = templateList.indexOf(payload.template);
  console.log("index OF Template: ", indexOfTemplate, " deleted");
  templateList.splice(indexOfTemplate, 1);
};

export const setDefaultStatusOfTemplate = (state, payload) => {
  payload.templateList.forEach((template) => {
    if (template.id === payload.id) {
      template.isSetToDefault = !template.isSetToDefault;
    } else {
      template.isSetToDefault = false;
    }
  });
};

// adds a new event
// if there is an existing diary entry, it will be added to it's events property.
// if there is no existing diary entry, one will be created, so the event can be added.
export const addEventToEvents = (state, dateEventIsCreatedFor) => {
  let newEntry = "";

  // setting date and ID for the new event
  state.eventData.id = uid();
  state.eventData.createdOn = dateEventIsCreatedFor;
  state.eventData.expanded = false;

  let entryFound = false;
  for (let i = 0; i < state.diaryEntries.length; i++) {
    let diaryEntry = state.diaryEntries[i];
    if (date.isSameDate(diaryEntry.date, dateEventIsCreatedFor, "day")) {
      diaryEntry.events.push(state.eventData);
      entryFound = true;
      break;
    }
  }
  if (entryFound === false) {
    newEntry = {
      id: uid(),
      date: dateEventIsCreatedFor,
      editor: "",
      events: [],
    };
    newEntry.events.push(state.eventData);
    state.diaryEntries.push(newEntry);
  }
};

// saves the changes of an edited event
export const saveChangesToEditedEvent = (state) => {
  let id = state.eventData.id;

  let index = state.diaryEntryRef.events.findIndex((event) => {
    return event.id === id;
  });

  state.diaryEntryRef.events[index] = state.eventData;
};

export const changeButtonColorOnClick = (state, buttonID) => {
  if (state.lastButtonClicked === buttonID) {
    state.lastButtonClicked = buttonID;
  } else {
    state.lastButtonClicked = buttonID;
  }
};

export const setDialogVisibility = (state, payload) => {
  state.dialogSettings.nameOfCurrentDialog = payload.nameOfCurrentDialog;
  state.dialogSettings.isVisible = payload.isVisible;
  state.dialogSettings.isBackgroundVisible = payload.isBackgroundVisible;
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
