/*
export function someGetter (state) {
}
*/
import { useQuasar } from "quasar";
import { colors } from "quasar";
import { getCssVar } from "quasar";
import state from "./state";

const { getPaletteColor } = colors;
const { lighten } = colors;
const { changeAlpha } = colors;
const { hexToRgb } = colors;

export const isDarkModeActive = (state) => {
  if (useQuasar().dark.isActive) {
    return true;
  } else {
    return false;
  }
};

export const getStyleForTransparentCard = (state, getters) => {
  if (getters.isDarkModeActive) {
    return {
      "background-color": getCssVar("dark") + state.mediumOpacity,
      "text-shadow": "#000000" + state.lowOpacity + " 2px 2px 2px",
      color: "white !important",
    };
  } else {
    return {
      "background-color": state.whitesmoke + state.mediumOpacity,
      "text-shadow": state.accent2 + state.lowOpacity + " 2px 2px 2px",
      color: "black !important",
    };
  }
};

export const getStyleForText = (state, getters) => {
  let style = {};
  style = getters.getFontsize;

  if (getters.isDarkModeActive) {
    let merged = {
      ...getters.getFontsize,
      ...state.sTextBasicShadowDarkWhiteFont,
    };
    return merged;
  } else {
    style["font-color"] = "black";
    style["text-shadow"] = "2px 2px 3px rgba(var(--q-secondary), 0.5)";
    return style;
  }
};

export const getShadowForAriaButtons = (state) => {
  return {
    "text-shadow": state.accent2 + state.lowOpacity + " 1px 1px 1px",
  };
};

export const getStyleForRegularCard = (state, getters) => {
  let style = {};
  style["border-radius"] = "0px";
  style["border-style"] = "solid";
  style["font-size"] = state.fontsize + "px";

  if (getters.isDarkModeActive) {
    style["background-color"] = state.blacksmoke;
    style["color"] = "white";
    style["border"] = "2px solid";
    style["border-image-slice"] = "1";
    style["border-width"] = "1px";
    style["border-image-source"] =
      "linear-gradient(to left, turquoise, greenyellow)";
    /* amazing border
    style["border-width"] = "20px";
    style["border-image"] =
      "repeating-radial-gradient(circle at 10px,turquoise, pink 2px, greenyellow 4px, pink 2px) 1";
    */
  } else {
    style["background-color"] = state.whitesmoke;
    style["color"] = "black";
    style["border-width"] = "1.5px";
    style["border-color"] =
      "#FFFFFF var(--q-secondary) var(--q-secondary) #FFFFFF";
  }
  return style;
};

export const getStyleForBasePage = (state, getters) => {
  let style = {};
  style["border-radius"] = "0px";
  style["font-size"] = state.fontsize + "px";

  if (getters.isDarkModeActive) {
    style["background-color"] = state.dark;
    style["color"] = "white";
  } else {
    style["background-color"] = state.white;
    style["color"] = "black";
  }
  return style;
};

export const getStyleForTitleBar = (state) => {
  let style = {};
  style["background"] = "var(--q-secondary)";
  style["text-shadow"] = state.accent2 + state.lowOpacity + " 1px 1px 1px";
  style["text-family"] = state.nonDefaultFont;
  return style;
};

export const getStyleForHeadline = (state, getters) => {
  let style = {};
  style["font-weight"] = "bolder";
  style["font-size"] = "1.1em";
  //style["text-family"] = state.nonDefaultFont;
  style["border-bottom"] = "1px solid black";
  style["padding"] = "0 0 4px";

  if (getters.isDarkModeActive) {
    style["text-shadow"] = state.accent2 + " 2px 2px 2px";
    style["color"] = "white";
  } else {
    style["text-shadow"] = state.secondary + " 2px 2px 2px";
    style["color"] = "black";
  }
  return style;
};

export const getNonDefaultFont = (state) => {
  return { "font-family": state.nonDefaultFont };
};

export const getFontsize = (state) => {
  console.log("lol");
  return { "font-size": state.fontsize + "px" };
};

export const getToolbarIconColor = (state, getters) => {
  if (getters.isDarkModeActive) {
    return "secondary";
  } else {
    return "black";
  }
};

export const getToolbarBackgroundColor = (state, getters) => {
  if (getters.isDarkModeActive) {
    return "black";
  } else {
    return "white";
  }
};

export const getStyleForQuotedEventText = (state, getters) => {
  if (getters.isDarkModeActive) {
    return {
      background: "var(--q-dark)",
      "text-shadow": "rgb(0 0 0) 2px 2px 2px",
      "border-left": "5px solid var(--q-secondary)",
      padding: "0.5em 10px",
      "margin-bottom": "10px",
      "margin-top": "2px",
      "font-size": state.fontsize + "px",
    };
  } else {
    return {
      background: "#f9f9f9",
      "border-left": "5px solid var(--q-secondary)",
      padding: "0.5em 10px",
      "margin-bottom": "10px",
      "margin-top": "2px",
      "font-size": state.fontsize + "px",
    };
  }
};
