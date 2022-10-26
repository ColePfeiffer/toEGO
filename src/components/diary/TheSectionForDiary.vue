<template>
  <div>
    <BaseSectionForDiary>
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
          @click-button="goBack">
        </ButtonForDiarySection>
        <!-- Button: Enter Fullscreen Button -->
        <ButtonForDiarySection v-else-if="areEditAndFullscreenButtonVisible"
          textColor="white"
          icon="bi-fullscreen"
          size="9.5px"
          label="view"
          :style="$store.state.layout.sTextAccentShadow"
          @click-button="openEntryInFullscreen">
          <template v-slot:tooltip>
            <BaseTooltip text="Turn Viewing-Mode on"
              :delay="
              15"></BaseTooltip>
          </template>
        </ButtonForDiarySection>
      </template>

      <template v-if="isDiaryVisible"
        v-slot:rightSideButton>

        <!-- Button: Save changes to diaryentry -->
        <ButtonForDiarySection v-if="modeIsSetToEdit"
          textColor="white"
          class="q-mr-xs"
          icon="fas fa-save"
          label="save"
          :style="$store.state.layout.sTextAccentShadow"
          @click-button="saveChanges">
          <template v-slot:tooltip>
            <BaseTooltip text="Save"
              :delay="15"></BaseTooltip>
          </template>
        </ButtonForDiarySection>
        <!-- Button: Edit diaryentry -->
        <ButtonForDiarySection v-else-if="areEditAndFullscreenButtonVisible"
          textColor="white"
          icon="bi-pencil-square"
          class="q-mr-xs"
          label="save"
          size="10px"
          :style="$store.state.layout.sTextAccentShadow"
          @click-button="editDiaryEntry">
          <template v-slot:tooltip>
            <BaseTooltip text="Edit diary text"
              :delay="15"></BaseTooltip>
          </template>
        </ButtonForDiarySection>


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
              @show-dialog-template-creator="showTemplateCreator"
              @show-dialog-template-viewer="showTemplateViewer"
              @paste-template-from-quicklist="pasteTemplateFromQuicklist"
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
import TheDiaryViewer from './TheDiaryViewer.vue';
import BaseEditor from '../ui/BaseEditor.vue';
import BaseTooltip from '../ui/BaseTooltip.vue';

export default {
  name: "TheSectionForEvents",
  components: {
    BaseSectionForDiary,
    ButtonForDiarySection,
    TheDiaryViewer,
    BaseEditor,
    BaseTooltip
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
  watch: {
    pastedText(text) {
      if (this.$store.state.data.dialogTemplateViewerIsSetToDiaryMode === true && text != "") {
        if (this.changeData.editor != "") {
          this.changeData.editor =
            this.changeData.editor + "<br>" + text;
        } else {
          this.changeData.editor = text;
        }
        this.$store.commit("data/setPastedText", "");
      }

    }
  },
  data() {
    return {
      isCreatingNewDiaryEntry: false,
      changeData: {},
    };
  },
  computed: {
    pastedText() {
      return this.$store.state.data.pastedText;
    },
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
    pasteTemplateFromQuicklist(template) {
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
      this.isCreatingNewDiaryEntry = false;
      this.resetChangeData();
    },

    // Template Viewer
    showTemplateViewer() {
      let payload = {
        isVisible: true,
        isBackgroundVisible: true,
        nameOfCurrentDialog: "template-viewer-for-diary",
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },

    // Template Creator
    showTemplateCreator() {
      this.$store.commit("data/setEditorText", this.changeData.editor);
      let payload = {
        isVisible: true,
        isBackgroundVisible: true,
        nameOfCurrentDialog: "template-creator-for-diary",
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },
  },

}
</script>

<style scoped>

</style>
