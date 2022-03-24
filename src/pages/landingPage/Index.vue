<template>
  <q-page class="q-pa-sm">
    <div class="column">
      <infoHeader></infoHeader>
      <q-separator color="primary" class="q-mb-sm" />
      <div class="col row">
        <div class="col-1"></div>
        <eventBubbles class="col"></eventBubbles>
      </div>

      <!-- Player Character -->
    </div>
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
