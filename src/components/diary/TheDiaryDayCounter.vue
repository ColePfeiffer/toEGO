<template>
  <div class="row justify-center items-center text-center ">
    <!-- today, yesterday, x days ago, x days ahead... -->
    <div class="col-12 q-pt-xs ">
      <div class="row items-center"
        :style="subtitleStyle">
        <div class="col-12">{{ subtitle }}</div>
        <div class="col-12"
          style="font-size: 12px">{{ dayCounter }}</div>
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
      style["font-size"] = "1.15em";
      style["color"] = "white";

      if (this.diaryMode != 'clear') {
        style["margin-top"] = "10px";
      }

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
  }
};
</script>





