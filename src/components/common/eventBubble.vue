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
              {{ event.text == "" ? " " : event.title }}
            </div>
          </div>

          <q-chat-message
            class="textContainer"
            sent
            bg-color="primary"
            text-color="secondary"
          >
            {{ mergeText(event) }}
            <template v-slot:stamp>
              <time-ago
                :datetime="event.createdOn"
                locale="en"
                :refresh="60"
                long
              ></time-ago>
            </template>
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
import { TimeAgo } from "vue3-timeago";

export default {
  name: "eventBubbles",
  components: {
    TimeAgo,
  },
  props: {
    event: Object,
  },
  data() {
    return {};
  },
  methods: {
    mergeText(event) {
      let output = event.text;
      // check if text is empty; if so show title
      if (event.text == "") {
        output = event.title;
      }
      return [output][0];
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
