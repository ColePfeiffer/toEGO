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
      // TODO: create userSettings For user...
      console.log("hello?????");
      context.dispatch(
        "data/firebaseCreateUserSettings",
        {},
        {
          root: true,
        }
      );

      context.dispatch(
        "templates/firebaseInitiateTemplateLogic",
        {},
        {
          root: true,
        }
      );
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

export function logoutUser(context) {
  context.dispatch(
    "diaryentries/firebaseResetExpandedOnAllNotes",
    {},
    {
      root: true,
    }
  );
  firebaseAuth.signOut();
}

export function reset(context) {
  console.log("im fired");
  context.dispatch(
    "data/resetUserSettings",
    {},
    {
      root: true,
    }
  );
  context.dispatch(
    "diaryentries/resetDiaryEntriesAndNotes",
    {},
    {
      root: true,
    }
  );
  context.dispatch(
    "templates/resetTemplateLogic",
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
      dispatch("templates/firebaseReadData", null, { root: true });
    } else {
      commit("setLoggedIn", false);
      //LocalStorage.set("loggedIn", false);
      this.$router.replace("/loginRegister");
      dispatch("reset");
    }
  });
}
