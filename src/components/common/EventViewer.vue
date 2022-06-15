<template>
  <div>
    <DialogDeleteEvent @deleteEvent="deleteEvent" @closeDialog="closeDialog"></DialogDeleteEvent>
    <!-- no diary entry for this date doesn't exist yet -->
    <div v-if="this.diaryEntry === undefined">
      <div v-if="showMessageIfThereAreNoEvents" class="q-pa-md">
        <q-card class="my-card shadow-3 text-justify">
          <q-card-section class="card-text text-center">
            There is nothing here yet.
            <q-btn color="accent" flat dense icon="add" @click="showDialogForNewEvent" />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- entry exists, but no events have been created -->
    <div v-else-if="this.diaryEntry.events.length < 1">
      <div class="q-pa-md">
        <q-card class="my-card shadow-3 text-justify">
          <q-card-section class="card-text text-center">
            There are no tracked events.
            <q-btn color="accent" flat dense icon="add" @click="showDialogForNewEvent" />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- showing events for diary entry -->
    <div v-else class="row items-center justify-center q-px-sm" v-for="event in events" :key="event.id">
      <EventCard :eventData="event" @changeEventData="changeEventData" @editEvent="editEvent"
        @deleteEvent="showConfirmDeleteDialog" class="col-12" />
    </div>
  </div>
</template>

<script>
import EventCard from "./EventCard.vue";
import DialogDeleteEvent from "../dialogs/DialogDeleteEvent.vue";

export default {
  name: "EventViewer",
  emits: ["showDialogForNewEvent", "showDialogForExistingEvent"],
  props: {
    diaryEntry: Object,
    showMessageIfThereAreNoEvents: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      toBeDeletedEvent: "",
    };
  },
  components: {
    EventCard,
    DialogDeleteEvent,
  },
  methods: {
    changeEventData(eventData) {
      let payload = { diaryEntryRef: this.diaryEntry, eventID: eventData.id };
      this.$store.commit("data/updateExpandedStatusOfEventViaEventID", payload);
    },
    showConfirmDeleteDialog(eventData) {
      let payload = {
        isVisible: true,
        isBackgroundVisible: true,
        nameOfCurrentDialog: "dialogDeleteEvent",
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
    deleteEvent() {
      let payload = {
        diaryEntryRef: this.diaryEntry,
        eventData: this.toBeDeletedEvent,
      };
      this.$store.commit("data/deleteEvent", payload);

      this.closeDialog();
    },
    // noch nicht richtig! wip
    editEvent(eventData) {
      this.$emit("showDialogForExistingEvent", eventData);
    },
    // muss noch eingebunden werden im parent wip
    showDialogForNewEvent() {
      this.$emit("showDialogForNewEvent");
    },
  },
  computed: {
    events() {
      return this.diaryEntry.events.slice().reverse();
    },
  },
};
</script>
