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
import { uid } from "quasar";

export default {
  name: "baseDialog",
  emits: ["onClick"],
  data() {
    return {
      buttonID: 0,
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
      this.$store.commit("data/changeButtonColorOnClick", this.buttonID);
      this.$emit("onClick");
    },
  },
  mounted() {
    this.buttonID = uid();
  },
  computed: {
    // a computed getter
    buttonStyling() {
      if (this.$store.state.data.lastButtonClicked === this.buttonID) {
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