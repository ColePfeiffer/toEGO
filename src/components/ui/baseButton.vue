<template>
  <q-btn class="baseButton" @click="onClick">
    <slot name="confirm-button"> {{ text }} </slot>
  </q-btn>
</template>

<script>
export default {
  name: "baseDialog",
  emits: ["close, save"],
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