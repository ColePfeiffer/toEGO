<template>
  <div class="q-py-sm q-px-xs">
    <DialogDeleteNote @delete-note="deleteNote"
      @close-dialog="closeDialog"></DialogDeleteNote>

    <!-- Case 1: There is no diaryentry for the selected day. -->
    <div v-if="diaryEntry === undefined">
      <div v-if="showMessageIfThereAreNoNotes">
        <Card :borderColorLeft="borderColorLeft"
          :borderColorRight="borderColorRight"
          :backgroundColor="backgroundColor">
          <template v-slot:contentInsideSection>
            There is nothing here yet.
            <q-btn flat
              dense
              icon="bi-plus"
              @click="goToNoteSetToCreationMode" />
          </template>
        </Card>
      </div>
    </div>
    <!-- Case 2: Entry exists, but no note has been created yet. -->
    <div v-else-if="diaryEntry != undefined && !notesExist">
      <Card :borderColorLeft="borderColorLeft"
        :borderColorRight="borderColorRight"
        :backgroundColor="backgroundColor">
        <template v-slot:contentInsideSection>
          <q-btn flat
            dense
            icon="bi-plus"
            @click="goToNoteSetToCreationMode" />
        </template>
      </Card>
    </div>
    <!-- Case 3: Entry and note(s) exist. -->
    <div v-else
      v-for="note in notes"
      :key="note.id">
      <Note :borderColorLeft="borderColorLeft"
        :borderColorRight="borderColorRight"
        :isNoteTitleColorful="isNoteTitleColorful"
        :textShadowColor="textShadowColor"
        :style="styleForNote"
        :backgroundColor="backgroundColor"
        :currentNote="note"
        :isShowingExpandButton="isShowingExpandButton"
        @change-note-data="changeNoteData"
        @edit-note="editNote"
        @delete-note="showConfirmDeleteDialog" />
    </div>
  </div>
</template>

<script>
import Card from "./BaseCard.vue";
import Note from "./TheNoteCard.vue";
import DialogDeleteNote from "../Dialogs/DialogDeleteNote.vue";

export default {
  name: "TheNoteViewer",
  emits: ["go-to-event-set-to-creation-mode", "edit-note"],
  components: {
    Note,
    DialogDeleteNote,
    Card
  },
  props: {
    isShowingExpandButton: {
      type: Boolean,
      default: true
    },
    diaryEntry: Object,
    showMessageIfThereAreNoNotes: {
      type: Boolean,
      default: true,
    },
    marginBottom: {
      type: Number,
      default: 33
    },
    backgroundColor: {
      type: String,
      default: "#f5f5f5",
    },
    borderColorLeft: {
      type: String,
      default: ""
    },
    borderColorRight: {
      type: String,
      default: ""
    },
    isNoteTitleColorful: {
      type: Boolean,
      default: true
    },
    textShadowColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      toBeDeletedNote: {},
    };
  },
  methods: {
    changeNoteData(note) {
      let payload = { diaryEntryID: this.diaryEntry.id, noteID: note.id, toggle: true };
      this.$store.commit("diaryentries/setExpanded", payload);
    },
    showConfirmDeleteDialog(note) {
      let payload = {
        isVisible: true,
        isBackgroundVisible: true,
        nameOfCurrentDialog: "DialogDeleteNote",
      };
      this.$store.commit("data/setDialogVisibility", payload);
      payload = {
        note: note,
        diaryEntry: this.diaryEntry
      }
      this.$store.commit("diaryentries/updateCurrentNote", payload);
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
    deleteNote() {
      this.$store.dispatch("diaryentries/firebaseDeleteNote");
      this.closeDialog();
    },
    goToNoteSetToCreationMode() {
      this.$emit("go-to-event-set-to-creation-mode");
    },
    editNote(note) {
      this.$emit("edit-note", note);
    },

  },
  computed: {
    notesExist() {
      if (this.notes != undefined) {
        if (this.notes.length > 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    notes() {
      return this.$store.getters["diaryentries/getNotesAsRevertedArrayByDiaryEntryID"](this.diaryEntry.id);
    },
    styleForNote() {
      return { 'margin-bottom': this.marginBottom + "px" }
    }
  },
};
</script>
