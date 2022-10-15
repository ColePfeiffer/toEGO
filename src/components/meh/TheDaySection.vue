<template>
  <div class="q-px-md q-pt-lg">
    <div class="row justify-between items-center text-center q-py-md q-pb-xl maxHeight">
      <!-- Date + Calendar Button -->
      <div class="col-12">
        <q-btn class="datePickerButton text-white"
          no-wrap
          flat
          icon-right="event"
          :style="$store.state.data.sTextAccentShadow"
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
      <!-- go back button -->
      <div class="col-3 text-left">
        <q-btn v-if="viewingMode === 'view'"
          class="text-white"
          flat
          icon="bi-chevron-left"
          size="12px"
          :style="$store.state.data.sTextAccentShadow"
          @click="subtractFromDate(1)"></q-btn>
        <q-btn v-if="viewingMode === 'view' && getCountOfDaysAwayFromToday<0"
          class="text-white q-pl-none"
          size="12px"
          flat
          icon="bi-chevron-double-left"
          :style="$store.state.data.sTextAccentShadow"
          @click="setDateToToday()">
        </q-btn>
      </div>
      <!-- today, yesterday, x days ago, x days ahead... -->
      <div class="col-6">
        <div class="text-white smallText "
          :style="$store.state.data.sTextAccentShadow">{{ getDay }}</div>
      </div>
      <!-- go forward button -->
      <div class="col-3 text-right">
        <q-btn v-if="viewingMode === 'view' && getCountOfDaysAwayFromToday>0"
          class="text-white q-pr-none"
          size="12px"
          flat
          icon="bi-chevron-double-right"
          :style="$store.state.data.sTextAccentShadow"
          @click="setDateToToday()">
        </q-btn>
        <q-btn v-if="viewingMode === 'view'"
          class="text-white "
          flat
          icon="bi-chevron-right"
          size="12px"
          :style="$store.state.data.sTextAccentShadow"
          @click="addToDate(1)"></q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { date } from "quasar";

export default {
  name: "TheDaySection",
  emits: ["goToPageNewEventSetToCreationMode", "setVisibilityOfDiarySection"],
  props: {
    viewingMode: Boolean,
    // old
    isDiarySectionVisible: Boolean,
    diaryEntry: Object,
    showMessageIfThereAreNoEvents: {
      type: Boolean,
      default: true,
    },
    isShowingExpandButtonOfEventCard: {
      type: Boolean,
      default: true,
    },
  },
  components: {
  },
  data() {
    return {
      getDate: this.$store.state.data.lastSelectedDate
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

    getCountOfDaysAwayFromToday() {
      // returns the number of days away from today... minus means its in the future, positive number means its in the past. zero means today.
      let unit = "day";
      let diff = date.getDateDiff(this.getDate, Date.now(), unit);
      diff = diff * -1;
      return diff;
    },
    formattedDate: {
      get() {
        return date.formatDate(this.getDate, "YYYY/MM/DD");
      },
      set(value) {
        this.getDate = value;
      },
    },
  },
  methods: {
    subtractFromDate(days) {
      this.getDate = date.subtractFromDate(this.getDate, { days: days });
    },

    addToDate(days) {
      this.getDate = date.addToDate(this.getDate, { days: days });
    },
    setDateToToday() {
      this.getDate = Date.now();
    },
    formatDate(rawDate) {
      let formattedString = date.formatDate(rawDate, "MMMM  Do, YYYY");
      return formattedString;
    },
  },

}
</script>

<style scoped>
.datePickerButton {
  text-transform: none;
}
</style>
