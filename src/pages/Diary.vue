<template>
  <BasePage :mode="diaryMode"
    :backgroundColor="getBackgroundColor">
    <template v-slot:title-bar-icon>
      <div class="q-pa-xs">
        <q-icon name="bi-journal"
          size="19px" />
      </div>
    </template>
    <template v-slot:title>
      <div class="selected-date q-pl-sm">
        {{formatDate(getDate)}}
      </div>
    </template>
    <template v-slot:title-bar-controls>
      <div class="row justify-between items-center no-wrap text-center">
        <q-btn class="no-box-shadow q-mr-xs text-center"
          icon="bi-calendar-event"
          :ripple="false"
          padding="3px"
          size="12px"
          :style="$store.getters['layout/getStyleForTitleBar']"
          unelevated
          color="transparent">
          <q-popup-proxy transition-show="scale"
            transition-hide="scale">
            <q-date v-model="formattedDate">
              <div class="row items-center justify-end">

                <q-btn label="today"
                  color="primary"
                  flat
                  @click="setDateToToday()" />
                <q-btn v-close-popup
                  label="Close"
                  color="primary"
                  flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-btn>

        <BaseButtonForTitleBar v-if="viewingMode === 'view'"
          class="no-box-shadow q-mr-xs"
          icon="bi-chevron-left"
          size="12px"
          @click-button="subtractFromDate(1)"></BaseButtonForTitleBar>
        <BaseButtonForTitleBar v-if="viewingMode === 'view'"
          class="no-box-shadow q-mr-xs"
          icon="bi-dot"
          size="12px"
          @click-button="setDateToToday()"></BaseButtonForTitleBar>

        <BaseButtonForTitleBar v-if="viewingMode === 'view'"
          class="no-box-shadow q-mr-xs"
          icon="bi-chevron-right"
          size="12px"
          @click-button="addToDate(1)"></BaseButtonForTitleBar>

      </div>
    </template>
    <template v-slot:content>
      <div class="bookmark"
        v-if="viewingMode === 'view' && false"></div>
      <!-- DAY SELECTION -->
      <div class="row justify-center items-center text-center">
        <!-- today, yesterday, x days ago, x days ahead... -->
        <div class="col-12">
          <div class="text-white smallText "
            :style="$store.state.layout.sTextAccentShadow">{{ getDay }}</div>
        </div>

      </div>

      <div>
        <!-- EVENT SECTION -->
        <TheSectionForEvents v-if="!isDiaryEntryShownInFullscreen && getDiaryEntry != undefined"
          :diaryEntry="getDiaryEntry"
          :isShowingExpandButtonOfEventCard="isShowingExpandButtonOfEventCard"
          :isDiarySectionVisible="isDiarySectionVisible"
          @go-to-event-set-to-creation-mode="goToEventSetToCreationMode"
          @go-to-event-set-to-editing-mode="goToEventSetToEditingMode"
          @set-visibility-of-diarysection="setVisibilityOfDiarySection">

        </TheSectionForEvents>
        <!-- DIARY SECTION -->
        <TheSectionForDiary v-if="!areEventsShownInFullscreen && !isDiaryEntryShownInFullscreen"
          :class="getDiarySectionClass"
          :diaryEntry="getDiaryEntry"
          :viewingMode="viewingMode"
          @change-view="changeViewMode"
          @save-changes="saveChangesToEntry"
          @enter-fullscreen-mode="enterFullscreenMode"
          @go-to-event-set-to-creation-mode="goToEventSetToCreationMode">

        </TheSectionForDiary>
      </div>

      <!-- DIARY SECTION FULLSCREEN -->
      <div v-if="isDiaryEntryShownInFullscreen"
        class="q-pa-md">
        <div class="row justify-end q-pb-md">
          <div class="col-4 smallText text-right"></div>
          <q-btn class="smallText text-right"
            flat
            dense
            icon="bi-chevron-left"
            label="back"
            color="white"
            size="10px"
            @click="exitFullscreen"
            :style="$store.state.layout.sTextAccentShadow"></q-btn>
        </div>

        <q-card class="editorCard shadow-3 text-justify">
          <q-item>
            <q-item-section v-html="editorHTMLContent"> </q-item-section>
          </q-item>
        </q-card>
      </div>
    </template>
  </BasePage>
</template>

<script>
import { date } from "quasar";
import TheSectionForEvents from "src/components/diary/TheSectionForEvents.vue";
import TheSectionForDiary from "src/components/diary/TheSectionForDiary.vue";
import { useQuasar } from "quasar";
import BasePage from "src/components/ui/BasePage.vue";
import BaseButtonForTitleBar from "src/components/ui/BaseButtonForTitleBar.vue";

export default {
  name: "diary",
  components: {
    TheSectionForEvents,
    TheSectionForDiary,
    BasePage,
    BaseButtonForTitleBar,
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
    diaryMode() {
      return this.$store.state.layout.diaryMode;
    },
    getBackgroundColor() {
      return this.$store.state.layout.diaryBackgroundColor;
    },
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
      return this.$store.getters["data/getDiaryEntryByDate"](this.getDate);
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
    enterFullscreenMode(editor) {
      this.isDiaryEntryShownInFullscreen = true;
      this.editorHTMLContent = editor;
    },
    exitFullscreen() {
      this.isDiaryEntryShownInFullscreen = false;
    },
    goToEventSetToCreationMode() {
      this.$store.commit("data/setModeForNewEvent", "CREATE");
      this.$router.push("Event");
    },
    goToEventSetToEditingMode(eventData) {
      let diaryEntryRefWhereEventIsStoredAt = this.$store.getters[
        "data/getDiaryEntryByDate"
      ](eventData.createdOn);

      this.$store.commit("data/updateEventData", {
        eventData: eventData,
        diaryEntryRef: diaryEntryRefWhereEventIsStoredAt,
      });
      this.$store.commit("data/setModeForNewEvent", "EDIT");
      this.$router.push("Event");
    },
    saveChangesToEntry(changeData) {
      let payload;
      if (this.getDiaryEntry === undefined) {

        let cleanedEditorText = changeData.editor.replaceAll("&nbsp;", '');
        cleanedEditorText = cleanedEditorText.replaceAll(" ", '');
        if (cleanedEditorText != "") {
          // if editor isn't empty and doesn't just contain whitespace
          let newEntry = changeData;
          console.log("new Entry: ", newEntry);
          newEntry.date = this.getDate;
          this.$store.commit("data/addEntryToDiaryEntries", newEntry);
        } else {
          this.$q.notify({
            icon: "bi-exclamation-square",
            color: "secondary",
            textColor: "black",
            message: "Please write something.",
          });
        }
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

.selected-date {
  font-size: 12.5px;
  margin-top: 1px;
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
