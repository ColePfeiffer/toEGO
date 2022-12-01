<template>
  <BaseSettingsTabPanelGroup title="Note Creator"
    :isExpanded="isEventGroupExpanded"
    @toggle-expand-state="isEventGroupExpanded = !isEventGroupExpanded">
    <template v-slot:q-item-section-content>
      <ThePreviewForNewNote :layoutMode="noteLayoutMode"
        :backgroundColor="backgroundColorForPreview" />
      <BaseItemForSettingsTabPanel :title="getTitleForEvent"
        :isOnSameLine="false">
        <template v-slot:content>
          <q-btn-toggle v-model="noteLayoutMode"
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
      <BaseItemForSettingsTabPanel v-if="noteLayoutMode != 'default'"
        :color="notesContainerBackgroundColor"
        icon="bi-square-fill"
        title="Background"
        :caption="(noteLayoutMode === 'clear') ? 'Match background-image color to set text color.' : 'Set color and opacity.'">
        <template v-slot:content>
          <q-input filled
            dense
            hide-bottom-space
            v-model="notesContainerBackgroundColor"
            :rules="['anyColor']"
            class="color-picker-input">
            <template v-slot:append>
              <q-icon name="colorize"
                class="cursor-pointer">
                <q-popup-proxy cover
                  transition-show="scale"
                  transition-hide="scale">
                  <q-color v-model="notesContainerBackgroundColor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

        </template>
      </BaseItemForSettingsTabPanel>
      <BaseItemForSettingsTabPanel v-if="noteLayoutMode != 'default'"
        title="Input Fields use different Color">
        <template v-slot:content>
          <q-toggle color="accent"
            v-model="isDiaryInputColoredSeparately" />
        </template>
      </BaseItemForSettingsTabPanel>
      <BaseItemForSettingsTabPanel v-if="noteLayoutMode != 'default' & isDiaryInputColoredSeparately === true"
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
      <q-separator v-if="noteLayoutMode != 'default'"
        color="whitestorm" />

    </template>
  </BaseSettingsTabPanelGroup>
</template>


<script>
import BaseSettingsTabPanelGroup from './BaseSettingsTabPanelGroup.vue';
import BaseItemForSettingsTabPanel from './BaseItemForSettingsTabPanel.vue';
import ThePreviewForNewNote from "./ThePreviewForNewNote.vue";

export default {
  name: "TheSettingsPageForNewNote",
  emits: ["setting-changed"],
  components: { ThePreviewForNewNote, BaseSettingsTabPanelGroup, BaseItemForSettingsTabPanel },
  props: {
  },
  data() {
    return {
      isEventGroupExpanded: false,
    };
  },
  methods: {
    settingChanged(value) {
      this.$emit("setting-changed", value);
    },
  },
  computed: {
    isDarkModeActive() {
      return this.$store.state.data.userSettings.isDarkModeActive;
    },
    backgroundColorForPreview() {
      if (this.isDarkModeActive) {
        return this.notesContainerBackgroundColor;
      } else {
        return this.notesContainerBackgroundColor;
      }
    },
    isDiaryInputColoredSeparately: {
      get() {
        return this.$store.state.layout.isDiaryInputColoredSeparately;
      },
      set(value) {
        this.settingChanged(true);
        this.$store.commit("layout/setInputColoredSeparately", value);
      },
    },
    noteLayoutMode: {
      get() {
        return this.$store.state.layout.noteLayoutMode;
      },
      set(value) {
        this.settingChanged(true);
        let payload = { "page": "event", "mode": value };
        this.$store.dispatch("layout/changeMode", payload)
      },
    },
    notesContainerBackgroundColor: {
      get() {
        if (this.isDarkModeActive) {
          return this.$store.state.layout.notesContainerBackgroundColorDark;
        } else {
          return this.$store.state.layout.notesContainerBackgroundColor;
        }
      },
      set(value) {
        this.settingChanged(true);
        if (this.$store.getters['data/isDarkModeActive']) {
          this.$store.commit("layout/setNotesContainerBackgroundColorDark", value);
        } else {
          this.$store.commit("layout/setNotesContainerBackgroundColor", value);
        }
      }
    },
    eventInputBackgroundColor: {
      get() {
        return this.$store.state.layout.eventInputBackgroundColor;
      },
      set(color) {
        this.settingChanged(true);
        let payload = { "type": "inputBackground", "color": color };
        this.$store.dispatch("layout/changeEventPageProperties", payload);
      }
    },
    getTitleForEvent() {
      if (this.noteLayoutMode === 'default') {
        return "Default";
      } else if (this.noteLayoutMode === 'retro') {
        return "Retro";
      }
      else if (this.noteLayoutMode === 'border') {
        return "Border";
      } else {
        return "Transparent";
      }
    },

  },
};
</script>

<style scoped>
.my-custom-toggle {
  border: 1px solid lightgrey;
  border-radius: 0px;
  border-style: solid;
}
</style>
