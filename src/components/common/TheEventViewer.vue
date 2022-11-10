<template>
  <div class="q-py-md q-px-xs">
    <DialogDeleteNote @delete-note="deleteNote"
      @close-dialog="closeDialog"></DialogDeleteNote>

    <!-- Case 1: There is no diaryentry for the selected day. -->
    <div v-if="diaryEntry === undefined">
      <div v-if="showMessageIfThereAreNoEvents">
        <Card :borderColorLeft="borderColorLeft"
          :borderColorRight="borderColorRight"
          :backgroundColor="backgroundColor">
          <template v-slot:contentInsideSection>
            There is nothing here yet.
            <q-btn color="accent"
              flat
              dense
              icon="bi-plus"
              @click="goToEventSetToCreationMode" />
          </template>
        </Card>
      </div>
    </div>
    <!-- Case 2: Entry exists, but no event has been created yet. -->
    <div v-else-if="diaryEntry != undefined && !notesExist">
      <Card :borderColorLeft="borderColorLeft"
        :borderColorRight="borderColorRight"
        :backgroundColor="backgroundColor">
        <template v-slot:contentInsideSection>
          <q-btn color="accent"
            flat
            dense
            icon="bi-plus"
            @click="goToEventSetToCreationMode" />
        </template>
      </Card>
    </div>
    <!-- Case 3: Entry and event(s) exist. -->
    <div v-else
      v-for="event in events"
      :key="event.id">
      <Note :borderColorLeft="borderColorLeft"
        :borderColorRight="borderColorRight"
        :isNoteTitleColorful="isNoteTitleColorful"
        :textShadowColor="textShadowColor"
        :style="styleForNote"
        :backgroundColor="backgroundColor"
        :currentNote="event"
        @change-note-data="changeNoteData"
        @edit-note="editNote"
        @delete-note="showConfirmDeleteDialog" />
    </div>
  </div>
</template>

<script>
import Card from "../ui/BaseCard.vue";
import Note from "./TheNoteCard.vue";
import DialogDeleteNote from "../dialogs/DialogDeleteNote.vue";

export default {
  name: "TheEventViewer",
  emits: ["go-to-event-set-to-creation-mode", "edit-note"],
  components: {
    Note,
    DialogDeleteNote,
    Card
  },
  props: {
    diaryEntry: Object,
    showMessageIfThereAreNoEvents: {
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
      toBeDeletedEvent: "",
    };
  },
  methods: {
    changeNoteData(note) {
      let payload = { diaryEntryID: this.diaryEntry.id, noteID: note.id, toggle: true };
      this.$store.commit("diaryentries/setExpanded", payload);
    },
    showConfirmDeleteDialog(eventData) {
      let payload = {
        isVisible: true,
        isBackgroundVisible: true,
        nameOfCurrentDialog: "DialogDeleteNote",
      };
      this.$store.commit("data/setDialogVisibility", payload);
      this.toBeDeletedEvent = eventData;
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
      let payload = { diaryEntryID: this.diaryEntry.id, note: this.toBeDeletedEvent }
      this.$store.dispatch("diaryentries/deleteNote", payload);
      this.closeDialog();
    },
    goToEventSetToCreationMode() {
      this.$emit("go-to-event-set-to-creation-mode");
    },
    editNote(eventData) {
      this.$emit("edit-note", eventData);
    },

  },
  computed: {
    notesExist() {
      if (this.events != undefined) {
        if (this.events.length > 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    events() {
      return this.$store.getters["diaryentries/getNotesAsRevertedArrayByDiaryEntryID"](this.diaryEntry.id);
    },
    styleForNote() {
      return { 'margin-bottom': this.marginBottom + "px" }
    }
  },
};
</script>
