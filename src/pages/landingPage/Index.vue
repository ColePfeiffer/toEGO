<template>
  <q-page class="q-pa-sm">
    <infoHeader></infoHeader>
    <q-separator color="primary" class="q-mb-sm" />
    <eventBubbles
      :diaryEntry="getDiaryEntry"
      class="col"
      @showDialogForExistingEvent="showDialogForExistingEvent"
      @showDialogForNewEvent="showDialogForNewEvent"
    ></eventBubbles>
    <!-- Player Character -->
  </q-page>
</template>

<script>
import infoHeader from "../../components/landing/infoHeader.vue";
import eventBubbles from "../../components/landing/eventBubbles.vue";

export default {
  data() {
    return {};
  },
  components: {
    infoHeader,
    eventBubbles,
  },
  methods: {
    showDialogForNewEvent() {
      this.$store.commit("data/resetEventData");
      this.$store.commit("data/setDialogVisibility", {
        isVisible: true,
        editMode: false,
      });
    },
    showDialogForExistingEvent(eventData) {
      let diaryEntryRefWhereEventIsStoredAt = this.$store.getters[
        "data/getDiaryEntryByDate"
      ](eventData.createdOn);
      this.$store.commit("data/updateEventData", {
        eventData: eventData,
        diaryEntryRef: diaryEntryRefWhereEventIsStoredAt,
      });
      this.$store.commit("data/setDialogVisibility", {
        isVisible: true,
        editMode: true,
      });
    },
  },
  computed: {
    // get diary entry for today
    getDiaryEntry() {
      let diaryEntryRefForDate = this.$store.getters[
        "data/getDiaryEntryByDate"
      ](new Date());
      return diaryEntryRefForDate;
    },
  },
};
</script>

<style></style>
