<template>
  <q-page class="q-pa-sm">
    <div class="bookmark" v-if="viewingMode === 'view' && false"></div>
    <!-- DAY SELECTION -->
    <div class="row justify-between items-center text-center q-py-md q-pb-xl maxHeight">
      <!-- Date + Calendar Button -->
      <div class="col-12">
        <q-btn class="datePickerButton text-white" no-wrap flat icon-right="event"
          :style="$store.state.data.sTextAccentShadow" :label="formatDate(getDate)">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="formattedDate">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
                <q-btn label="today" color="primary" flat @click="setDateToToday()" />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-btn>
      </div>
      <!-- go back button -->
      <div class="col-3 text-left">
        <q-btn v-if="viewingMode === 'view'" class="text-white" flat icon="bi-chevron-left" size="12px"
          :style="$store.state.data.sTextAccentShadow" @click="subtractFromDate(1)"></q-btn>
        <q-btn v-if="viewingMode === 'view' && getCountOfDaysAwayFromToday<0" class="text-white q-pl-none" size="12px"
          flat icon="bi-chevron-double-left" :style="$store.state.data.sTextAccentShadow" @click="setDateToToday()">
        </q-btn>
      </div>
      <!-- today, yesterday, x days ago, x days ahead... -->
      <div class="col-6">
        <div class="text-white smallText " :style="$store.state.data.sTextAccentShadow">{{ getDay }}</div>
      </div>
      <!-- go forward button -->
      <div class="col-3 text-right">
        <q-btn v-if="viewingMode === 'view' && getCountOfDaysAwayFromToday>0" class="text-white q-pr-none" size="12px"
          flat icon="bi-chevron-double-right" :style="$store.state.data.sTextAccentShadow" @click="setDateToToday()">
        </q-btn>
        <q-btn v-if="viewingMode === 'view'" class="text-white " flat icon="bi-chevron-right" size="12px"
          :style="$store.state.data.sTextAccentShadow" @click="addToDate(1)"></q-btn>
      </div>
    </div>
    <br />
    <TheEventSection v-if="!isDiaryEntryShownInFullscreen && getDiaryEntry != undefined" :diaryEntry="getDiaryEntry"
      :isShowingExpandButtonOfEventCard="isShowingExpandButtonOfEventCard" :showMessageIfThereAreNoEvents="false"
      :isDiarySectionVisible="isDiarySectionVisible"
      @goToPageNewEventSetToCreationMode="goToPageNewEventSetToCreationMode"
      @setVisibilityOfDiarySection="setVisibilityOfDiarySection">
    </TheEventSection>
    <!-- DIARY SELECTION -->
    <TheDiarySection v-if="!areEventsShownInFullscreen && !isDiaryEntryShownInFullscreen" :class="getDiarySectionClass"
      :diaryEntry="getDiaryEntry" :viewingMode="viewingMode" @change-view="changeViewMode"
      @save-changes="saveChangesToEntry" @openEntryInFullscreen="openEntryInFullscreen"
      @showDialogForNewEvent="goToPageNewEventSetToCreationMode">
    </TheDiarySection>

    <!-- DIARY SELECTION FULLSCREEN -->
    <div v-if="isDiaryEntryShownInFullscreen" class="q-pa-md">
      <div class="row justify-end q-pb-md">
        <div class="col-4 smallText text-right"></div>
        <q-btn class="smallText text-right" flat dense icon="bi-chevron-left" label="back" color="white" size="10px"
          @click="exitFullscreen" :style="$store.state.data.sTextAccentShadow"></q-btn>
      </div>

      <q-card class="editorCard shadow-3 text-justify">
        <q-item>
          <q-item-section v-html="editorHTMLContent"> </q-item-section>
        </q-item>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import TheDiarySection from "../../components/diary/TheDiarySection.vue";
import { date } from "quasar";
import TheEventSection from "src/components/diary/TheEventSection.vue";

export default {
  name: "diary",
  components: {
    TheDiarySection,
    TheEventSection
  },
  data() {
    return {
      viewingMode: "view", // is either set to 'view' or 'edit'
      isDiaryEntryShownInFullscreen: false,
      isDiarySectionVisible: true, //if false, status section is shown
      editorHTMLContent: "",
      getDate: this.$store.state.data.lastSelectedDate,
      day: "TODAY",

    };
  },
  watch: {
    // whenever getDate gets updated, it updates lastSelectedDate inside the store
    getDate(newDate) {
      this.$store.commit("data/updateLastSelectedDate", newDate);
      // if entry exists, show entries text
      if (this.getDiaryEntry != undefined && this.getDiaryEntry.editor != "") {
        this.editorHTMLContent = this.getDiaryEntry.editor;
        // if no entry exists, but event(s) do.
      } else if (
        this.getDiaryEntry != undefined &&
        this.getDiaryEntry.editor === ""
      ) {
        this.editorHTMLContent =
          "<div style=''>There is no diary entry yet.&nbsp;&nbsp;</div><div style='text-align: right;'><span style='color: rgb(85, 85, 85); font-family: arial, sans-serif; font-size: 25px; text-align: center;'>However... </span><span style='text-align: center;'>you added events!</span></div><div><span style='background-color: rgb(201, 204, 210); font-family: arial, sans-serif; font-size: 25px; text-align: center;'>(=🝦 ༝ 🝦=)</span><br></div>";
        // if neither exists
      } else {
        this.editorHTMLContent =
          "<div style='text-align: center;'>There is no diary entry for this day yet.&nbsp;</div><div style='text-align: center;'><span style='background-color: rgb(201, 204, 210); font-family: arial, sans-serif; font-size: 25px;'>( ﾉ･ｪ･ )ﾉ</span></div>";
      }
    },
  },
  computed: {
    isShowingExpandButtonOfEventCard() {
      return this.$store.state.data
        .isShowingExpandButtonOfEventCardsOnDiaryPage;
    },
    areEventsShownInFullscreen() {
      return this.$store.state.data.eventsOnDiaryPageAreExpanded;
    },
    // adjusts the top padding
    getEventSectionClass() {
      if (this.getDiaryEntry === undefined) {
        return {
          "padding-top": "20px",
          "margin-top": "16px",
          "padding-bottom": "16px",
        };
      } else {
        return {
          "padding-top": "48px",
          "margin-top": "16px",
          "padding-bottom": "16px",
        };
      }
    },
    // adjusts the top padding
    getDiarySectionClass() {
      if (this.getDiaryEntry === undefined) {
        return {
          "padding-top": "20px",
          "margin-top": "16px",
          "padding-bottom": "16px",
        };
      } else {
        return {
          "padding-top": "48px",
          "margin-top": "16px",
          "padding-bottom": "16px",
        };
      }
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
    getCountOfDaysAwayFromToday() {
      // returns the number of days away from today... minus means its in the future, positive number means its in the past. zero means today.
      let unit = "day";
      let diff = date.getDateDiff(this.getDate, Date.now(), unit);
      diff = diff * -1;
      return diff;
    },
    getDay() {
      //const date1 = new Date(2017, 2, 5);
      let today = Date.now();
      let yesterday = date.subtractFromDate(Date.now(), { days: 1 });
      let tomorrow = date.addToDate(Date.now(), { days: 1 });
      let unit = "day";

      let diff = this.getCountOfDaysAwayFromToday;
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
  methods: {
    setVisibilityOfDiarySection(newValue) {
      this.isDiarySectionVisible = newValue;
    },
    setDateToToday() {
      this.getDate = Date.now();
    },
    openEntryInFullscreen(editor) {
      console.log("triggered in diary ", editor);
      this.isDiaryEntryShownInFullscreen = true;
      this.editorHTMLContent = editor;
    },
    exitFullscreen() {
      this.isDiaryEntryShownInFullscreen = false;
    },
    goToPageNewEventSetToCreationMode() {
      this.$store.commit("data/setModeForNewEvent", "CREATE");
      this.$router.push("NewEvent");
    },
    goToPageNewEventSetToEditingMode(eventData) {
      let diaryEntryRefWhereEventIsStoredAt = this.$store.getters[
        "data/getDiaryEntryByDate"
      ](eventData.createdOn);

      this.$store.commit("data/updateEventData", {
        eventData: eventData,
        diaryEntryRef: diaryEntryRefWhereEventIsStoredAt,
      });
      this.$store.commit("data/setModeForNewEvent", "EDIT");
      this.$router.push("NewEvent");
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
  },
};
</script>

<style scoped>
.editorCard {
  font-size: 12.5px;
}

.datePickerButton {
  text-transform: none;
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
