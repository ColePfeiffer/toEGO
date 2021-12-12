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
import infoHeader from "../components/infoHeader.vue";
import eventBubbles from "../components/eventBubbles.vue";

export default {
  data() {
    return {
    }
  },
      components: {
    infoHeader,
    eventBubbles
  },
  };
</script>

<style>


</style>
