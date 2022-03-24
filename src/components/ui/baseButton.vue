<template>
  <q-btn class="baseButton" @click="onClick" :style="buttonStyling">
    <slot name="confirm-button"> {{ text }} </slot>
  </q-btn>
</template>

<script>
/*
// conditional if on styling, written like this:
v-bind:style="darkModeActive ? styleA : styleB"
// within button
    :style="[
      darkModeActive
        ? { 'background-color': 'black' }
        : { 'background-color': 'gray' },
    ]"

*/
export default {
  name: "baseDialog",
  emits: ["onClick"],
  data() {
    return {
      btnClicked: false,
      btnClickedStyle: {
        "background-color": "var(--q-primary)",
        color: "white",
        height: "33px",
        "border-style": "unset",
        border: "1px solid black",
        "box-shadow": "none",
      },
    };
  },
  props: {
    text: String,
    changeColor: Boolean,
    setStyleTo: Object,
  },
  methods: {
    onClick() {
      this.btnClicked = !this.btnClicked;
      this.$emit("onClick");
      // this.$store.state.data.newEventDialogIsOpen
      // this.$store.commit("data/buttonClicked(buttonID)");
    },
  },
  mounted() {},
  computed: {
    // a computed getter
    buttonStyling() {
      if (this.btnClicked) {
        return this.btnClickedStyle;
      } else {
        return this.setStyleTo;
      }
    },
  },
};
</script>

<style scoped src="98.css">
</style>