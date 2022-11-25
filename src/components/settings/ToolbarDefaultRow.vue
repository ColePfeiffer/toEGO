<template>
  <div class="row justify-between  items-center no-wrap"
    :style="styleForToolbarGroupTitle">
    <div class="col-auto"
      :style="styleForTitle">
      {{ editorTitle }}
    </div>
    <div class="col">
      <div class="row justify-end">
        <q-btn v-if="type != 'TEMPLATE'"
          flat
          class="col-auto"
          no-wrap
          dense
          icon="bi-file-earmark-font"
          :style="styleForButton"
          :ripple="false"
          :label="labelForTemplateButton"
          size="xs">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable
                v-close-popup
                @click="showDialogTemplateViewer">
                <q-item-section>Show Templates</q-item-section>
              </q-item>
              <q-item clickable
                v-close-popup
                @click="showDialogTemplateCreator">
                <q-item-section>Save as new template</q-item-section>
              </q-item>
              <q-separator />

              <q-item clickable
                :style="styleForQuickListText"
                :disable="isQuicklistDisabled">
                <q-item-section>Paste Quick-List</q-item-section>
                <q-item-section side>
                  <q-icon name="bi-chevron-down"
                    size="15px" />
                </q-item-section>
                <!-- Submenu -->
                <q-menu auto-close>
                  <q-list>
                    <q-item v-for="template in quicklistContent"
                      :key="template"
                      dense
                      clickable
                      @click="pasteTemplateFromQuicklist(template)">
                      <q-item-section avatar>
                        <q-icon dense
                          size="xs"
                          name="bi-file-font"
                          color="secondary" />
                      </q-item-section>
                      <q-item-section>{{ template.name }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn flat
          class="col-auto"
          no-wrap
          dense
          :icon="iconForToggleToolbarButton"
          :style="styleForButton"
          :ripple="false"
          size="xs"
          :label="labelForToolbarButton"
          @click="changeToolbarMode">
        </q-btn>
        <q-btn v-if="isInFullscreenMode"
          flat
          class="col-auto"
          no-wrap
          dense
          icon="fas fa-save"
          :style="styleForButton"
          :ripple="false"
          size="xs"
          label="save"
          @click="saveEditor">
        </q-btn>
        <q-btn v-if="type != 'TEMPLATE'"
          flat
          class="col-auto"
          no-wrap
          dense
          :icon="iconForFullscreenButton"
          :style="styleForButton"
          :ripple="false"
          size="xs"
          :label="labelForFullscreenButton"
          @click="toggleFullscreen">
        </q-btn>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ToolbarDefaultRow",
  emits: ["save", "show-dialog-template-viewer", "show-dialog-template-creator", "paste-template-from-quicklist", "toggle-toolbar", "toggle-fullscreen"],
  props: {
    isShowingFullToolbar: Boolean,
    isInFullscreenMode: Boolean,
    editorWidth: Number,
    editorTitle: String,
    type: String,
    textColor: String,
  },
  data() {
    return {
    }
  },
  methods: {
    showDialogTemplateViewer() {
      this.$emit("show-dialog-template-viewer");
    },
    showDialogTemplateCreator() {
      this.$emit("show-dialog-template-creator");
    },
    pasteTemplateFromQuicklist(template) {
      this.$emit("paste-template-from-quicklist", template);
    },
    changeToolbarMode() {
      this.$emit("toggle-toolbar");
    },
    toggleFullscreen() {
      this.$emit("toggle-fullscreen");
    },
    saveEditor() {
      this.$emit("save");
    }
  },
  computed: {
    labelForFullscreenButton() {
      if (this.isInFullscreenMode) {
        return "exit"
      } else {
        return "";
      }
    },
    labelForTemplateButton() {
      if (this.isInFullscreenMode) {
        return "Templates"
      } else {
        return "";
      }
    },
    labelForToolbarButton() {
      if (this.isInFullscreenMode) {
        if (this.isShowingFullToolbar) {
          return "less"
        } else {
          return "more"
        }
      } else {
        return "";
      }
    },
    quicklistContent() {
      return this.$store.getters["templates/getFavoritesByType"](this.type)
    },
    isQuicklistDisabled() {
      let templates = this.quicklistContent;
      if (templates.length < 1) {
        return true;
      }
      else {
        return false;
      }
    },
    iconForFullscreenButton() {
      if (this.isInFullscreenMode) {
        return "bi-fullscreen-exit";
      }
      else {
        return "bi-fullscreen";
      }
    },
    calculatedEditorWidth() {
      if (this.isInFullscreenMode) {
        return this.$store.state.layout.width * 0.99;
      } else {
        return this.editorWidth;
      }
    },
    iconForToggleToolbarButton() {
      if (this.isShowingFullToolbar) {
        return "bi-dash";
      }
      else {
        return "bi-plus";
      }
    },
    styleForButtonVerkackt() {
      if (this.isInFullscreenMode) {
        return {
          "background-color": "transparent",
          "border-style": "unset",
          "box-shadow": "none",
          "min-width": "20px",
          "max-width": "60px",
          "padding": "0px",
          "margin-left": "10px",
          "min-height": "20px",
        }
      } else {
        return {
          "background-color": "transparent",
          "border-style": "unset",
          "box-shadow": "none",
          "min-width": "20px",
          "max-width": "20px",
          "min-height": "20px",
          "margin-right": "5px"
        }
      }
    },
    styleForButton() {
      let style = {};
      style["background-color"] = "transparent";
      style["border-style"] = "unset";
      style["box-shadow"] = "none";
      style["min-height"] = "20px";
      style["min-width"] = "20px";

      if (this.isInFullscreenMode) {
        style["max-width"] = "60px";
        style["padding"] = "0px";
        style["margin-left"] = "10px";
        if (this.isDarkModeActive) {
          style["color"] = "white !important";
        } else {
          style["color"] = "black !important";
        }
      } else {
        if (this.isDarkModeActive) {
          style["color"] = "white !important";
        } else {
          style["color"] = this.textColor + " !important";
        }
        style["max-width"] = "20px";
        style["margin-right"] = "5px";
      }
      return style;
    },
    styleForQuickListText() {
      if (this.isQuicklistDisabled) {
        return {
          color: "#d3d3d3 ",
        };
      }
      else {
        return {
          color: "var(--q-primary)",
        };
      }
    },
    isDarkModeActive() {
      if (this.$store.getters["data/isDarkModeActive"]) {
        return true;
      } else {
        return false;
      }
    },
    styleForTitle() {
      let style = {};
      style["font-size"] = "11px";
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      style["color"] = this.textColor + " !important";
      style["font-weight"] = "600";
      style["margin-top"] = "1px";
      return style;
    },
    styleForToolbarGroupTitle() {
      let style = {};
      style["width"] = this.calculatedEditorWidth - 2 + "px";
      style["padding-left"] = "12px";
      style["padding-right"] = "0px";
      return style;
    },
  },
};
</script>
