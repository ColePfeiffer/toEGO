<template>
  <q-page class="q-pa-sm">
    <infoHeader></infoHeader>
    <q-separator color="primary" class="q-mb-sm" />
    <eventBubbles :dateOfDiaryEntry="new Date()" class="col"></eventBubbles>
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
};
</script>

<style>
</style>
