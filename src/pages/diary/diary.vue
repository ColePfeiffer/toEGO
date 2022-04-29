<template>
  <q-page>
    <div class="bookmark" v-if="viewingMode === 'view'"></div>
    <div class="column">
      viwp: <timeago :since="new Date('1995-12-17T03:24:00')"></timeago>
      <!-- DAY SELECTION -->
      <div class="col q-py-md q-pt-lg">
        <div class="row justify-center text-center">
          <q-btn
            class="col-3"
            flat
            icon="keyboard_arrow_left"
            color="secondary"
            @click="subtractFromDate"
          ></q-btn>
          <div class="column" style="margin-top: 5.5px">
            <div class="col text-secondary">{{ getDay }}</div>
            <div class="col text-accent">{{ getDate }}</div>
          </div>
          <q-btn
            class="col-3"
            flat
            icon="keyboard_arrow_right"
            color="secondary"
            @click="addToDate"
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
          @change-view="changeViewMode"
        ></diaryPanelEdit>
        <diaryPanelView @change-view="changeViewMode" v-else></diaryPanelView>
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
import { date } from "quasar";

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
  computed: {
    getCurrentEvent() {
      return 0;
    },

    getDate() {
      let timeStamp = Date.now();
      return timeStamp;
    },

    getDay() {
      // is current date in between dateFrom and dateTo?
      const dateFrom = new Date();
      const dateTo = new Date();

      //const date1 = new Date(2017, 2, 5);
      let today = Date.now();
      let yesterday = date.subtractFromDate(Date.now(), { days: 1 });
      let fewDaysAgo = date.subtractFromDate(Date.now(), { days: 3 });
      let lastWeek = date.subtractFromDate(Date.now(), { days: 7 });
      let lastMonth = date.subtractFromDate(Date.now(), { months: 1 });
      let someTimeAgo = date.subtractFromDate(Date.now(), {
        months: 1,
        days: 25,
      });

      let unit = "day";

      // today
      if (date.isSameDate(this.getDate, today, unit)) {
        // true when date1 and date2's are on the same day
        console.log("same day!");
        return "today";
        // yesterday
      } else if (date.isSameDate(this.getDate, yesterday, unit)) {
        console.log("yesterday");
        return "yesterday";
      } else {
        return "meh";
      }

      //let newDate = new Date(2017, 2, 7);
      // today
      // if getDate is today =>
      // Date.now();
      // yesterday
      //dateFrom = Date.now().subtractFromDate(newDate, { days: 7, months: 1 });
      //dateTo = Date.now().addToDate(newDate, { days: 7, months: 1 });
      // few days ago
      // last week
      // last month
      // some time ago

      /*
            // if you only care about comparing dates (year/month/day, regardless of time)
      // then you could tip isBetweenDates() about it so it can perform best:
      
if (
        date.isBetweenDates(dateTarget, dateFrom, dateTo, { onlyDate: true })
      ) {
        // Do something with dateTarget
      }
      */
    },
  },
  methods: {
    subtractFromDate() {},

    addToDate() {},
    formatDate(date) {
      let formattedString = date.formatDate(timeStamp, "Do MMMM YYYY");
      return formattedString;
    },

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