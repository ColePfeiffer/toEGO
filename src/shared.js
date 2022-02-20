export default {
  scroll(offset) {
    console.log("peeeeep");
    // + offset: scrolls less
    // - offset: scrolls more
    const scrollArea = this.$refs.scrollArea;
    const scrollTarget = scrollArea.getScrollTarget();

    console.log(scrollTarget);
    console.log(scrollTarget.scrollHeight);
    console.log(scrollTarget.scrollHeight - offset);
    const duration = 300; // ms - use 0 to instant scroll
    scrollArea.setScrollPosition(scrollTarget.scrollHeight - offset, duration);
  },
  foo: function () {
    alert("foo!");
  },
};
