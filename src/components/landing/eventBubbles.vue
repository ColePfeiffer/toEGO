<template>
  <div class="column">
    <div class="row" v-for="event in events" :key="event.id">
      <div class="col-12">
        <EventBubble :eventData="event" />
      </div>
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
      console.log("bup: ", this.$store.state.data.events.slice());
      return this.$store.state.data.events.slice().reverse();
    },
  },
};
</script>