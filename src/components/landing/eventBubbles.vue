<template>
  <div>
    <div
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
  data() {
    return {};
  },
  components: {
    EventBubble,
  },
  computed: {
    events() {
      // Javascript-Funktion zum Filtern von Arrays
      console.log("[Events in store] ", this.$store.state.data.events.slice());
      return this.$store.state.data.events.slice().reverse();
    },
  },
};
</script>