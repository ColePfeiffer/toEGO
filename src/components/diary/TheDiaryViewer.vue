<template>
  <div class="q-py-md">
    <div v-if="viewingMode === 'view'">
      <!-- Case 1: There is no entry for the selected day. -->
      <div v-if="diaryEntry === undefined">
        <BaseCard :backgroundColor="backgroundColor">
          <template v-slot:contentInsideSection>
            Nothing here yet. Add an event
            <q-btn color="accent"
              flat
              dense
              icon="bi-plus"
              @click="goToEventSetToCreationMode" />
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
          <BaseCard :backgroundColor="backgroundColor">
            <template v-slot:contentInsideSection>
              <q-btn flat
                dense
                color="accent"
                icon="bi-journal-plus"
                @click="createDiaryEntry" />
            </template>
          </BaseCard>
        </div>
        <!-- Case 2.1.2: Showing journal-entrie's text. -->
        <div v-else>
          <BaseCard :backgroundColor="backgroundColor"
            :isTextSetToCentered="false">
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
  emits: ["create-diary-entry", "go-to-event-set-to-creation-mode"],
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
      this.$emit("create-diary-entry");
    },
    goToEventSetToCreationMode() {
      this.$emit("go-to-event-set-to-creation-mode");
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
  text-decoration: underline;
}
</style>
