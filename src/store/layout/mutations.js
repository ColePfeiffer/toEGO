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

export const setEventTextShadow = (state, shadowProperties) => {
  state.eventTextShadow = shadowProperties;
};

export const setColorSecondaryLighter = (state, color) => {
  state.SecondaryLighter = color;
};

export const setHomeBackgroundColor = (state, color) => {
  state.homeBackgroundColor = color;
};

export const setHomeBackgroundColorDark = (state, color) => {
  state.homeBackgroundColorDark = color;
};

export const setEventBackgroundColor = (state, color) => {
  state.eventBackgroundColor = color;
};

export const setEventBackgroundColorDark = (state, color) => {
  state.eventBackgroundColorDark = color;
};

export const setDiaryBackgroundColor = (state, color) => {
  state.diaryBackgroundColor = color;
};

export const setDiaryBackgroundColorDark = (state, color) => {
  state.diaryBackgroundColorDark = color;
};

export const setHomeMode = (state, mode) => {
  state.homeMode = mode;
};

export const setEventMode = (state, mode) => {
  state.eventMode = mode;
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

export const setDiarySubtitleColor = (state, color) => {
  state.diarySubtitleColor = color;
};

export const toggleDarkMode = (state) => {
  state.isDarkModeOn = !state.isDarkModeOn;
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

export const toggleIsDiaryTitleBarShowingDay = (state, bool) => {
  state.isDiaryTitlebarShowingDay = bool;
};

export const toggleIsDiaryCountingDays = (state, bool) => {
  state.isDiaryCountingDays = bool;
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
  console.log("setting inner height ", height);
};

export const setInnerWidth = (state, width) => {
  state.innerWidth = width;
};
