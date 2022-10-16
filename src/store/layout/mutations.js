import { setCssVar } from "quasar";

//TODO:
export const setDefaultSettings = (state, fontsize) => {
  console.log("resetting everything, whoop!!!");
};

/*

bg image 5
secondary bacbde
a #FF7E6B
s deb4db

retro ffffff82

diary clear

card bg fafafaed
change title bar no
change border yes
border color: bacbde


---

DFD4F5
a2cf9d ffc107
211761

*/

//TODO:
export const setThemeNightSky = (state, fontsize) => {
  // ok doesnt really work like this, gotta do an action and then call all the different mutations from there, so the css stuff will be set too!
  state.backgroundImageURL =
    "url('https://64.media.tumblr.com/04ff549b92bb99db8ad725a83e288030/tumblr_inline_n258pty5wY1qhwjx8.gif'";
  state.secondary = "#7689b0";
  state.accent = "#cdb1de";
  state.accent2 = "#060754";
  state.homeMode = "retro";
  state.homeBackgroundColor = "#ebebeb59";
  state.eventMode = "default";
  // .. add default settings too!!
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

export const setEventTextColor = (state, color) => {
  state.eventTextColor = color;
};

export const setEventInputBackgroundColor = (state, color) => {
  state.eventInputBackgroundColor = color;
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
  console.log("Size changed to ", size.height, " x ", size.width);
  state.width = size.width;
  state.height = size.height;
};

export const setInnerSize = (state, size) => {
  console.log("Inner size changed to ", size.height, " x ", size.width);
  state.innerWidth = size.width;
  state.innerHeight = size.height;
};
