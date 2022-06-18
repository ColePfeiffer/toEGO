<template>
  <q-page class="q-pa-sm">
    <div class="bookmark" v-if="viewingMode === 'view' && false"></div>
    <div class="column">
      <!-- DAY SELECTION -->
      <div class="col q-py-md q-pt-lg  maxHeight">
        <div class="row justify-center text-center">
          <q-btn v-if="viewingMode === 'view'" class="col-3" flat icon="keyboard_arrow_left" color="white"
            :style="getStyleForText" @click="subtractFromDate(1)"></q-btn>
          <div class="col">
            <div class="row justify-center items-center">
              <div class="col">
                <div class="column" style="margin-top: 5.5px">
                  <div class="col text-accent">
                    <q-btn class="datePickerButton" no-wrap no-caps flat icon-right="event" :style="textStyleAccent"
                      :label="formatDate(getDate)">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="formattedDate">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                            <q-btn label="today" color="primary" flat @click="setDateToToday" />

                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-btn>
                  </div>
                  <div class="col text-white smallText q-pb-lg" :style="textStyleAccent">{{ getDay }}</div>
                </div>
              </div>
            </div>
          </div>
          <q-btn v-if="viewingMode === 'view'" class="col-3" flat icon="keyboard_arrow_right" color="white"
            :style="getStyleForText" @click="addToDate(1)"></q-btn>
        </div>
      </div>

      <!-- EVENT SELECTION -->
      <div class="col q-px-md q-pt-lg" v-if="!isDiaryEntryShownInFullscreen && getDiaryEntry != undefined">

        <!-- Title, Button Row -->
        <div class="row ">
          <!-- Title -->
          <div class="col-7 smallText text-left text-white no-wrap" :style="textStyleAccent">{{
              getTextForFirstHeadline
          }}
          </div>
          <!-- Button -->
          <div class="col-5 text-right">
            <q-btn class="col-2 smallText dense text-right" flat icon="add" color="accent">
            </q-btn>
            <div v-if="hasEvents || (isDiarySectionVisible === false)" class="col smallText text-right">
              <base-expandable-button dense @expandMore="expandMore" @expandLess="expandLess"></base-expandable-button>
            </div>
          </div>
        </div>
        <q-separator color="secondary" />
        <!-- Events Container -->
        <q-scroll-area :style="heightForScrollArea" ref="scrollArea">
          <EventViewer :diaryEntry="getDiaryEntry" :showMessageIfThereAreNoEvents="false"
            @showDialogForExistingEvent="showDialogForExistingEvent" @showDialogForNewEvent="showDialogForNewEvent">
          </EventViewer>
        </q-scroll-area>
      </div>

      <!-- DIARY SELECTION -->
      <diarySection v-if="!isDiaryEntryShownInFullscreen" :class="getDiarySectionClass" :diaryEntry="getDiaryEntry"
        :viewingMode="viewingMode" :scroll="scroll" @change-view="changeViewMode" @save-changes="saveChangesToEntry"
        @openEntryInFullscreen="openEntryInFullscreen" @showDialogForNewEvent="showDialogForNewEvent">
      </diarySection>

      <!-- DIARY SELECTION FULLSCREEN -->
      <div v-if="isDiaryEntryShownInFullscreen" class="q-pa-xl">
        <div class="row justify-end">
          <div class="col-4"></div>
          <q-btn class="col-4 smallText" flat icon="bi-fullscreen-exit" label="exit" color="secondary"
            @click="exitFullscreen"></q-btn>
        </div>

        <q-card class="editorCard shadow-3 text-justify">
          <q-item>
            <q-item-section v-html="editorDisplayedInFullscreen">
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import EventViewer from "../../components/common/EventViewer.vue";
import diarySection from "../../components/diary/diarySection.vue";
import BaseExpandableButton from "../../components/ui/BaseExpandableButton.vue";
import { date } from "quasar";
import shared from "../../shared.js";

export default {
  name: "diary",
  data() {
    return {
      textStyleDark: {
        "text-shadow": "2px 2px #000000",
        "text-shadow": "rgb(0 0 0) 2px 2px 2px"
      },
      textStyle: {
        "text-color": "white",
        //"text-shadow": "0 0 3px var(--q-secondary), 0 0 5px var(--q-secondary)",
        "text-shadow": "2px 2px 3px rgba(255,255,255,0.1)",
      },
      textStyleAccent: {
        "color": "var(--q-accent)",
        //"text-shadow": "0 0 3px var(--q-secondary), 0 0 5px var(--q-secondary)",
        "text-shadow": "var(--q-info) 2px 2px 2px"
      },
      isDiaryEntryShownInFullscreen: false,
      editorDisplayedInFullscreen: "",
      getDate: this.$store.state.data.lastSelectedDate,
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
    diarySection,
    BaseExpandableButton,
  },
  watch: {

    // whenever getDate gets updated, it updates lastSelectedDate inside the store
    getDate(newDate) {
      this.$store.commit("data/updateLastSelectedDate", newDate);
      // if entry exists, show entries text
      if (this.getDiaryEntry != undefined && this.getDiaryEntry.editor != "") {
        this.editorDisplayedInFullscreen = this.getDiaryEntry.editor;
        // if no entry exists, but event(s) do.
      } else if (
        this.getDiaryEntry != undefined &&
        this.getDiaryEntry.editor === ""
      ) {
        this.editorDisplayedInFullscreen =
          "<div style=''>There is no diary entry yet.&nbsp;&nbsp;</div><div style='text-align: right;'><span style='color: rgb(85, 85, 85); font-family: arial, sans-serif; font-size: 25px; text-align: center;'>However... </span><span style='text-align: center;'>you added events!</span></div><div><span style='background-color: rgb(201, 204, 210); font-family: arial, sans-serif; font-size: 25px; text-align: center;'>(=🝦 ༝ 🝦=)</span><br></div>";
        // if neither exists
      } else {
        this.editorDisplayedInFullscreen =
          "<div style='text-align: center;'>There is no diary entry for this day yet.&nbsp;</div><div style='text-align: center;'><span style='background-color: rgb(201, 204, 210); font-family: arial, sans-serif; font-size: 25px;'>( ﾉ･ｪ･ )ﾉ</span></div>";
      }
    },
  },
  computed: {
    // adjusts the top padding
    getDiarySectionClass() {
      if (this.getDiaryEntry === undefined) {
        return {
          "padding-top": "20px",
          "margin-top": "16px",
          "padding-bottom": "16px"
        };
      } else {
        return {
          "padding-top": "48px",
          "margin-top": "16px",
          "padding-bottom": "16px"
        }
      }
    },
    getTextForFirstHeadline() {
      if (this.getDiaryEntry != undefined) {
        return "EVENTS";
      } else {
        return "";
      }
    },
    getStyleForText() {
      if (this.$store.getters["data/isDarkModeActive"]) {
        return this.textStyleDark;
      } else {
        return this.textStyle;
      }
    },
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
  unmounted() {
    console.log("mHE???");
  },
  methods: {
    setDateToToday() {
      this.getDate = Date.now();
    },
    openEntryInFullscreen(editor) {
      console.log("triggered in diary ", editor);
      this.isDiaryEntryShownInFullscreen = true;
      this.editorDisplayedInFullscreen = editor;
    },
    exitFullscreen() {
      this.isDiaryEntryShownInFullscreen = false;
    },
    showDialogForNewEvent() {
      this.$store.commit("data/resetEventData");
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
.editorCard {
  font-size: 12.5px;
}



.maxHeight {
  max-height: 80px;
}

.smallText {
  font-size: 12.5px;
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
