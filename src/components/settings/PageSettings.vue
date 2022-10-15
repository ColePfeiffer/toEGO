<template>
  <BaseSettingsTabPanelGroup title="Page: Home"
    :isExpanded="isHomeGroupExpanded"
    @toggle-expand-state="isHomeGroupExpanded = !isHomeGroupExpanded">
    <template v-slot:q-item-section-content>
      <BaseItemForSettingsTabPanel title="Layout">
        <template v-slot:content>
          <q-btn-toggle v-model="homeMode"
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
              {label: 'retro', value: 'retro'},
              {label: 'border', value: 'border'},
              {label: 'clear', value: 'clear'},
            ]" />

        </template>
      </BaseItemForSettingsTabPanel>

      <BaseItemForSettingsTabPanel v-if="homeMode === 'retro' || homeMode === 'border'"
        title="Background"
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
    </template>
  </BaseSettingsTabPanelGroup>

  <BaseSettingsTabPanelGroup title="Page: Event"
    :isExpanded="isEventGroupExpanded"
    @toggle-expand-state="isEventGroupExpanded = !isEventGroupExpanded">
    <template v-slot:q-item-section-content>
      <BaseItemForSettingsTabPanel title="Layout"
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
              {label: 'default', value: 'default'},
              {label: 'retro', value: 'retro'},
              {label: 'border', value: 'border'},
              {label: 'clear', value: 'clear'},
            ]" />

        </template>
      </BaseItemForSettingsTabPanel>
      <BaseItemForSettingsTabPanel v-if="eventMode != 'default'"
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

  <BaseSettingsTabPanelGroup title="Page: Diary"
    :isExpanded="isDiaryGroupExpanded"
    @toggle-expand-state="isDiaryGroupExpanded = !isDiaryGroupExpanded">
    <template v-slot:q-item-section-content>
      <BaseItemForSettingsTabPanel title="Layout">
        <template v-slot:content>
          <q-btn-toggle v-model="diaryMode"
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
              {label: 'clear', value: 'clear'},
              {label: 'retro', value: 'retro'},
              {label: 'border', value: 'border'},
            ]" />

        </template>
      </BaseItemForSettingsTabPanel>

      <BaseItemForSettingsTabPanel v-if="diaryMode != 'clear'"
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

      <BaseItemForSettingsTabPanel title="Card Background"
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

      <BaseItemForSettingsTabPanel title="Change titlebar style"
        caption="Days will be shown in the titlebar.">
        <template v-slot:content>
          <q-toggle color="accent"
            v-model="isDiaryTitlebarShowingDay" />
        </template>
      </BaseItemForSettingsTabPanel>

      <BaseItemForSettingsTabPanel title="Date: Change Border"
        caption="Useful for bright or cluttered background images.">
        <template v-slot:content>
          <q-toggle color="accent"
            v-model="isDiarySubtitleStyleSetToAlternative" />
        </template>
      </BaseItemForSettingsTabPanel>

      <BaseItemForSettingsTabPanel title="Border Color"
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

      <BaseItemForSettingsTabPanel title="Date: Counting Days"
        caption="If turned off, diary will only show the date.">
        <template v-slot:content>
          <q-toggle color="accent"
            v-model="isDiaryCountingDays" />
        </template>
      </BaseItemForSettingsTabPanel>

      <BaseItemForSettingsTabPanel title="Show expand button"
        caption="Show the button to expand individual events on the diary page.">
        <template v-slot:content>
          <q-toggle color="accent"
            v-model="isShowingExpandButtonForEventsViaDiary" />
        </template>
      </BaseItemForSettingsTabPanel>
    </template>
  </BaseSettingsTabPanelGroup>
</template>

<script>
import BaseItemForSettingsTabPanel from './BaseItemForSettingsTabPanel.vue';
import BaseSettingsTabPanelGroup from './BaseSettingsTabPanelGroup.vue';

export default {
  components: { BaseItemForSettingsTabPanel, BaseSettingsTabPanelGroup },
  data() {
    return {
      isHomeGroupExpanded: true,
      isEventGroupExpanded: true,
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
    };
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
