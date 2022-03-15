<template>
  <!-- add v-bind:style="buttonStyling" -->
  <q-btn class="baseButton" @click="onClick" :style="setStyleTo">
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
      darkModeActive: true,
      // inline css style with variables
      styleA: { "background-color": "black", color: "red" },
      styleB: { "background-color": "yellow", color: "blue" },
      styleBasic: {
        "background-color": "#c0c0c0 ",
        color: "black",
      },
    };
  },
  props: {
    text: String,
    changeColor: Boolean,
    setStyleTo: String,
  },
  methods: {
    onClick() {
      if (this.changeColor == true) {
        console.log("Changing colors.");
        this.darkModeActive = !this.darkModeActive;
      }

      this.$emit("onClick");
      /*
      console.log("button clicked!");
      this.darkModeActive = !this.darkModeActive;
      */
    },
  },
  computed: {
    // a computed getter
    buttonStyling() {
      var style = {};

      if (this.darkModeActive) {
        console.log("Dark mode yess");
        // `this` points to the vm instance
        style = this.styleA;
      } else {
        console.log("not very dark in here");
        style = this.styleB;
      }

      return style;
    },
  },
};
</script>

<style scoped src="98.css">
.baseButton :deep(.span) {
  color: #fff;
}
</style>