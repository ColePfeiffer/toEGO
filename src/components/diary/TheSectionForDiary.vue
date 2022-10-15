<template>
  <div>
    <DialogNameAndCreate :type="'DIARY'"
      @create="createTemplate"
      @closeDialog="closeDialog">
    </DialogNameAndCreate>
    <DialogViewDiaryTemplates :templateList="$store.state.data.diaryTemplates"
      @pasteTemplate="pasteTemplate">
    </DialogViewDiaryTemplates>

    <BaseSectionForDiary :heightForScrollArea="heightForScrollArea">
      <template v-slot:nameOfTitle
        v-if="isDiaryVisible">
        DIARY
      </template>
      <!-- Button: Go back (change mode to 'view') -->
      <template v-if="isDiaryVisible"
        v-slot:leftSideButton>
        <ButtonForDiarySection v-if="modeIsSetToEdit"
          textColor="white"
          icon="bi-chevron-left"
          label="back"
          :style="$store.state.layout.sTextAccentShadow"
          @click-button="goBack"></ButtonForDiarySection>
        <!-- Button: Enter Fullscreen Button -->
        <ButtonForDiarySection v-else-if="areEditAndFullscreenButtonVisible"
          textColor="white"
          icon="bi-eye"
          label="view"
          :style="$store.state.layout.sTextAccentShadow"
          @click-button="openEntryInFullscreen"></ButtonForDiarySection>
      </template>

      <template v-if="isDiaryVisible"
        v-slot:rightSideButton>
        <!-- Button: Save changes to diaryentry -->
        <ButtonForDiarySection v-if="modeIsSetToEdit"
          textColor="accent"
          class="q-mr-xs"
          icon="fas fa-save"
          label="save"
          :style="$store.state.layout.sTextAccentShadow"
          @click-button="saveChanges" />
        <!-- Button: Edit diaryentry -->
        <ButtonForDiarySection v-else-if="areEditAndFullscreenButtonVisible"
          textColor="accent"
          icon="bi-pencil-square"
          class="q-mr-xs"
          label="save"
          size="9.5px"
          :style="$store.state.layout.sTextAccentShadow"
          @click-button="editDiaryEntry" />
      </template>

      <template v-slot:content>
        <TheDiaryViewer :backgroundColor="backgroundColor"
          :diaryEntry="diaryEntry"
          :isCreatingNewDiaryEntry="isCreatingNewDiaryEntry"
          :viewingMode="viewingMode"
          :isDiaryVisible="isDiaryVisible"
          :changeData="changeData"
          @create-diary-entry="createDiaryEntry"
          @go-to-event-set-to-creation-mode="goToEventSetToCreationMode">
          <template v-slot:editor>
            <BaseEditor ref="editorRef1"
              class="no-border-radius no-box-shadow q-pa-none"
              v-model="changeData.editor"
              @openDialogCreateTemplate="showTemplateCreator"
              @openDialogViewTemplates="showTemplateViewer"
              @pasteTemplate="pasteTemplate"
              minHeight="445px"
              type="DIARY" />
          </template>
        </TheDiaryViewer>
      </template>
    </BaseSectionForDiary>
  </div>

</template>


<script>
import BaseSectionForDiary from './Base/BaseSectionForDiary.vue';
import ButtonForDiarySection from './Base/ButtonForDiarySection.vue';
import DialogNameAndCreate from '../dialogs/DialogNameAndCreate.vue';
import DialogViewDiaryTemplates from '../dialogs/DialogViewDiaryTemplates.vue';
import TheDiaryViewer from './TheDiaryViewer.vue';
import BaseEditor from '../ui/BaseEditor.vue';

export default {
  name: "TheSectionForEvents",
  components: {
    BaseSectionForDiary,
    ButtonForDiarySection,
    DialogNameAndCreate,
    DialogViewDiaryTemplates,
    TheDiaryViewer,
    BaseEditor
  },
  emits: ["change-view", "enter-fullscreen-mode", "save-changes", "go-to-event-set-to-creation-mode"],
  props: {
    diaryEntry: Object,
    viewingMode: String,
    backgroundColor: {
      type: String,
      default: "#f5f5f5",
    }
  },
  data() {
    return {
      isCreatingNewDiaryEntry: false,
      changeData: {},
      heightForScrollArea: 400,
    };
  },
  computed: {
    isDiaryVisible() {
      if (this.diaryEntry != undefined || this.isCreatingNewDiaryEntry === true) {
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
    editor() {
      if (this.diaryEntry === undefined) {
        return undefined;
      } else {
        return this.diaryEntry.editor;
      }
    },
    areEditAndFullscreenButtonVisible() {
      if (this.viewingMode === "view" && this.editor != undefined && this.editor != "") {
        return true;
      } else {
        return false;
      }
    },


  },
  methods: {
    goBack() {
      this.changeView('view');
      this.resetChangeData();
    },
    resetChangeData() {
      this.changeData = {
        id: "",
        date: "",
        editor: "",
        events: [],
      };

    },
    createDiaryEntry() {
      this.changeView("edit");
      this.isCreatingNewDiaryEntry = true;
      this.resetChangeData();

      // applying default template
      let defaultTemplate =
        this.$store.getters["data/getDefaultTemplate"]("DIARY");
      if (defaultTemplate != undefined) {
        this.changeData.editor = defaultTemplate;
      }
    },
    editDiaryEntry() {
      this.changeView("edit");
      this.changeData = {
        id: this.diaryEntry.id,
        date: this.diaryEntry.date,
        editor: this.diaryEntry.editor,
        events: this.diaryEntry.events,
      };
    },
    goToEventSetToCreationMode() {
      this.$emit("go-to-event-set-to-creation-mode");
    },
    closeDialog() {
      let payload = {
        isVisible: false,
        isBackgroundVisible:
          this.$store.state.data.dialogSettings.isBackgroundVisible,
        nameOfCurrentDialog:
          this.$store.state.data.dialogSettings.nameOfCurrentDialog,
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },
    // Methods for Buttons
    // TODO: ???
    changeView(viewMode) {
      if (viewMode === "view") {
        this.isCreatingNewDiaryEntry = false;
      } else if (viewMode === "edit") {
        this.changeDiaryModeToCreationMode();
      }

      this.$emit("change-view", viewMode);


    },
    changeDiaryModeToCreationMode() {
      this.isCreatingNewDiaryEntry = true;
      this.changeData = {
        id: "",
        date: "",
        editor: "",
        events: [],
      }
      // Applying default template
      let defaultTemplate =
        this.$store.getters["data/getDefaultTemplate"]("DIARY");
      if (defaultTemplate != undefined) {
        this.changeData.editor = defaultTemplate;
      }
    },
    pasteTemplate(template) {
      if (this.changeData.editor != "") {
        this.changeData.editor =
          this.changeData.editor + "<br>" + template.text;
      } else {
        this.changeData.editor = template.text;
      }
    },
    openEntryInFullscreen() {
      this.$emit("enter-fullscreen-mode", this.editor);
    },
    saveChanges() {
      this.$emit("change-view", "view");
      this.$emit("save-changes", this.changeData);
      this.resetChangeData();
    },
    createTemplate(templateName) {
      let newTemplate = {
        name: templateName,
        text: this.changeData.editor,
        type: "DIARY",
      };
      this.$store.commit("data/createTemplateAndAddToList", newTemplate);
      this.closeDialog();
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

}
</script>

<style scoped>

</style>
