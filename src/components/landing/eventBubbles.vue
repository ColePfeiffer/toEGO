<template>
  <div>
    <!-- no diary entry for this date doesn't exist yet -->
    <div v-if="this.diaryEntry === undefined">No entry created yet.</div>
    <!-- entry exists, but no events have been created -->
    <div v-else-if="this.diaryEntry.events.length < 1">Nothing here yet!</div>
    <!-- showing events for diary entry -->
    <div
      v-else
      class="row items-center justify-center"
      v-for="event in events"
      :key="event.id"
    >
      <EventBubble :eventData="event" class="col-12" />
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
  computed: {
    events() {
      return this.diaryEntry.events.slice().reverse();
    },
  },
};
</script>
