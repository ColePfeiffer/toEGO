<template>
  <q-page>
    <div class="column">
      <!-- DAY SELECTION -->
      <div class="col q-py-md">
        <div class="row justify-center text-center">
          <q-btn
            class="col-3"
            flat
            icon="keyboard_arrow_left"
            color="secondary"
          ></q-btn>
          <div class="column" style="margin-top: 5.5px">
            <div class="col text-secondary">{{ day }}</div>
            <div class="col text-accent">{{ date }}</div>
          </div>
          <q-btn
            class="col-3"
            flat
            icon="keyboard_arrow_right"
            color="secondary"
          ></q-btn>
        </div>
      </div>
      <!-- EVENT SELECTION -->
      <div class="col q-px-md q-ma-md">
        <div class="row justify-center items-center">
          <div class="col-6 eventTitle text-left text-secondary">EVENTS</div>
          <div class="col-6 eventchangeViewButton text-right">
            <q-btn
              class="col eventchangeViewButton"
              flat
              :icon="eventViewerIcon"
              color="accent"
              @click="changeViewForEventBubbles"
            ></q-btn>
          </div>
        </div>
        <!-- EVENT BUBBLES VIEWER -->
        <q-separator color="secondary" class="q-my-xs" />
        <q-scroll-area :style="heightForScrollArea" ref="scrollArea">
          <eventBubbles></eventBubbles>
        </q-scroll-area>
        <q-separator color="secondary" class="q-my-xs" />
      </div>
      <div class="col q-pa-md">
        <!-- DIARY SELECTION -->
        <diaryPanel class="q-pt-xs"></diaryPanel>
      </div>
    </div>
    <!-- 2 -->
    <!-- 3 -->
  </q-page>
</template>

<script>
import eventBubbles from "../../components/landing/eventBubbles.vue";
import diaryPanel from "../../components/diary/diaryPanel.vue";

export default {
  name: "diary",
  data() {
    return {
      day: "TODAY",
      date: "13/02/2021",
      eventCounter: "< 1/2 >",
      eventViewerIcon: "expand_more",
      heightForScrollArea: "height: 175px",
      boxShadowStyle: {
        "box-shadow": "none",
      },
      styleABC: {
        "background-color": "#121212 ",
        color: "white",
        opacity: "0.8",
      },
      classBig: { "max-width": "80%", width: "70%" },
    };
  },
  components: {
    eventBubbles,
    diaryPanel,
  },
  methods: {
    changeViewForEventBubbles() {
      if (this.eventViewerIcon === "expand_more") {
        console.log("expanding now!");
        this.heightForScrollArea = "height: 700px";
        this.eventViewerIcon = "expand_less";
      } else {
        this.heightForScrollArea = "height: 175px";
        this.eventViewerIcon = "expand_more";
      }
    },
  },
};
</script>

<style scoped>
.alignHeight {
  vertical-align: middle;
}
.underlined {
  border-bottom: 1px solid black;
  padding: 0 0 4px;
}
</style>