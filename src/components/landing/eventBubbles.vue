<template>
  <div>
    <!-- no diary entry for this date doesn't exist yet -->
    <div v-if="this.diaryEntry === undefined">
      <div class="q-pa-md">
        <q-card class="my-card shadow-3 text-justify">
          <q-card-section class="card-text text-center">
            There is nothing here.
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- entry exists, but no events have been created -->
    <div v-else-if="this.diaryEntry.events.length < 1">
      <div class="q-pa-md">
        <q-card class="my-card shadow-3 text-justify">
          <q-card-section class="card-text text-center">
            There are no tracked events yet.
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
      <EventBubble
        :eventData="event"
        @changeEventData="changeEventData"
        class="col-12"
      />
    </div>
  </div>
</template>

<script>
import EventBubble from "../common/eventCard.vue";

export default {
  name: "eventBubbles",
  props: {
    diaryEntry: Object,
  },
  data() {
    return {};
  },
  created() {
    console.log("eventbubbles: ", this.diaryEntry);
  },
  components: {
    EventBubble,
  },
  methods: {
    changeEventData(eventData) {
      let diaryData = this.diaryEntry;
      console.log("eventData: ", eventData);
      console.log("diaryData: ", diaryData, "OUT");
      let payload = { diaryEntryRef: this.diaryEntry, eventID: eventData.id };
      console.log(payload);
      this.$store.commit("data/updateExpandedByEventID2", payload);
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
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
