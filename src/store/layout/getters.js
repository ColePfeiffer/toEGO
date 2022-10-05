/*
export function someGetter (state) {
}
*/
import { useQuasar } from "quasar";
import { colors } from "quasar";
import { getCssVar } from "quasar";

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

export const getStyleForRegularCard = (getters) => {
  if (getters.isDarkModeActive) {
    return {
      "background-color": "var(--q-dark)",
      color: "white",
    };
  } else {
    return {
      "background-color": "rgb(255 255 255 )",
      color: "black",
    };
  }
};

export const getStyleForTitleBar = (state, getters) => {
  if (getters.isDarkModeActive) {
    return { background: "var(--q-secondary)" };
  } else {
    return {
      background: "var(--q-secondary)",
      "text-shadow": state.accent2 + state.lowOpacity + " 1px 1px 1px",
    };
  }
};

export const getStyleForHeadline = (state, getters) => {
  if (getters.isDarkModeActive) {
    return state.sTextBasicShadowDarkWhiteFont;
  } else {
    return state.sTextBasicShadowBlackFont;
  }
};

export const getNonDefaultFont = (state) => {
  return { "font-family": state.nonDefaultFont };
};

export const getFontsize = (state, getters) => {
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
