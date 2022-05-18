<template>
  <q-page class="q-pa-sm">
    <infoHeader></infoHeader>
    <q-separator color="primary" class="q-mb-sm" />
    <eventBubbles :diaryEntry="getDiaryEntry" class="col"></eventBubbles>
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
