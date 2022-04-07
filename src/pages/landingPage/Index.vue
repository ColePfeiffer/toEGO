<template>
  <q-page class="q-pa-sm">
    <div class="test row justify-center" :style="boxShadowStyle">
      <div class="col-12 col-sm-10 col-md-8 col-xl-3">
        <div class="column">
          <infoHeader></infoHeader>
          <q-separator color="primary" class="q-mb-sm" />
          <eventBubbles class="col"></eventBubbles>

          <!-- Player Character -->
        </div>
      </div>
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
