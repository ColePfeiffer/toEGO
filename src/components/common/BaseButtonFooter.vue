<template>
  <q-btn no-caps
    class="col-2 q-ml-xs"
    :ripple="false"
    :flat="!hasShadow"
    :style="getStyle"
    @click="clickButton"
    :label="buttonText">
    <slot name="content"></slot>
  </q-btn>
</template>

<script>
export default {
  name: "BaseButtonFooter",
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
  },
  computed: {
    getStyle() {
      let style = {
        "min-width": "83px",
        "max-width": "83px",
        "min-height": "23px",
        "max-height": "25px",
        "box-shadow": "none",
        "font-size": "11px",
        "background-color": "var(--q-secondary)"
      };
      style["font-family"] = this.$store.state.layout.nonDefaultFont;

      style["color"] = this.$store.getters['layout/getTextColorOnSecondary'];
      return style;
    }
  }
};
</script>

