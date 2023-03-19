<template>
  <DiaryBaseSection>
    <template v-slot:content>
      <TheDiaryViewer :backgroundColor="backgroundColor"
        :diaryEntry="diaryEntry"
        :isCreatingNewDiaryEntry="isCreatingNewDiaryEntry"
        :viewingMode="viewingMode"
        :isDiaryVisible="isDiaryVisible"
        :changeData="changeData"
        @create-diary-entry="createDiaryEntry"
        @go-to-note-set-to-creation-mode="goToNoteSetToCreationMode">
        <template v-slot:editor>
          <BaseEditor editorTitle="Diary"
            :editorWidth="editorWidth"
            ref="editorRef1"
            class="no-border-radius no-box-shadow q-pa-none q-pt-xs"
            v-model="editor"
            @save="saveEditor"
            @show-dialog-template-creator="showTemplateCreator"
            @show-dialog-template-viewer="showTemplateViewer"
            @paste-template-from-quicklist="pasteTemplateFromQuicklist"
            :minHeight="minHeightForEditor"
            type="DIARY" />
        </template>
      </TheDiaryViewer>
    </template>
  </DiaryBaseSection>
</template>

<script>
import DiaryBaseSection from "./Base/DiaryBaseSection.vue";
import TheDiaryViewer from "./TheDiaryViewer.vue";
import BaseEditor from "../common/BaseEditor.vue";
export default {
  name: "TheSectionForDiary",
  components: { DiaryBaseSection, TheDiaryViewer, BaseEditor },
  emits: ["save-editor", "set-change-data-editor", "go-to-note-set-to-creation-mode", "create-diary-entry"],
  data() {
    return {
    }
  },
  props: {
    diaryEntry: Object,
    viewingMode: String,
    backgroundColor: {
      type: String,
      default: "#f5f5f5",
    },
    changeData: Object,
    isCreatingNewDiaryEntry: Boolean,
  },
  computed: {
    minHeightForEditor() {
      return this.$store.state.layout.height * 0.62 + "px";
    },
    editorWidth() {
      if (this.$store.state.layout.diaryMode != 'retro') {
        return this.$store.state.layout.innerWidth * 0.98;
      } else {
        return this.$store.state.layout.innerWidth * 0.88;
      }
    },
    isDiaryVisible() {
      if (this.diaryEntry != undefined || this.isCreatingNewDiaryEntry === true) {
        return true;
      } else {
        return false;
      }
    },
    editor: {
      get() {
        return this.changeData.editor;
      },
      set(value) {
        this.$emit("set-change-data-editor", value);
      }
    },
  },
  methods: {
    saveEditor() {
      this.$emit("save-editor");
    },
    goToNoteSetToCreationMode() {
      this.$emit("go-to-note-set-to-creation-mode");
    },
    showTemplateCreator() {
      this.$store.commit("templates/setEditorText", this.changeData.editor);
      let payload = {
        isVisible: true,
        isBackgroundVisible: true,
        nameOfCurrentDialog: "template-creator-for-diary",
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },
    showTemplateViewer() {
      let payload = {
        isVisible: true,
        isBackgroundVisible: true,
        nameOfCurrentDialog: "template-viewer-for-diary-editor",
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },
    pasteTemplateFromQuicklist(template) {
      if (this.changeData.editor != "") {
        this.$emit("set-change-data-editor", this.changeData.editor + "<br>" + template.text);
      } else {
        this.$emit("set-change-data-editor", template.text);
      }
    },
    createDiaryEntry() {
      this.$emit("create-diary-entry");
    },
  }
}
</script>
