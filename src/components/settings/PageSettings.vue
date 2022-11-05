<template>
  <p class="q-pa-md text-justify"
    :style="getStyleForInfo">You can change the look of all main pages - <span style="font-style: italic">home</span>,
    <span style="font-style: italic">diary</span> and
    <span style="font-style: italic">new event</span> - here. If you want to reset everything to default, just pick a
    theme via the design settings.
  </p>
  <BaseSettingsTabPanelGroup title="Today's notes"
    :isExpanded="isHomeGroupExpanded"
    @toggle-expand-state="isHomeGroupExpanded = !isHomeGroupExpanded">
    <template v-slot:q-item-section-content>

      <div :style="styleForPreviewContainer"
        class="row justify-center items-center fit">
        <BasePage titleOfPage="Today"
          :heightForContentMultiplier="0.2"
          :mode="homeMode"
          :isResizing="false"
          :backgroundColor="homeBackgroundColor">

          <template v-slot:content-without-scrollarea>
            <div class="row justify-center items-center text-center ">
              <!-- today, yesterday, x days ago, x days ahead... -->
              <EventCard class="col-10 q-ma-md "
                :style="styleForPreviewEventCard"
                :backgroundColor="noteBackgroundColor"
                :eventData="$store.state.data.notePreview" />
            </div>
          </template>
        </BasePage>
      </div>

      <div class="row justify-between items-center q-pa-md">
        <div class="col-10"
          style="font-weight: 600">
          Page Layout
        </div>
        <BaseButtonExpandable class="col-1"
          :isEventExpanded="isShowingSettingsForToday"
          @expand="isShowingSettingsForToday = !isShowingSettingsForToday">
        </BaseButtonExpandable>
      </div>
      <div v-if="isShowingSettingsForToday">
        <BaseItemForSettingsTabPanel :title="getTitleForHome"
          :isOnSameLine="false">
          <template v-slot:content>
            <q-btn-toggle v-model="homeMode"
              dense
              class="my-custom-toggle q-mx-md"
              color="transparent"
              square
              unelevated
              toggle-color="accent"
              text-color="lightgrey"
              toggle-text-color="white"
              no-caps
              :options="[
                { label: '', icon: 'bi-window', padding: '10px', value: 'retro' },
                { label: '', icon: 'bi-square-fill', padding: '10px', value: 'border' },
                { label: '', icon: 'bi-square', padding: '10px', value: 'clear' },
              ]" />

          </template>
        </BaseItemForSettingsTabPanel>

        <BaseItemForSettingsTabPanel v-if="homeMode === 'retro' || homeMode === 'border'"
          title="Background"
          :color="homeBackgroundColor"
          icon="bi-square-fill"
          caption="Set color and opacity.">
          <template v-slot:content>
            <q-input filled
              dense
              hide-bottom-space
              v-model="homeBackgroundColor"
              :rules="['anyColor']"
              class="color-picker-input">
              <template v-slot:append>
                <q-icon name="colorize"
                  class="cursor-pointer">
                  <q-popup-proxy cover
                    transition-show="scale"
                    transition-hide="scale">
                    <q-color v-model="homeBackgroundColor" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </template>
        </BaseItemForSettingsTabPanel>
      </div>

      <q-separator></q-separator>
      <div class="row justify-between items-center q-pa-md">
        <div class="col-10"
          style="font-weight: 600">
          Note Appearance
        </div>
        <BaseButtonExpandable class="col-1"
          :isEventExpanded="isShowingSettingsForNotes"
          @expand="isShowingSettingsForNotes = !isShowingSettingsForNotes">
        </BaseButtonExpandable>
      </div>
      <div v-if="isShowingSettingsForNotes">
        <BaseItemForSettingsTabPanel title="Title and Emoji are colorful">
          <template v-slot:content>
            <q-toggle color="accent"
              v-model="noteTitleRowIsColored" />
          </template>
        </BaseItemForSettingsTabPanel>
        <BaseItemForSettingsTabPanel title="Text-Shadow"
          :color="noteTextShadowColor"
          icon="bi-square-fill"
          caption="Set color and opacity.">
          <template v-slot:content>
            <q-input filled
              dense
              hide-bottom-space
              v-model="noteTextShadowColor"
              :rules="['anyColor']"
              class="color-picker-input">
              <template v-slot:append>
                <q-icon name="colorize"
                  class="cursor-pointer outline">
                  <q-popup-proxy cover
                    transition-show="scale"
                    transition-hide="scale">
                    <q-color v-model="noteTextShadowColor" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </template>
        </BaseItemForSettingsTabPanel>
        <BaseItemForSettingsTabPanel title="Background"
          :color="noteBackgroundColor"
          icon="bi-square-fill"
          caption="Set color and opacity.">
          <template v-slot:content>
            <q-input filled
              dense
              hide-bottom-space
              v-model="noteBackgroundColor"
              :rules="['anyColor']"
              class="color-picker-input">
              <template v-slot:append>
                <q-icon name="colorize"
                  class="cursor-pointer outline">
                  <q-popup-proxy cover
                    transition-show="scale"
                    transition-hide="scale">
                    <q-color v-model="noteBackgroundColor" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>


          </template>
        </BaseItemForSettingsTabPanel>
        <div class="row justify-between items-center q-pa-md">
          <div class="col-10">
            Border
          </div>
          <BaseButtonExpandable class="col-1"
            :isEventExpanded="isShowingBorderOptions"
            @expand="isShowingBorderOptions = !isShowingBorderOptions">
          </BaseButtonExpandable>
        </div>
        <div v-if="isShowingBorderOptions">
          <BaseItemForSettingsTabPanel :color="borderColorLeft"
            icon="bi-square-fill"
            title="Left Color">
            <template v-slot:content>
              <q-input filled
                dense
                hide-bottom-space
                v-model="borderColorLeft"
                :rules="['anyColor']"
                class="color-picker-input ">
                <template v-slot:append>
                  <q-icon name="colorize"
                    class="cursor-pointer">
                    <q-popup-proxy cover
                      transition-show="scale"
                      transition-hide="scale">
                      <q-color v-model="borderColorLeft" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </template>
          </BaseItemForSettingsTabPanel>

          <BaseItemForSettingsTabPanel :color="borderColorRight"
            icon="bi-square-fill"
            title="Right Color">
            <template v-slot:content>
              <q-input filled
                dense
                hide-bottom-space
                v-model="borderColorRight"
                :rules="['anyColor']"
                class="color-picker-input ">
                <template v-slot:append>
                  <q-icon name="colorize"
                    class="cursor-pointer">
                    <q-popup-proxy cover
                      transition-show="scale"
                      transition-hide="scale">
                      <q-color v-model="borderColorRight" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </template>
          </BaseItemForSettingsTabPanel>
        </div>
      </div>






    </template>


  </BaseSettingsTabPanelGroup>

  <BaseSettingsTabPanelGroup title="Diary"
    :isExpanded="isDiaryGroupExpanded"
    @toggle-expand-state="isDiaryGroupExpanded = !isDiaryGroupExpanded">
    <template v-slot:q-item-section-content>

      <div :style="styleForPreviewContainer"
        class="row justify-center items-center fit">
        <BasePage titleOfPage="Today"
          :heightForContentMultiplier="0.2"
          :mode="diaryMode"
          :isResizing="false"
          :backgroundColor="diaryBackgroundColor">
          <template v-slot:titlebar>
            <TheToolbarForDiary :isDiaryTitlebarShowingDay="isDiaryTitlebarShowingDay"
              viewingMode="view"
              :getNumberOfDaysAwayFromToday="0"
              dateForLabel="November 5th, 2022">

            </TheToolbarForDiary>
          </template>
          <template v-slot:content-without-scrollarea>
            <div class="row justify-center items-center text-center ">
              <TheDiaryDayCounter day="yesterday"
                dateForSubtitle="November 5th, 2022"
                :diaryMode="diaryMode"></TheDiaryDayCounter>
              <div class="col-10 text-right"
                style="margin-bottom: -10px; margin-left: 10px">
                <ButtonForDiarySection textColor="white"
                  icon="bi-plus-lg"
                  class="q-mr-xs"
                  label=""
                  :style="$store.getters['layout/getStyleForDiarySectionButton']">
                </ButtonForDiarySection>
              </div>
              <BaseCard class="col-10 q-ma-md "
                :isTextSetToCentered="false"
                :backgroundColor="diaryCardBackgroundColor"
                :style="styleForPreviewEventCard">
                <template v-slot:content>
                  <div class="q-pa-sm"
                    style="font-size: 11px">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua.
                  </div>
                </template>

              </BaseCard>
            </div>
          </template>
        </BasePage>
      </div>

      <div class="row justify-between items-center q-pa-md">
        <div class="col-10"
          style="font-weight: 600">
          Page Layout: {{ getTitleForDiary }}
        </div>
        <BaseButtonExpandable class="col-1"
          :isEventExpanded="isShowingSettingsForDiaryPage"
          @expand="isShowingSettingsForDiaryPage = !isShowingSettingsForDiaryPage">
        </BaseButtonExpandable>
      </div>
      <div v-if="isShowingSettingsForDiaryPage">
        <BaseItemForSettingsTabPanel title="">
          <template v-slot:content-without-label>
            <div class="row justify-center items-center fit">
              <q-btn-toggle v-model="diaryMode"
                dense
                class="col-12 my-custom-toggle"
                style="width: 119px"
                color="transparent"
                square
                unelevated
                toggle-color="accent"
                text-color="lightgrey"
                toggle-text-color="white"
                no-caps
                :options="[
                  { label: '', icon: 'bi-square', padding: '10px', value: 'clear' },
                  { label: '', icon: 'bi-window', padding: '10px', value: 'retro' },
                  { label: '', icon: 'bi-square-fill', padding: '10px', value: 'border' },
                ]" />

            </div>



          </template>
        </BaseItemForSettingsTabPanel>
        <BaseItemForSettingsTabPanel v-if="diaryMode != 'clear'"
          :color="diaryBackgroundColor"
          icon="bi-square-fill"
          title="Background"
          caption="Set color and opacity.">
          <template v-slot:content>
            <q-input filled
              dense
              hide-bottom-space
              v-model="diaryBackgroundColor"
              :rules="['anyColor']"
              class="color-picker-input">
              <template v-slot:append>
                <q-icon name="colorize"
                  class="cursor-pointer">
                  <q-popup-proxy cover
                    transition-show="scale"
                    transition-hide="scale">
                    <q-color v-model="diaryBackgroundColor" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

          </template>
        </BaseItemForSettingsTabPanel>

        <BaseItemForSettingsTabPanel title="Titlebar is showing date">
          <template v-slot:content>
            <q-toggle color="accent"
              v-model="isDiaryTitlebarShowingDay" />
          </template>
        </BaseItemForSettingsTabPanel>

        <BaseItemForSettingsTabPanel title="Diary is counting days"
          caption="">
          <template v-slot:content>
            <q-toggle color="accent"
              v-model="isDiaryCountingDays" />
          </template>
        </BaseItemForSettingsTabPanel>

        <BaseItemForSettingsTabPanel v-if="!(isDiaryTitlebarShowingDay && !isDiaryCountingDays)"
          title="Day Counter is using alternative style"
          caption="Useful for bright or cluttered background images.">
          <template v-slot:content>
            <q-toggle color="accent"
              v-model="isDiarySubtitleStyleSetToAlternative" />
          </template>
        </BaseItemForSettingsTabPanel>

        <BaseItemForSettingsTabPanel title="Border Color"
          :color="diarySubtitleColor"
          icon="bi-square-fill"
          v-if="isDiarySubtitleStyleSetToAlternative">
          <template v-slot:content>
            <q-input filled
              dense
              hide-bottom-space
              v-model="diarySubtitleColor"
              :rules="['anyColor']"
              class="color-picker-input">
              <template v-slot:append>
                <q-icon name="colorize"
                  class="cursor-pointer">
                  <q-popup-proxy cover
                    transition-show="scale"
                    transition-hide="scale">
                    <q-color v-model="diarySubtitleColor" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </template>
        </BaseItemForSettingsTabPanel>
      </div>

      <q-separator></q-separator>
      <BaseItemForSettingsTabPanel title="Card Background"
        :color="diaryCardBackgroundColor"
        icon="bi-square-fill"
        caption="Set color and opacity.">
        <template v-slot:content>
          <q-input filled
            dense
            hide-bottom-space
            v-model="diaryCardBackgroundColor"
            :rules="['anyColor']"
            class="color-picker-input">
            <template v-slot:append>
              <q-icon name="colorize"
                class="cursor-pointer">
                <q-popup-proxy cover
                  transition-show="scale"
                  transition-hide="scale">
                  <q-color v-model="diaryCardBackgroundColor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

        </template>
      </BaseItemForSettingsTabPanel>
      <q-separator color="secondary"></q-separator>


    </template>
  </BaseSettingsTabPanelGroup>

  <BaseSettingsTabPanelGroup title="Creating a note"
    :isShowingNavigationButton="true"
    @navigation-button-clicked="goToEventPage"
    :isExpanded="isEventGroupExpanded"
    @toggle-expand-state="isEventGroupExpanded = !isEventGroupExpanded">
    <template v-slot:q-item-section-content>
      <BaseItemForSettingsTabPanel :title="getTitleForEvent"
        :isOnSameLine="false">
        <template v-slot:content>
          <q-btn-toggle v-model="eventMode"
            dense
            class="my-custom-toggle"
            color="transparent"
            square
            unelevated
            toggle-color="accent"
            text-color="lightgrey"
            toggle-text-color="white"
            no-caps
            :options="[
              { label: '', icon: 'bi-flower1', padding: '10px', value: 'default' },
              { label: '', icon: 'bi-window', padding: '10px', value: 'retro' },
              { label: '', icon: 'bi-square-fill', padding: '10px', value: 'border' },
              { label: '', icon: 'bi-square', padding: '10px', value: 'clear' },
            ]" />

        </template>
      </BaseItemForSettingsTabPanel>
      <BaseItemForSettingsTabPanel v-if="eventMode != 'default'"
        :color="eventBackgroundColor"
        icon="bi-square-fill"
        title="Background"
        :caption="(eventMode === 'clear') ? 'Match background-image color to set text color.' : 'Set color and opacity.'">
        <template v-slot:content>
          <q-input filled
            dense
            hide-bottom-space
            v-model="eventBackgroundColor"
            :rules="['anyColor']"
            class="color-picker-input">
            <template v-slot:append>
              <q-icon name="colorize"
                class="cursor-pointer">
                <q-popup-proxy cover
                  transition-show="scale"
                  transition-hide="scale">
                  <q-color v-model="eventBackgroundColor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

        </template>
      </BaseItemForSettingsTabPanel>
      <BaseItemForSettingsTabPanel v-if="eventMode != 'default'"
        class="q-pb-sm"
        title="Input Fields"
        :color="eventInputBackgroundColor"
        icon="bi-square-fill"
        caption="Set color and opacity.">
        <template v-slot:content>
          <q-input filled
            dense
            hide-bottom-space
            v-model="eventInputBackgroundColor"
            :rules="['anyColor']"
            class="color-picker-input">
            <template v-slot:append>
              <q-icon name="colorize"
                class="cursor-pointer">
                <q-popup-proxy cover
                  transition-show="scale"
                  transition-hide="scale">
                  <q-color v-model="eventInputBackgroundColor"
                    :palette="[
                      '#24242469', '#fffcfc91', '#dfd4f587', '#00000087',
                      '#f5f5f5fc'
                    ]" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </template>
      </BaseItemForSettingsTabPanel>
      <q-separator v-if="eventMode != 'default'"
        color="whitestorm" />

    </template>
  </BaseSettingsTabPanelGroup>
</template>

<script>
import BaseItemForSettingsTabPanel from './BaseItemForSettingsTabPanel.vue';
import BaseSettingsTabPanelGroup from './BaseSettingsTabPanelGroup.vue';
import BaseButtonExpandable from "../ui/BaseButtonExpandable.vue";
import EventCard from "../common/EventCard.vue";
import BasePage from "../ui/BasePage.vue";
import BaseCard from '../ui/BaseCard.vue';
import TheToolbarForDiary from "../diary/TheToolbarForDiary.vue";
import TheDiaryDayCounter from '../diary/TheDiaryDayCounter.vue';
import ButtonForDiarySection from "../diary/Base/ButtonForDiarySection.vue"

export default {
  components: {
    BaseItemForSettingsTabPanel,
    BaseSettingsTabPanelGroup,
    BaseButtonExpandable,
    EventCard,
    BasePage,
    BaseCard,
    TheToolbarForDiary,
    TheDiaryDayCounter,
    ButtonForDiarySection
  },
  data() {
    return {
      isHomeGroupExpanded: false,
      isEventGroupExpanded: false,
      isDiaryGroupExpanded: true,
      homeMode: this.$store.state.layout.homeMode,
      eventMode: this.$store.state.layout.eventMode,
      eventInputBackgroundColor: this.$store.state.layout.eventInputBackgroundColor,
      isShowingExpandButtonForEventsViaDiary: false,
      diaryMode: this.$store.state.layout.diaryMode,
      isDiaryTitlebarShowingDay: this.$store.state.layout.isDiaryTitlebarShowingDay,
      isDiaryCountingDays: this.$store.state.layout.isDiaryCountingDays,
      diaryCardBackgroundColor: this.$store.state.layout.diaryCardBackgroundColor,
      diarySubtitleColor: this.$store.state.layout.diarySubtitleColor,
      isDiarySubtitleStyleSetToAlternative: this.$store.state.layout.isDiarySubtitleStyleSetToAlternative,
      isShowingBorderOptions: false,
      isShowingSettingsForToday: false,
      isShowingSettingsForNotes: false,
      isNotesGroupExpanded: true,
      isShowingSettingsForDiaryPage: false,
    };
  },
  methods: {
    showBorderOptions() {
      this.isShowingBorderOptions = !this.isShshowBorderOptions;
    },
    goToEventPage() {
      this.$store.commit("data/setModeForNewEvent", "CREATE");
      this.$router.push("Event");
    }
  },
  watch: {
    homeMode(mode) {
      let payload = { "page": "home", "mode": mode };
      this.$store.dispatch("layout/changeMode", payload);
    },
    eventMode(mode) {
      let payload = { "page": "event", "mode": mode };
      this.$store.dispatch("layout/changeMode", payload);
    },
    eventInputBackgroundColor(color) {
      let payload = { "type": "inputBackground", "color": color };
      this.$store.dispatch("layout/changeEventPageProperties", payload);
    },
    diaryMode(mode) {
      let payload = { "page": "diary", "mode": mode };
      this.$store.dispatch("layout/changeMode", payload);
    },
    isDiaryTitlebarShowingDay(bool) {
      this.$store.commit("layout/toggleIsDiaryTitleBarShowingDay", bool);
    },
    isDiaryCountingDays(bool) {
      this.$store.commit("layout/toggleIsDiaryCountingDays", bool);
    },
    isShowingExpandButtonForEventsViaDiary(newValue) {
      this.$store.commit("data/toggleExpandButtonForEventsOnDiaryPage");
    },
    diaryCardBackgroundColor(color) {
      this.$store.commit("layout/setDiaryCardBackgroundColor", color);
    },
    isDiarySubtitleStyleSetToAlternative(bool) {
      this.$store.commit("layout/setDiarySubtitleStyleToAlternative", bool);
    },
    diarySubtitleColor(color) {
      this.$store.commit("layout/setDiarySubtitleColor", color);
    },


  },
  computed: {
    styleForPreviewEventCard() {
      return {
        "font-family": this.$store.state.layout.defaultFont
      };
    },
    styleForPreviewContainer() {
      return this.$store.getters["layout/getStyleForLayout"];
    },
    backgroundColorForPreview() {
      if (this.$store.getters['layout/isDarkModeActive']) {
        return this.$store.state.layout.blacksmoke;
      } else {
        return this.noteBackgroundColor;
      }
    },
    noteTextShadowColor: {
      get() {
        return this.$store.state.layout.noteTextShadowColor;
      },
      set(value) {
        this.$store.commit("layout/setNoteTextShadowColor", value);
      },
    },
    noteTitleRowIsColored: {
      get() {
        return this.$store.state.layout.noteTitleRowIsColored;
      },
      set(value) {
        this.$store.commit("layout/setNoteTitleRowIsColored", value);
      },
    },

    borderColorLeft: {
      get() {
        return this.$store.state.layout.borderColorLeft;
      },
      set(value) {
        this.$store.commit("layout/setBorderColorLeft", value);
      },
    },
    borderColorRight: {
      get() {
        return this.$store.state.layout.borderColorRight;
      },
      set(value) {
        this.$store.commit("layout/setBorderColorRight", value);
      },
    },
    noteBackgroundColor: {
      get() {
        return this.$store.state.layout.noteBackgroundColor;
      },
      set(value) {
        this.$store.commit("layout/setNoteBackgroundColor", value);
      },
    },

    getStyleForInfo() {
      let style = {};
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      if (this.$store.getters["layout/isDarkModeActive"]) {
        style["background-color"] = this.$store.state.layout.blacksmoke;
        style["color"] = "white";
      } else {
        style["background-color"] = "whitesmoke";
        style["color"] = "black";
      }
      return style;
    },
    getTitleForHome() {
      if (this.homeMode === 'retro') {
        return "Retro";
      } else if (this.homeMode === 'border') {
        return "Border";
      } else {
        return "Transparent";
      }
    },
    getTitleForEvent() {
      if (this.eventMode === 'default') {
        return "Default";
      } else if (this.eventMode === 'retro') {
        return "Retro";
      }
      else if (this.eventMode === 'border') {
        return "Border";
      } else {
        return "Transparent";
      }
    },
    getTitleForDiary() {
      if (this.diaryMode === 'retro') {
        return "Retro";
      }
      else if (this.diaryMode === 'border') {
        return "Border";
      } else {
        return "Transparent";
      }
    },
    eventBackgroundColor: {
      get() {
        return this.$store.getters['layout/getEventBackgroundColor'];
      },
      set(value) {
        if (this.$store.getters['layout/isDarkModeActive']) {
          this.$store.commit("layout/setEventBackgroundColorDark", value);
        } else {
          this.$store.commit("layout/setEventBackgroundColor", value);
        }
      }
    },
    homeBackgroundColor: {
      get() {
        return this.$store.getters['layout/getHomeBackgroundColor'];
      },
      set(value) {
        if (this.$store.getters['layout/isDarkModeActive']) {
          this.$store.commit("layout/setHomeBackgroundColorDark", value);
        } else {
          this.$store.commit("layout/setHomeBackgroundColor", value);
        }
      }
    },
    diaryBackgroundColor: {
      get() {
        return this.$store.getters['layout/getDiaryBackgroundColor'];
      },
      set(value) {
        if (this.$store.getters['layout/isDarkModeActive']) {
          this.$store.commit("layout/setDiaryBackgroundColorDark", value);
        } else {
          this.$store.commit("layout/setDiaryBackgroundColor", value);
        }
      }
    },
  }
};
</script>

<style scoped>
.my-custom-toggle {
  border: 1px solid lightgrey;
  border-radius: 0px;
  border-style: solid;
}
</style>
