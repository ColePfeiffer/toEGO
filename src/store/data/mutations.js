import { Dialog } from "quasar";
import { uid } from "quasar";
import state from "./state";
import shared from "../../shared.js";
import { date } from "quasar";
import getters from "./getters";

// payload consists of categoryName and type; type can be "DIARY" or "EVENT"
export const createCategory = (state, payload) => {
  let categories;
  if (payload.type === "DIARY") {
    categories = state.categoriesForDiary;
  } else {
    categories = state.categoriesForEvents;
  }
  let newCategory = {
    id: uid(),
    name: payload.categoryName,
    storedIDs: [],
  };
  categories.push(newCategory);
};

// renames a folder
export const renameCategory = (state, payload) => {
  let category = payload.item;
  let newName = payload.newName;
  category.name = newName;
};

export const resetCategorySettingsForTemplate = (state, payload) => {
  let templateID = payload.templateID;
  let categories = payload.categories;
  let quicklist = payload.quicklist;

  categories.forEach((category) => {
    // if template id exists in category, delete it
    if (category.storedIDs.includes(templateID)) {
      category.storedIDs.splice(category.storedIDs.indexOf(templateID), 1);
    }
  });

  if (quicklist.storedIDs.includes(templateID)) {
    quicklist.storedIDs.splice(quicklist.storedIDs.indexOf(templateID), 1);
  }
};

//payload consists of templateID and either diary's or event's quicklist
export const manageQuicklistStatusOfTemplate = (state, payload) => {
  let templateID = payload.templateID;
  let type = payload.type;

  if (type === "DIARY") {
    if (state.quicklistForDiary.storedIDs.includes(templateID)) {
      state.quicklistForDiary.storedIDs.splice(
        state.quicklistForDiary.storedIDs.indexOf(templateID),
        1
      ); //deleting
    } else {
      state.quicklistForDiary.storedIDs.push(templateID);
    }
  } else {
    if (state.quicklistForEvents.storedIDs.includes(templateID)) {
      state.quicklistForEvents.storedIDs.splice(
        state.quicklistForEvents.storedIDs.indexOf(templateID),
        1
      ); //deleting
    } else {
      state.quicklistForEvents.storedIDs.push(templateID);
    }
  }
};

// renames a folder
export const renameFolder = (state, payload) => {
  let folder = payload.item;
  let newName = payload.newName;
  folder.name = newName;
};

// deletes a folder, uses "type" to differ between foldertypes
export const deleteFolder = (state, payload) => {
  let folder = payload.folderToDelete;
  let type = payload.type;

  // remove folder from array
  if (type === "DIARY") {
    let indexOfFolder = state.foldersForDiary.indexOf(folder);
    state.foldersForDiary.splice(indexOfFolder, 1);
  } else {
    let indexOfFolder = state.foldersForEvents.indexOf(folder);
    state.foldersForEvents.splice(indexOfFolder, 1);
  }
};

export const createFolder = (state, payload) => {
  let folders;
  if (payload.type === "DIARY") {
    folders = state.foldersForDiary;
  } else {
    folders = state.foldersForEvents;
  }
  let newFolder = {
    id: uid(),
    name: payload.name,
    storedIDs: [],
  };
  folders.push(newFolder);
};

export const addChildToParent = (state, payload) => {
  let parent = payload.parent;
  let child = payload.child;
  parent.storedIDs.push(child.id);
};

export const removeChildFromParent = (state, payload) => {
  let parent = payload.parent;
  let child = payload.child;

  var filteredArray = parent.storedIDs.filter(function (categoryID) {
    return categoryID != child.id;
  });
  parent.storedIDs = filteredArray;
};

export const testAuto = (state, payload) => {
  let child = payload.child; // for example category item, template item ...
  let parents = payload.parents; // for example categories or  folders

  // child is in folder or category, that gets checked before comitting
  // !currentParent.storedIDs.includes(child.id)

  parents = parents.filter((parent) => !parent.storedIDs.includes(child.id));

  console.log(parents);
};

export const removeChildFromAllParents = (state, payload) => {
  let child = payload.child; // can be category item or template item ...
  let parents = payload.parents; // can be folders or categories

  parents.forEach((parent) => {
    // looks through every parent and filters out child's id from the parent's "storedIDs"-property by creating a new array without these filtered out items
    // then updates storedIds to the newly created array
    parent.storedIDs = parent.storedIDs.filter(function (storedIDs) {
      return storedIDs != child.id;
    });
  });
};

// payload consists of category and templateID
export const addTemplateToCategory = (state, payload) => {
  let category = payload.category;
  let template = payload.template;
  category.storedIDs.push(template.id);
};

// payload consists of category, templateID
export const removeTemplateFromCategory = (state, payload) => {
  let category = payload.category;
  let template = payload.template;

  // Remove template from array
  console.log(category, template);
  var filteredArray = category.storedIDs.filter(function (templateID) {
    return templateID != template.id;
  });

  category.storedIDs = filteredArray;
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

// * deletes a template
export const deleteTemplate = (state, payload) => {
  let template = payload.templateToDelete;
  let templates = payload.templates;

  let indexOfTemplate = templates.indexOf(template);
  templates.splice(indexOfTemplate, 1);
};

// * deletes a category
export const deleteCategory = (state, payload) => {
  let category = payload.categoryToDelete;
  let categories = payload.categories;

  let indexOfCategory = categories.indexOf(category);
  categories.splice(indexOfCategory, 1);
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
