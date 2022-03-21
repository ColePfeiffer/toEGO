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
              {{ eventData.text == "" ? " " : eventData.title }}
            </div>
          </div>
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

        <q-avatar
          class="col=1 q-pa-md"
          text-color="secondary"
          :icon="eventData.mood"
        />
      </div>
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
.titleContainer {
  color: black;
  text-shadow: 0 0 3px #4d46bb;
  position: relative;
  top: -2px;
}
</style>
