<template>
  <q-input color="secondary"
    stack-label
    filled
    label=title
    :label-color="labelColor"
    @focus="setFocus"
    @blur="loseFocus"
    :style="getStyleForInput"
    :input-style="inputStyle"
    hide-bottom-space
    :rules="rules" />
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    title: String,
    eventMode: String,
    inputStyle: Object,
    rules: Array,
  },
  data() {
    return {
      labelColor: 'lightgrey'
    }
  },
  methods: {
    setFocus() {
      this.labelColor = "darkgrey";
    },
    loseFocus() {
      this.labelColor = "lightgrey";
    },
  },
  computed: {
    getStyleForInput() {
      let style = {};
      style["font-size"] = "12px";
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      style["width"] = this.$store.state.layout.innerWidth * .68 + "px";
      if (this.getEventMode != 'default') {
        style["background-color"] = this.$store.state.layout.eventInputBackgroundColor;
      }
      return style;
    },
  },
};
</script>
