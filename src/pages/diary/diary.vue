<template>
  <q-page class="q-pa-sm">
    <div class="column q-col-gutter-md">
      <div class="col q-pa-md">
        <!-- DAY SELECTION -->
        <div class="row justify-center text-center">
          <q-btn
            class="col-3 q-mx-xs"
            flat
            icon="keyboard_arrow_left"
            color="primary"
          ></q-btn>
          <div class="column" style="margin-top: 5.5px">
            <div class="col">{{ day }}</div>
            <div class="col">{{ date }}</div>
          </div>
          <q-btn
            class="col-3 q-mx-xs"
            flat
            icon="keyboard_arrow_right"
            color="primary"
          ></q-btn>
        </div>
      </div>
      <div class="col q-pa-md q-ma-md">
        <!-- EVENT SELECTION -->

        <div class="row justify-center text-center">
          <div class="col-6 eventTitle text-left">EVENTS</div>
          <div class="col-6 eventCounter text-right">{{ eventCounter }}</div>
        </div>
        <q-separator color="primary" class="q-my-xs" />
        <q-scroll-area style="height: 250px" ref="scrollArea">
          <eventBubbles></eventBubbles>
        </q-scroll-area>
        <q-separator color="primary" class="q-my-xs" />
      </div>
      <div class="col q-pa-md">
        <!-- DIARY SELECTION -->
        <basePanelWithButtons
          :options="options"
          :names="names"
          :hideBordersOnInit="hideBordersOnInit"
          class="q-pa-sm"
        ></basePanelWithButtons>
      </div>
    </div>
    <!-- 2 -->
    <!-- 3 -->
  </q-page>
</template>

<script>
import eventBubbles from "../../components/landing/eventBubbles.vue";
import basePanelWithButtons from "../../components/ui/basePanelWithButtons.vue";

export default {
  name: "diary",
  data() {
    return {
      options: [
        { value: "Diary", slot: "diaryBtnSlot" },
        { value: "Status", slot: "statusBtnSlot" },
      ],
      names: ["Diary", "Status"],
      hideBordersOnInit: false,
      day: "TODAY",
      date: "13/02/2021",
      eventCounter: "< 1/2 >",
      boxShadowStyle: {
        "box-shadow": "none",
      },
      styleA: {
        "background-color": "#121212 ",
        color: "white",
        opacity: "0.8",
      },
      classBig: { "max-width": "80%", width: "70%" },
    };
  },
  components: {
    eventBubbles,
    basePanelWithButtons,
  },
  methods: {},
};
</script>

<style scoped>
.alignHeight {
  vertical-align: middle;
}
</style>