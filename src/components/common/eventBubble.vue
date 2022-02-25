<template>
  <div>
    <div style="width: 100%; max-width: 550px">
      <div
        class="
          eventBubble
          fit
          row
          no-wrap
          justify-end
          items-center
          content-start
        "
      >
        <div class="col=5 q-mb-md">
          <div class="row items-center justify-end">
            <div class="titleContainer">
              {{ event.title }}
            </div>
          </div>

          <q-chat-message
            class="textContainer"
            sent
            :stamp="event.createdOn"
            bg-color="primary"
            text-color="secondary"
          >
            {{ mergeText(event) }}
          </q-chat-message>
        </div>

        <q-avatar
          class="col=1 q-pa-md"
          text-color="secondary"
          :icon="event.mood"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "eventBubbles",
  props: {
    event: Object,
  },
  data() {
    return {};
  },
  methods: {
    mergeText(event) {
      console.log("triggered by: " + event);
      return [event.text][0];
    },
  },
};
</script>

<style scoped>
.titleContainer {
  color: black;
  text-shadow: 0 0 3px #4d46bb;
  position: relative;
  top: -2px;
}
</style>
