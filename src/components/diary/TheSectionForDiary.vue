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
          :style="$store.state.data.sTextAccentShadow"
          @click-button="changeView('view')"></ButtonForDiarySection>
        <!-- Button: Enter Fullscreen Button -->
        <ButtonForDiarySection v-else-if="areEditAndFullscreenButtonVisible"
          textColor="white"
          icon="bi-eye"
          label="view"
          :style="$store.state.data.sTextAccentShadow"
          @click-button="openEntryInFullscreen"></ButtonForDiarySection>
      </template>

      <template v-if="isDiaryVisible"
        v-slot:rightSideButton>
        <!-- Button: Save changes to diaryentry -->
        <ButtonForDiarySection v-if="modeIsSetToEdit"
          textColor="accent"
          icon="fas fa-save"
          label="save"
          :style="$store.state.data.sTextAccentShadow"
          @click-button="saveChanges" />
        <!-- Button: Edit diaryentry -->
        <ButtonForDiarySection v-else-if="areEditAndFullscreenButtonVisible"
          textColor="accent"
          icon="bi-pencil-fill"
          label="save"
          size="9.5px"
          :style="$store.state.data.sTextAccentShadow"
          @click-button="editDiaryEntry" />
      </template>

      <template v-slot:content>
        <TheDiaryViewer :diaryEntry="diaryEntry"
          :viewingMode="viewingMode"
          :isDiaryVisible="isDiaryVisible"
          :changeData="changeData"
          @paste-template="pasteTemplate"
          @change-view="changeView"
          @go-to-new-event-in-creation-mode="goToPageNewEventSetToCreationMode">
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

export default {
  name: "TheSectionForEvents",
  components: {
    BaseSectionForDiary,
    ButtonForDiarySection,
    DialogNameAndCreate,
    DialogViewDiaryTemplates,
    TheDiaryViewer
  },
  emits: ["change-view", "enter-fullscreen-mode", "save-changes", "go-to-new-event-in-creation-mode"],
  props: {
    diaryEntry: Object,
    viewingMode: String,
  },
  data() {
    return {
      isCreatingNewDiaryEntry: false,
      changeData: {},
      // TODO: old stuff
      heightForScrollArea: 520,
      size: 350,
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
    editDiaryEntry() {
      this.changeView("edit");
      this.changeData = {
        id: this.diaryEntry.id,
        date: this.diaryEntry.date,
        editor: this.diaryEntry.editor,
        events: this.diaryEntry.events,
      };
    },
    goToPageNewEventSetToCreationMode() {
      this.$emit("go-to-new-event-in-creation-mode");
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
      this.isCreatingNewDiaryEntry = false;
      this.$emit("save-changes", this.changeData);
      this.$emit("change-view", "view");
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

  },

}
</script>

<style scoped>

</style>
