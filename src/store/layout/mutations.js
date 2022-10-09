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

export const setBrightnessOfEventTextShadow = (state, shadowProperties) => {
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

export const setEventTextColor = (state, color) => {
  state.eventTextColor = color;
};

export const setEventTextShadowColor = (state, color) => {
  state.eventTextShadowColor = color;
};

export const setEventInputBackgroundColor = (state, color) => {
  state.eventInputBackgroundColor = color;
};

export const setWidth = (state, width) => {
  state.width = width;
};

export const setHeight = (state, height) => {
  state.height = height;
};

export const setInnerWidth = (state, width) => {
  state.innerWidth = width;
};
