<template>
  <q-card class="shadow-3"
    :style="getStyleForCard">
    <slot name="content">
      <q-card-section :class="{ 'text-center': isTextCentered, 'text-left': isTextLeft }">
        <slot name="contentInsideSection">
        </slot>
      </q-card-section>
    </slot>
  </q-card>
</template>

<script>
export default {
  name: "BaseCard",
  props: {
    isTextSetToCentered: {
      type: Boolean,
      default: true,
    },
    backgroundColor: {
      type: String,
      default: "#f5f5f5",
    }
  },
  computed: {
    getStyleForCard() {
      let style = {};
      let fontColor = this.$store.getters["layout/getColorBasedOnBackgroundColor"](this.backgroundColor);
      //style["border-radius"] = "0px";
      style["border-style"] = "solid";
      style["font-size"] = this.$store.state.layout.fontsize + "px";


      if (this.$store.getters["layout/isDarkModeActive"]) {
        style["background-color"] = this.$store.state.layout.blacksmoke;
        style["color"] = "white";
        style["border"] = "2px solid";
        style["border-image-slice"] = "1";
        style["border-width"] = "1px";
        style["border-image-source"] = "linear-gradient(to left, " + this.$store.state.layout.borderColorRight + ", " + this.$store.state.layout.borderColorLeft + ")";
        console.log(style["border-image-source"])
        /* amazing border
        style["border-width"] = "20px";
        style["border-image"] =
          "repeating-radial-gradient(circle at 10px,turquoise, pink 2px, greenyellow 4px, pink 2px) 1";
        */
      } else {
        style["border"] = "2px solid";
        style["border-image-slice"] = "1";
        style["border-width"] = "1px";
        style["border-image-source"] = "linear-gradient(to left, " + this.$store.state.layout.borderColorRight + ", " + this.$store.state.layout.borderColorLeft + ")";
        style["background-color"] = this.backgroundColor;
        style["color"] = fontColor;
        //style["color"] = "black";
      }

      if (fontColor === 'white') {
        style["text-shadow"] = "2px 2px 3px #39373c";
      } else {
        style["text-shadow"] = "none";
      }

      return style;
    },
    isTextCentered() {
      if (this.isTextSetToCentered) {
        return true;
      } else {
        return false;
      }
    },
    isTextLeft() {
      if (!this.isTextSetToCentered) {
        return true;
      } else {
        return false;
      }
    }
  },
};
</script>
