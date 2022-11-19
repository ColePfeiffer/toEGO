import { uid, date } from "quasar";
import { firebaseApp, firebaseDb, firebaseAuth } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";
import {
  onValue,
  remove,
  update,
  set,
  ref,
  getChildren,
  serverTimestamp,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "firebase/database";

export function firebaseReadData({ commit, dispatch, state, getters }) {
  let userID = firebaseAuth.currentUser.uid;

  // TEMPLATES
  let templates = ref(firebaseDb, "templates/" + userID + "/templates");
  onValue(
    templates,
    (snapshot) => {
      commit("setTemplatesDownloaded", true);
    },
    { onlyOnce: true },
    (error) => {
      if (error) {
        showErrorMessage(error.message);
      }
    }
  );

  // whenever a child gets added
  onChildAdded(templates, (snapshot) => {
    let template = snapshot.val();
    commit("addLocalTemplate", template);
  });

  onChildChanged(templates, (snapshot) => {
    let template = snapshot.val();
    let index = getters.getTemplateIndexByID(template.id);
    let payload = {
      index: index,
      template: template,
    };
    commit("updateLocalTemplate", payload);
  });

  onChildRemoved(templates, (snapshot) => {
    let template = snapshot.val();
    let indexOfTemplate = getters.getTemplateIndexByID(template.id);
    commit("deleteLocalTemplate", indexOfTemplate);
  });

  // CATEGORIES
  let categories = ref(firebaseDb, "templates/" + userID + "/categories");
  onValue(
    categories,
    (snapshot) => {
      commit("setCategoriesDownloaded", true);
    },
    { onlyOnce: true },
    (error) => {
      if (error) {
        showErrorMessage(error.message);
      }
    }
  );

  // whenever a child gets added
  onChildAdded(categories, (snapshot) => {
    let category = snapshot.val();
    commit("addLocalCategory", category);
  });

  onChildChanged(categories, (snapshot) => {
    let category = snapshot.val();
    let index = getters.getCategoryIndexByID(category.id);
    let payload = {
      index: index,
      category: category,
    };
    commit("updateLocalCategory", payload);
  });

  onChildRemoved(categories, (snapshot) => {
    let category = snapshot.val();
    let index = getters.getCategoryIndexByID(category.id);
    commit("deleteLocalCategory", index);
  });

  // FOLDERS
  let folders = ref(firebaseDb, "templates/" + userID + "/folders");
  onValue(
    folders,
    (snapshot) => {
      commit("setFoldersDownloaded", true);
    },
    { onlyOnce: true },
    (error) => {
      if (error) {
        showErrorMessage(error.message);
      }
    }
  );

  // whenever a child gets added
  onChildAdded(folders, (snapshot) => {
    let folder = snapshot.val();
    commit("addLocalFolder", folder);
  });

  onChildChanged(folders, (snapshot) => {
    let folder = snapshot.val();
    let index = getters.getFolderIndexByID(folder.id);
    let payload = {
      index: index,
      folder: folder,
    };
    commit("updateLocalFolder", payload);
  });

  onChildRemoved(folders, (snapshot) => {
    let folder = snapshot.val();
    let index = getters.getFolderIndexByID(folder.id);
    commit("deleteLocalFolder", index);
  });
}

export function firebaseInitiate({ dispatch }) {
  dispatch("firebasInitiateTemplates");
  dispatch("firebasInitiateCategories");
  dispatch("firebasInitiateFolders");
}

export function firebasInitiateTemplates({ state }) {
  let userId = firebaseAuth.currentUser.uid;
  state.defaultTemplates.forEach((template) => {
    let path = ref(
      firebaseDb,
      "templates/" + userId + "/templates/" + template.id
    );
    set(path, template, (error) => {
      if (error) {
        showErrorMessage(error.message);
      }
    });
  });
}

export function firebasInitiateCategories({ state }) {
  let userId = firebaseAuth.currentUser.uid;
  state.defaultCategories.forEach((category) => {
    let path = ref(
      firebaseDb,
      "templates/" + userId + "/categories/" + category.id
    );
    set(path, category, (error) => {
      if (error) {
        showErrorMessage(error.message);
      }
    });
  });
}

export function firebasInitiateFolders({ state }) {
  let userId = firebaseAuth.currentUser.uid;
  state.defaultFolders.forEach((folder) => {
    let path = ref(firebaseDb, "templates/" + userId + "/folders/" + folder.id);
    set(path, folder, (error) => {
      if (error) {
        showErrorMessage(error.message);
      }
    });
  });
}

export function firebaseCreateTemplate({ state }, payload) {
  let templateID = uid();
  let newTemplate = {
    id: templateID,
    type: payload.type,
    name: payload.name,
    text: state.editorText,
    isSetToDefault: false,
    isFavorite: false,
  };

  let userId = firebaseAuth.currentUser.uid;
  let path = ref(
    firebaseDb,
    "templates/" + userId + "/templates/" + templateID
  );
  console.log("template", newTemplate);
  set(path, newTemplate, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
}

export function firebaseUpdateTemplate({}, payload) {
  let userId = firebaseAuth.currentUser.uid;
  let path = ref(
    firebaseDb,
    "templates/" + userId + "/templates/" + payload.template.id + "/name"
  );
  set(path, payload.name, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
  path = ref(
    firebaseDb,
    "templates/" + userId + "/templates/" + payload.template.id + "/text"
  );
  set(path, payload.text, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
}

export function firebaseRemoveTemplateFromCategories({ dispatch }, payload) {
  let template = payload.child;
  let categories = payload.parents;
  // looks through every parent and filters out child's id from the parent's "storedIDs"-property by creating a new array without these filtered out items
  // then updates storedIds to the newly created array
  categories.forEach((category) => {
    let storedIDswWithoutTemplateID = category.storedIDs.filter(function (
      storedIDs
    ) {
      return storedIDs != template.id;
    });
    if (category.storedIDs.length != storedIDswWithoutTemplateID.length) {
      let updatedCategory = Object.assign({}, category);
      updatedCategory.storedIDs = storedIDswWithoutTemplateID;
      console.log(
        "updated category: ",
        updatedCategory,
        "vs category",
        category
      );
      dispatch("firebaseUpdateCategory", updatedCategory);
    }
  });
}

export function firebaseDeleteTemplate({ dispatch }, payload) {
  dispatch("firebaseRemoveTemplateFromCategories", payload);
  let userId = firebaseAuth.currentUser.uid;
  let templateToDelete = payload.child;
  let templateRef = ref(
    firebaseDb,
    "templates/" + userId + "/templates/" + templateToDelete.id
  );
  remove(templateRef, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
}

export function firebaseSetFavorite({}, payload) {
  let userId = firebaseAuth.currentUser.uid;
  let path = ref(
    firebaseDb,
    "templates/" + userId + "/templates/" + payload.templateID + "/isFavorite"
  );
  set(path, payload.value, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
}

export function firebaseSetDefault({ state }, template) {
  let userId = firebaseAuth.currentUser.uid;

  state.templates.forEach((element) => {
    if (element.id === template.id) {
      console.log("found");
      let newValue = !element.isSetToDefault;
      let path = ref(
        firebaseDb,
        "templates/" + userId + "/templates/" + element.id + "/isSetToDefault"
      );
      set(path, newValue, (error) => {
        if (error) {
          showErrorMessage(error.message);
        }
      });
    } else {
      let path = ref(
        firebaseDb,
        "templates/" + userId + "/templates/" + element.id + "/isSetToDefault"
      );
      set(path, false, (error) => {
        if (error) {
          showErrorMessage(error.message);
        }
      });
    }
  });
}

export function firebaseCreateCategory({}, payload) {
  let categoryID = uid();
  let newCategory = {
    id: categoryID,
    type: payload.type,
    name: payload.name,
    storedIDs: [],
  };

  let userId = firebaseAuth.currentUser.uid;
  let path = ref(
    firebaseDb,
    "templates/" + userId + "/categories/" + categoryID
  );
  set(path, newCategory, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
}

export function firebaseUpdateCategory({}, category) {
  let userId = firebaseAuth.currentUser.uid;
  let path = ref(
    firebaseDb,
    "templates/" + userId + "/categories/" + category.id
  );
  set(path, category, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
}

export function firebaseRemoveCategoryFromFolders({ dispatch }, payload) {
  let category = payload.child;
  let folders = payload.parents;
  // looks through every parent and filters out child's id from the parent's "storedIDs"-property by creating a new array without these filtered out items
  // then updates storedIds to the newly created array
  folders.forEach((folder) => {
    let storedIDswWithoutCategoryID = folder.storedIDs.filter(function (
      storedIDs
    ) {
      return storedIDs != category.id;
    });
    if (folder.storedIDs.length != storedIDswWithoutCategoryID.length) {
      let updatedFolder = Object.assign({}, folder);
      updatedFolder.storedIDs = storedIDswWithoutCategoryID;
      dispatch("firebaseUpdateFolder", updatedFolder);
    }
  });
}

export const firebaseDeleteCategory = ({}, payload) => {
  dispatch("firebaseRemoveCategoryFromFolders", payload);
  let userId = firebaseAuth.currentUser.uid;
  let categoryToDelete = payload.child;
  let path = ref(
    firebaseDb,
    "templates/" + userId + "/categories/" + categoryToDelete.id
  );
  remove(path, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
};

export function firebaseCreateFolder({}, payload) {
  let folderID = uid();
  let newFolder = {
    id: folderID,
    type: payload.type,
    name: payload.name,
    storedIDs: [],
  };

  let userId = firebaseAuth.currentUser.uid;
  let path = ref(firebaseDb, "templates/" + userId + "/folders/" + folderID);
  set(path, newFolder, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
}

export function firebaseUpdateFolder({}, folder) {
  let userId = firebaseAuth.currentUser.uid;
  let path = ref(firebaseDb, "templates/" + userId + "/folders/" + folder.id);
  set(path, folder, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
}

export const firebaseDeleteFolder = ({}, folder) => {
  let userId = firebaseAuth.currentUser.uid;
  let path = ref(firebaseDb, "templates/" + userId + "/folders/" + folder.id);
  remove(path, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
};

export function resetCategorySettingsForTemplate(
  { state, dispatch },
  template
) {
  state.categories.forEach((category) => {
    if (category.storedIDs != undefined) {
      if (category.storedIDs.includes(template.id)) {
        let updatedCategory = Object.assign({}, category);
        let storedIDsWithoutTemplateID = category.storedIDs.filter(function (
          storedIDs
        ) {
          return storedIDs != template.id;
        });
        updatedCategory.storedIDs = storedIDsWithoutTemplateID;
        dispatch("firebaseUpdateCategory", updatedCategory);
      }
    }
  });

  let updatedTemplate = Object.assign({}, template);
  if (template.isSetToDefault) {
    updatedTemplate.isSetToDefault = false;
  }

  if (template.isFavorite) {
    updatedTemplate.isFavorite = false;
  }

  let userId = firebaseAuth.currentUser.uid;
  let path = ref(
    firebaseDb,
    "templates/" + userId + "/templates/" + updatedTemplate.id
  );
  set(path, updatedTemplate, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
}
