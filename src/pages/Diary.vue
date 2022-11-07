<template>
  <BasePage titleOfPage="Diary"
    :mode="diaryMode"
    :backgroundColor="$store.getters['layout/getDiaryBackgroundColor']">
    <template v-slot:titlebar>
      <TheToolbarForDiary :isDiaryTitlebarShowingDay="isDiaryTitlebarShowingDay"
        :viewingMode="viewingMode"
        :getNumberOfDaysAwayFromToday="getNumberOfDaysAwayFromToday"
        :dateForLabel="dateForLabel"
        @subtract-from-date="subtractFromDate"
        @set-today="setDateToToday"
        @add-to-date="addToDate">
        <template v-slot:calendar>
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

        </template>
      </TheToolbarForDiary>
    </template>

    <template v-slot:content-without-scrollarea>
      <div class="diary-content"
        :style="styleForDiaryContent">
        <!-- Only visible, if showing day. -->
        <TheDiaryDayCounter :day="getDay"
          :dateForSubtitle="dateForLabel"
          :diaryMode="diaryMode"></TheDiaryDayCounter>
        <!-- Header for Note Section -->
        <TheHeaderForNoteSection
          v-if="viewingMode != 'edit' && !isDiaryEntryShownInFullscreen && getDiaryEntry != undefined"
          :style="styleHeaderNotes"
          :diaryEntry="getDiaryEntry"
          :splitterModel="splitterModel"
          @go-to-event-set-to-creation-mode="goToEventSetToCreationMode"
          @go-to-event-set-to-editing-mode="goToEventSetToEditingMode"
          @show-events="showEvents"
          @hide-events="hideEvents" />
        <!-- Q-Splitter -->
        <div>
          <q-splitter v-model="splitterModel"
            :limits="[1, Infinity]"
            unit="px"
            horizontal
            color="transparent"
            :style="styleForSplitter"
            :separator-style="styleForSplitterSeparator">
            <!-- Section for Notes -->
            <template v-slot:before>
              <TheSectionForNotes
                v-if="!isDiaryEntryShownInFullscreen && getDiaryEntry != undefined && viewingMode != 'edit'"
                :backgroundColor="cardBackgroundColor"
                :diaryEntry="getDiaryEntry"
                @go-to-event-set-to-creation-mode="goToEventSetToCreationMode"
                @go-to-event-set-to-editing-mode="goToEventSetToEditingMode" />
            </template>
            <!-- Q-Seperator, including Header for Diary Section -->
            <template v-slot:separator>
              <div v-if="this.viewingMode != 'edit'"
                :style="styleForBorderSeparator"></div>
              <q-avatar v-if="this.viewingMode != 'edit'"
                flat
                class="grab-button"
                text-color="white"
                size="40px"
                icon="bi-grip-horizontal" />
              <TheHeaderForDiarySection :style="styleHeaderDiary"
                :diaryEntry="getDiaryEntry"
                :viewingMode="viewingMode"
                :changeData="changeData"
                :isCreatingNewDiaryEntry="isCreatingNewDiaryEntry"
                @set-change-data="setChangeData"
                @change-view="changeViewMode"
                @reset-change-data="resetChangeData"
                @create-diary-entry="createDiaryEntry"
                @set-change-data-editor="setChangeDataEditor"
                @enter-fullscreen-mode="enterFullscreenMode"></TheHeaderForDiarySection>
            </template>
            <!-- Section for Diary -->
            <template v-slot:after>
              <TheSectionForDiary v-if="!isDiaryEntryShownInFullscreen"
                :backgroundColor="cardBackgroundColor"
                :diaryEntry="getDiaryEntry"
                :viewingMode="viewingMode"
                :class="styleForDiarySection"
                :changeData="changeData"
                :isCreatingNewDiaryEntry="isCreatingNewDiaryEntry"
                @save-editor="saveChangesToEntry"
                @set-change-data-editor="setChangeDataEditor"
                @go-to-event-set-to-creation-mode="goToEventSetToCreationMode"
                @create-diary-entry="createDiaryEntry">
              </TheSectionForDiary>

              <!-- DIARY SECTION FULLSCREEN -->
              <div v-if="isDiaryEntryShownInFullscreen"
                class="q-pt-md">
                <div class="row justify-end q-pb-md">
                  <div class="col-4  text-right"></div>
                  <ButtonForDiarySection textColor="white"
                    icon="bi-chevron-left"
                    label="back"
                    :isShowingLabel="true"
                    class="text-right"
                    :style="$store.getters['layout/diarySectionButton']"
                    @click-button="exitFullscreen"></ButtonForDiarySection>
                </div>
                <BaseCard :backgroundColor="cardBackgroundColor"
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
      </div>
    </template>

    <template v-slot:footer>
      <BaseButtonForDialogFooter v-if="viewingMode === 'edit'"
        buttonText="Discard"
        style="font-size: 11px; border-radius: 0px; max-height: 25px; margin-right: 5px"
        @click-button="discard">
      </BaseButtonForDialogFooter>
      <BaseButtonForDialogFooter v-if="viewingMode === 'edit'"
        style="font-size: 11px; border-radius: 0px; max-height: 25px;"
        buttonText="Save"
        @click-button="saveChangesToEntry">
      </BaseButtonForDialogFooter>
    </template>
  </BasePage>
</template>

<script>
import { date } from "quasar";
import TheSectionForNotes from "src/components/diary/TheSectionForNotes.vue";
import TheSectionForDiary from "src/components/diary/TheSectionForDiary.vue";
import { useQuasar } from "quasar";
import BasePage from "src/components/ui/BasePage.vue";
import BaseButtonForTitleBar from "src/components/ui/BaseButtonForTitleBar.vue";
import BaseCard from "src/components/ui/BaseCard.vue";
import BaseTooltip from "src/components/ui/BaseTooltip.vue";
import ButtonForDiarySection from "src/components/diary/Base/ButtonForDiarySection.vue";
import TheHeaderForNoteSection from "src/components/diary/TheHeaderForNoteSection.vue";
import TheHeaderForDiarySection from "src/components/diary/TheHeaderForDiarySection.vue";
import BaseButtonForDialogFooter from "src/components/ui/BaseButtonForDialogFooter.vue";
import TheToolbarForDiary from "src/components/diary/TheToolbarForDiary.vue";
import TheDiaryDayCounter from "src/components/diary/TheDiaryDayCounter.vue";

export default {
  name: "diary",
  components: {
    TheSectionForNotes,
    TheSectionForDiary,
    BasePage,
    BaseCard,
    ButtonForDiarySection,
    TheHeaderForNoteSection,
    TheHeaderForDiarySection,
    BaseButtonForDialogFooter,
    TheToolbarForDiary,
    TheDiaryDayCounter
  },
  data() {
    return {
      viewingMode: "view", // is either set to 'view' or 'edit'
      editorHTMLContent: "",
      isDiaryEntryShownInFullscreen: false,
      getDate: this.$store.state.data.lastSelectedDate,
      day: "TODAY",
      splitterModel: 1,
      splitterHeightDefault: 1,
      splitterHeightShowingNonExpandedNote: 156,
      isCreatingNewDiaryEntry: false,
      changeData: {},
      isHidingEvents: false,
      isShowingEvents: false,

    };
  },
  watch: {
    splitterModel(number) {
      console.log("Splitter: ", number);
      if (number <= 93) {
        this.splitterModel = this.splitterHeightDefault;
      }
    },
    pastedText(text) {
      if (this.$store.state.data.dialogTemplateViewerIsSetToDiaryMode === true && text != "") {
        if (this.changeData.editor != "") {
          this.changeData.editor = this.changeData.editor + "<br>" + text;
        } else {
          this.changeData.editor = text;
        }
        this.$store.commit("data/setPastedText", "");
      }
    },
    // whenever note count changes, the splitter height gets adjusted. 9999 stands for "there is no diary entry for the day yet."
    numberOfNotes(newCount) {
      if (newCount === 9999) {
        this.splitterModel = this.splitterHeightDefault;
      } else if (newCount > 0) {
        console.log("Notes > 0 __ setting height");
        this.splitterModel = this.splitterHeightShowingNonExpandedNote;
      } else {
        console.log("Notes === 0 __ height: 1");
        this.splitterModel = this.splitterHeightDefault;
      }
    },
    // whenever getDate gets updated, it updates lastSelectedDate inside the store
    getDate(newDate) {
      this.$store.commit("data/updateLastSelectedDate", newDate);
      // Case 1: Entry exists
      if (this.getDiaryEntry != undefined && this.getDiaryEntry.editor != "") {
        this.editorHTMLContent = this.getDiaryEntry.editor;
        // Case 2: No Diary Entry, but events exist.
      } else if (this.getDiaryEntry != undefined && this.getDiaryEntry.editor === "") {
        this.editorHTMLContent =
          "<div style=''>There is no diary entry yet.&nbsp;&nbsp;</div><div style='text-align: right;'><span style='color: rgb(85, 85, 85); font-family: arial, sans-serif; font-size: 25px; text-align: center;'>However... </span><span style='text-align: center;'>you added events!</span></div><div><span style='background-color: rgb(201, 204, 210); font-family: arial, sans-serif; font-size: 25px; text-align: center;'>(=🝦 ༝ 🝦=)</span><br></div>";
        // Case 3: No events, no diary entry.
      } else {
        if (this.getNumberOfDaysAwayFromToday === -0) {
          console.log("ITS TODAY MATE");
        }
        this.editorHTMLContent =
          "<div style='text-align: center;'>There is no diary entry for this day yet.&nbsp;</div><div style='text-align: center;'><span style='background-color: rgb(201, 204, 210); font-family: arial, sans-serif; font-size: 25px;'>( ﾉ･ｪ･ )ﾉ</span></div>";
      }
    },
  },
  computed: {
    dateForLabel() {
      return this.formatDate(this.getDate);
    },

    pastedText() {
      return this.$store.state.data.pastedText;
    },
    getDiaryEntry() {
      return this.$store.getters["data/getDiaryEntryByDate"](this.getDate);
    },
    getDay() {
      let today = Date.now();
      let yesterday = date.subtractFromDate(Date.now(), { days: 1 });
      let tomorrow = date.addToDate(Date.now(), { days: 1 });
      let unit = "day";

      let diff = this.getNumberOfDaysAwayFromToday;
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
    getNumberOfDaysAwayFromToday() {
      // returns the number of days away from today... minus means its in the future, positive number means its in the past. zero means today.
      let unit = "day";
      let diff = date.getDateDiff(this.getDate, Date.now(), unit);
      diff = diff * -1;
      return diff;
    },

    numberOfNotes() {
      if (this.getDiaryEntry != undefined) {
        return this.getDiaryEntry.events.length;
      }
      else {
        return 9999;
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
    // For Styling
    isDiaryTitlebarShowingDay() {
      return this.$store.state.layout.isDiaryTitlebarShowingDay;
    },
    diaryMode() {
      return this.$store.state.layout.diaryMode;
    },
    areEventsShownInFullscreen() {
      return this.$store.state.data.eventsOnDiaryPageAreExpanded;
    },
    // Styles
    width() {
      return { "width": this.$store.state.layout.innerWidth + "px" };
    },
    isDiaryModeSetToRetro() {
      if (this.diaryMode === 'retro' || this.diaryMode === 'border') {
        return true;
      } else {
        return false;
      }
    },
    styleForDiaryContent() {
      if (this.isDiaryModeSetToRetro) {
        return { "padding-left": "20px", "padding-right": "20px" };
      } else {
        return {
          "padding-left": "0px",
          "padding-right": "0px"
        }
      }
    },
    styleHeaderDiary() {
      if (this.isDiaryModeSetToRetro) {
        return {
          "width": this.$store.state.layout.innerWidth * 0.93 + "px",
          "margin-top": "-8px",

        }
      } else {
        return {
          "width": this.$store.state.layout.innerWidth + "px",
          "margin-top": "-8px"
        }
      }

    },
    styleHeaderNotes() {
      if (this.isDiaryModeSetToRetro) {
        return {
          "width": this.$store.state.layout.innerWidth * 0.93 + "px",
          "margin-left": "-8px",
          "margin-right": "8px"
        }
      } else {
        return {
          "width": this.$store.state.layout.innerWidth + "px",
        }
      }
    },
    styleForDiarySection() { // adjusts the top padding
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
    styleForBorderSeparator() {
      if (this.isDiaryModeSetToRetro) {
        return {
          "width": this.$store.state.layout.innerWidth * 0.93 + "px",
          "border-top": "0.8px solid whitesmoke",
          "margin-top": "-15px",
        };
      } else {
        return {
          "width": this.$store.state.layout.innerWidth * 0.99 + "px",
          "border-top": "0.8px solid whitesmoke",
          "margin-top": "-15px",
        };
      }

    },
    styleForSplitter() {
      let style = {};
      style['height'] = this.$store.state.layout.height * 0.70 + "px";
      if (this.isDiaryModeSetToRetro) {
        style['margin-bottom'] = "10px";
        style['height'] = this.$store.state.layout.height * 0.67 + "px";
      }
      style['margin-top'] = "-5px";
      return style;
    },
    styleForSplitterSeparator() {
      let style = {};
      if ((this.getDiaryEntry != undefined || this.viewingMode === 'edit') && !this.isDiaryEntryShownInFullscreen) {
        style["z-index"] = "1";
        style["height"] = "45px";
        style["background-color"] = "transparent";
      } else {
        style["display"] = "none";
      }
      return style;
    },
    cardBackgroundColor() {
      if (this.$store.state.layout.isDiaryInputStyleSetToTodaysNotes) {
        return this.$store.state.layout.noteBackgroundColor;
      } else {
        return this.$store.state.layout.diaryCardBackgroundColor;
      }
    },



  },
  methods: {
    discard() {
      this.changeViewMode('view');
      this.resetChangeData();
    },
    setChangeData(value) {
      this.changeData = value;
    },
    setChangeDataEditor(text) {
      this.changeData.editor = text;
    },
    resetChangeData() {
      this.changeData = {
        id: "",
        date: "",
        editor: "",
        events: [],
      };
    },
    createDiaryEntry() {
      console.log("creating new diary entry...")
      this.isCreatingNewDiaryEntry = true;
      this.changeViewMode('edit');
      this.resetChangeData();

      // applying default template
      let defaultTemplate =
        this.$store.getters["data/getDefaultTemplate"]("DIARY");
      if (defaultTemplate != undefined) {
        this.changeData.editor = defaultTemplate;
      }
    },
    hideEvents() {
      this.splitterModel = this.splitterHeightDefault;
    },
    showEvents() {
      this.splitterModel = 570;
    },
    setDateToToday() {
      this.getDate = Date.now();
    },
    enterFullscreenMode(editor) {
      // TODO: splitter action!
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
    saveChangesToEntry() {
      this.changeViewMode('view');
      this.isCreatingNewDiaryEntry = false;
      let payload;
      if (this.getDiaryEntry === undefined) {

        let cleanedEditorText = this.changeData.editor.replaceAll("&nbsp;", '');
        cleanedEditorText = cleanedEditorText.replaceAll(" ", '');
        if (cleanedEditorText != "") {
          // if editor isn't empty and doesn't just contain whitespace
          let newEntry = this.changeData;
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
          newData: this.changeData,
        };
        this.$store.commit("data/updateDiaryEntry", payload);
      }
      this.resetChangeData();
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
      if (mode === "edit") {
        // set a var in store ala "isHelpClickable" false
        this.splitterModel = this.splitterHeightDefault;
        //this.createDiaryEntry();
      } else {
        this.isCreatingNewDiaryEntry = false;
      }
      this.viewingMode = mode;
    },
  },
};
</script>

<style>
.grab-button {
  margin-top: -14px;
}

.q-splitter__separator-area {
  margin-top: 13px;
}

.title-bar-height {
  height: 28px;
}

.date-picker-button {
  text-transform: none;
  font-size: 1.2em;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
</style>
