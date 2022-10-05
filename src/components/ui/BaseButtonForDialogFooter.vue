<template>
  <q-btn no-caps
    class="col-2 q-ml-xs"
    :ripple="false"
    :flat="!hasShadow"
    :style="$store.state.layout.buttonFlatStyle"
    @click="clickButton"
    :label="buttonText">
    <slot name="content"></slot>
  </q-btn>
</template>

<script>
export default {
  name: "BaseButtonForDialogFooter",
  emits: ['click-button'],
  props: {
    buttonText: String,
    hasShadow: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    clickButton() {
      this.$emit("click-button");
    }
  }
};
</script>

