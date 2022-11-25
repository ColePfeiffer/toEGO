import { colors } from "quasar";
import state from "./state";

export function changeFontsize(context, fontsize) {
  context.commit("setFontsize", fontsize);
}

export function setSize(context, size) {
  context.commit("setSize", size);
}

export function setSecondaryColor({ commit, dispatch }, color) {
  commit("setSecondary", color);
}

export function changeMode({ commit }, payload) {
  if (payload.page === "home") {
    commit("setLayoutModeForHome", payload.mode);
  } else if (payload.page === "event") {
    commit("setLayoutModeForNote", payload.mode);
  } else if (payload.page === "diary") {
    commit("setDiaryMode", payload.mode);
  }
}

export function changeEventPageProperties({ commit }, payload) {
  if (payload.type === "color") {
    commit("setNotesContainerBackgroundColor", payload.color);
  } else {
    commit("setEventInputBackgroundColor", payload.color);
  }
}

export function firebaseToggleDarkMode({ dispatch, rootState }) {
  dispatch(
    "data/firebaseToggleDarkMode",
    !rootState.data.userSettings.isDarkModeActive,
    { root: true }
  );
}

export function applyLayoutSettingsLocally({ commit }, currentTheme) {
  commit("setFontsize", currentTheme.fontsize);
  commit("setFont", currentTheme.defaultFont);

  commit("changeBackgroundImage", currentTheme.backgroundImageURL);
  if (currentTheme.backgroundColor != undefined) {
    commit("changeBackgroundColor", currentTheme.backgroundColor);
  }

  commit("setSecondary", currentTheme.secondary);
  commit("setAccent", currentTheme.accent);
  commit("setAccent2", currentTheme.accent2);
  // Page: Home
  commit("setLayoutModeForHome", currentTheme.homeLayoutMode);
  commit("setHomeBackgroundColor", currentTheme.homeBackgroundColor);
  commit("setHomeBackgroundColorDark", currentTheme.homeBackgroundColorDark);
  // Cards
  commit("setBorderColorLeft", currentTheme.borderColorLeft);
  commit("setBorderColorRight", currentTheme.borderColorRight);
  commit("setNoteBackgroundColor", currentTheme.noteBackgroundColor);
  commit("setNoteTitleRowIsColored", currentTheme.noteTitleRowIsColored);
  commit(
    "setNoteTextShadowColorForHome",
    currentTheme.noteTextShadowColorForHome
  );
  // Page: New Note
  commit("setLayoutModeForNote", currentTheme.noteLayoutMode);
  commit(
    "setNotesContainerBackgroundColor",
    currentTheme.notesContainerBackgroundColor
  );
  commit(
    "setNotesContainerBackgroundColorDark",
    currentTheme.notesContainerBackgroundColorDark
  );
  commit(
    "setEventInputBackgroundColor",
    currentTheme.eventInputBackgroundColor
  );
  // Page: Diary
  commit("setDiaryMode", currentTheme.diaryMode);
  commit("setDiaryCardBackgroundColor", currentTheme.diaryBackgroundColor);
  commit("setDiaryBackgroundColorDark", currentTheme.diaryBackgroundColorDark);
  commit(
    "setInputColoredSeparately",
    currentTheme.isDiaryInputColoredSeparately
  );
  commit(
    "toggleIsDiaryTitleBarShowingDay",
    currentTheme.isDiaryTitlebarShowingDay
  );
  commit("toggleIsDiaryCountingDays", currentTheme.isDiaryCountingDays);
  // Diary Subtitle Styling
  commit(
    "setDiarySubtitleStyleToAlternative",
    currentTheme.isDiarySubtitleStyleSetToAlternative
  );
  commit(
    "setDiaryBorderColorAlternative",
    currentTheme.diaryBorderColorAlternative
  );
  commit("setDiaryBorderColor", currentTheme.diaryBorderColor);
  // Diary Cards
  commit(
    "setDiaryInputStyleToTodaysNotes",
    currentTheme.isDiaryInputStyleSetToTodaysNotes
  );
  commit("setBorderColorLeftForDiary", currentTheme.borderColorLeftForDiary);
  commit("setBorderColorRightForDiary", currentTheme.borderColorRightForDiary);
  commit(
    "setNoteTitleRowIsColoredForDiary",
    currentTheme.noteTitleRowIsColoredForDiary
  );
  commit(
    "setNoteTextShadowColorForDiary",
    currentTheme.noteTextShadowColorForDiary
  );
}

export function saveLayoutChangesInFirebase({ dispatch, rootState }) {
  let nameOfTheme = rootState.data.userSettings.currentTheme;
  let currentTheme = rootState.data.userSettings.userThemes[nameOfTheme];
  console.log("currenttheme", currentTheme);
  dispatch("data/firebaseSetCurrentTheme", currentTheme, { root: true });
  dispatch("data/firebaseUpdateUserTheme", currentTheme, { root: true });
}

export function discardChangesToLayout({ commit, dispatch, rootState }) {
  let nameOfTheme = rootState.data.lastSelectedTheme;
  let currentTheme = rootState.data.userSettings.userThemes[nameOfTheme];
  dispatch("applyLayoutSettingsLocally", currentTheme);
  commit("data/resetCurrentThemeLocally", null, {
    root: true,
  });
}

export function setTheme({ commit, dispatch, rootGetters }, nameOfTheme) {
  let currentTheme = rootGetters["data/getThemeByName"](nameOfTheme);
  commit("data/setCurrentThemeLocally", nameOfTheme, { root: true });
  dispatch("applyLayoutSettingsLocally", currentTheme);
}
