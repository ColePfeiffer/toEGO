<template>
  <q-card class="shadow-3"
    :style="cardStyle">
    <slot name="content">
      <q-card-section :class="{ 'text-center': isTextCentered, 'text-left': !isTextCentered }">
        <slot name="contentInsideSection"></slot>
      </q-card-section>
    </slot>
  </q-card>
</template>

<script>
export default {
  name: "BaseCard",
  props: {
    isTextCentered: {
      type: Boolean,
      default: true,
    },
    backgroundColor: {
      type: String,
      default: "#f5f5f5",
    },
    borderColorLeft: {
      type: String,
      default: ""
    },
    borderColorRight: {
      type: String,
      default: ""
    },
  },
  computed: {
    // gibt entweder borderColorLeft zurück, wenn ein Wert vorhanden ist, oder andernfalls borderColorLeft aus dem Vuex Store
    calculatedBorderColorLeft() {
      return this.borderColorLeft || this.$store.state.layout.borderColorLeft;
    },
    calculatedBorderColorRight() {
      return this.borderColorRight || this.$store.state.layout.borderColorRight;
    },
    cardStyle() {
      let style = {};
      let fontColor = this.$store.getters["layout/getColorBasedOnBackgroundColor"](this.backgroundColor);
      style["border-style"] = "solid";
      style["font-size"] = this.$store.state.layout.fontsize + "px";
      if (this.$store.getters["data/isDarkModeActive"]) {
        style["background-color"] = this.$store.state.layout.blacksmoke;
        style["color"] = "white";
      } else {
        style["background-color"] = this.backgroundColor;
        style["color"] = fontColor;
      }

      style["border"] = "2px solid";
      style["border-image-slice"] = "1";
      style["border-width"] = "1px";
      style["border-image-source"] = "linear-gradient(to left, " + this.calculatedBorderColorRight + ", " + this.calculatedBorderColorLeft + ")";

      if (fontColor === 'white') {
        style["text-shadow"] = "2px 2px 3px #39373c";
      } else {
        style["text-shadow"] = "none";
      }

      return style;
    },
  },
};
</script>
