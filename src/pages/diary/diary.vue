<template>
  <q-page>
    <div class="bookmark" v-if="viewingMode === 'view'"></div>
    <div class="column">
      <!-- DAY SELECTION -->
      <div class="col q-py-md q-pt-lg">
        <div class="row justify-center text-center">
          <q-btn
            class="col-3"
            flat
            icon="keyboard_arrow_left"
            color="secondary"
            @click="changeViewMode('view')"
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
            @click="changeViewMode('edit')"
          ></q-btn>
        </div>
      </div>
      <!-- EVENT SELECTION -->
      <div class="col q-px-md q-pt-lg">
        <!-- Title, Button Row -->
        <div class="row justify-center items-center">
          <!-- Title -->
          <div class="col-6 eventTitle text-left text-secondary">EVENTS</div>
          <!-- Button -->
          <div class="col-6 eventchangeViewButton text-right">
            <base-expandable-button
              class="col"
              @expandMore="expandMore"
              @expandLess="expandLess"
            ></base-expandable-button>
          </div>
        </div>
        <q-separator color="secondary" />
        <!-- Events Container -->
        <q-scroll-area :style="heightForScrollArea" ref="scrollArea">
          <eventBubbles class="test"></eventBubbles>
        </q-scroll-area>
      </div>
      <div>
        <!-- DIARY SELECTION -->
        <diaryPanelEdit
          v-if="viewingMode === 'edit'"
          class="q-pt-xs secondary"
        ></diaryPanelEdit>
        <diaryPanelView v-else></diaryPanelView>
      </div>
    </div>
    <!-- 2 -->
    <!-- 3 -->
  </q-page>
</template>

<script>
import eventBubbles from "../../components/landing/eventBubbles.vue";
import diaryPanelEdit from "../../components/diary/diaryPanelEdit.vue";
import diaryPanelView from "../../components/diary/diaryPanelView.vue";
import BaseExpandableButton from "../../components/ui/baseExpandableButton.vue";

export default {
  name: "diary",
  data() {
    return {
      viewingMode: "edit",
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
    diaryPanelEdit,
    diaryPanelView,
    BaseExpandableButton,
  },
  methods: {
    changeViewMode(mode) {
      console.log("lol");
      console.log(mode);
      this.viewingMode = mode;
    },
    expandMore() {
      this.toggleExpansedStatusOfAllEvents(true);
      this.heightForScrollArea = "height: 700px";
    },
    expandLess() {
      this.heightForScrollArea = "height: 175px";
      this.toggleExpansedStatusOfAllEvents(false);
    },
    toggleExpansedStatusOfAllEvents(expansedStatus) {
      this.$store.commit("data/setExpandedStatusOfEvents", expansedStatus);
    },
  },
};
</script>

<style scoped>
.test :deep(.q-card) {
}
.alignHeight {
  vertical-align: middle;
}
.underlined {
  border-bottom: 1px solid black;
  padding: 0 0 4px;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.bookmark {
  position: absolute;
  right: 10px;
  height: 90px;
  width: 20px;
  padding: 0px;
  -webkit-transform: rotate(0deg) skew(0deg);
  transform: rotate(0deg) skew(0deg);
  border-left: 16px solid var(--q-accent);
  border-right: 16px solid var(--q-accent);
  border-bottom: 16px solid transparent;
}
</style>