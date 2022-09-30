<template>
  <div class="q-pa-md">
    <!-- Case 1: There is no entry for the selected day. -->
    <div v-if="diaryEntry === undefined && isCreatingNewDiaryEntry === false">
      <BaseCard>
        <template v-slot:content>
          Nothing here yet. Add an event
          <q-btn color="accent"
            flat
            dense
            icon="bi-plus"
            @click="goToPageNewEventSetToCreationMode" />
          <br />
          or create an entry.
          <q-btn color="accent"
            flat
            dense
            icon="bi-journal-plus"
            @click="changeView('edit')" />
        </template>
      </BaseCard>
    </div>
    <!-- Case 2: There is an entry for the selected day. -->
    <div v-else>
      <div v-if="isDiaryVisible">
        <!-- Case 2.1: In Viewing Mode -->
        <div v-if="modeIsSetToView">
          <!-- Case 2.1.1. Showing Editor text (if editor isn't empty) -->
          <BaseCard v-if="editor != ''">
            <template v-slot:content>
              <div v-html="editor">
              </div>
            </template>
          </BaseCard>
          <!-- Case 2.1.2. Showing + Button if editor is empty. -->
          <BaseCard v-else>
            <template v-slot:content>
              <q-btn color="accent"
                flat
                dense
                icon="bi-plus"
                @click="changeView('edit')" />
            </template>
          </BaseCard>
        </div>
        <!-- Case 2.2: In Editing Mode -->
        <div v-else-if="modeIsSetToEdit">
          <BaseCard>
            <template v-slot:content>
              <BaseEditor ref="editorRef1"
                v-model="useableEditorViaChangeData"
                @openDialogCreateTemplate="showTemplateCreator"
                @openDialogViewTemplates="showTemplateViewer"
                @pasteTemplate="pasteTemplate"
                minHeight="445px"
                type="DIARY" />
            </template>
          </BaseCard>
        </div>
        <!-- Case 2.3: Diaryentry doesn't exist or is empty. Showing + button. -->
        <div v-else-if="changeData.editor === undefined || changeData.editor === ''">
          <BaseCard>
            <template v-slot:content>
              <q-btn flat
                dense
                color="accent"
                icon="bi-plus"
                @click="createDiaryEntry" />
            </template>
          </BaseCard>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import BaseCard from "../ui/BaseCard.vue";
import BaseEditor from "../ui/BaseEditor.vue";


export default {
  name: "TheDiaryViewer",
  components: {
    BaseCard,
    BaseEditor
  },
  // TODO:
  emits: ["go-to-new-event-in-creation-mode", "change-view", "paste-template"],
  props: {
    diaryEntry: Object,
    viewingMode: String,
    isDiaryVisible: Boolean,
    changeData: Object,
  },
  data() {
    return {
      isCreatingNewDiaryEntry: false,
    };
  },
  methods: {
    pasteTemplate(template) {
      this.$emit("paste-template", template);
    },
    changeView(viewMode) {
      this.$emit("change-view", viewMode);
    },
    // Methods for Buttons
    goToPageNewEventSetToCreationMode() {
      this.$emit("go-to-new-event-in-creation-mode");
    },
    // Template Viewer
    showTemplateViewer() {
      let payload = {
        isVisible: true,
        isBackgroundVisible: true,
        nameOfCurrentDialog: "dialogViewDiaryTemplates",
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },
    // Template Creator
    showTemplateCreator() {
      let payload = {
        isVisible: true,
        isBackgroundVisible: true,
        nameOfCurrentDialog: "dialogCreateDiaryTemplate",
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },
  },
  computed: {
    useableEditorViaChangeData: {
      get() {
        console.log("getting change data.editor")
        return this.changeData.editor;
      },
      set(value) {
        console.log("value: ", value);
        this.$emit("change-editor-via-change-data", value);
      },
    },
    editor() {
      if (this.diaryEntry === undefined) {
        return undefined;
      } else {
        return this.diaryEntry.editor;
      }
    },
    modeIsSetToView() {
      if (this.viewingMode === "view") {
        return true;
      } else {
        return false;
      }
    },
    modeIsSetToEdit() {
      if (this.viewingMode === "edit") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
