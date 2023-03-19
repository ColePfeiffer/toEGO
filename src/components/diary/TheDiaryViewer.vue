<template>
  <div class="q-py-md q-px-xs">
    <div v-if="viewingMode === 'view'">
      <!-- Case 1: There is no entry for the selected day. -->
      <div v-if="diaryEntry === undefined">
        <BaseCard :backgroundColor="backgroundColor"
          :borderColorLeft="borderColorLeft"
          :borderColorRight="borderColorRight">
          <template v-slot:contentInsideSection>
            Nothing here yet.
            <span @click="goToNoteSetToCreationMode">Add a note
              <q-btn flat
                dense
                icon="bi-plus"
                @click="goToNoteSetToCreationMode" />
            </span>
            <br />
            or <span @click="createDiaryEntry">write about your day</span>.
            <q-btn flat
              dense
              icon="bi-journal-plus"
              @click="createDiaryEntry" />
          </template>
        </BaseCard>
      </div>
      <!-- Case 2: There is an entry for the selected day. -->
      <div v-else>
        <!-- Case 2.1.1: Showing + Button, if journal-entry is empty. -->
        <div v-if="editor === ''">
        </div>
        <!-- Case 2.1.2: Showing journal-entrie's text. -->
        <div v-else>
          <BaseCard :style="heightForCardWithDiaryText"
            :backgroundColor="backgroundColor"
            :isTextSetToCentered="false"
            :borderColorLeft="borderColorLeft"
            :borderColorRight="borderColorRight">
            <template v-slot:contentInsideSection>
              <div class="row justify-center items-center">
                <div class="col-12"
                  v-html="editor">
                </div>
              </div>
            </template>
          </BaseCard>
        </div>
      </div>
    </div>
    <div v-else-if="viewingMode === 'edit'">
      <slot name="editor"></slot>
    </div>
  </div>
</template>

<script>
import BaseCard from "../common/BaseCard.vue";

export default {
  name: "TheDiaryViewer",
  components: {
    BaseCard,
  },
  emits: ["create-diary-entry", "go-to-note-set-to-creation-mode"],
  props: {
    diaryEntry: Object,
    viewingMode: String,
    isDiaryVisible: Boolean,
    changeData: Object,
    isCreatingNewDiaryEntry: Boolean,
    backgroundColor: {
      type: String,
      default: "#f5f5f5",
    }
  },
  data() {
    return {
    };
  },
  methods: {
    createDiaryEntry() {
      this.$store.commit("data/setPlusFabButtonOpened", false);
      this.$emit("create-diary-entry");
    },
    goToNoteSetToCreationMode() {
      this.$emit("go-to-note-set-to-creation-mode");
    },

  },

  computed: {
    heightForCardWithDiaryText() {
      return { "min-height": this.$store.state.layout.height * 0.4 + "px" };
    },
    isDiaryContentStyleSetToTodays() {
      return this.$store.state.layout.isDiaryInputStyleSetToTodaysNotes;
    },
    borderColorLeft() {
      if (this.isDiaryContentStyleSetToTodays) {
        return this.$store.state.layout.borderColorLeft
      } else {
        return this.$store.state.layout.borderColorLeftForDiary;
      }
    },
    borderColorRight() {
      if (this.isDiaryContentStyleSetToTodays) {
        return this.$store.state.layout.borderColorRight
      } else {
        return this.$store.state.layout.borderColorRightForDiary;
      }
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

<style>
a:link {
  color: var(--q-accent);
  background-color: transparent;
  text-decoration: none;
}

a:visited {
  color: darkgrey;
  background-color: transparent;
  text-decoration: none;
}

a:hover {
  color: var(--q-accent);
  background-color: transparent;
}
</style>
