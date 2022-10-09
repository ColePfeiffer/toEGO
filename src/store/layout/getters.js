/*
export function someGetter (state) {
}
*/
import { useQuasar } from "quasar";
import { colors } from "quasar";
import state from "./state";

const { getPaletteColor } = colors;
const { brightness } = colors;

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
      "background-color": state.blacksmoke,
      "text-shadow": "#000000" + state.lowOpacity + " 2px 2px 2px",
      color: "white !important",
    };
  } else {
    return {
      "background-color": state.whitesmoke,
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

export const getStyleForPage = (state) => {
  let style = {};

  style["font-family"] = state.defaultFont;
  style["background"] = state.backgroundImageURL;
  style["margin"] = "auto";
  style["padding"] = "auto";

  return style;
};

export const getStyleForBasePage = (state, getters) => {
  return (payload) => {
    let mode = payload.mode;
    let backgroundColor = payload.backgroundColor;

    let style = {};
    style["border-radius"] = "0px";
    style["font-size"] = state.fontsize + "px";

    if (getters.isDarkModeActive) {
      style["background-color"] = "#000000ad";
      style["color"] = "white";
    } else {
      style["background-color"] = backgroundColor;
      style["color"] = "black";
    }

    style["box-shadow"] =
      "inset -1px -1px #22273894, inset -4px -4px " +
      state.secondary +
      ", inset -5px -5px " +
      state.SecondaryLighter +
      ", inset 1px 1px " +
      state.SecondaryLighter +
      ", inset 4px 4px " +
      state.secondary +
      ", inset 5px 5px #22273894";
    console.log("height", state.height * 0.72);
    style["height"] = state.height * 0.67 + "px";
    if (mode === "retro") {
      style["margin-top"] = "0px";
    } else if (mode === "compact") {
      style["margin-top"] = "9px";
      style["box-shadow"] = "none";
      style["border"] = "2px solid " + state.secondary;
    } else if (mode === "plain") {
      style["box-shadow"] = "none";
      style["background-color"] = "transparent";
    } else {
      style["box-shadow"] = "none";

      if (getters.isDarkModeActive) {
        style["background-color"] = state.dark;
        style["color"] = "white";
      } else {
        style["background-color"] = state.white;
        style["color"] = "black";
      }
    }
    return style;
  };
};

export const getStyleForTitleBar = (state, getters) => {
  return (mode) => {
    let style = {};

    style["background"] = "var(--q-secondary)";
    style["text-shadow"] = state.accent2 + state.lowOpacity + " 1px 1px 1px";
    style["text-family"] = state.nonDefaultFont;

    if (mode === "retro") {
      style["min-height"] = "33px";
      style["margin-top"] = "-5px";
      style["box-shadow"] =
        "inset -1px 0 #22273894, inset -4px 0px " +
        state.secondary +
        ", inset -5px 0px " +
        state.SecondaryLighter +
        ", inset 1px 0px " +
        state.SecondaryLighter +
        ", inset 4px 3px " +
        state.secondary +
        ", 0px -1px " +
        state.SecondaryLighter +
        ", inset 5px 4px #222738" +
        state.lowOpacity;
    }
    return style;
  };
};

export const getBrightness = () => {
  return (color) => {
    return brightness(color);
  };
};

export const getStyleForHeadline = (state, getters) => {
  let style = {};
  style["font-weight"] = "bolder";
  style["font-size"] = "1.3em";
  style["border-bottom"] = "1px solid black";
  style["padding"] = "0 0 4px";

  if (getters.isDarkModeActive) {
    style["text-shadow"] = state.accent2 + " 2px 2px 2px";
    style["color"] = "white";
  } else {
    style["text-shadow"] = state.EventTextShadow;
    style["color"] = "black";
  }
  return style;
};

export const getNonDefaultFont = (state) => {
  return { "font-family": state.nonDefaultFont };
};

export const getFontsize = (state) => {
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
