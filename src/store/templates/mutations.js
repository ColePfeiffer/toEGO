export const setEditorText = (state, text) => {
  state.editorText = text;
};

export const resetTemplatesCategoriesAndFolders = (state) => {
  state.templates = [];
  state.categories = [];
  state.folders = [];
};

export const setTemplatesDownloaded = (state, bool) => {
  state.templatesDownloaded = bool;
};

export const setCategoriesDownloaded = (state, bool) => {
  state.categoriesDownloaded = bool;
};

export const setFoldersDownloaded = (state, bool) => {
  state.foldersDownloaded = bool;
};
export const addLocalTemplate = (state, template) => {
  state.templates.push(template);
};
export const updateLocalTemplate = (state, payload) => {
  let template = payload.template;
  if (payload.index !== -1) {
    Object.assign(state.templates[payload.index], template);
  }
};
export const deleteLocalTemplate = (state, indexOfTemplate) => {
  state.templates.splice(indexOfTemplate, 1);
};

export const addLocalCategory = (state, category) => {
  state.categories.push(category);
};
/*
Setting the index directly for some reason breaks reactivity with some components (menu's list for example), but setting it by Object.assign() works.
    //state.categories[payload.index] = payload.category
*/
export const updateLocalCategory = (state, payload) => {
  let category = payload.category;
  if (payload.index !== -1) {
    Object.assign(state.categories[payload.index], category);

    if (category.storedIDs === undefined) {
      delete state.categories[payload.index].storedIDs;
    }
  }
};
export const deleteLocalCategory = (state, index) => {
  state.categories.splice(index, 1);
};

export const addLocalFolder = (state, folder) => {
  state.folders.push(folder);
};
export const updateLocalFolder = (state, payload) => {
  let folder = payload.folder;
  if (payload.index !== -1) {
    Object.assign(state.folders[payload.index], folder);
    if (folder.storedIDs === undefined) {
      delete state.folders[payload.index].storedIDs;
    }
  }
};
export const deleteLocalFolder = (state, index) => {
  state.folders.splice(index, 1);
};

/*
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

*/
