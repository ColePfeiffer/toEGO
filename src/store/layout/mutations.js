export const setFontsize = (state, fontsize) => {
  console.log("mutation in action.... ", state.fontsize, fontsize);
  state.fontsize = fontsize;
  console.log(fontsize);
};
