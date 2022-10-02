<template>
  <q-page class="q-pa-sm">
    <div class="outerContainer row justify-center items-center q-pa-md q-pt-xl">
      <!-- Header / Titlebar-->
      <div class="title-bar col-md-11 col-12 row"
        :style="getStyleForDialogTitleBar">
        <div class="title-bar-text">
          <div class="q-pr-lg">
            <slot name="title-bar-icon"></slot>
            {{ titleOfPage }}
          </div>
        </div>
        <div class="title-bar-controls">
          <slot name="title-bar-controls"></slot>
        </div>
      </div>
      <!-- Content -->
      <div class="col-md-11 col-12 container q-mt-sm"
        :style="outerContainerStyle">
        <slot name="content"></slot>
      </div>
      <!-- Footer / Buttons -->
      <div class="col-md-11 col-12 q-mt-md">
        <div class="row justify-end items-center no-wrap">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "BasePage",
  props: {
    icon: String,
    titleOfPage: String,
  },
  data() {
    return {
      styleForDialogTitleBar: { background: "var(--q-secondary)" },
      styleForDialogTitleBarDark: { background: "var(--q-secondary)" },
    };
  },
  methods: {

  },
  computed: {
    outerContainerStyle() {
      let currentStyle;
      let styleDark = {
        "background-color": "var(--q-dark)",
        color: "white",
      };
      let styleLight = {
        "background-color": "rgb(255 255 255 )",
        color: "black",
      };

      if (this.$store.getters["data/isDarkModeActive"]) {
        currentStyle = styleDark;
      } else {
        currentStyle = styleLight;
      }


      return currentStyle;
    },

    getStyleForHeadline() {
      if (this.$store.getters["data/isDarkModeActive"]) {
        return this.$store.state.data.sTextBasicShadowDarkWhiteFont;
      } else {
        return this.$store.state.data.sTextBasicShadowBlackFont;
      }
    },
    getStyleForDialogTitleBar() {
      if (this.$store.getters["data/isDarkModeActive"]) {
        return this.styleForDialogTitleBarDark;
      } else {
        return this.styleForDialogTitleBar;
      }
    },
  },
};
</script>

<style scoped src="98.css">

</style>

<style scoped>
.container {
  background-color: white;
  height: 600px;
}
</style>
