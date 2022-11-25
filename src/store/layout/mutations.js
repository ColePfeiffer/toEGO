import { setCssVar } from "quasar";

//TODO:
export const setDefaultSettings = (state, fontsize) => {
  console.log("resetting everything, whoop!!!");
};

export const setFontsize = (state, fontsize) => {
  state.fontsize = fontsize;
};

export const setFont = (state, font) => {
  state.defaultFont = font;
};

export const changeBackgroundImage = (state, imageURL) => {
  state.backgroundImageURL = imageURL;
};

export const setSecondary = (state, color) => {
  state.secondary = color;
  setCssVar("secondary", color);
};

export const setAccent = (state, color) => {
  state.accent = color;
  setCssVar("accent", color);
};

export const setAccent2 = (state, color) => {
  state.accent2 = color;
  setCssVar("info", color);
};

export const setHomeBackgroundColor = (state, color) => {
  state.homeBackgroundColor = color;
};

export const setHomeBackgroundColorDark = (state, color) => {
  state.homeBackgroundColorDark = color;
};

export const setNotesContainerBackgroundColor = (state, color) => {
  state.notesContainerBackgroundColor = color;
};

export const setNotesContainerBackgroundColorDark = (state, color) => {
  state.notesContainerBackgroundColorDark = color;
};

export const setDiaryBackgroundColor = (state, color) => {
  state.diaryBackgroundColor = color;
};

export const setDiaryBackgroundColorDark = (state, color) => {
  state.diaryBackgroundColorDark = color;
};

export const setLayoutModeForHome = (state, mode) => {
  state.homeLayoutMode = mode;
};

export const setLayoutModeForNote = (state, mode) => {
  state.noteLayoutMode = mode;
};

export const setDiaryMode = (state, mode) => {
  state.diaryMode = mode;
};

export const setDiaryCardBackgroundColor = (state, color) => {
  state.diaryCardBackgroundColor = color;
};

export const setDiarySubtitleStyleToAlternative = (state, bool) => {
  state.isDiarySubtitleStyleSetToAlternative = bool;
};

export const setDiaryBorderColor = (state, color) => {
  state.diaryBorderColor = color;
};

export const setDiaryBorderColorAlternative = (state, color) => {
  state.diaryBorderColorAlternative = color;
};

export const toggleDarkMode = (state) => {
  state.isDarkModeOn = !state.isDarkModeOn;
};

export const setNoteTextShadowColorForHome = (state, color) => {
  state.noteTextShadowColorForHome = color;
};

export const setInputColoredSeparately = (state, bool) => {
  state.isDiaryInputColoredSeparately = bool;
};

export const setNoteTextShadowColorForDiary = (state, color) => {
  state.noteTextShadowColorForDiary = color;
};

export const setEventInputBackgroundColor = (state, color) => {
  state.eventInputBackgroundColor = color;
};

export const setBorderColorLeft = (state, color) => {
  state.borderColorLeft = color;
};

export const setBorderColorRight = (state, color) => {
  state.borderColorRight = color;
};

export const setBorderColorLeftForDiary = (state, color) => {
  state.borderColorLeftForDiary = color;
};

export const setBorderColorRightForDiary = (state, color) => {
  state.borderColorRightForDiary = color;
};

export const setNoteTitleRowIsColored = (state, color) => {
  state.noteTitleRowIsColored = color;
};

export const setNoteTitleRowIsColoredForDiary = (state, color) => {
  state.noteTitleRowIsColoredForDiary = color;
};

export const toggleIsDiaryTitleBarShowingDay = (state, bool) => {
  state.isDiaryTitlebarShowingDay = bool;
};

export const toggleIsDiaryCountingDays = (state, bool) => {
  state.isDiaryCountingDays = bool;
};

export const setNoteBackgroundColor = (state, color) => {
  state.noteBackgroundColor = color;
};

export const setDiaryInputStyleToTodaysNotes = (state, bool) => {
  state.isDiaryInputStyleSetToTodaysNotes = bool;
};

export const changeBackgroundColor = (state, color) => {
  state.backgroundColor = color;
};

export const setSize = (state, size) => {
  state.width = size.width;
  state.height = size.height;
};

export const setInnerHeight = (state, height) => {
  state.innerHeight = height;
};

export const setInnerWidth = (state, width) => {
  state.innerWidth = width;
};
