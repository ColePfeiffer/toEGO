<template>
  <!-- Input: Title -->
  <q-input class="col-12 q-mb-md q-mt-sm no-border-radius no-box-shadow"
    color="secondary"
    v-model="titleModel"
    dense
    autofocus
    borderless
    placeholder="Title"
    :style="getStyleForInput"
    :input-style="getInputStyleForTitle"
    hide-bottom-space
    :rules="[
      (val) => val.length <= 50 || 'Please use maximum 50 characters',
    ]">
  </q-input>
</template>


<script>

export default {
  name: "NoteSectionInputTitle",
  emits: ["set-title"],
  components: {},
  props: {
    title: String,
    layoutMode: String,
    width: Number,
  },
  data() {
    return {

    };
  },
  computed: {
    isUsingSeparateColoring() {
      return this.$store.state.layout.isDiaryInputColoredSeparately;
    },
    backgroundColorBasedOnMode() {
      if (this.$store.getters['data/isDarkModeActive']) {
        return this.$store.state.layout.blacksmoke;
      } else {
        if (this.layoutMode === 'default') {
          return this.$store.state.layout.whitesmoke;
        } else {
          return this.backgroundColor;
        }
      }
    },
    backgroundColor() {
      if (this.isUsingSeparateColoring) {
        return this.$store.state.layout.eventInputBackgroundColor;
      } else {
        return this.$store.state.layout.notesContainerBackgroundColor;
      }
    },
    getColorBasedOnBackgroundColor() {
      return this.$store.getters["layout/getColorBasedOnBackgroundColor"](this.backgroundColorBasedOnMode);
    },
    getInputStyleForTitle() {
      let style = {};
      style["min-height"] = "25px";
      style["max-height"] = "50px";
      style["font-size"] = "12px";
      style["background-color"] = "transparent";
      style["font-family"] = this.$store.state.layout.nonDefaultFont;

      if (this.layoutMode != 'default') {
        style["color"] = this.getColorBasedOnBackgroundColor + "!important";
      } else {
        if (this.$store.getters["data/isDarkModeActive"]) {
          style["color"] = "white";
          /*
           style["color"] = this.$store.getters[
                  "layout/getColorBasedOnBackgroundColor"
                ](this.$store.state.layout.eventInputBackgroundColor);
          */
        } else {
          style["color"] = "black";
        }
      }
      return style;
    },
    getStyleForInput() {
      let style = {};
      style["font-size"] = "12px";
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      style["width"] = this.width + "px";
      style["padding"] = "0 12px";
      style["border-radius"] = "0px";
      style["background-color"] = this.backgroundColorBasedOnMode + " !important";
      if (this.layoutMode === "default") {
        if (this.$store.getters["data/isDarkModeActive"]) {
          style["border"] = "1px solid #ffffff1f";
        } else {
          style["border"] = "1px solid rgba(0, 0, 0, 0.12)";
        }
      } else {
        style["border"] = "1px solid " + this.getColorBasedOnBackgroundColor + "52";
      }
      return style;
    },
    titleModel: {
      get() {
        return this.title;
      },
      set(value) {
        this.$emit("set-title", value);
      }
    },
  }

};
</script>

