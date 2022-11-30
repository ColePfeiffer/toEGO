import { uid, date, Dark } from "quasar";
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
  let userSettingsContainer = ref(firebaseDb, "userSettings/" + userID);

  // USER-SETTINGS
  // only fires once
  onValue(
    userSettingsContainer,
    (snapshot) => {
      commit("setUserSettingsDownloaded", true);
      dispatch("layout/setTheme", state.userSettings.currentTheme, {
        root: true,
      });
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
    let nameOfSetting = snapshot.key;
    if (nameOfSetting === "isDarkModeActive") {
      Dark.set(userSetting);
    }
    let payload = {
      name: nameOfSetting,
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

  //let path = ref(firebaseDb, "userSettings/" + userId + "/userThemes");
}

export function firebaseCreateUserSettings({ state }) {
  let userId = firebaseAuth.currentUser.uid;
  let path = ref(firebaseDb, "userSettings/" + userId);
  set(path, state.defaultUserSettings, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
}

export function firebaseSetCurrentTheme({}, currentTheme) {
  console.log("setting current Theme in Firebase for ", currentTheme.name);
  let userId = firebaseAuth.currentUser.uid;
  let path = ref(firebaseDb, "userSettings/" + userId + "/currentTheme");
  set(path, currentTheme.name, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
}

export function firebaseUpdateUserTheme({ rootGetters }, currentTheme) {
  console.log("setting usertheme in userThemes", currentTheme.name);
  let updatedSettingsForTheme = rootGetters["layout/getAllLayoutSettings"];
  updatedSettingsForTheme.name = currentTheme.name;
  console.log("updatedSettingsForTheme", updatedSettingsForTheme);
  //let updatedTheme = Object.assign({}, currentTheme);
  let userId = firebaseAuth.currentUser.uid;
  let path = ref(
    firebaseDb,
    "userSettings/" + userId + "/userThemes/" + updatedSettingsForTheme.name
  );
  set(path, updatedSettingsForTheme, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
}

export function firebaseToggleDarkMode({}, newValue) {
  let userId = firebaseAuth.currentUser.uid;
  let path = ref(firebaseDb, "userSettings/" + userId + "/isDarkModeActive");
  set(path, newValue, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
}

export function firebaseSetMessageToMyself({}, messageText) {
  let userId = firebaseAuth.currentUser.uid;
  let path = ref(firebaseDb, "userSettings/" + userId + "/messageToMyself");
  set(path, messageText, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
}

export function firebaseToggleMessageVisibility({ state }) {
  let userId = firebaseAuth.currentUser.uid;
  let path = ref(firebaseDb, "userSettings/" + userId + "/isMessageShown");
  let newValue = !state.userSettings.isMessageShown;
  set(path, newValue, (error) => {
    if (error) {
      showErrorMessage(error.message);
    }
  });
}

export function setHelpForHomeToCompleted() {
  let userId = firebaseAuth.currentUser.uid;
  let path = ref(
    firebaseDb,
    "userSettings/" + userId + "/hasFinishedHelpForHomeForTheFirstTime"
  );
  set(path, true, (error) => {
    if (error) {
      //showErrorMessage(error.message)
    }
  });
}

export function setHelpForDiaryToCompleted() {
  let userId = firebaseAuth.currentUser.uid;
  let path = ref(
    firebaseDb,
    "userSettings/" + userId + "/hasFinishedHelpForDiaryForTheFirstTime"
  );
  set(path, true, (error) => {
    if (error) {
      //showErrorMessage(error.message)
    }
  });
}

export function setHelpForTemplatesToCompleted() {
  let userId = firebaseAuth.currentUser.uid;
  let path = ref(
    firebaseDb,
    "userSettings/" + userId + "/hasFinishedHelpForTemplatesForTheFirstTime"
  );
  set(path, true, (error) => {
    if (error) {
      //showErrorMessage(error.message)
    }
  });
}

export function resetUserSettings({ commit }) {
  commit("setUserSettingsDownloaded", false);
  commit("resetUserSettings");
}
