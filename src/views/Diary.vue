<template>
  <BasePage titleOfPage="Diary"
    :mode="diaryMode"
    :backgroundColor="$store.getters['layout/getDiaryBackgroundColor']">
    <template v-slot:titlebar>
      <TheToolbarForDiary :isDiaryTitlebarShowingDay="isDiaryTitlebarShowingDay"
        :isNavigationHighlighted="isNavigationHighlighted"
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
                  v-close-popup
                  flat
                  @click="setDateToToday()" />
              </div>
            </q-date>

          </q-popup-proxy>

        </template>
      </TheToolbarForDiary>
    </template>

    <template v-slot:content-without-scrollarea>
      <BaseGhostHelper v-if="(!$store.state.data.userSettings.hasFinishedHelpForDiaryForTheFirstTime)"
        :messages="messages"
        :numberOfMessages="numberOfMessages"
        @show-next="showNext"
        @show-last="showLast"
        @finish="finish"></BaseGhostHelper>
      <div class="diary-content"
        :style="styleForDiaryContent">
        <!-- Only visible, if showing day. -->
        <TheDiaryDayCounter :day="daysFromNowOutput"
          :dateForSubtitle="dateForLabel"
          :diaryMode="diaryMode"></TheDiaryDayCounter>
        <!-- Header for Note Section -->
        <TheHeaderForNoteSection v-if="viewingMode != 'edit' && !isDiaryEntryShownInFullscreen && !isDiaryEntryUndefined"
          :style="styleHeaderNotes"
          :diaryEntry="diaryEntry"
          :splitterModel="splitterModel"
          @go-to-note-set-to-creation-mode="goToNoteSetToCreationMode"
          @show-notes="showNotes"
          @hide-notes="hideNotes" />
        <BaseSplitter :splitterModel="splitterModel"
          :isSplitterDisabled="isSplitterDisabled"
          :isSplitterVisible="isSplitterVisible"
          :hasExtraMargin="isDiaryModeSetToRetro">
          <template v-slot:splitter-content-before>
            <TheSectionForNotes v-if="isNoteSectionVisible"
              :backgroundColor="cardBackgroundColor"
              :diaryEntry="diaryEntry"
              :isShowingExpandButton="isShowingExpandButtonAsComputed"
              @go-to-note-set-to-creation-mode="goToNoteSetToCreationMode"
              @edit-note="goAndEditNote" />
          </template>
          <template v-slot:splitter-content-separator>
            <TheHeaderForDiarySection :style="styleHeaderDiary"
              :diaryEntry="diaryEntry"
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
          <template v-slot:splitter-content-after>
            <TheSectionForDiary v-if="!isDiaryEntryShownInFullscreen"
              :backgroundColor="cardBackgroundColor"
              :diaryEntry="diaryEntry"
              :viewingMode="viewingMode"
              :class="styleForDiarySection"
              :changeData="changeData"
              :isCreatingNewDiaryEntry="isCreatingNewDiaryEntry"
              @save-editor="saveChangesToEntry"
              @set-change-data-editor="setChangeDataEditor"
              @go-to-note-set-to-creation-mode="goToNoteSetToCreationMode"
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
        </BaseSplitter>
      </div>
    </template>

    <template v-slot:footer>
      <BaseButtonForFooter v-if="viewingMode === 'edit'"
        buttonText="Discard"
        style="font-size: 11px; border-radius: 0px; max-height: 25px; margin-right: 5px"
        @click-button="discard">
      </BaseButtonForFooter>
      <BaseButtonForFooter v-if="viewingMode === 'edit'"
        style="font-size: 11px; border-radius: 0px; max-height: 25px;"
        buttonText="Save"
        @click-button="saveChangesToEntry">
      </BaseButtonForFooter>
    </template>
  </BasePage>
</template>

<script>
import { date } from "quasar";
import BaseSplitter from "src/components/common/BaseSplitter.vue";
import TheSectionForNotes from "src/components/Diary/TheSectionForNotes.vue";
import TheSectionForDiary from "src/components/Diary/TheSectionForDiary.vue";
import BasePage from "src/components/common/BasePage.vue";
import BaseCard from "src/components/common/BaseCard.vue";
import ButtonForDiarySection from "src/components/Diary/Base/ButtonForDiarySection.vue";
import TheHeaderForNoteSection from "src/components/Diary/TheHeaderForNoteSection.vue";
import TheHeaderForDiarySection from "src/components/Diary/TheHeaderForDiarySection.vue";
import BaseButtonForFooter from "src/components/common/BaseButtonForFooter.vue";
import TheToolbarForDiary from "src/components/Diary/TheToolbarForDiary.vue";
import TheDiaryDayCounter from "src/components/Diary/TheDiaryDayCounter.vue";
import BaseGhostHelper from "src/components/Helper/BaseGhostHelper.vue";

export default {
  name: "diary",
  components: {
    BaseSplitter,
    TheSectionForNotes,
    TheSectionForDiary,
    BasePage,
    BaseCard,
    ButtonForDiarySection,
    TheHeaderForNoteSection,
    TheHeaderForDiarySection,
    BaseButtonForFooter,
    TheToolbarForDiary,
    TheDiaryDayCounter,
    BaseGhostHelper
  },
  data() {
    return {
      isShowingExpandButton: false,
      isCreatingNewDiaryEntry: false,
      isDiaryEntryShownInFullscreen: false,
      isNoteSectionSetToFullscreen: false,
      viewingMode: "view", // is either set to 'view' or 'edit'
      date: this.$store.state.data.lastSelectedDate,
      day: "TODAY",
      splitterModel: 1,
      splitterHeightDefault: 1,
      splitterHeightShowingNonExpandedNote: 160,
      editorHTMLContent: "",
      changeData: {},
      messages: [" "],
      numberOfMessages: 5,
      isNavigationHighlighted: false,
      isCalendarHighlighted: false,
    };
  },


  watch: {
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
    numberOfNotes: {
      immediate: true,
      handler(newCount) {
        if (newCount === 9999 || this.isDiaryEntryShownInFullscreen) {
          this.splitterModel = this.splitterHeightDefault;
        } else if (newCount > 0) {
          this.splitterModel = this.splitterHeightShowingNonExpandedNote;
        } else {
          this.splitterModel = this.splitterHeightDefault;
        }
      },
    },
    // whenever date gets updated, it updates lastSelectedDate inside the store
    date: {
      immediate: true,
      handler(newDate) {
        this.$store.commit("data/updateLastSelectedDate", newDate);
        // Case 1: Entry exists
        if (this.isNoteSectionSetToFullscreen) {
          this.isShowingExpandButton = true;
        } else {
          this.isShowingExpandButton = false;
        }
        if (!this.isDiaryEntryUndefined && this.diaryEntry.editor != "") {
          this.editorHTMLContent = this.diaryEntry.editor;
          // Case 2: No Diary Entry, but events exist.
        } else if (!this.isDiaryEntryUndefined && this.diaryEntry.editor === "") {
          this.editorHTMLContent =
            "<div style=''>There is no diary entry yet.&nbsp;&nbsp;</div><div style='text-align: right;'><span style='color: rgb(85, 85, 85); font-family: arial, sans-serif; font-size: 25px; text-align: center;'>However... </span><span style='text-align: center;'>you added events!</span></div><div><span style='background-color: rgb(201, 204, 210); font-family: arial, sans-serif; font-size: 25px; text-align: center;'>(=🝦 ༝ 🝦=)</span><br></div>";
          // Case 3: No events, no diary entry.
        } else {
          this.editorHTMLContent =
            "<div style='text-align: center;'>There is no diary entry for this day yet.&nbsp;</div><div style='text-align: center;'><span style='background-color: rgb(201, 204, 210); font-family: arial, sans-serif; font-size: 25px;'>( ﾉ･ｪ･ )ﾉ</span></div>";
        }
      },
    }
  },
  computed: {
    isShowingExpandButtonAsComputed() {
      return this.isShowingExpandButton;
    },
    isDiaryEntryUndefined() {
      if (this.diaryEntry === undefined) {
        return true;
      } else {
        return false;
      }
    },
    isSplitterDisabled() {
      if (this.viewingMode === 'edit') {
        return true;
      } else {
        return false;
      }
    },
    isSplitterVisible() {
      if (this.isDiaryEntryShownInFullscreen || this.isDiaryEntryUndefined || this.viewingMode === 'edit') {
        return false;
      } else {
        return true;
      }
    },
    isNoteSectionVisible() {
      return this.isSplitterVisible;
    },
    dateForLabel() {
      return this.formatDate(this.date);
    },
    pastedText() {
      return this.$store.state.data.pastedText;
    },
    diaryEntry() {
      return this.$store.getters["diaryentries/getDiaryEntryByDate"](this.date);
    },
    daysFromNowOutput() {
      let today = Date.now();
      let yesterday = date.subtractFromDate(Date.now(), { days: 1 });
      let tomorrow = date.addToDate(Date.now(), { days: 1 });
      let unit = "day";

      let diff = this.getNumberOfDaysAwayFromToday;
      // date.isSameDate returns true when date1 and date2 are on the same day
      if (date.isSameDate(this.date, today, unit)) {
        return "Today";
      } else if (date.isSameDate(this.date, yesterday, unit)) {
        return "Yesterday";
      } else if (date.isSameDate(this.date, tomorrow, unit)) {
        return "Tomorrow";
      } else {
        if (diff < -1) {
          return Math.abs(diff) + " days from now";
        }
        return diff + " days ago";
      }
    },
    // returns the number of days away from today... minus means its in the future, positive number means its in the past. zero means today.
    getNumberOfDaysAwayFromToday() {
      let unit = "day";
      let diff = date.getDateDiff(this.date, Date.now(), unit);
      diff = diff * -1;
      return diff;
    },
    notes() {
      if (this.diaryEntry != undefined) {
        return this.$store.getters['diaryentries/getNotesAsRevertedArrayByDiaryEntryID'](this.diaryEntry.id);
      } else {
        return [];
      }
    },
    numberOfNotes() {
      if (!this.isDiaryEntryUndefined) {
        let notesAsArray = this.notes;
        if (notesAsArray != undefined) {
          return notesAsArray.length;
        } else {
          return 0;
        }
      }
      else {
        return 9999;
      }
    },
    formattedDate: {
      get() {
        return date.formatDate(this.date, "YYYY/MM/DD");
      },
      set(value) {
        this.date = value;
      },
    },
    // For Styling
    diaryMode() {
      return this.$store.state.layout.diaryMode;
    },
    isDiaryTitlebarShowingDay() {
      return this.$store.state.layout.isDiaryTitlebarShowingDay;
    },
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
      if (this.isDiaryEntryUndefined) {
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
    cardBackgroundColor() {
      if (this.$store.state.layout.isDiaryInputStyleSetToTodaysNotes) {
        return this.$store.state.layout.noteBackgroundColor;
      } else {
        return this.$store.state.layout.diaryCardBackgroundColor;
      }
    },
  },
  methods: {
    finish() {
      this.messages = [" "];
      if (!this.$store.state.data.userSettings.hasFinishedHelpForDiaryForTheFirstTime) {
        this.$store.dispatch("data/setHelpForDiaryToCompleted", true);
      }
    },
    showLast() {
      this.messages.pop();
      if (this.messages.length === 4) {
        this.isNavigationHighlighted = true;
      } else {
        this.isNavigationHighlighted = false;
      }
    },
    showNext(index) {
      if (index === 1) {
        this.messages = [];
        this.messages.push("This is where you can look through your diary, where you get to plan and review.");
      } else if (index === 2) {
        this.messages.push("Notes you create during the day will show up here. At the end of the day you could read them again, and reflect.");
      } else if (index === 3) {
        this.messages.push("Or you could answer a couple of questions from a template. Or write about anything you want.");
      } else if (index === 4) {
        this.messages.push("Navigate days by using these buttons. The dot brings you back to today. Click on the calendar symbol to pick a specific date.");
        this.isNavigationHighlighted = true;
      } else if (index === 5) {
        this.isNavigationHighlighted = false;
        this.messages.push("That's all for now. Goodbye.");
      } else {
        this.messages = [" "];
      }
    },
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
      };
    },
    createDiaryEntry() {
      this.isCreatingNewDiaryEntry = true;
      this.changeViewMode('edit');
      this.resetChangeData();

      // applying default template
      let defaultTemplate =
        this.$store.getters["templates/getDefaultTemplate"]("DIARY");
      if (defaultTemplate != undefined) {
        this.changeData.editor = defaultTemplate;
      }
    },
    hideNotes() {
      if (this.diaryEntry != undefined) {
        let payload = {
          diaryEntry: this.diaryEntry,
          isExpanded: false,
        };
        this.$store.dispatch("diaryentries/setExpandedStatusOfAllNotesForDiaryID", payload);
      }
      this.$store.commit("data/setPlusFabButtonOpened", false);
      this.isNoteSectionSetToFullscreen = false;
      this.isShowingExpandButton = false;
      this.splitterModel = this.splitterHeightDefault;
    },
    showNotes() {
      let payload = {
        diaryEntry: this.diaryEntry,
        isExpanded: true,
      };
      this.$store.dispatch("diaryentries/setExpandedStatusOfAllNotesForDiaryID", payload);
      this.$store.commit("data/setPlusFabButtonOpened", false);
      this.isNoteSectionSetToFullscreen = true;
      this.isShowingExpandButton = true;
      this.splitterModel = 570;
    },
    setDateToToday() {
      this.date = Date.now();
    },
    enterFullscreenMode(editor) {
      this.splitterModel = 1;
      this.isDiaryEntryShownInFullscreen = true;
      this.editorHTMLContent = editor;
    },
    exitFullscreen() {
      this.isDiaryEntryShownInFullscreen = false;
    },
    goToNoteSetToCreationMode() {
      this.$store.commit("data/setModeForNewEvent", "CREATE");
      this.$router.push("Event");
    },
    goAndEditNote(note) {
      this.$store.commit("diaryentries/updateCurrentNoteForEditing", note);
      this.$store.commit("data/setModeForNewEvent", "EDIT");
      this.$router.push("Event");
      /* OLD
            let diaryEntryRefWhereEventIsStoredAt = this.$store.getters[
        "diaryentries/getDiaryEntryByDate"
      ](note.date);

      this.$store.commit("diaryentries/updateCurrentNote", {
        eventData: note,
        diaryEntryRef: diaryEntryRefWhereEventIsStoredAt,
      });
      this.$store.commit("data/setModeForNewEvent", "EDIT");
      this.$router.push("Event");
      */

    },
    saveChangesToEntry() {
      this.changeViewMode('view');
      this.isCreatingNewDiaryEntry = false;
      let payload;
      if (this.isDiaryEntryUndefined) {
        let cleanedEditorText = this.changeData.editor.replaceAll("&nbsp;", '');
        cleanedEditorText = cleanedEditorText.replaceAll(" ", '');
        if (cleanedEditorText != "") {
          // if editor isn't empty and doesn't just contain whitespace
          let newEntry = this.changeData;
          newEntry.date = this.date;
          this.$store.dispatch("diaryentries/addEntry", newEntry);
        } else {
          this.$q.notify({
            icon: "bi-exclamation-square",
            color: "secondary",
            textColor: "black",
            message: "Please write something.",
          });
        }
      } else {
        let updatedEntry = Object.assign({}, this.diaryEntry);
        updatedEntry.editor = this.changeData.editor;
        this.$store.dispatch("diaryentries/firebaseUpdateDiaryEntry", updatedEntry);
      }
      this.resetChangeData();
    },
    subtractFromDate(days) {
      if (this.diaryEntry != undefined) {
        this.hideNotes();
      }
      this.date = date.subtractFromDate(this.date, { days: days });
    },
    addToDate(days) {
      if (this.diaryEntry != undefined) {
        this.hideNotes();
      }
      this.date = date.addToDate(this.date, { days: days });
    },
    formatDate(rawDate) {
      let formattedString = date.formatDate(rawDate, "MMMM  Do, YYYY");
      return formattedString;
    },
    changeViewMode(mode) {
      if (mode === "edit") {
        this.$store.commit("data/toggleDisableOnFabButton", true);
        this.splitterModel = this.splitterHeightDefault;
      } else {
        this.$store.commit("data/toggleDisableOnFabButton", false);
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
