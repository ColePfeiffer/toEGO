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

/*
export function firebaseReadData({ commit, dispatch, state, getters }) {
  let userID = firebaseAuth.currentUser.uid;
  let userSettingsContainer = ref(firebaseDb, "userSettings/" + userID);

  // USER-SETTINGS
  // only fires once
  onValue(
    userSettingsContainer,
    (snapshot) => {
      commit("setUserSettingsDownloaded", true);
    },
    { onlyOnce: true },
    (error) => {
      if (error) {
        showErrorMessage(error.message);
        //this.$router.replace('/auth')
      }
    }
  );

  // whenever a child gets added
  onChildAdded(userSettingsContainer, (snapshot) => {
    let userSetting = snapshot.val();
    let payload = {
      name: snapshot.key,
      value: userSetting,
    };
    commit("overwriteLocalUserSetting", payload);
  });

  onChildChanged(userSettingsContainer, (snapshot) => {
    let userSetting = snapshot.val();
    let payload = {
      name: snapshot.key,
      value: userSetting,
    };
    commit("overwriteLocalUserSetting", payload);
  });

  onChildRemoved(userSettingsContainer, (snapshot) => {
    //let diaryEntryID = snapshot.key;
    //commit("deleteNoteContainer", diaryEntryID);
  });
}*/

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
  template = Object.assign({}, payload.template);
  template.name = payload.name;
  template.text = payload.text;

  let userId = firebaseAuth.currentUser.uid;
  let path = ref(
    firebaseDb,
    "templates/" + userId + "/templates/" + template.id
  );
  set(path, template, (error) => {
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

export function firebaseDeleteTemplate({ dispatch }, payload) {
  dispatch("firebaseRemoveChildFromAllParents", payload);

  let userId = firebaseAuth.currentUser.uid;
  let templateToDelete = payload.child;
  let templateRef = ref(
    firebaseDb,
    "templates/" + userId + "/templates" + templateToDelete.id
  );
  remove(templateRef, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
}

// TODO:
export function firebaseRemoveChildFromAllParents(context, payload) {
  // remove template from all categories
  let data = { parents: payload.parents, child: payload.child };
  context.commit("removeChildFromAllParents", data);
}

// old
// TODO: go through code and replace this by firebaseDeleteTemplate
export function removeTemplateFromParentsAndDeleteIt(context, payload) {
  // remove template from all categories
  let data = { parents: payload.parents, child: payload.child };
  context.commit("removeChildFromAllParents", data);

  // deleting template
  let templateList = context.getters.getTemplatesByType(payload.type);
  data = { templateToDelete: payload.child, templates: templateList };
  context.commit("deleteTemplate", data);
}

export const removeCategoryFromParentsAndDeleteIt = (
  { state, commit },
  payload
) => {
  // remove category from all folders
  let data = { parents: payload.parents, child: payload.child };
  commit("removeChildFromAllParents", data);
  let categories;

  // deleting category
  if (payload.type === "DIARY") {
    categories = state.categoriesForDiary;
  } else {
    categories = state.categoriesForEvents;
  }
  data = { categoryToDelete: payload.child, categories: categories };
  commit("deleteCategory", data);
};
