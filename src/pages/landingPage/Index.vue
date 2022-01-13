<template>
  <q-page class="q-pa-md">
    <div>
      <infoHeader></infoHeader>
      <q-separator color="primary" />
      <eventBubbles></eventBubbles>
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
