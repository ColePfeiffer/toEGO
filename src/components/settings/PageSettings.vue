<template>
  <BaseSettingsTabPanelGroup title="Page: Home">
    <template v-slot:q-item-section-content>
      <BaseItemForSettingsTabPanel title="Layout">
        <template v-slot:content>
          <q-item-section class="col-6"
            avatar>
            <q-btn-toggle v-model="modeForHome"
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
                {label: 'compact', value: 'compact'},
                {label: 'plain', value: 'plain'},
              ]" />
          </q-item-section>

        </template>
      </BaseItemForSettingsTabPanel>

      <BaseItemForSettingsTabPanel v-if="modeForHome === 'retro' || modeForHome === 'compact'"
        title="Background"
        caption="Set color and opacity.">
        <template v-slot:content>
          <q-item-section class="col-6"
            avatar>
            <q-input filled
              dense
              v-model="backgroundColorForHome"
              :rules="['anyColor']"
              class="color-picker-input">
              <template v-slot:append>
                <q-icon name="colorize"
                  class="cursor-pointer">
                  <q-popup-proxy cover
                    transition-show="scale"
                    transition-hide="scale">
                    <q-color v-model="backgroundColorForHome" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-item-section>

        </template>
      </BaseItemForSettingsTabPanel>
    </template>
  </BaseSettingsTabPanelGroup>

  <BaseSettingsTabPanelGroup title="Page: Event">
    <template v-slot:q-item-section-content>
      <BaseItemForSettingsTabPanel title="Layout"
        :isOnSameLine="false">
        <template v-slot:content>
          <q-item-section class="col-12"
            avatar>
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
                {label: 'compact', value: 'compact'},
                {label: 'plain', value: 'plain'},
              ]" />
          </q-item-section>

        </template>
      </BaseItemForSettingsTabPanel>
      <BaseItemForSettingsTabPanel v-if="eventMode != 'default'"
        title="Background"
        :caption="(eventMode === 'plain') ? 'Match background-image color to set text color.' : 'Set color and opacity.'">
        <template v-slot:content>
          <q-item-section class="col-6"
            avatar>
            <q-input filled
              dense
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
          </q-item-section>

        </template>
      </BaseItemForSettingsTabPanel>
      <BaseItemForSettingsTabPanel v-if="eventMode != 'default'"
        class="q-pb-sm"
        title="Input Fields"
        caption="Set color and opacity.">
        <template v-slot:content>
          <q-item-section class="col-6"
            avatar>
            <q-input filled
              dense
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
          </q-item-section>
        </template>
      </BaseItemForSettingsTabPanel>
      <q-separator v-if="eventMode != 'default'"
        color="whitestorm" />

    </template>
  </BaseSettingsTabPanelGroup>

  <BaseSettingsTabPanelGroup title="Page: Diary">
    <template v-slot:q-item-section-content>
      <BaseItemForSettingsTabPanel title="Layout">
        <template v-slot:content>
          <q-item-section class="col-6"
            avatar>
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
                {label: 'retro', value: 'retro'},
                {label: 'compact', value: 'compact'},
                {label: 'plain', value: 'plain'},
              ]" />
          </q-item-section>

        </template>
      </BaseItemForSettingsTabPanel>

      <BaseItemForSettingsTabPanel v-if="modeForHome === 'retro' || modeForHome === 'compact'"
        title="Background"
        caption="Set color and opacity.">
        <template v-slot:content>
          <q-item-section class="col-6"
            avatar>
            <q-input filled
              dense
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
          </q-item-section>

        </template>
      </BaseItemForSettingsTabPanel>

      <BaseItemForSettingsTabPanel title="Show expand button"
        caption="Show the button to expand individual events on the diary page.">
        <template v-slot:content>
          <q-item-section class="col-4"
            avatar>
            <q-toggle color="accent"
              v-model="isShowingExpandButtonForEventsViaDiary"
              val="battery" />
          </q-item-section>

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
      modeForHome: this.$store.state.layout.modeForHome,
      backgroundColorForHome: this.$store.state.layout.backgroundColorForHome,
      eventMode: this.$store.state.layout.eventMode,
      eventBackgroundColor: this.$store.state.layout.eventBackgroundColor,
      eventInputBackgroundColor: this.$store.state.layout.eventInputBackgroundColor,
      isShowingExpandButtonForEventsViaDiary: false,
      diaryMode: "default",
      diaryBackgroundColor: "whitesmoke"
    };
  },
  watch: {
    isShowingExpandButtonForEventsViaDiary(newValue) {
      this.$store.commit("data/toggleExpandButtonForEventsOnDiaryPage");
    },
    modeForHome(mode) {
      let payload = { "page": "home", "mode": mode };
      this.$store.dispatch("layout/changeMode", payload);
    },
    backgroundColorForHome(color) {
      this.$store.commit("layout/changeBackgroundColorForHome", color);
    },
    eventMode(mode) {
      let payload = { "page": "event", "mode": mode };
      this.$store.dispatch("layout/changeMode", payload);
    },
    eventBackgroundColor(color) {
      let payload = { "type": "color", "color": color };
      this.$store.dispatch("layout/changeEventPageProperties", payload);
    },
    eventInputBackgroundColor(color) {
      let payload = { "type": "inputBackground", "color": color };
      this.$store.dispatch("layout/changeEventPageProperties", payload);
    },
  },
  computed: {
    accent2Color: {
      get() {
        return this.$store.state.layout.accent2;
      },
      set(value) {
        this.$store.commit("layout/setAccent2", value);
      },
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
