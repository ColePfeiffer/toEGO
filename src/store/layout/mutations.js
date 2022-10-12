import { setCssVar } from "quasar";

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

export const changeBackgroundColorForHome = (state, color) => {
  state.backgroundColorForHome = color;
};

export const changeEventBackgroundColor = (state, color) => {
  state.eventBackgroundColor = color;
};

export const changeModeForHome = (state, mode) => {
  state.modeForHome = mode;
};

export const changeEventMode = (state, mode) => {
  state.eventMode = mode;
};

export const changeModeForDiary = (state, mode) => {
  state.modeForDiary = mode;
};

export const setEventBackgroundColor = (state, color) => {
  state.eventBackgroundColor = color;
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
