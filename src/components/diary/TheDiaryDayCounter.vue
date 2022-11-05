<template>
  <div class="row justify-center items-center text-center ">
    <!-- today, yesterday, x days ago, x days ahead... -->
    <div class="col-12 q-pt-xs ">
      <div class="row items-center"
        :style="subtitleStyle">
        <div class="col-12">{{ subtitle }}</div>
        <div class="col-12"
          :style="styleForDayCounter">{{ dayCounter }}</div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "TheDiaryDayCounter",
  emits: [],
  components: {},
  props: {
    day: String,
    dateForSubtitle: String,
    diaryMode: String,
    dayCounterFontSize: {
      type: String,
      default: "12px",
    },
    dateFontSize: {
      type: String,
      default: "1.15em",
    },
  },
  data() {
    return {
    };
  },
  methods: {
    addToDate(number) {
      this.$emit("add-to-date", number);
    }
  },
  computed: {
    dayCounter() {
      if (this.$store.state.layout.isDiaryCountingDays) {
        return this.day
      } else {
        return "";
      }
    },
    isDiaryTitlebarShowingDay() {
      return this.$store.state.layout.isDiaryTitlebarShowingDay;
    },
    subtitle() {
      let subtitle = this.dateForSubtitle;
      subtitle = subtitle.substring(0, subtitle.length - 6);
      if (this.isDiaryTitlebarShowingDay) {
        return ""
      } else {
        return this.dateForSubtitle;
      }
    },
    subtitleStyle() {
      let style = {};
      style["font-size"] = this.dateFontSize;
      style["color"] = "white";

      if (this.diaryMode != 'clear') {
        style["margin-top"] = "10px";
      }

      style["text-shadow"] = this.$store.getters["layout/diaryShadowForFloatingElements"]["text-shadow"];
      return style;
    },
    styleForDayCounter() {
      return { "font-size": this.dayCounterFontSize };
    },

  }
};
</script>





