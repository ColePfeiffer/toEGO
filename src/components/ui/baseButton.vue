<template>
  <q-btn class="baseButton" @click="onClick">
    <slot name="confirm-button"> {{ text }} </slot>
  </q-btn>
</template>

<script>
/*

within button
    :style="[
      darkModeActive
        ? { 'background-color': 'black' }
        : { 'background-color': 'gray' },
    ]"

*/
export default {
  name: "baseDialog",
  emits: ["close, save"],
  data() {
    return {
      darkModeActive: false,
      styleA: "background-color: black",
      styleB: "background-color: red",
    };
  },
  props: {
    text: String,
  },
  methods: {
    onClick() {
      console.log("button clicked!");
      this.$emit("clicked");
    },
  },
};
</script>

<style scoped src="98.css">
</style>