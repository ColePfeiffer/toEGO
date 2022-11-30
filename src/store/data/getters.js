export const getTheme = (state) => {
  let nameOfCurrentTheme = state.userSettings.currentTheme;
  return state.userSettings.userThemes[nameOfCurrentTheme];
};

export const getThemeByName = (state) => {
  return (nameOfTheme) => {
    console.log(nameOfTheme);
    console.log(state.userSettings, state.userSettings.userThemes);
    return state.userSettings.userThemes[nameOfTheme];
  };
};

export const isAllDataDownloaded = (state, getters, rootState) => {
  if (
    state.userSettingsDownloaded &
    rootState.diaryentries.diaryEntriesDownloaded &
    rootState.diaryentries.notesDownloaded
  ) {
    return true;
  } else {
    return false;
  }
};

export const isDarkModeActive = (state) => {
  console.log("yeah", state.userSettings.isDarkModeActive);
  return state.userSettings.isDarkModeActive;
};
