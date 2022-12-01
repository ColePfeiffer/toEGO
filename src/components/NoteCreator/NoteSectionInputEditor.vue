<template>
  <!-- Input: What happened -->
  <div class="col-12 q-mb-lg"
    :style="getInputStyleForWhatHappened">
    <BaseEditor placeholderText="What happened?"
      :textColor="editorTextColor"
      :backgroundColor="editorBackgroundColor"
      :editorWidth="width"
      class="no-border-radius no-box-shadow"
      ref="editorRef1"
      v-model="editorModel"
      :style="editorHeight"
      :type="type"
      @save="saveChanges"
      @show-dialog-template-creator="showTemplateCreator"
      @show-dialog-template-viewer="showTemplateViewer"
      @paste-template-from-quicklist="pasteTemplateFromFavorites" />
  </div>
</template>


<script>
import BaseEditor from '../common/BaseEditor.vue';


export default {
  name: "NoteSectionInputEditor",
  emits: ["save-changes", "show-template-creator", "show-template-viewer", "paste-template-from-favorites", "set-editor"],
  components: { BaseEditor },
  props: {
    width: Number,
    editor: String,
    layoutMode: String,
    minHeightMultiplicator: {
      type: Number,
      default: 0.35
    },
    isPreview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    };
  },
  methods: {
    saveChanges() {
      this.$emit("save-changes");
    },
    showTemplateCreator() {
      this.$emit("show-template-creator");
    },
    showTemplateViewer() {
      this.$emit("show-template-viewer");
    },
    pasteTemplateFromFavorites(template) {
      this.$emit("paste-template-from-favorites", template);
    },
  },
  computed: {
    isUsingSeparateColoring() {
      return this.$store.state.layout.isDiaryInputColoredSeparately;
    },
    backgroundColor() {
      if (this.isUsingSeparateColoring) {
        return this.$store.state.layout.eventInputBackgroundColor;
      } else {
        return this.$store.state.layout.notesContainerBackgroundColor;
      }
    },
    type() {
      if (this.isPreview) {
        return "TEMPLATE";
      } else {
        return "EVENT";
      }
    },
    // TODO: kann vielleicht weg
    getPaddingForEditor() {
      if (this.layoutMode === "border") {
        return {
          "padding-top": "5px",
          "padding-left": "5px",
          "padding-right": "5px",
        };
      } else if (this.layoutMode != "default") {
        return { "padding-left": "5px", "padding-right": "5px" };
      } else {
        return "padding: none";
      }
    },
    getColorBasedOnBackgroundColorAsName() {
      return this.$store.getters["layout/getColorBasedOnBackgroundColorAsName"](this.editorBackgroundColor);
    },
    getInputStyleForWhatHappened() {
      let style = {};
      style["font-size"] = "12px";
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      style["width"] = this.width + "px";
      return style;
    },
    editorTextColor() {
      return this.getColorBasedOnBackgroundColorAsName;
    },
    editorHeight() {
      let style = {};
      style["min-height"] = this.$store.state.layout.height * this.minHeightMultiplicator + "px";
      return style;
    },
    editorBackgroundColor() {
      if (this.layoutMode === 'default') {
        if (this.$store.getters['data/isDarkModeActive']) {
          return this.$store.state.layout.blacksmoke;
        } else {
          return this.$store.state.layout.whitesmoke;
        }
      } else {
        return this.backgroundColor;
      }
    },
    editorModel: {
      get() {
        return this.editor;
      },
      set(value) {
        this.$emit("set-editor", value);
      }
    },
  }

};
</script>

