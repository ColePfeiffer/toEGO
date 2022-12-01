import { Dialog } from "quasar";
import { uid } from "quasar";
import state from "./state";
import shared from "../../shared.js";
import { date } from "quasar";
import getters from "./getters";

export const resetUserSettings = (state) => {
  state.userSettings = {
    isDarkModeActive: false,
  };
  // TODO: eventuell darkmode rein?
};

export const setPlusFabButtonOpened = (state, value) => {
  state.isPlusFabButtonOpened = value;
};

export const setUserSettingsDownloaded = (state, value) => {
  state.userSettingsDownloaded = value;
};

export const setHelpForHomeToCompleted = (state) => {
  state.userSettings.hasFinishedHelpForHomeForTheFirstTime = true;
};

export const setHelpForDiaryToCompleted = (state) => {
  state.userSettings.hasFinishedHelpForHomeForTheFirstTime = true;
};

export const overwriteLocalUserSetting = (state, payload) => {
  state.userSettings[payload.name] = payload.value;
};

export const resetCurrentThemeLocally = (state) => {
  state.userSettings["currentTheme"] = state.lastSelectedTheme;
};

export const setCurrentThemeLocally = (state, nameOfTheme) => {
  state.lastSelectedTheme = state.userSettings["currentTheme"];
  state.userSettings["currentTheme"] = nameOfTheme;
};

export const updateLastSelectedDate = (state, value) => {
  state.lastSelectedDate = value;
};

// mode can either be CREATE or EDIT
export const setModeForNewEvent = (state, mode) => {
  if (mode === "CREATE") {
    state.newEventIsInCreationMode = true;
  } else {
    state.newEventIsInCreationMode = false;
  }
};

export const setMessageToMyself = (state, text) => {
  state.userSettings.messageToMyself = text;
};

export const setDialogVisibility = (state, payload) => {
  state.dialogSettings.nameOfCurrentDialog = payload.nameOfCurrentDialog;
  state.dialogSettings.isVisible = payload.isVisible;
  state.dialogSettings.isBackgroundVisible = payload.isBackgroundVisible;
};

export const setPastedText = (state, text) => {
  state.pastedText = text;
};

export const toggleDisableOnFabButton = (state, bool) => {
  state.isFabButtonDisabled = bool;
};

export const SetDialogTemplateViewerIsSetToDiaryMode = (state, bool) => {
  state.dialogTemplateViewerIsSetToDiaryMode = bool;
};
