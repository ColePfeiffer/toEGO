<template>
  <q-page>
    <div class="bookmark" v-if="viewingMode === 'view'"></div>
    <div class="column">
      <!-- DAY SELECTION -->
      <div class="col q-py-md q-pt-lg maxHeight">
        <div class="row justify-center text-center">
          <q-btn
            v-if="viewingMode === 'view'"
            class="col-3"
            flat
            icon="keyboard_arrow_left"
            color="secondary"
            @click="subtractFromDate(1)"
          ></q-btn>
          <div class="col">
            <div class="row justify-center items-center">
              <div class="col">
                <div class="column" style="margin-top: 5.5px">
                  <div class="col text-accent">
                    <q-btn
                      class="datePickerButton"
                      no-wrap
                      no-caps
                      flat
                      icon-right="event"
                      :label="formatDate(getDate)"
                    >
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="formattedDate">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-btn>
                  </div>
                  <div class="col text-secondary smallText">{{ getDay }}</div>
                </div>
              </div>
            </div>
          </div>
          <q-btn
            v-if="viewingMode === 'view'"
            class="col-3"
            flat
            icon="keyboard_arrow_right"
            color="secondary"
            @click="addToDate(1)"
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
            <div v-if="hasEvents" class="col">
              <base-expandable-button
                @expandMore="expandMore"
                @expandLess="expandLess"
              ></base-expandable-button>
            </div>
          </div>
        </div>
        <q-separator color="secondary" />
        <!-- Events Container -->
        <q-scroll-area :style="heightForScrollArea" ref="scrollArea">
          <EventViewer
            class="test"
            :diaryEntry="getDiaryEntry"
            @showDialogForExistingEvent="showDialogForExistingEvent"
            @showDialogForNewEvent="showDialogForNewEvent"
          ></EventViewer>
        </q-scroll-area>
      </div>
      <div v-if="isDiarySectionVisible">
        <!-- DIARY SELECTION -->
        <diaryPanels
          class="q-pt-xs secondary"
          :diaryEntry="getDiaryEntry"
          :viewingMode="viewingMode"
          :scroll="scroll"
          @change-view="changeViewMode"
          @save-changes="saveChangesToEntry"
        ></diaryPanels>
      </div>
    </div>
    <!-- 2 -->
    <!-- 3 -->
  </q-page>
</template>

<script>
import EventViewer from "../../components/common/EventViewer.vue";
import diaryPanels from "../../components/diary/TheDiaryPanels.vue";
import BaseExpandableButton from "../../components/ui/BaseExpandableButton.vue";
import { date } from "quasar";
import shared from "../../shared.js";

export default {
  name: "diary",
  data() {
    return {
      getDate: new Date(),
      isDiarySectionVisible: true,
      viewingMode: "view",
      day: "TODAY",
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
    EventViewer,
    diaryPanels,
    BaseExpandableButton,
  },
  watch: {
    // whenever getDate gets updated, it updates lastSelectedDate inside the store
    getDate(newDate) {
      this.$store.commit("data/updateLastSelectedDate", newDate);
    },
  },
  computed: {
    hasEvents() {
      if (this.getDiaryEntry != undefined) {
        if (this.getDiaryEntry.events.length > 0) {
          return true;
        }
      }
      return false;
    },
    formattedDate: {
      get() {
        return date.formatDate(this.getDate, "YYYY/MM/DD");
      },
      set(value) {
        this.getDate = value;
      },
    },
    getCurrentEvent() {
      return 0;
    },
    getDiaryEntry() {
      let diaryEntryRefForDate = this.$store.getters[
        "data/getDiaryEntryByDate"
      ](this.getDate);
      return diaryEntryRefForDate;
    },
    getDay() {
      //const date1 = new Date(2017, 2, 5);
      let today = Date.now();
      let yesterday = date.subtractFromDate(Date.now(), { days: 1 });
      let tomorrow = date.addToDate(Date.now(), { days: 1 });
      let unit = "day";

      let diff = date.getDateDiff(this.getDate, Date.now(), unit);
      diff = diff * -1;
      // date.isSameDate returns true when date1 and date2 are on the same day
      if (date.isSameDate(this.getDate, today, unit)) {
        return "today";
      } else if (date.isSameDate(this.getDate, yesterday, unit)) {
        return "yesterday";
      } else if (date.isSameDate(this.getDate, tomorrow, unit)) {
        return "tomorrow";
      } else {
        if (diff < -1) {
          return Math.abs(diff) + " days from now";
        }
        return diff + " days ago";
      }
    },
  },
  created() {
    this.scroll = shared.scroll; // now I can call this.foo() in my functions/template
  },
  methods: {
    showDialogForNewEvent() {
      this.$store.commit("data/resetEventData");
      this.$store.commit("data/updateCreatedOn", this.getDate);
      this.$store.commit("data/setDialogVisibility", {
        isVisible: true,
        isBackgroundVisible: false,
        nameOfCurrentDialog: "dialogNewEvent",
      });
    },
    showDialogForExistingEvent(eventData) {
      let diaryEntryRefWhereEventIsStoredAt = this.$store.getters[
        "data/getDiaryEntryByDate"
      ](eventData.createdOn);
      this.$store.commit("data/updateEventData", {
        eventData: eventData,
        diaryEntryRef: diaryEntryRefWhereEventIsStoredAt,
      });

      this.$store.commit("data/setDialogVisibility", {
        isVisible: true,
        isBackgroundVisible: false,
        nameOfCurrentDialog: "dialogEditEvent",
      });
    },
    scroll(offset) {
      this.scroll(+offset);
    },
    saveChangesToEntry(changeData) {
      console.log(changeData);
      let payload;
      if (this.getDiaryEntry === undefined) {
        let newEntry = changeData;
        console.log("new Entry: ", newEntry);
        newEntry.date = this.getDate;
        this.$store.commit("data/addEntryToDiaryEntries", newEntry);
      } else {
        payload = {
          diaryEntryRef: this.getDiaryEntry,
          newData: changeData,
        };
        this.$store.commit("data/updateDiaryEntry", payload);
      }
    },
    subtractFromDate(days) {
      this.getDate = date.subtractFromDate(this.getDate, { days: days });
    },

    addToDate(days) {
      this.getDate = date.addToDate(this.getDate, { days: days });
    },

    formatDate(rawDate) {
      let formattedString = date.formatDate(rawDate, "MMMM  Do, YYYY");
      return formattedString;
    },

    changeViewMode(mode) {
      this.viewingMode = mode;
    },
    expandMore() {
      this.toggleExpansedStatusOfAllEvents(true);
      this.isDiarySectionVisible = false;
      this.heightForScrollArea = "height: 650px";
    },
    expandLess() {
      this.heightForScrollArea = "height: 175px";

      this.toggleExpansedStatusOfAllEvents(false);
      this.isDiarySectionVisible = true;
    },
    toggleExpansedStatusOfAllEvents(expansedState) {
      let payload = {
        diaryEntryRef: this.getDiaryEntry,
        expansedState: expansedState,
      };
      console.log(payload);
      this.$store.commit("data/setExpandedStatusOfAllEvents", payload);
    },
  },
};
</script>

<style scoped>
.datePickerButton {
  .text-transform: lowercase;
}
.maxHeight {
  max-height: 80px;
}
.smallText {
  font-size: 12.5px;
}
.test :deep(.q-card) {
}

.q-btn :deep(.q-icon) {
  font-size: 1.2em;
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
