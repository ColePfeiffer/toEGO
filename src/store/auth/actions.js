import { firebaseAuth } from "boot/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { showErrorMessage } from "src/functions/function-show-error-message";
import { Loading } from "quasar";

export function registerUser(context, payload) {
  Loading.show();
  createUserWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
    .then((response) => {
      console.log("signed in response: ", response);
      // TODO: create userSettings For user...
      // FIXME: wird nicht gecalled.
      //dispatch("data/firebaseCreateUserSettings");
    })
    .catch((error) => {
      showErrorMessage(error.message);
    });
}

export function loginUser(context, payload) {
  Loading.show();
  signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
    .then((response) => {
      console.log("login response: ", response);
    })
    .catch((error) => {
      showErrorMessage(error.message);
    });
}

export function logoutUser() {
  firebaseAuth.signOut();
}

export function reset(context) {
  context.commit("data/setUserSettingsDownloaded", false, { root: true });
  context.dispatch(
    "diaryentries/resetDiaryEntriesAndNotes",
    {},
    {
      root: true,
    }
  );
}

export function handleAuthStateChange({ commit, dispatch }) {
  onAuthStateChanged(firebaseAuth, (user) => {
    Loading.hide();
    if (user) {
      commit("setLoggedIn", true);
      this.$router.push("/home");
      //LocalStorage.set("loggedIn", true);
      dispatch("diaryentries/firebaseReadData", null, { root: true });
      dispatch("data/firebaseReadData", null, { root: true });
    } else {
      commit("setLoggedIn", false);
      //LocalStorage.set("loggedIn", false);
      this.$router.replace("/loginRegister");
      dispatch("reset");
    }
  });
}
