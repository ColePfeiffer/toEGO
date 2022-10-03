<template>
  <div class="q-py-md q-px-xs">
    <div v-if="viewingMode === 'view'">
      <!-- Case 1: There is no entry for the selected day. -->
      <div v-if="diaryEntry === undefined">
        <BaseCard>
          <template v-slot:contentInsideSection>
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
              @click="createDiaryEntry" />
          </template>
        </BaseCard>
      </div>
      <!-- Case 2: There is an entry for the selected day. -->
      <div v-else>
        <!-- Case 2.1.1: Showing + Button, if journal-entry is empty. -->
        <div v-if="editor === ''">
          <BaseCard>
            <template v-slot:contentInsideSection>
              <q-btn flat
                dense
                color="accent"
                icon="bi-plus"
                @click="createDiaryEntry" />
            </template>
          </BaseCard>
        </div>
        <!-- Case 2.1.2: Showing journal-entrie's text. -->
        <div v-else>
          <BaseCard :isTextSetToCentered="false">
            <template v-slot:contentInsideSection>
              <div v-html="editor">
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
import BaseCard from "../ui/BaseCard.vue";

export default {
  name: "TheDiaryViewer",
  components: {
    BaseCard,
  },
  // TODO:
  emits: ["create-diary-entry", "go-to-new-event-in-creation-mode"],
  props: {
    diaryEntry: Object,
    viewingMode: String,
    isDiaryVisible: Boolean,
    changeData: Object,
    isCreatingNewDiaryEntry: Boolean,
  },
  data() {
    return {
    };
  },
  methods: {
    createDiaryEntry() {
      this.$emit("create-diary-entry");
    },
    // Methods for Buttons
    goToPageNewEventSetToCreationMode() {
      this.$emit("go-to-new-event-in-creation-mode");
    },

  },
  computed: {
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
