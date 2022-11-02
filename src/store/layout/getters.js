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
  return state.isDarkModeOn;
};

export const getTextColorBasedOnDarkMode = (getters) => {
  if (getters.isDarkModeActive) {
    return "white";
  } else {
    return "black";
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

export const getHomeBackgroundColor = (state, getters) => {
  if (getters.isDarkModeActive) {
    return state.homeBackgroundColorDark;
  } else {
    return state.homeBackgroundColor;
  }
};

export const getEventBackgroundColor = (state, getters) => {
  if (getters.isDarkModeActive) {
    return state.eventBackgroundColorDark;
  } else {
    return state.eventBackgroundColor;
  }
};

export const getDiaryBackgroundColor = (state, getters) => {
  if (getters.isDarkModeActive) {
    return state.diaryBackgroundColorDark;
  } else {
    return state.diaryBackgroundColor;
  }
};

export const getStyleForLayout = (state) => {
  let style = {};
  let background = state.backgroundImageURL;

  if (background != "none") {
    style["background"] = background;
  } else {
    style["background-color"] = state.backgroundColor;
  }

  style["margin"] = "auto";
  style["padding"] = "auto";

  return style;
};

export const getStyleForPage = (state) => {
  let style = {};
  style["font-family"] = state.defaultFont;
  return style;
};

export const getColorBasedOnBackgroundColor = (state, getters) => {
  return (backgroundColor) => {
    // if dark-mode is active, there is no custom-colored background, so the color gets set to white.
    if (getters.getBrightness(backgroundColor) <= 168) {
      return "white";
    } else {
      return "black";
    }
  };
};

export const getTextColorOnSecondary = (state, getters) => {
  return getters.getColorBasedOnBackgroundColor(state.secondary);
};

export const getTextColorForEvent = (state, getters) => {
  let textColor;
  let style = {};

  if (state.eventMode === "default") {
    if (getters.isDarkModeActive) {
      textColor = "white";
    } else {
      textColor = "black";
    }
  } else {
    textColor = getters.getColorBasedOnBackgroundColor(
      getters.getEventBackgroundColor
    );
  }

  style["color"] = textColor;
  if (textColor === "white") {
    style["text-shadow"] = state.accent2 + " 2px 2px 2px";
  } else {
    style["text-shadow"] = state.eventTextShadow;
  }

  return style;
};

export const getStyleForBasePage = (state, getters) => {
  return (payload) => {
    let style = {};
    let defaultColor;
    style["border-radius"] = "0px";
    style["font-size"] = state.fontsize + "px";

    if (payload.isUsingBackgroundColorAsDefaultColor) {
      defaultColor = payload.backgroundColor;
    } else {
      defaultColor = state.whitesmoke;
    }

    if (getters.isDarkModeActive && payload.mode === "default") {
      style["background-color"] = state.dark;
    } else if (getters.isDarkModeActive && payload.mode != "default") {
      // TODO: kann vielleicht weg?
      style["background-color"] = payload.backgroundColor;
    } else if (!getters.isDarkModeActive && payload.mode === "default") {
      style["background-color"] = defaultColor;
    } else {
      style["background-color"] = payload.backgroundColor;
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

    if (payload.mode === "retro") {
      style["margin-top"] = "0px";
    } else if (payload.mode === "border") {
      style["margin-top"] = "9px";
      style["box-shadow"] = "none";
      style["border"] = "2px solid " + state.secondary;
    } else if (payload.mode === "clear") {
      style["box-shadow"] = "none";
      style["background-color"] = "transparent";
    } else {
      style["box-shadow"] = "none";
    }
    return style;
  };
};

export const getLowOpacityShadowForAccent2 = (state) => {
  return state.accent2 + state.lowOpacity + " 2px 2px 2px";
};

export const getStyleForTitleBar = (state, getters) => {
  return (mode) => {
    let style = {};

    style["background"] = "var(--q-secondary)";
    style["text-shadow"] = getters.getLowOpacityShadowForAccent2;
    style["font-family"] = state.nonDefaultFont;

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
  let textColor = getters.getTextColorForEvent;

  style["font-weight"] = "bolder";
  style["font-size"] = "1.3em";
  style["border-bottom"] = "1px solid " + textColor["color"];
  style["padding"] = "0 0 4px";

  style = {
    ...style,
    ...textColor,
  };
  console.log(style);
  return style;
};

export const getStyleForDiarySectionHeadline = (state) => {
  let style = {};
  style["font-family"] = state.nonDefaultFont;
  style["font-size"] = state.fontsize + "px";
  style["color"] = "white";
  style["text-shadow"] = "var(--q-info) 2px 2px 2px";
  style["margin-top"] = "4px";
  return style;
};

export const getStyleForDiarySectionButton = (state) => {
  let style = {};
  style["text-shadow"] = "var(--q-info) 2px 2px 2px";
  style["font-family"] = state.nonDefaultFont;
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
    return state.dark;
  } else {
    return state.white;
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
