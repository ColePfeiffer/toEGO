import { uid } from "quasar";

export const createTemplateAndAddToList = (state, payload) => {
  let newTemplate = {
    id: uid(),
    name: payload.name,
    text: state.editorText,
    isSetToDefault: false,
  };
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

export const updateTemplate = (state, payload) => {
  payload.template.name = payload.name;
  payload.template.text = payload.text;
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
  let template = payload.template;
  let templateID = payload.template.id;
  let categories = payload.categories;
  let quicklist = payload.quicklist;
  template.isSetToDefault = false;

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
    console.log("diary");
    let indexOfFolder = state.foldersForDiary.indexOf(folder);
    console.log(state.foldersForDiary);
    state.foldersForDiary.splice(indexOfFolder, 1);
    console.log(state.foldersForDiary);
  } else {
    console.log("note");
    let indexOfFolder = state.foldersForEvents.indexOf(folder);
    console.log(state.foldersForEvents);
    state.foldersForEvents.splice(indexOfFolder, 1);
    console.log(state.foldersForEvents);
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
  var filteredArray = category.storedIDs.filter(function (templateID) {
    return templateID != template.id;
  });

  category.storedIDs = filteredArray;
};
