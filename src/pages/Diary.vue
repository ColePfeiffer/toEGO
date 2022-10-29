<template>
  <BasePage titleOfPage="Diary"
    :mode="diaryMode"
    :backgroundColor="$store.getters['layout/getDiaryBackgroundColor']">
    <template v-if="isDiaryTitlebarShowingDay"
      v-slot:titlebar>
      <div class="row justify-center items-center text-center no-wrap  full-width title-bar-height q-py-none">
        <div class="col-1 text-left">
          <BaseButtonForTitleBar v-if="viewingMode === 'view'"
            class="no-box-shadow "
            icon="bi-chevron-left"
            size="12px"
            @click-button="subtractFromDate(1)">
            <template v-slot:tooltip>
              <BaseTooltip text="Go back"
                :delay="15"></BaseTooltip>
            </template>
          </BaseButtonForTitleBar>
        </div>
        <div class="col-1 text-left">
          <BaseButtonForTitleBar v-if="viewingMode === 'view' && getCountOfDaysAwayFromToday < 0"
            class="q-pl-xs q-mr-xs no-box-shadow col-1"
            icon="bi-dot"
            size="12px"
            @click-button="setDateToToday()">
            <template v-slot:tooltip>
              <BaseTooltip text="Go to today"
                :delay="15"></BaseTooltip>
            </template>
          </BaseButtonForTitleBar>
        </div>
        <!-- today, yesterday, x days ago, x days ahead... -->
        <div class="col-8 text-white">
          <q-btn class="date-picker-button text-white"
            no-wrap
            flat
            icon-right="event"
            :style="getStyleForDayInTitlebar"
            :label="formatDate(getDate)">
            <q-popup-proxy cover
              transition-show="scale"
              transition-hide="scale">
              <q-date v-model="formattedDate">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup
                    label="Close"
                    flat />
                  <q-btn label="today"
                    flat
                    @click="setDateToToday()" />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-btn>
        </div>
        <!-- go forward button -->
        <div class="col-1 text-right">
          <BaseButtonForTitleBar v-if="viewingMode === 'view' && getCountOfDaysAwayFromToday > 0"
            class="q-pl-none q-mr-xs no-box-shadow"
            icon="bi-dot"
            size="12px"
            @click-button="setDateToToday()">
            <template v-slot:tooltip>
              <BaseTooltip text="Go to today"
                :delay="15"></BaseTooltip>
            </template>
          </BaseButtonForTitleBar>
        </div>
        <div class="col-1 text-right">
          <BaseButtonForTitleBar v-if="viewingMode === 'view'"
            class="q-pl-none q-mr-xs no-box-shadow"
            icon="bi-chevron-right"
            size="12px"
            @click-button="addToDate(1)">
            <template v-slot:tooltip>
              <BaseTooltip text="Go forward"
                :delay="15"></BaseTooltip>
            </template>
          </BaseButtonForTitleBar>

        </div>
      </div>
    </template>
    <template v-else
      v-slot:titlebar>
      <div class="title-bar-text">
        <div class="q-pr-lg row justify-between items-center no-wrap">

          <div style="padding: 4px">
            <q-icon name="bi-journal"
              :style="getStyleForTitlebar"
              size="19px" />
          </div>

          <div class="q-pl-sm"
            :style="getStyleForTitlebar">
            Diary
          </div>
        </div>
      </div>
      <div class="title-bar-controls">
        <div class="row justify-between items-center no-wrap text-center">
          <q-btn class="no-box-shadow q-mr-xs text-center"
            icon="bi-calendar-event"
            :ripple="false"
            size="12px"
            unelevated
            color="
            transparent">
            <q-popup-proxy transition-show="scale"
              transition-hide="scale">
              <q-date v-model="formattedDate">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup
                    label="Close"
                    flat />
                  <q-btn label="today"
                    flat
                    @click="setDateToToday()" />

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
      </div>
    </template>

    <template v-slot:content-without-scrollarea>
      <div class="bookmark"
        v-if="viewingMode === 'view' && false"></div>
      <!-- DAY SELECTION -->
      <div class="row justify-center items-center text-center ">
        <!-- today, yesterday, x days ago, x days ahead... -->
        <div class="col-12 q-pt-xs ">
          <div :style="getSubtitleStyle">
            {{ getSubtitle }}</div>
        </div>
      </div>

      <div class="q-px-sm">
        <q-splitter v-model="splitterModel"
          :limits="[1, Infinity]"
          unit="px"
          horizontal
          color="transparent"
          :style="getStyleForSplitter"
          :separator-style="getStyleForSplitterSeparator">
          <template v-slot:before>
            <div>
              <!-- EVENT SECTION -->
              <TheSectionForEvents v-if="!isDiaryEntryShownInFullscreen && getDiaryEntry != undefined"
                :backgroundColor="getCardBackgroundColor"
                :diaryEntry="getDiaryEntry"
                :splitterModel="splitterModel"
                :isDiarySectionVisible="isDiarySectionVisible"
                @hide-events="hideEvents"
                @show-events="showEvents"
                @go-to-event-set-to-creation-mode="goToEventSetToCreationMode"
                @go-to-event-set-to-editing-mode="goToEventSetToEditingMode">
              </TheSectionForEvents>
            </div>
          </template>

          <template v-slot:separator>
            <q-avatar flat
              text-color="white"
              size="40px"
              icon="bi-grip-horizontal" />
          </template>

          <template v-slot:after>
            <!-- DIARY SECTION -->
            <TheSectionForDiary v-if="!isDiaryEntryShownInFullscreen"
              :backgroundColor="getCardBackgroundColor"
              :class="getDiarySectionClass"
              :diaryEntry="getDiaryEntry"
              :viewingMode="viewingMode"
              @change-view="changeViewMode"
              @save-changes="saveChangesToEntry"
              @enter-fullscreen-mode="enterFullscreenMode"
              @go-to-event-set-to-creation-mode="goToEventSetToCreationMode">
            </TheSectionForDiary>

            <!-- DIARY SECTION FULLSCREEN -->
            <div v-if="isDiaryEntryShownInFullscreen"
              class="q-px-xs q-pt-md">
              <div class="row justify-end q-pb-md">
                <div class="col-4  text-right"></div>
                <ButtonForDiarySection textColor="white"
                  icon="bi-chevron-left"
                  label="back"
                  :isShowingLabel="true"
                  class="text-right"
                  :style="$store.getters['layout/getStyleForDiarySectionButton']"
                  @click-button="exitFullscreen"></ButtonForDiarySection>
              </div>
              <BaseCard :backgroundColor="getCardBackgroundColor"
                class="text-justify">
                <template v-slot:content>
                  <q-item>
                    <q-item-section v-html="editorHTMLContent"> </q-item-section>
                  </q-item>
                </template>
              </BaseCard>
            </div>
          </template>

        </q-splitter>



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
import BaseCard from "src/components/ui/BaseCard.vue";
import BaseTooltip from "src/components/ui/BaseTooltip.vue";
import ButtonForDiarySection from "src/components/diary/Base/ButtonForDiarySection.vue";

export default {
  name: "diary",
  components: {
    TheSectionForEvents,
    TheSectionForDiary,
    BasePage,
    BaseButtonForTitleBar,
    BaseCard,
    BaseTooltip,
    ButtonForDiarySection
  },
  data() {
    return {
      viewingMode: "view", // is either set to 'view' or 'edit'
      isDiaryEntryShownInFullscreen: false,
      isDiarySectionVisible: true, //if false, status section is shown
      editorHTMLContent: "",
      getDate: this.$store.state.data.lastSelectedDate,
      day: "TODAY",
      splitterModel: 1,
      splitterModelDefaultHeight: 40,
    };
  },
  watch: {
    /* Whenever the amount of event 
    */
    getEventCount(newLength) {
      console.log("created or deleted event... setting stuff:");
      if (newLength > 0) {
        this.splitterModel = 208;
      } else {
        this.splitterModel = this.splitterModelDefaultHeight + 100;
      }
    },
    // whenever splitter style changes, we adjust the height
    getStyleForSplitterSeparator(style) {
      if (style["display"] === "none") {
        this.splitterModel = 1;
      } else {
        this.splitterModel = this.splitterModelDefaultHeight;
      };
    },
    // TODO: kann nachher weg
    splitterModel(procent) {
      console.log("Splitter px: ", procent);
    },
    // TODO: set to edit mode on today
    // whenever getDate gets updated, it updates lastSelectedDate inside the store
    getDate(newDate) {
      this.$store.commit("data/updateLastSelectedDate", newDate);
      // Case 1: Entry exists
      if (this.getDiaryEntry != undefined && this.getDiaryEntry.editor != "") {
        if (this.getEventCount > 0) {
          this.splitterModel = 40 + 130 + 30; //132 card size
        }
        this.editorHTMLContent = this.getDiaryEntry.editor;
        // Case 2: No Diary Entry, but events exist.
      } else if (this.getDiaryEntry != undefined && this.getDiaryEntry.editor === "") {
        this.editorHTMLContent =
          "<div style=''>There is no diary entry yet.&nbsp;&nbsp;</div><div style='text-align: right;'><span style='color: rgb(85, 85, 85); font-family: arial, sans-serif; font-size: 25px; text-align: center;'>However... </span><span style='text-align: center;'>you added events!</span></div><div><span style='background-color: rgb(201, 204, 210); font-family: arial, sans-serif; font-size: 25px; text-align: center;'>(=🝦 ༝ 🝦=)</span><br></div>";
        this.splitterModel = 40;
        // Case 3: No events, no diary entry.
      } else {
        if (this.getCountOfDaysAwayFromToday === -0) {
          console.log("ITS TODAY MATE");
          //this.viewingMode = 'edit';
        }
        this.editorHTMLContent =
          "<div style='text-align: center;'>There is no diary entry for this day yet.&nbsp;</div><div style='text-align: center;'><span style='background-color: rgb(201, 204, 210); font-family: arial, sans-serif; font-size: 25px;'>( ﾉ･ｪ･ )ﾉ</span></div>";
      }
    },
  },
  computed: {
    getStyleForDiaryContainer() {
      let style = {};
      style['height'] = this.$store.state.layout.height * 0.55 + "px";
      return style;
    },
    getEventCount() {
      if (this.getDiaryEntry != undefined) {
        return this.getDiaryEntry.events.length;
      }
      else {
        return 0;
      }
    },
    getStyleForSplitter() {
      let style = {};
      style['height'] = this.$store.state.layout.height * 0.74 + "px";
      return style;
    },
    getStyleForSplitterSeparator() {
      let style = {};
      if (this.getDiaryEntry != undefined && !this.isDiaryEntryShownInFullscreen) {
        if (this.viewingMode === 'edit') {
          style["display"] = "none";
        } else {
          style["z-index"] = "1";
        }
      } else {
        style["display"] = "none";
      }
      return style;
    },
    getCardBackgroundColor() {
      return this.$store.state.layout.diaryCardBackgroundColor;
    },
    getStyleForDayInTitlebar() {
      let style = {};
      style["font-size"] = "1.15em";
      style["font-family"] = "Pixelated MS Sans Serif";
      style["font-weight"] = 700;
      style["text-shadow"] = this.$store.getters['layout/getLowOpacityShadowForAccent2'];
      return style;
    },
    getStyleForTitlebar() {
      let style = {};
      style["text-shadow"] = this.$store.state.layout.accent2 + this.$store.state.layout.lowOpacity + " 2px 2px 2px";
      //style["text-family"] = this.$store.state.layout.nonDefaultFont;
      style["color"] = "white";
      style["font-weight"] = "700";
      return style;
    },
    isDiaryTitlebarShowingDay() {
      return this.$store.state.layout.isDiaryTitlebarShowingDay;
    },
    getSubtitle() {
      let subtitle = this.formatDate(this.getDate);
      subtitle = subtitle.substring(0, subtitle.length - 6);

      if (this.$store.state.layout.isDiaryCountingDays) {
        if (this.isDiaryTitlebarShowingDay) {
          return this.getDay
        };
        return subtitle + " - " + this.getDay
      } else {
        if (!this.isDiaryTitlebarShowingDay) {
          return this.formatDate(this.getDate);
        } else {
          return "";
        }
      }
    },
    getSubtitleStyle() {
      let style = {};
      style["font-size"] = "1.15em";
      style["color"] = "white";
      if (this.$store.state.layout.isDiarySubtitleStyleSetToAlternative) {
        style["text-shadow"] = "2px 0 " + this.$store.state.layout.diarySubtitleColor
          + ", -2px 0 " + this.$store.state.layout.diarySubtitleColor
          + ", 0 2px " + this.$store.state.layout.diarySubtitleColor
          + ", 0 -2px " + this.$store.state.layout.diarySubtitleColor
          + ", 1px 1px " + this.$store.state.layout.diarySubtitleColor
          + ", -1px -1px " + this.$store.state.layout.diarySubtitleColor
          + ", 1px -1px " + this.$store.state.layout.diarySubtitleColor
          + ", -1px 1px " + this.$store.state.layout.diarySubtitleColor;
      } else {
        style["text-shadow"] = "var(--q-info) 2px 2px 2px"; // für helle hintergründe, standard
      }
      return style;
    },
    diaryMode() {
      return this.$store.state.layout.diaryMode;
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
        return "Today";
      } else if (date.isSameDate(this.getDate, yesterday, unit)) {
        return "Yesterday";
      } else if (date.isSameDate(this.getDate, tomorrow, unit)) {
        return "Tomorrow";
      } else {
        if (diff < -1) {
          return Math.abs(diff) + " days from now";
        }
        return diff + " days ago";
      }
    },
  },
  methods: {
    hideEvents() {
      this.splitterModel = this.splitterModelDefaultHeight;
    },
    showEvents() {
      this.splitterModel = 570;
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

.title-bar-height {
  height: 28px;
}

.date-picker-button {
  text-transform: none;
  font-size: 1.2em;
}

.subtitle {
  margin-top: -8px;
}

.selected-date {
  font-size: 12.5px;
  margin-top: 1px;
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
