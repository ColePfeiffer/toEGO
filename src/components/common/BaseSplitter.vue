<template>
  <q-splitter v-model="calculatedSplitterModel"
    :limits="[1, Infinity]"
    unit="px"
    :disable="isSplitterDisabled"
    horizontal
    color="transparent"
    :style="styleForSplitter"
    :separator-style="styleForSplitterSeparator">
    <template v-slot:before>
      <slot name="splitter-content-before">
      </slot>
    </template>
    <!-- Q-Seperator, including Header for Diary Section -->
    <template v-slot:separator>
      <div v-if="isSplitterVisible"
        :style="styleForBorderSeparator"></div>
      <q-avatar v-if="isSplitterVisible"
        flat
        class="grab-button"
        text-color="white"
        size="40px"
        icon="bi-grip-horizontal" />
      <slot name="splitter-content-separator">
      </slot>
    </template>
    <template v-slot:after>
      <slot name="splitter-content-after"></slot>
    </template>
  </q-splitter>
</template>

<script>
export default {
  name: "BaseSplitter",
  emits: ["set-splitter-height"],
  props: {
    splitterModel: Number,
    isSplitterDisabled: Boolean,
    isSplitterVisible: Boolean,
    hasExtraMargin: Boolean,
  },
  computed: {
    calculatedSplitterModel: {
      get() {
        return this.splitterModel;
      },
      set(value) {
        this.$emit("set-splitter-height", value);
      }
    },
    styleForBorderSeparator() {
      if (this.hasExtraMargin) {
        return {
          "width": this.$store.state.layout.innerWidth * 0.93 + "px",
          "border-top": "0.8px solid whitesmoke",
          "margin-top": "-15px",
        };
      } else {
        return {
          "width": this.$store.state.layout.innerWidth * 0.99 + "px",
          "border-top": "0.8px solid whitesmoke",
          "margin-top": "-15px",
        };
      }
    },
    styleForSplitter() {
      let style = {};
      style['height'] = this.$store.state.layout.height * 0.70 + "px";
      if (this.hasExtraMargin) {
        style['margin-bottom'] = "10px";
        style['height'] = this.$store.state.layout.height * 0.67 + "px";
      }
      style['margin-top'] = "3px";
      return style;
    },
    styleForSplitterSeparator() {
      let style = {};
      if (this.isSplitterVisible) {
        style["z-index"] = "1";
        style["background-color"] = "transparent";
        style["height"] = "33px";
      } else {
        style["display"] = "none";
      }
      return style;
    },
  },
};
</script>
