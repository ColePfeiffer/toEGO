<template>
  <!-- whole thing -->
  <q-dialog class="baseDialog" full-width persistent>
    <!-- row -->
    <div class="row justify-center" :style="boxShadowStyle">
      <div class="col-12 col-sm-7 col-md-4 col-xl-3">
        <div class="window dialogBox column" :style="getStyleForDialog">
          <div class="col-1">
            <!-- Title Bar -->
            <div class="title-bar row" :style="getStyleForDialogTitleBar">
              <div class="title-bar-text">
                <slot name="dialogTitle"></slot>
              </div>
              <div class="title-bar-controls">
                <button
                  v-if="hasHelpOption"
                  aria-label="Help"
                  @click="showHelp"
                ></button>
                <button aria-label="Close" @click="closeDialog"></button>
              </div>
            </div>
            <!-- Content Slot -->
            <slot name="content" :style="getStyleForDialog"></slot>
            <!-- Footer Slot | Option to hide buttons -->
            <slot name="footer">
              <div class="col-1 q-pa-sm q-pb-md q-mt-md">
                <div class="row justify-end">
                  <q-btn
                    v-if="hasExtraButton"
                    class="button extraButton col-3 col-md-2 q-mx-xs"
                    flat
                    :style="$store.state.data.buttonFlatStyleAccentColor"
                    :icon="extraButtonIcon"
                    @click="clickExtraButton"
                  >
                    <slot name="extra-button"> </slot>
                  </q-btn>

                  <q-btn
                    class="button col-3 col-md-2 q-mx-xs"
                    :style="$store.state.data.buttonFlatStyle"
                    flat
                    @click="closeDialog"
                  >
                    <slot name="close-button"> Cancel </slot>
                  </q-btn>

                  <q-btn
                    class="button col-3 col-md-2 q-mx-xs"
                    :style="$store.state.data.buttonFlatStyle"
                    flat
                    :disabled="isSaveButtonDisabled"
                    @click="saveChanges"
                  >
                    <slot name="confirm-button"> Save </slot>
                  </q-btn>
                </div>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: "baseDialog",
  emits: ["closeDialog", "save", "showHelp", "clickExtraButton"],
  props: {
    widthOfDialog: Number,
    hasHelpOption: Boolean,
    hasExtraButton: {
      type: Boolean,
      default: false,
    },
    extraButtonLabel: {
      type: String,
      default: "",
    },
    extraButtonIcon: {
      type: String,
      default: "",
    },
    isSaveButtonDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      boxShadowStyle: {
        "box-shadow": "none",
      },
      styleForDialogTitleBar: { background: "var(--q-secondary)" },
      styleForDialogTitleBarDark: { background: "var(--q-secondary)" },
    };
  },
  methods: {
    clickExtraButton() {
      this.$emit("clickExtraButton");
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
    saveChanges() {
      this.$emit("save");
    },
    showHelp() {
      this.$emit("showHelp");
    },
  },
  computed: {
    getHeight() {
      let height = this.$q.screen.height;
      return {
        height,
      };
    },

    getStyleForDialogTitleBar() {
      if (this.$store.getters["data/isDarkModeActive"]) {
        return this.styleForDialogTitleBarDark;
      } else {
        return this.styleForDialogTitleBar;
      }
    },
    getStyleForDialog() {
      let style = {};
      let currentMaxHeight;
      let screenHeightAsNumber = this.getHeight.height;
      if (screenHeightAsNumber >= 650) {
        console.log("big");
        currentMaxHeight = "650px";
      } else {
        console.log("small");
        currentMaxHeight = screenHeightAsNumber + "px";
      }
      console.log("heightAsString", currentMaxHeight);
      if (this.$store.getters["data/isDarkModeActive"]) {
        style = {
          //width: this.widthOfDialog + "px",
          "background-color": "rgb(0 0 0 / 77%)",
          "max-height": currentMaxHeight,
          color: "white",
        };
      } else {
        style = {
          //width: this.widthOfDialog + "px",
          "background-color": "rgb(255 255 255 )",
          // max-height
          // min-height
          "min-height": "300px",
          "max-height": currentMaxHeight,
          color: "black",
        };
      }
      console.log("STYLE: ", style);
      return style;
    },
  },
};
</script>

<style scoped src="98.css">
.defaultFont {
  font-family: "PressStart";
}

.baseDialog :deep(.window) {
  color: #fff;
}

.iconTitleContainer {
  border-bottom: 1px solid white;
}

.baseDialog :deep(.q-dialog__inner > div) {
  box-shadow: none;
}
</style>
