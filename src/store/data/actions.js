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
}

export function firebaseCreateUserSettings({ state }) {
  let userId = firebaseAuth.currentUser.uid;
  let path = ref(firebaseDb, "userSettings/" + userId);
  set(path, state.userSettings, (error) => {
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
