<template>
  <q-page class="q-pa-sm">
    <TheHeader></TheHeader>
    <TheEventViewer :diaryEntry="getDiaryEntry"
      :marginBottom="22"
      class="q-px-lg q-pt-xl "></TheEventViewer>
    <!-- Player Character -->
  </q-page>
</template>

<script>
import TheHeader from "src/components/home/TheHeader.vue";
import TheEventViewer from "src/components/common/TheEventViewer.vue";

export default {
  data() {
    return {};
  },
  components: {
    TheHeader,
    TheEventViewer
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
