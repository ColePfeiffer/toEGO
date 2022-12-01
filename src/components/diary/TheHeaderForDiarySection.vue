<template>
  <DiaryBaseHeader>
    <template v-slot:nameOfTitle
      v-if="isTitleVisible">
      DIARY
    </template>
    <template v-slot:buttons>
      <!-- TODO: or empty?-->
      <div v-if="isShowingPlusButton"
        class="col-auto">
        <ButtonForDiarySection textColor="white"
          class="q-mr-xs"
          icon="bi-plus-lg"
          size="10px"
          label=""
          :style="$store.getters['layout/diarySectionButton']"
          @click-button="setDiaryModeToEdit">
          <template v-slot:tooltip>
            <BaseTooltip text="Create entry"
              :delay="
              15"></BaseTooltip>
          </template>
        </ButtonForDiarySection>
      </div>
      <!-- Buttons: Left -->
      <div v-else-if="isDiaryVisible"
        class="col-auto">
        <!-- Button: Enter Fullscreen Button -->
        <ButtonForDiarySection v-if="areEditAndFullscreenButtonVisible"
          textColor="white"
          icon="bi-eye"
          size="10px"
          label=""
          :style="$store.getters['layout/diarySectionButton']"
          @click-button="openEntryInFullscreen">
          <template v-slot:tooltip>
            <BaseTooltip text="show in fullscreen"
              :delay="
              15"></BaseTooltip>
          </template>
        </ButtonForDiarySection>
      </div>
      <!-- Buttons: Right -->
      <div v-if="isDiaryVisible"
        class="col-auto">
        <!-- Button: Edit diaryentry -->
        <ButtonForDiarySection v-if="areEditAndFullscreenButtonVisible"
          textColor="white"
          icon="bi-pencil-square"
          class="q-mr-xs"
          label="edit"
          size="10px"
          :style="$store.getters['layout/diarySectionButton']"
          @click-button="editDiaryEntry">
          <template v-slot:tooltip>
            <BaseTooltip text="edit text"
              :delay="15"></BaseTooltip>
          </template>
        </ButtonForDiarySection>
      </div>
    </template>
  </DiaryBaseHeader>
</template>

<script>
import DiaryBaseHeader from "./Base/DiaryBaseHeader.vue";
import BaseTooltip from "../common/BaseTooltip.vue";
import ButtonForDiarySection from "./Base/ButtonForDiarySection.vue";


export default {
  name: "TheHeaderForDiarySection",
  components: {
    DiaryBaseHeader,
    BaseTooltip,
    ButtonForDiarySection,
  },
  emits: ["set-change-data", "change-view", "set-change-data-editor", "enter-fullscreen-mode", "create-diary-entry", "reset-change-data"],
  props: {
    diaryEntry: Object,
    viewingMode: String,
    changeData: Object,
    isCreatingNewDiaryEntry: Boolean,
  },
  data() {
    return {
    };
  },
  computed: {
    isShowingPlusButton() {
      if (this.diaryEntry === undefined) {
        return true;
      } else if (this.diaryEntry.editor === undefined | this.diaryEntry.editor === '') {
        return true;
      } else {
        return false;
      }
    },
    isTitleVisible() {
      if (this.viewingMode != 'edit' && (this.diaryEntry != undefined || this.isCreatingNewDiaryEntry === true)) {
        return true;
      } else {
        return false;
      }
    },
    isDiaryVisible() {
      if (this.diaryEntry != undefined || this.isCreatingNewDiaryEntry === true) {
        return true;
      } else {
        return false;
      }
    },
    isDiaryInEditMode() {
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
    },
    editor() {
      if (this.diaryEntry === undefined) {
        return undefined;
      } else {
        return this.diaryEntry.editor;
      }
    },
  },
  methods: {
    changeView(newViewMode) {
      this.$emit("change-view", newViewMode);
    },
    setDiaryModeToEdit() {
      this.$emit("create-diary-entry");
    },
    resetChangeData() {
      this.$emit("reset-change-data");
    },
    openEntryInFullscreen() {
      this.$store.commit("data/setPlusFabButtonOpened", false);
      this.$emit("enter-fullscreen-mode", this.editor);
    },
    editDiaryEntry() {
      this.changeView("edit");
      this.$store.commit("data/setPlusFabButtonOpened", false);
      this.$emit("set-change-data", {
        id: this.diaryEntry.id,
        date: this.diaryEntry.date,
        editor: this.diaryEntry.editor,
      });
    },
  },

}
</script>
