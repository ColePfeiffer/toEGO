export default {
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
      vertical,
      scrollTarget.scrollHeight - offset,
      duration
    );
  },
};
