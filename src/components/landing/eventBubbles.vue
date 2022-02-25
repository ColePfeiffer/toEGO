<template>
  <div class="todaysEvents q-pa-md">
    <div v-for="event in events" :key="event.id">
      <EventBubble
        :event="event"
        class="
          eventBubble
          fit
          row
          no-wrap
          justify-end
          items-center
          content-start
        "
      />
    </div>
  </div>
</template>

<script>
import EventBubble from "../common/eventBubble.vue";

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