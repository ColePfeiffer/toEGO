<template>
  <div class="q-py-md q-px-xs">
    <DialogDeleteEvent @deleteEvent="deleteEvent"
      @closeDialog="closeDialog"></DialogDeleteEvent>

    <!-- Case 1: There is no diaryentry for the selected day. -->
    <div v-if="diaryEntry === undefined">
      <div v-if="showMessageIfThereAreNoEvents">
        <BaseCard>
          <template v-slot:contentInsideSection>
            There is nothing here yet.
            <q-btn color="accent"
              flat
              dense
              icon="bi-plus"
              @click="goToEventSetToCreationMode" />
          </template>
        </BaseCard>
      </div>
    </div>
    <!-- Case 2: Entry exists, but no event has been created yet. -->
    <div v-else-if="diaryEntry != undefined && diaryEntry.events.length < 1">
      <BaseCard>
        <template v-slot:contentInsideSection>
          <q-btn color="accent"
            flat
            dense
            icon="bi-plus"
            @click="goToEventSetToCreationMode" />
        </template>
      </BaseCard>
    </div>
    <!-- Case 3: Entry and event(s) exist. -->
    <div v-else
      v-for="event in events"
      :key="event.id">
      <EventCard :style="styleForEventCard"
        :eventData="event"
        :isShowingExpandButtonOfEventCard="isShowingExpandButtonOfEventCard"
        @changeEventData="changeEventData"
        @editEvent="goToEventSetToEditingMode"
        @deleteEvent="showConfirmDeleteDialog" />
    </div>
  </div>
</template>

<script>
import BaseCard from "../ui/BaseCard.vue";
import EventCard from "./EventCard.vue";
import DialogDeleteEvent from "../dialogs/DialogDeleteEvent.vue";

export default {
  name: "TheEventViewer",
  emits: ["go-to-event-set-to-creation-mode", "go-to-event-set-to-editing-mode"],
  components: {
    EventCard,
    DialogDeleteEvent,
    BaseCard
  },
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
    marginBottom: {
      type: Number,
      default: 33
    }

  },
  data() {
    return {
      toBeDeletedEvent: "",
    };
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
    goToEventSetToCreationMode() {
      this.$emit("go-to-event-set-to-creation-mode");
    },
    goToEventSetToEditingMode(eventData) {
      this.$emit("go-to-event-set-to-editing-mode", eventData);
    },

  },
  computed: {
    events() {
      return this.diaryEntry.events.slice().reverse();
    },
    styleForEventCard() {
      return { 'margin-bottom': this.marginBottom + "px" }
    }
  },
};
</script>
