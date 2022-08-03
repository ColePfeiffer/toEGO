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
      console.log("Entry found: ", refToDiaryInStore);
    } else {
      console.log("Entry found: none, returning undefined.");
    }
    return refToDiaryInStore;
  };
};

// takes templateType (String, "DIARY" or "EVENT") as an argument, chekcs if there is a default template
export const getDefaultTemplate = (state) => {
  return (templateType) => {
    let templateList;
    if (templateType === "EVENT") {
      templateList = state.eventTemplates;
    } else {
      templateList = state.diaryTemplates;
    }
    let defaultTemplate = templateList.find(
      (template) => template.isSetToDefault === true
    );

    if (defaultTemplate != undefined) {
      return defaultTemplate.text;
    } else {
      return undefined;
    }
  };
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

export const getFolderContent = (state) => {
  return (folder, categories) => {
    let array = [];

    folder.categoriesByID.forEach((ID) => {
      array.push(categories.find((category) => category.id === ID));
    });
    return array;
  };
};

export const getQuickListContent = (state) => {
  let array = [];
  state.quicklistForDiary.templatesById.forEach((templateID) => {
    array.push(
      state.diaryTemplates.find((template) => template.id === templateID)
    );
  });
  return array;
};

export const isTemplateInCategory = (state) => {
  return (payload) => {
    if (payload.category.templatesByID.includes(payload.templateID)) {
      return true;
    } else {
      return false;
    }
  };
};
