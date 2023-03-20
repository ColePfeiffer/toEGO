<template>
  <q-btn class="no-box-shadow"
    :ripple="false"
    padding="3px"
    size="8px"
    :style="$store.getters['layout/getStyleForTitleBar']"
    unelevated
    color="transparent"
    :icon="icon"
    @click="clickButton">
    <slot name="tooltip"></slot>
  </q-btn>
</template>

<script>
export default {
  name: "BaseButtonForTitleBar",
  emits: ['click-button'],
  props: {
    icon: String,
  },
  methods: {
    clickButton() {
      this.$emit("click-button");
    }
  }
};
</script>

<style scoped src="98.css"></style>

