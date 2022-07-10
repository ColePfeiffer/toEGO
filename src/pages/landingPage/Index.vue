<template>
  <q-page class="q-pa-sm">
    <infoHeader></infoHeader>
    <q-separator color="secondary" class="q-mb-sm" />
    <EventViewer :diaryEntry="getDiaryEntry" class="col" @showDialogForExistingEvent="showDialogForExistingEvent"
      @showDialogForNewEvent="showDialogForNewEvent"></EventViewer>
    <!-- Player Character -->
  </q-page>
</template>

<script>
import infoHeader from "../../components/TheHeader.vue";
import EventViewer from "../../components/common/EventViewer.vue";

export default {
  data() {
    return {};
  },
  components: {
    infoHeader,
    EventViewer,
  },
  methods: {
    showDialogForNewEvent() {
      this.$store.commit("data/resetEventData");

      // applying default template
      let defaultTemplate = this.$store.getters["data/getDefaultTemplate"]("EVENT");
      if (defaultTemplate != undefined) {
        this.$store.commit("data/updateEditor", defaultTemplate);
      }

      //setting dialog visibilty
      this.$store.commit("data/setDialogVisibility", {
        isVisible: true,
        isBackgroundVisible: false,
        nameOfCurrentDialog: "dialogNewEvent",
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
        isBackgroundVisible: false,
        nameOfCurrentDialog: "dialogEditEvent",
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

<style>
</style>
