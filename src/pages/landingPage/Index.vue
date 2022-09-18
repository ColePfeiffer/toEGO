<template>
  <q-page class="q-pa-sm">
    <infoHeader></infoHeader>
    <EventViewer :diaryEntry="getDiaryEntry" class="col"></EventViewer>
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
