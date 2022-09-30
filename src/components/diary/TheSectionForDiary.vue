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
        v-if="isHeaderVisible">
        DIARY
      </template>
      <!-- Button: Go back (change mode to 'view') -->
      <template v-if="isHeaderVisible"
        v-slot:leftSideButton>
        <ButtonForDiarySection v-if="isInEditMode"
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

      <template v-if="isHeaderVisible"
        v-slot:rightSideButton>
        <!-- Button: Save changes to diaryentry -->
        <ButtonForDiarySection v-if="isInEditMode"
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
        <div class="q-pa-xs">
          <!-- Case 1: There is no diary entry for the selected day. -->
          <div v-if="diaryEntry === undefined && isCreatingNewDiaryEntry === false">

          </div>
          <!-- Case 2: There is an entry. -->
          <div>

          </div>

        </div>
      </template>
    </BaseSectionForDiary>
  </div>

</template>


<script>
import BaseSectionForDiary from './Base/BaseSectionForDiary.vue';
import ButtonForDiarySection from './Base/ButtonForDiarySection.vue';
import DialogNameAndCreate from '../dialogs/DialogNameAndCreate.vue';
import DialogViewDiaryTemplates from '../dialogs/DialogViewDiaryTemplates.vue';

export default {
  name: "TheSectionForEvents",
  components: {
    BaseSectionForDiary,
    ButtonForDiarySection,
    DialogNameAndCreate,
    DialogViewDiaryTemplates
  },
  emits: ["change-view", "enter-fullscreen-mode", "save-changes"],
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
    isHeaderVisible() {
      if (this.diaryEntry != undefined || this.isCreatingNewDiaryEntry === true) {
        return true;
      } else {
        return false;
      }
    },
    isInEditMode() {
      if (this.viewingMode === "edit") {
        return true;
      } else {
        return false;
      }
    },
    areEditAndFullscreenButtonVisible() {
      if (this.viewingMode === "view" && this.editor != undefined && this.editor != "") {
        return true;
      } else {
        return false;
      }

    }

  },
  methods: {
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
    changeView(viewMode) {
      this.isCreatingNewDiaryEntry = false;
      this.$emit("change-view", viewMode);
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
