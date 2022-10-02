export const getStyleForHeadline = (state, getters, rootState, rootGetters) => {
  console.log("lololol");

  console.log(rootGetters["data/isDarkModeActive"]);
  return "0000";
  /**
 *   if (this.$store.getters["data/isDarkModeActive"]) {
    return this.$store.state.data.sTextBasicShadowDarkWhiteFont;
  } else {
    return this.$store.state.data.sTextBasicShadowBlackFont;
  }
 */
};
