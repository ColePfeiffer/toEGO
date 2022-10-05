export function changeFontsize(context, fontsize) {
  let newFontsize;
  if (fontsize === "xs") {
    newFontsize = 11;
  } else if (fontsize === "s") {
    newFontsize = 12.5;
  } else {
    newFontsize = 13.5;
  }
  context.commit("setFontsize", newFontsize);
}
