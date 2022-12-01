<template>
  <!-- Titlebar-Option: 1 -->
  <div class="fit"
    v-if="isDiaryTitlebarShowingDay">
    <div class="row justify-center items-center text-center no-wrap  full-width title-bar-height q-py-none">
      <div class="col-1 text-left">
        <BaseButtonForTitleBar v-if="viewingMode === 'view'"
          class="no-box-shadow "
          :style="styleForNavigation"
          icon="bi-chevron-left"
          size="12px"
          @click-button="subtractFromDate(1)">
          <template v-slot:tooltip>
            <BaseTooltip text="Go back"
              :delay="100"></BaseTooltip>
          </template>
        </BaseButtonForTitleBar>
      </div>
      <div class="col-1 text-left">
        <BaseButtonForTitleBar v-if="viewingMode === 'view' && getNumberOfDaysAwayFromToday < 0"
          class="q-pl-xs q-mr-xs no-box-shadow col-1"
          icon="bi-dot"
          :style="styleForNavigation"
          size="12px"
          @click-button="setDateToToday()">
          <template v-slot:tooltip>
            <BaseTooltip text="Go to today"
              :delay="100"></BaseTooltip>
          </template>
        </BaseButtonForTitleBar>
      </div>
      <!-- today, yesterday, x days ago, x days ahead... -->
      <div class="col-8 text-white">
        <q-btn class="date-picker-button text-white"
          no-wrap
          flat
          icon-right="event"
          :style="styleForDayInTitlebar"
          :label="dateForLabel">
          <slot name="calendar">
          </slot>
        </q-btn>
      </div>
      <!-- go forward button -->
      <div class="col-1 text-right">
        <BaseButtonForTitleBar v-if="viewingMode === 'view' && getNumberOfDaysAwayFromToday > 0"
          class="q-pl-none q-mr-xs no-box-shadow"
          icon="bi-dot"
          size="12px"
          @click-button="setDateToToday()">
          <template v-slot:tooltip>
            <BaseTooltip text="Go to today"
              :delay="100"></BaseTooltip>
          </template>
        </BaseButtonForTitleBar>
      </div>
      <div class="col-1 text-right">
        <BaseButtonForTitleBar v-if="viewingMode === 'view'"
          class="q-pl-none q-mr-xs no-box-shadow"
          icon="bi-chevron-right"
          :style="styleForNavigation"
          size="12px"
          @click-button="addToDate(1)">
          <template v-slot:tooltip>
            <BaseTooltip text="Go forward"
              :delay="100"></BaseTooltip>
          </template>
        </BaseButtonForTitleBar>
      </div>
    </div>
  </div>
  <!-- Titlebar-Option: 2 -->
  <div class="row justify-between items-center full-width"
    v-else>
    <div class="title-bar-text">
      <div class="q-pr-lg row justify-between items-center no-wrap">

        <div style="padding: 4px">
          <q-icon name="bi-journal"
            :style="styleForTitlebar"
            size="19px" />
        </div>

        <div class="q-pl-sm"
          :style="styleForTitlebar">
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
            <slot name="calendar">
            </slot>
          </q-popup-proxy>
        </q-btn>

        <BaseButtonForTitleBar v-if="viewingMode === 'view'"
          class="no-box-shadow q-mr-xs"
          icon="bi-chevron-left"
          :style="styleForNavigation"
          size="12px"
          @click-button="subtractFromDate(1)"></BaseButtonForTitleBar>
        <BaseButtonForTitleBar v-if="viewingMode === 'view'"
          class="no-box-shadow q-mr-xs"
          icon="bi-dot"
          :style="styleForNavigation"
          size="12px"
          @click-button="setDateToToday()"></BaseButtonForTitleBar>

        <BaseButtonForTitleBar v-if="viewingMode === 'view'"
          class="no-box-shadow q-mr-xs"
          icon="bi-chevron-right"
          :style="styleForNavigation"
          size="12px"
          @click-button="addToDate(1)"></BaseButtonForTitleBar>

      </div>
    </div>
  </div>
</template>

<script>
import BaseButtonForTitleBar from '../common/BaseButtonForTitleBar.vue';
import BaseTooltip from '../common/BaseTooltip.vue';


export default {
  name: "TheToolbarForDiary",
  emits: ["subtract-from-date", "set-today", "add-to-date"],
  components: { BaseButtonForTitleBar, BaseTooltip },
  props: {
    isDiaryTitlebarShowingDay: Boolean,
    viewingMode: String,
    getNumberOfDaysAwayFromToday: Number,
    dateForLabel: String,
    isNavigationHighlighted: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    };
  },
  methods: {
    subtractFromDate(number) {
      this.$emit("subtract-from-date", number);
    },
    setDateToToday() {
      this.$emit("set-today");
    },
    addToDate(number) {
      this.$emit("add-to-date", number);
    }
  },
  computed: {
    styleForNavigation() {
      if (this.isNavigationHighlighted === true) {
        return {
          "background-color": "var(--q-accent) !important",
          "border-radius": "12px !important"
        };
      } else {
        return { 'background-color': "transparent !important" }
      }
    },
    styleForDayInTitlebar() {
      let style = {};
      style["font-size"] = "1.15em";
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      style["font-weight"] = 700;
      style["text-shadow"] = this.$store.getters['layout/getLowOpacityShadowForAccent2'];
      return style;
    },
    styleForTitlebar() {
      let style = {};
      style["text-shadow"] = this.$store.state.layout.accent2 + this.$store.state.layout.lowOpacity + " 2px 2px 2px";
      style["color"] = "white";
      style["font-weight"] = "700";
      return style;
    },
  }
};
</script>
