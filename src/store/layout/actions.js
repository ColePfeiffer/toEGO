import { colors } from "quasar";
const { lighten } = colors;

export function changeFontsize(context, fontsize) {
  context.commit("setFontsize", fontsize);
}

export function setSecondaryColor({ commit, dispatch }, color) {
  commit("setSecondary", color);
  dispatch("setShadowForTitle");
  dispatch("setSecondaryLighter");
}

export function setShadowForTitle({ getters, state, commit }) {
  let brightness = getters.getBrightness(state.secondary);

  if (brightness > 60 && brightness < 150) {
    console.log("medium opacity");
    commit(
      "setEventTextShadow",
      state.secondary + state.mediumOpacity + " 2px 2px 2px"
    );
  } else if (brightness <= 60) {
    console.log("low opacity");
    commit(
      "setEventTextShadow",
      state.secondary + state.lowOpacity + " 2px 2px 2px"
    );
  } else {
    console.log("normal opacity");
    commit("setEventTextShadow", state.secondary + " 2px 2px 2px");
  }
}

export function changeMode({ commit }, payload) {
  if (payload.page === "home") {
    commit("setHomeMode", payload.mode);
  } else if (payload.page === "event") {
    commit("setEventMode", payload.mode);
  } else if (payload.page === "diary") {
    commit("setDiaryMode", payload.mode);
  }
}

export function changeEventPageProperties({ commit }, payload) {
  if (payload.type === "color") {
    commit("setEventBackgroundColor", payload.color);
  } else {
    commit("setEventInputBackgroundColor", payload.color);
  }
}

export function setSecondaryLighter({ getters, state, commit }) {
  let oldColor = state.secondary;
  let newColor;
  let calculatedBrightness = getters.getBrightness(oldColor);

  if (calculatedBrightness < 151) {
    newColor = lighten(oldColor, 40);
  } else {
    newColor = lighten(oldColor, 65);
  }
  commit("setColorSecondaryLighter", newColor);
}

export function setTheme({ commit }, theme) {
  if (theme === "Night Sky") {
    commit("changeBackgroundImage", "url(https://i.imgur.com/Dryps1y.png)");
    commit("setSecondary", "#7689b0");
    commit("setAccent", "#cdb1de");
    commit("setAccent2", "#060754");

    commit("setHomeMode", "retro");
    commit("setHomeBackgroundColor", "#ebebeb59");

    commit("setEventMode", "default");
    // .. add default settings too!!
  } else if (theme === "Clouds") {
    commit("changeBackgroundImage", "url(https://i.imgur.com/TPnaBOX.png)");
    commit("setSecondary", "#bacbde");
    commit("setAccent", "#FF7E6B");
    commit("setAccent2", "#deb4db");

    commit("setHomeMode", "retro");
    commit("setHomeBackgroundColor", "#ffffff82");
    commit("setEventMode", "default");

    commit("setDiaryMode", "clear");
    commit("setDiaryCardBackgroundColor", "#fafafaed");

    commit("setDiaryMode", "clear");
    commit("toggleIsDiaryTitleBarShowingDay", false);
    commit("setDiarySubtitleStyleToAlternative", true);
    commit("setDiarySubtitleColor", "#bacbde");
  } else {
    // default
    commit(
      "changeBackgroundImage",
      "url(/images/background_wide2.jpg) no-repeat center center fixed"
    );
    commit("setBorderColorLeft", "#80d2f2");
    commit("setBorderColorRight", "#7d5fb8");

    commit("setFontsize", 12.5);
    commit("setFont", "PressStart");

    commit("setSecondary", "#DFD4F5");
    commit("setAccent", "#ffc107");
    commit("setAccent2", "#211761");

    commit("setHomeMode", "retro");
    commit("setHomeBackgroundColor", "#ffffff54");
    commit("setHomeBackgroundColorDark", "#000000ad");

    commit("setEventMode", "default");
    commit("setEventBackgroundColor", "#f5f5f5fc");
    commit("setEventBackgroundColorDark", "#000000ad");
    commit("setEventInputBackgroundColor", "#f5f5f5fc");

    commit("setDiaryMode", "clear");
    commit("setDiaryCardBackgroundColor", "#fafafaed");

    commit("setDiaryMode", "clear");
    commit("setDiaryBackgroundColor", "#ffffff54");
    commit("setDiaryBackgroundColorDark", "#000000ad");
    commit("setDiaryCardBackgroundColor", "#f5f5f5ff");

    commit("toggleIsDiaryTitleBarShowingDay", false);
    commit("setDiarySubtitleStyleToAlternative", false);
    commit("setDiarySubtitleColor", "#978fc7");
    commit("toggleIsDiaryCountingDays", true);
  }
}
