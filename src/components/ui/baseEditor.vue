<template>
  <q-editor ref="editorRef"
    class="editor text-justify"
    :content-style="getStyleForEditorContent"
    :style="getStyleForEditor"
    :toolbar-text-color="$store.getters['layout/getToolbarIconColor']"
    :toolbar-color="$store.getters['layout/getToolbarIconColor']"
    :toolbar="getToolbar"
    :fonts="{
      arial: 'Arial',
      arial_black: 'Arial Black',
      comic_sans: 'Comic Sans MS',
      courier_new: 'Courier New',
      impact: 'Impact',
      lucida_grande: 'Lucida Grande',
      times_new_roman: 'Times New Roman',
      verdana: 'Verdana',
    }">

    <template v-slot:placeholderElementSmall>
      <div class="placeholderElementContainer">
        <div class="placeholderElement"
          style="width: 90px"></div>
      </div>
    </template>

    <template v-slot:breakLine>
      <span class="break-line"
        style="flex-basis:100%; height:0; margin:0; padding:0"></span>
    </template>

    <template v-slot:title>
      <div class="row justify-between  items-center no-wrap"
        :style="styleForToolbarGroupTitle">
        <div class="col"
          :style="getStyleForTitle">
          {{ editorTitle }}
        </div>
        <div class="col">
          <div class="row justify-end">
            <q-btn flat
              no-wrap
              icon="bi-file-earmark-font"
              :style="$store.state.layout.buttonFlatOnlyIcon"
              :ripple="false"
              :text-color="$store.getters['layout/getToolbarIconColor']"
              size="xs">
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item clickable
                    v-close-popup
                    @click="openDialogViewTemplates">
                    <q-item-section>Show Templates</q-item-section>
                  </q-item>
                  <q-item clickable
                    v-close-popup
                    @click="openDialogCreateTemplate">
                    <q-item-section>Save as new template</q-item-section>
                  </q-item>
                  <q-separator />

                  <q-item clickable
                    :style="pasteQuicklistTextStyle"
                    :disable="isQuicklistDisabled">
                    <q-item-section>Paste Quick-List</q-item-section>
                    <q-item-section side>
                      <q-icon name="bi-chevron-down"
                        size="15px" />
                    </q-item-section>
                    <!-- Submenu -->
                    <q-menu auto-close>
                      <q-list>
                        <q-item v-for="template in $store.getters[
                          'data/getQuickListContent'
                        ](type)"
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
              no-wrap
              :icon="getIconForToggleToolbarButton"
              :style="$store.state.layout.buttonFlatOnlyIcon"
              :ripple="false"
              :text-color="$store.getters['layout/getToolbarIconColor']"
              size="xs"
              @click="changeToolbarMode">
            </q-btn>
            <q-btn flat
              no-wrap
              :icon="getIconForFullscreenBtn"
              :style="$store.state.layout.buttonFlatOnlyIcon"
              :ripple="false"
              :text-color="$store.getters['layout/getToolbarIconColor']"
              size="xs"
              @click="toggleFullscreen">
            </q-btn>
          </div>

        </div>
      </div>
    </template>
  </q-editor>
</template>

<script>
export default {
  name: "baseEditor",
  emits: [
    "show-dialog-template-creator",
    "show-dialog-template-viewer",
    "paste-template-from-quicklist",
  ],
  props: {
    type: String,
    editorWidth: Number,
    editorTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isShowingFullToolbar: false,
      isInFullscreenMode: false,
      lessOptions: [
        [
          "title",
        ],
      ],
      allOptions: [
        [
          "title",
        ],
        [
          "breakLine",
          {
            label: "Style",
            icon: this.$q.iconSet.editor.bold,
            fixedLabel: true,
            fixedIcon: true,
            options: ["bold", "italic", "strike", "underline"],
          },
          {
            label: "Font",
            icon: this.$q.iconSet.editor.font,
            fixedIcon: true,
            fixedLabel: true,
            list: "no-icons",
            options: [
              "default_font",
              "arial",
              "courier_new",
              "lucida_grande",
              "verdana",
            ],
          },
          {
            label: "Size",
            icon: this.$q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: "no-icons",
            options: [
              "size-1",
              "size-2",
              "size-3",
              "size-4",
              "size-5",
              "size-6",
            ],
          },
          "removeFormat",
        ],
        [
          {
            label: this.$q.lang.editor.align,
            icon: this.$q.iconSet.editor.align,
            fixedLabel: true,
            options: ["left", "center", "right", "justify"],
          },
          {
            label: "Lists",
            icon: "list",
            fixedLabel: true,
            options: ["unordered", "ordered", "outdent", "indent"],
          },
        ],
        [
          "undo",
          "redo",
          "link",
          "hr",
          "viewsource",

        ],
      ],
    };
  },

  methods: {
    changeToolbarMode() {
      this.isShowingFullToolbar = !this.isShowingFullToolbar;
    },
    toggleFullscreen() {
      let editorRef = this.$refs.editorRef;
      if (this.isInFullscreenMode) {
        // if the editor already is in fullscreen mode, and he clicks on this button, we want to go back to normal view, and hide the full toolbar.
        this.isShowingFullToolbar = false;
        this.isInFullscreenMode = false;
        editorRef.exitFullscreen();
      }
      else {
        this.isShowingFullToolbar = true;
        this.isInFullscreenMode = true;
        editorRef.setFullscreen();
      }
      editorRef.refreshToolbar();
      editorRef.focus();
    },
    openDialogCreateTemplate() {
      this.$emit("show-dialog-template-creator");
    },
    openDialogViewTemplates() {
      this.$emit("show-dialog-template-viewer");
    },
    pasteTemplateFromQuicklist(template) {
      this.$emit("paste-template-from-quicklist", template);
    },
  },
  computed: {
    getEditorWidth() {
      if (this.isInFullscreenMode) {
        return this.$store.state.layout.width;
      } else {
        return this.editorWidth;
      }
    },
    styleForToolbarGroupTitle() {
      let style = {};
      style["width"] = this.getEditorWidth - 2 + "px";
      style["padding-left"] = "12px";
      style["padding-right"] = "0px";
      return style;
    },
    getStyleForTitle() {
      let style = {};
      style["font-size"] = "11px";
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      style["color"] = "#d3d3d3 ";
      style["margin-top"] = "1px";
      return style;
    },
    getStyleForEditor() {
      let style = {};
      style["font-size"] = "12.5px";
      style["font-family"] = this.$store.state.layout.nonDefaultFont;

      if (this.$store.getters["layout/isDarkModeActive"]) {
        style["background-color"] = "blacksmoke";
      } else {
        style["background-color"] = "whitesmoke";
      }
      return style;
    },
    getStyleForEditorContent() {
      let style = {};
      style["font-size"] = "12.5px";
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      style["padding-top"] = "12px";
      style["padding-left"] = "12px";
      style["padding-right"] = "12px";
      if (this.$store.getters["layout/isDarkModeActive"]) {
        style["background-color"] = "blacksmoke";
      } else {
        style["background-color"] = "whitesmoke";
      }
      return style;

    },
    pasteQuicklistTextStyle() {
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
    isQuicklistDisabled() {
      let templates = this.$store.getters["data/getQuickListContent"](this.type);
      if (templates.length < 1) {
        return true;
      }
      else {
        return false;
      }
    },


    getStyleForToolbar() {
      if (this.$store.getters["layout/isDarkModeActive"]) {
        return { background: "black" };
      }
      else {
        return { background: "white" };
      }
    },
    getLabelForToggleToolbarButton() {
      if (this.isShowingFullToolbar) {
        return "Toolbar [-]";
      }
      else {
        return "Toolbar [+]";
      }
    },
    getIconForFullscreenBtn() {
      if (this.isInFullscreenMode) {
        return "bi-fullscreen-exit";
      }
      else {
        return "bi-fullscreen";
      }
    },
    getIconForToggleToolbarButton() {
      if (this.isShowingFullToolbar) {
        return "bi-dash";
      }
      else {
        return "bi-plus";
      }
    },
    getToolbar() {
      if (this.isShowingFullToolbar === false) {
        return this.lessOptions;
      }
      else {
        return this.allOptions;
      }
    },
  },
};
</script>
<style>
.q-editor__toolbar {
  flex-wrap: wrap;
}


.q-editor__toolbar-group {
  margin: 0px;
  flex-wrap: wrap;
}
</style>
<style scoped src="98.css">
.q-editor__toolbar-group {}

.editor :deep(.q-editor__toolbars-container) {
  display: none;
}


.button.no-icon i {
  display: none;
}
</style>
s