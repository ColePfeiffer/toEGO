<template>
  <div>
    <DialogDeleteEvent
      @deleteEvent="deleteEvent"
      @closeDialog="closeDialog"
    ></DialogDeleteEvent>

    <!-- Case 1: There is no diary entry for the selected day. -->
    <div v-if="diaryEntry === undefined">
      <!-- Case 1A: Show +, if showMessageIfThereAreNoEvents is set to true. This is used by the home page. -->
      <div
        v-if="showMessageIfThereAreNoEvents"
        class="q-pa-md"
      >
        <q-card class="my-card shadow-3 text-justify">
          <q-card-section class="card-text text-center">
            There is nothing here yet.
            <q-btn
              color="accent"
              flat
              dense
              icon="bi-plus"
              @click="goToPageNewEventSetToCreationMode"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- Case 2: Entry exists, but no events have been created yet. -->
    <div
      v-else-if="diaryEntry != undefined && diaryEntry.events.length < 1"
      class="q-pt-md"
    >
      <q-card class="my-card shadow-3 text-justify">
        <q-card-section class="card-text text-center">
          <q-btn
            color="accent"
            flat
            dense
            icon="bi-plus"
            @click="goToPageNewEventSetToCreationMode"
          />
        </q-card-section>
      </q-card>
    </div>
    <!-- Case 3: Entry and events exist. -->
    <div
      v-else
      class="q-pt-md"
      v-for="event in events"
      :key="event.id"
    >
      <EventCard
        :eventData="event"
        :isShowingExpandButtonOfEventCard="isShowingExpandButtonOfEventCard"
        @changeEventData="changeEventData"
        @editEvent="goToPageNewEventSetToEditingMode"
        @deleteEvent="showConfirmDeleteDialog"
        class="col-12"
      />
    </div>
  </div>
</template>

<script>
import EventCard from "./EventCard.vue";
import DialogDeleteEvent from "../dialogs/DialogDeleteEvent.vue";

export default {
  name: "EventViewer",
  props: {
    diaryEntry: Object,
    showMessageIfThereAreNoEvents: {
      type: Boolean,
      default: true,
    },
    isShowingExpandButtonOfEventCard: {
      type: Boolean,
      default: true,
    },
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
    goToPageNewEventSetToCreationMode() {
      this.$store.commit("data/setModeForNewEvent", "CREATE");
      this.$router.push("NewEvent");
    },
    goToPageNewEventSetToEditingMode(eventData) {
      let diaryEntryRefWhereEventIsStoredAt = this.$store.getters[
        "data/getDiaryEntryByDate"
      ](eventData.createdOn);

      this.$store.commit("data/updateEventData", {
        eventData: eventData,
        diaryEntryRef: diaryEntryRefWhereEventIsStoredAt,
      });
      this.$store.commit("data/setModeForNewEvent", "EDIT");
      this.$router.push("NewEvent");
    },
  },
  computed: {
    events() {
      return this.diaryEntry.events.slice().reverse();
    },
  },
};
</script>
