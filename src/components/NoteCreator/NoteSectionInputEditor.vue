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
      @show-dialog-template-creator="openDialogCreateTemplate"
      @show-dialog-template-viewer="openDialogViewTemplates"
      @paste-template-from-quicklist="pasteTemplateFromQuicklist" />
  </div>
</template>


<script>
import BaseEditor from '../ui/BaseEditor.vue';


export default {
  name: "NoteSectionInputEditor",
  emits: ["save-changes", "show-dialog-template-creator", "show-dialog-template-viewer", "paste-template-from-quicklist", "set-editor"],
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

    },
    openDialogCreateTemplate() {

    },
    openDialogViewTemplates() {

    },
    pasteTemplateFromQuicklist() {

    },
  },
  computed: {
    isUsingSeparateColoring() {
      return this.$store.state.layout.diaryIsInputColoredSeparately;
    },
    backgroundColor() {
      if (this.isUsingSeparateColoring) {
        console.log("1", this.$store.state.layout.eventInputBackgroundColor)
        return this.$store.state.layout.eventInputBackgroundColor;
      } else {
        console.log("2", this.$store.state.layout.notesContainerBackgroundColor)
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
        if (this.$store.getters['layout/isDarkModeActive']) {
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

