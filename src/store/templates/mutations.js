export const setEditorText = (state, text) => {
  state.editorText = text;
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
  if (payload.index !== -1) {
    state.templates[payload.index] = payload.template;
  }
};
export const deleteLocalTemplate = (state, indexOfTemplate) => {
  state.templates.splice(indexOfTemplate, 1);
};

export const addLocalCategory = (state, category) => {
  state.categories.push(category);
};
export const updateLocalCategory = (state, payload) => {
  if (payload.index !== -1) {
    state.categories[payload.index] = payload.category;
  }
};
export const deleteLocalCategory = (state, index) => {
  state.categories.splice(index, 1);
};

export const addLocalFolder = (state, folder) => {
  state.folders.push(folder);
};
export const updateLocalFolder = (state, payload) => {
  console.log(state.folders);
  if (payload.index !== -1) {
    state.folders[payload.index] = payload.folder;
  }
  console.log(state.folders);
};
export const deleteLocalFolder = (state, index) => {
  state.folders.splice(index, 1);
};

// old stuff ahead --- warning :O

// FIXME: turn into action; by using the prop icon in baseItemClickable we can determine if its a template or a category; then we can add that to our payload
// then we can differ between those two for setting the right stuff in the db
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
