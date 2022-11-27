<template>
  <q-editor ref="editorRef"
    class="editor text-justify"
    :placeholder="placeholderText"
    :content-style="getStyleForEditorContent"
    :style="getStyleForEditor"
    :toolbar-text-color="calculatedTextColor"
    :toolbar-color="calculatedTextColor"
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
      <ToolbarDefaultRow :isShowingFullToolbar="isShowingFullToolbar"
        :isInFullscreenMode="isInFullscreenMode"
        :editorWidth="editorWidth"
        :editorTitle="editorTitle"
        :textColor="textColor"
        :type="type"
        @save="save"
        @toggle-toolbar="toggleToolbar"
        @toggle-fullscreen="toggleFullscreen"
        @paste-template-from-quicklist="pasteTemplateFromQuicklist"
        @show-dialog-template-creator="showDialogTemplateCreator"
        @show-dialog-template-viewer="showDialogTemplateViewer" />
    </template>
  </q-editor>
</template>

<script>
import ToolbarDefaultRow from '../settings/ToolbarDefaultRow.vue';

export default {
  name: "baseEditor",
  components: { ToolbarDefaultRow },
  emits: [
    "show-dialog-template-creator",
    "show-dialog-template-viewer",
    "paste-template-from-quicklist",
    "save"
  ],
  props: {
    type: String,
    editorWidth: Number,
    textColor: {
      type: String,
      default: ""
    },
    backgroundColor: {
      type: String,
      default: ""
    },
    editorTitle: {
      type: String,
      default: ""
    },
    placeholderText: {
      type: String,
      default: ""
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
    save() {
      this.toggleFullscreen();
      this.$emit("save");
    },
    showDialogTemplateViewer() {
      this.$emit("show-dialog-template-viewer");
    },
    showDialogTemplateCreator() {
      this.$emit("show-dialog-template-creator");
    },
    pasteTemplateFromQuicklist(template) {
      this.$emit("paste-template-from-quicklist", template);
    },
    toggleToolbar() {
      this.isShowingFullToolbar = !this.isShowingFullToolbar;
    },
    toggleFullscreen() {
      let editorRef = this.$refs.editorRef;
      if (this.isInFullscreenMode) {
        // if the editor already is in fullscreen mode, and he clicks on this button, we want to go back to normal view, and hide the full toolbar.
        this.isShowingFullToolbar = false;
        this.isInFullscreenMode = false;
        editorRef.exitFullscreen();
        editorRef.refreshToolbar();
      }
      else {
        this.isShowingFullToolbar = true;
        this.isInFullscreenMode = true;
        editorRef.setFullscreen();
        editorRef.refreshToolbar();
        editorRef.focus();
      }

    },
  },
  computed: {
    isBackgroundColorSet() {
      if (this.backgroundColor != '') {
        return true;
      } else {
        return false;
      }
    },
    getColorBasedOnBackgroundColor() {
      return this.$store.getters["layout/getColorBasedOnBackgroundColor"](this.backgroundColor);
    },
    borderStyleForEditor() {
      if (this.isDarkModeActive) {
        return "1px solid #ffffff1f !important";
      } else {
        if (this.backgroundColor === "whitesmoke" || this.backgroundColor === '#f5f5f5') {
          return "1px solid rgba(0, 0, 0, 0.12)";
        } else {
          return "1px solid " + this.getColorBasedOnBackgroundColor + "52 !important";
        }
      }
    },
    calculatedTextColor() {
      if (this.isDarkModeActive) {
        return "white";
      } else {
        if (this.isBackgroundColorSet) {
          if (this.isInFullscreenMode) {
            return "black";
          } else {
            return this.textColor;
          }
        } else {
          return this.$store.getters['layout/getToolbarIconColor'];
        }
      }
    },
    calculatedBackgroundColor() {
      if (this.isDarkModeActive) {
        return this.$store.state.layout.blacksmoke;
      } else {
        if (this.isBackgroundColorSet) {
          if (this.isInFullscreenMode) {
            return this.$store.state.layout.whitesmoke;
          } else {
            return this.backgroundColor;
          }
        } else {
          return this.$store.state.layout.whitesmoke;
        }
      }
    },
    isDarkModeActive() {
      return this.$store.state.data.userSettings.isDarkModeActive;
    },
    getStyleForEditor() {
      let style = {};
      style["font-size"] = "12px";
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      style["border-radius"] = "0px";
      style["background-color"] = this.calculatedBackgroundColor;
      style["border"] = this.borderStyleForEditor;
      return style;
    },
    getStyleForEditorContent() {
      let style = {};
      style["font-size"] = "12px";
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      style["padding-top"] = "12px";
      style["padding-left"] = "12px";
      style["padding-right"] = "12px";
      style["color"] = this.calculatedTextColor;



      return style;
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
.editor :deep(.q-editor__toolbars-container) {
  display: none;
}

.button.no-icon i {
  display: none;
}
</style>
