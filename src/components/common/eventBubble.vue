<template>
  <div class="eventBubble row no-wrap">
    <!-- EVENT BUBBLE -->
    <div class="col-9 q-mb-md">
      <div class="row items-center justify-end">
        <!-- EVENT TITLE -->
        <div class="titleContainer">
          {{ eventData.text == "" ? " " : eventData.title }}
        </div>
      </div>
      <!-- EVENT MESSAGE -->
      <q-chat-message
        class="textContainer"
        sent
        bg-color="primary"
        text-color="secondary"
      >
        <!--  <template v-slot:stamp> -->
        <!--   <time-ago -->
        <!--     :datetime="eventData.createdOn" -->
        <!--    locale="en" -->
        <!--    :refresh="60" -->
        <!--    long -->
        <!--  ></time-ago> -->
        <!-- </template> -->
        <div>
          {{ mergeText(eventData) }}
        </div>
      </q-chat-message>
    </div>
    <!-- MOOD EMOJI -->
    <q-avatar
      class="col-auto q-pa-md"
      text-color="secondary"
      :icon="eventData.mood"
    />
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
.eventBubble {
  background-color: #4d46bb;
  background-color: rgba(157, 157, 213, 0.6);
}
.titleContainer {
  color: black;
  text-shadow: 0 0 3px #4d46bb;
  position: relative;
  top: -2px;
}
</style>
