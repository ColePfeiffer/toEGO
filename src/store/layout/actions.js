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
