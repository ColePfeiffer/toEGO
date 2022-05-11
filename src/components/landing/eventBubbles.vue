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
  props: {
    dateOfDiaryEntry: Date,
  },
  data() {
    return {};
  },
  created() {
    console.log("eventbubbles: ", this.dateOfDiaryEntry);
  },
  components: {
    EventBubble,
  },
  computed: {
    events2() {
      let entryForSelectedDate = this.$store.getters[
        "data/getDiaryEntryByDate"
      ](this.dateOfDiaryEntry);
      if (entryForSelectedDate != undefined) {
      } else {
        let = [
          {
            id: "",
            mood: "las la-meh-blank",
            title: "",
            text: "",
            tags: "",
            createdOn: "",
            createdBy: "me", // ref or id
            expanded: false,
            methods: [
              {
                id: 1,
                radioButtonIsBeyondControl: "yes",
                textFriendAdvice: "",
                textWhatICanDo: "",
              },
              {},
            ],
          },
        ];
        return "undefined";
      }
    },
    events() {
      // Javascript-Funktion zum Filtern von Arrays
      console.log("[Events in store] ", this.$store.state.data.events.slice());
      return this.$store.state.data.events.slice().reverse();
    },
  },
};
</script>