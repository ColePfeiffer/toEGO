export default {
  // Button Styles
  simplifiedStyle: {
    "background-color": "yellow",
    color: "black",
    height: "33px",
    "border-style": "unset",
    border: "1px solid black",
    "box-shadow": "none",
  },
  win98Style: {
    "background-color": "#c0c0c0",
    color: "black",
    height: "33px",
  },
  win98StyleDark: {
    "background-color": "black",
    color: "white",
    height: "33px",
  },

  scroll(offset) {
    /*
      this.$nextTick(() =>
        this.$refs[refName].$el.scrollIntoView({
          block: "center",
          inline: "end",
        })
      );
      // Alternativ
      const ele = document.getElementById("oneToFiveMethode");
      this.$nextTick(() => this.$refs[refName].$el.scrollIntoView());
      */

    // + offset: scrolls less
    // - offset: scrolls more
    const scrollArea = this.$refs.scrollArea;
    const scrollTarget = scrollArea.getScrollTarget();

    //console.log(scrollTarget);
    //console.log(scrollTarget.scrollHeight);
    //console.log(scrollTarget.scrollHeight - offset);
    const duration = 300; // ms - use 0 to instant scroll
    scrollArea.setScrollPosition(
      "vertical",
      scrollTarget.scrollHeight - offset,
      duration
    );
  },
};
