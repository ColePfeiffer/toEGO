<template>
  <q-page class="q-pa-sm">
    <div class="title-bar row" :style="getStyleForDialogTitleBar">
      <div class="title-bar-text">
        <div>
          <q-icon name="theater_comedy" size="25px" />
          Event-Tracker
        </div>
      </div>
      <div class="title-bar-controls">
        <q-btn
          flat
          icon="bi-blockquote-right"
          @click="toggleVisibilityOfEventText"
        ></q-btn>
      </div>
    </div>

    <!-- Footer Slot | Option to hide buttons -->
    <div class="col-1 q-pa-sm q-pb-md q-mt-md">
      <div class="row justify-end">
        <q-btn
          class="button extraButton col-3 col-md-2 q-mx-xs"
          flat
          :style="$store.state.data.buttonFlatStyleAccentColor"
          :icon="extraButtonIcon"
          @click="clickExtraButton"
        >
          editor
        </q-btn>

        <q-btn
          class="button col-3 col-md-2 q-mx-xs"
          :style="$store.state.data.buttonFlatStyle"
          flat
          @click="closeDialog"
        >
          discard
        </q-btn>

        <q-btn
          class="button col-3 col-md-2 q-mx-xs"
          :style="$store.state.data.buttonFlatStyle"
          flat
          :disabled="isSaveButtonDisabled"
          @click="saveChanges"
        >
          save
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      styleDark: {
        width: this.widthOfDialog + "px",
        "background-color": "rgb(0 0 0 / 77%)",
        color: "white",
      },
      styleLight: {
        width: this.widthOfDialog + "px",
        "background-color": "rgb(255 255 255 )",
        color: "black",
      },
      accentBackground: {
        //"background-color": "var(--q-accent)",
        color: "var(--q-primary)",
        border: "1px solid var(--q-accent)",
      },
      styleForDialogTitleBar: { background: "var(--q-secondary)" },
      styleForDialogTitleBarDark: { background: "var(--q-secondary)" },
    };
  },
  computed: {
    getStyleForDialogTitleBar() {
      if (this.$store.getters["data/isDarkModeActive"]) {
        return this.styleForDialogTitleBarDark;
      } else {
        return this.styleForDialogTitleBar;
      }
    },
    getStyleForDialog() {
      if (this.$store.getters["data/isDarkModeActive"]) {
        return this.styleDark;
      } else {
        return this.styleLight;
      }
    },
  },
};
</script>

<style scoped src="98.css"></style>
