import { date } from "quasar";
import { useQuasar } from "quasar";

// takes selectedDate as an argument and returns a diary entry, if a diary entry for the date exists
export const getDiaryEntryByDate = (state) => {
  return (selectedDate) => {
    let refToDiaryInStore = state.diaryEntries.find((diaryEntry) =>
      date.isSameDate(diaryEntry.date, selectedDate, "day")
    );
    if (refToDiaryInStore != undefined) {
      console.log("* * Entry found: ", refToDiaryInStore);
    } else {
      console.log("* * No Entry found.");
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
    let bla = state.eventData.methods.find((method) => method.id === id);
    return state.eventData.methods.find((method) => method.id === id);
  };
};

export const getFolderContent = (state) => {
  return (folder, categories) => {
    let array = [];

    folder.storedIDs.forEach((ID) => {
      array.push(categories.find((category) => category.id === ID));
    });
    return array;
  };
};

export const getTemplatesFromCategory = (state) => {
  return (category, templates) => {
    let array = [];
    category.storedIDs.forEach((ID) => {
      array.push(templates.find((template) => template.id === ID));
    });
    return array;
  };
};

export const getQuickListContent = (state) => {
  return (type) => {
    let array = [];
    if (type === "DIARY") {
      state.quicklistForDiary.storedIDs.forEach((templateID) => {
        array.push(
          state.diaryTemplates.find((template) => template.id === templateID)
        );
      });
    } else {
      state.quicklistForEvents.storedIDs.forEach((templateID) => {
        array.push(
          state.eventTemplates.find((template) => template.id === templateID)
        );
      });
    }

    return array;
  };
};

// checks if the provided item is a child of any parent of the parents-array and returns true if so
export const isItemChildToAnyParent = (state) => {
  return (payload) => {
    let parents = payload.parents;
    let child = payload.child;
    let isChildFromParent;

    for (let i = 0; i < parents.length; i++) {
      // if we find a parent to our item, we leave the loop early.
      if (parents[i].storedIDs.includes(child.id)) {
        isChildFromParent = true;
        return isChildFromParent;
      } else {
        isChildFromParent = false;
      }
    }
    return isChildFromParent;
  };
};

export const getCategoriesWithoutFolders = (state, getters) => {
  return (payload) => {
    let categories = payload.categories;
    let folders = payload.folders;

    /* we only want to get folderless categories,
    the following filtering process only returns those category-items, that meet the condition
    ("isItemChildToAnyParent" returning false) as that means it's folderless */

    return categories.filter((category) => {
      let data = { parents: folders, child: category };
      return getters.isItemChildToAnyParent(data) === false;
    });
  };
};

export const getTemplatesWithoutCategories = (state, getters) => {
  return (payload) => {
    let categories = payload.categories;
    let templates = payload.templates;

    return templates.filter((template) => {
      let data = { parents: categories, child: template };
      return getters.isItemChildToAnyParent(data) === false;
    });
  };
};

export const getTemplatesByType = (state) => {
  return (type) => {
    if (type === "DIARY") {
      return state.diaryTemplates;
    } else {
      return state.eventTemplates;
    }
  };
};

// TODO: L
// check these below again!
export const isCategoryEmpty = (state) => {
  return (category) => {
    if (typeof category !== "undefined" && category.storedIDs.length === 0) {
      return true;
    } else {
      return false;
    }
  };
};

export const areCategoriesInFolderEmpty = (state, getters) => {
  return (folder, categories) => {
    let folderIsEmpty;
    // if folder doesn't have any categories, return true
    if (folder.storedIDs.length === 0) {
      folderIsEmpty = true;
      // if folder has categories, check if they are empty
    } else {
      folder.storedIDs.forEach((categoryIDInFolder) => {
        // get the category by using the id stored in the folder
        let category = categories.find(
          (category) => category.id === categoryIDInFolder
        );
        // if the category is empty, return true
        if (getters.isCategoryEmpty(category)) {
          folderIsEmpty = true;
        } else {
          folderIsEmpty = false;
        }
      });
    }
    return folderIsEmpty;
  };
};

export const getNonEmptyFolders = (state, getters) => {
  return (folders, categories) => {
    let array = [];
    folders.forEach((folder) => {
      if (!getters.areCategoriesInFolderEmpty(folder, categories)) {
        array.push(folder);
      }
    });
    return array;
  };
};
