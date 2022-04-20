<template>
  <div class="column items-center">
    <!-- Title -->
    <div class="titleContainer col q-pb-xs self-start">
      {{ eventData.text == "" ? " " : eventData.title }}
    </div>
    <!-- Text-Bubble, Emoji -->
    <div class="eventBubble row no-wrap">
      <div class="col-9">
        <q-chat-message sent bg-color="primary" text-color="secondary">
          <!--  <template v-slot:stamp> -->
          <!--   <time-ago -->
          <!--     :datetime="eventData.createdOn" -->
          <!--    locale="en" -->
          <!--    :refresh="60" -->
          <!--    long -->
          <!--  ></time-ago> -->
          <!-- </template> -->
          <div class="textContainer">
            {{ mergeText(eventData) }}
          </div>
        </q-chat-message>
      </div>
      <div class="col-1">
        <!-- MOOD EMOJI -->
        <q-avatar
          class="avatarContainer q-pa-md"
          text-color="secondary"
          :icon="eventData.mood"
        />
      </div>

      <!-- EVENT BUBBLE -->
    </div>
  </div>
</template>

<script>
//import TimeAgo from "vue3-timeago";

export default {
  name: "eventBubbles",
  components: {
    //TimeAgo,
  },
  props: {
    eventData: Object,
  },
  data() {
    return {};
  },
  methods: {
    mergeText(eventData) {
      console.log("blubbb");
      let output = eventData.text;
      // check if text is empty; if so show title
      if (eventData.text == "") {
        output = eventData.title;
      }
      console.log([output][0]);
      return [output][0];
    },
  },
};
</script>

<style scoped>
.avatarContainer {
}
.titleContainer {
}
.eventBubble :deep(.q-message-text) {
}

.eventBubble {
  background-color: rgba(157, 157, 213, 0.6);
}
.titleContainer {
  color: black;
  text-shadow: 0 0 3px #4d46bb;
}

.textContainer {
}
</style>
