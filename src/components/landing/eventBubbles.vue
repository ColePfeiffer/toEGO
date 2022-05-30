<template>
  <div>
    <div class="q-pa-sm q-gutter-sm">
      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <div class="col-3">
              <q-avatar icon="delete" color="primary" text-color="white" />
            </div>
            <div class="col">
              <span class="q-ml-sm"
                >Do you really want to delete this event?</span
              >
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="secondary" v-close-popup />
            <q-btn
              flat
              label="Delete"
              color="secondary"
              v-close-popup
              @click="deleteEvent"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <!-- no diary entry for this date doesn't exist yet -->
    <div v-if="this.diaryEntry === undefined">
      <div class="q-pa-md">
        <q-card class="my-card shadow-3 text-justify">
          <q-card-section class="card-text text-center">
            There is nothing here yet.
            <q-btn
              color="accent"
              flat
              dense
              icon="add"
              @click="showDialogForNewEvent"
            />
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
            <q-btn
              color="accent"
              flat
              dense
              icon="add"
              @click="showDialogForNewEvent"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- showing events for diary entry -->
    <div
      v-else
      class="row items-center justify-center"
      v-for="event in events"
      :key="event.id"
    >
      <EventCard
        :eventData="event"
        @changeEventData="changeEventData"
        @editEvent="editEvent"
        @deleteEvent="showConfirmDeleteDialog"
        class="col-12"
      />
    </div>
  </div>
</template>

<script>
import EventCard from "../common/eventCard.vue";

export default {
  name: "eventBubbles",
  emits: ["showDialogForNewEvent", "showDialogForExistingEvent"],
  props: {
    diaryEntry: Object,
  },
  data() {
    return {
      confirm: false,
      eventDataHolder: "",
    };
  },
  components: {
    EventCard,
  },
  methods: {
    changeEventData(eventData) {
      let payload = { diaryEntryRef: this.diaryEntry, eventID: eventData.id };
      this.$store.commit("data/updateExpandedStatusOfEventViaEventID", payload);
    },
    showConfirmDeleteDialog(eventData) {
      this.confirm = true;
      this.eventDataHolder = eventData;
    },
    deleteEvent() {
      let payload = {
        diaryEntryRef: this.diaryEntry,
        eventData: this.eventDataHolder,
      };
      this.$store.commit("data/deleteEvent", payload);
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

<style scoped>
.my-card {
  font-size: 12.5px;
}
</style>
