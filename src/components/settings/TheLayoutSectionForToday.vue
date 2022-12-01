<template>
  <BaseSettingsTabPanelGroup title="Today's notes"
    :isExpanded="isHomeGroupExpanded"
    @toggle-expand-state="isHomeGroupExpanded = !isHomeGroupExpanded">
    <template v-slot:q-item-section-content>
      <ThePreviewForToday :layoutMode="todayLayoutMode"
        :backgroundColor="todayPageBackgroundColor"
        :noteBackgroundColor="todayNoteBackgroundColor"
        :isNoteTitleColorful="todayNoteTitleRowIsColored"
        :borderColorLeft="borderColorLeft"
        :borderColorRight="borderColorRight"
        :textShadowColor="noteTextShadowColorForHome" />
      <BaseSettingsTabPanelSubGroup :title="'Page Layout: ' + layoutName">
        <template v-slot:content>
          <BaseSettingsTabPanelItem title="">
            <template v-slot:content>
              <q-btn-toggle v-model="todayLayoutMode"
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
          </BaseSettingsTabPanelItem>
          <BaseSettingsTabPanelItem v-if="todayLayoutMode === 'retro' || todayLayoutMode === 'border'"
            title="Background"
            :color="todayPageBackgroundColor"
            icon="bi-square-fill"
            caption="Set color and opacity.">
            <template v-slot:content>
              <q-input filled
                dense
                hide-bottom-space
                v-model="todayPageBackgroundColor"
                :rules="['anyColor']"
                class="color-picker-input">
                <template v-slot:append>
                  <q-icon name="colorize"
                    class="cursor-pointer">
                    <q-popup-proxy cover
                      transition-show="scale"
                      transition-hide="scale">
                      <q-color v-model="todayPageBackgroundColor" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </template>
          </BaseSettingsTabPanelItem>
        </template>
      </BaseSettingsTabPanelSubGroup>
      <q-separator />
      <BaseSettingsTabPanelSubGroup title="Note Appearance">
        <template v-slot:content>
          <BaseSettingsTabPanelItem title="Title and Emoji are colorful">
            <template v-slot:content>
              <q-toggle color="accent"
                v-model="todayNoteTitleRowIsColored" />
            </template>
          </BaseSettingsTabPanelItem>

          <BaseSettingsTabPanelItem title="Background"
            :color="todayNoteBackgroundColor"
            icon="bi-square-fill"
            caption="Set color and opacity.">
            <template v-slot:content>
              <q-input filled
                dense
                :disable="isDarkModeActive"
                hide-bottom-space
                v-model="todayNoteBackgroundColor"
                :rules="['anyColor']"
                class="color-picker-input">
                <template v-slot:append>
                  <q-icon name="colorize"
                    class="cursor-pointer outline">
                    <q-popup-proxy cover
                      transition-show="scale"
                      transition-hide="scale">
                      <q-color v-model="todayNoteBackgroundColor" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>


            </template>
          </BaseSettingsTabPanelItem>

          <BaseSettingsTabPanelItem title="Text Shadow"
            :color="noteTextShadowColorForHome"
            icon="bi-square-fill"
            caption="Set color and opacity.">
            <template v-slot:content>
              <q-input filled
                dense
                hide-bottom-space
                v-model="noteTextShadowColorForHome"
                :rules="['anyColor']"
                class="color-picker-input">
                <template v-slot:append>
                  <q-icon name="colorize"
                    class="cursor-pointer outline">
                    <q-popup-proxy cover
                      transition-show="scale"
                      transition-hide="scale">
                      <q-color v-model="noteTextShadowColorForHome" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </template>
          </BaseSettingsTabPanelItem>

          <div>
            <BaseSettingsTabPanelItem :color="borderColorLeft"
              icon="bi-square-fill"
              title="Border: Left">
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
            </BaseSettingsTabPanelItem>

            <BaseSettingsTabPanelItem :color="borderColorRight"
              icon="bi-square-fill"
              title="Border: Right">
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
            </BaseSettingsTabPanelItem>
          </div>

        </template>
      </BaseSettingsTabPanelSubGroup>
    </template>
  </BaseSettingsTabPanelGroup>
</template>


<script>
import ThePreviewForToday from './Preview/ThePreviewForToday.vue';
import BaseSettingsTabPanelGroup from './Base/BaseSettingsTabPanelGroup.vue';
import BaseSettingsTabPanelSubGroup from "./Base/BaseSettingsTabPanelSubGroup.vue"
import BaseSettingsTabPanelItem from "./Base/BaseSettingsTabPanelItem.vue";

export default {
  name: "TheLayoutSectionForDiary",
  emits: ["setting-changed"],
  components: { ThePreviewForToday, BaseSettingsTabPanelGroup, BaseSettingsTabPanelSubGroup, BaseSettingsTabPanelItem },
  props: {
  },
  data() {
    return {
      isHomeGroupExpanded: false,
      isShowingSettingsForToday: false,
      isShowingSettingsForNotes: false,
      isShowingBorderOptions: false,
    };
  },
  methods: {
    settingChanged(value) {
      this.$emit("setting-changed", value);
    },
  },
  computed: {
    layoutName() {
      if (this.todayLayoutMode === 'retro') {
        return "Retro";
      } else if (this.todayLayoutMode === 'border') {
        return "Border";
      } else {
        return "Transparent";
      }
    },
    todayLayoutMode: {
      get() {
        return this.$store.state.layout.homeLayoutMode;
      },
      set(mode) {
        this.settingChanged(true);
        let payload = { "page": "home", "mode": mode };
        this.$store.dispatch("layout/changeMode", payload);
      }
    },
    todayPageBackgroundColor: {
      get() {
        return this.$store.getters['layout/getHomeBackgroundColor'];
      },
      set(value) {
        this.settingChanged(true);
        if (this.isDarkModeActive) {
          this.$store.commit("layout/setHomeBackgroundColorDark", value);
        } else {
          this.$store.commit("layout/setHomeBackgroundColor", value);
        }
      }
    },
    isDarkModeActive() {
      return this.$store.state.data.userSettings.isDarkModeActive;
    },
    todayNoteBackgroundColor: {
      get() {
        if (this.isDarkModeActive) {
          return this.$store.state.layout.dark;
        } else {
          return this.$store.state.layout.noteBackgroundColor;
        }
      },
      set(value) {
        this.settingChanged(true);
        this.$store.commit("layout/setNoteBackgroundColor", value);
      },
    },
    todayNoteTitleRowIsColored: {
      get() {
        return this.$store.state.layout.noteTitleRowIsColored;
      },
      set(value) {
        this.settingChanged(true);
        this.$store.commit("layout/setNoteTitleRowIsColored", value);
      },
    },
    borderColorLeft: {
      get() {
        return this.$store.state.layout.borderColorLeft;
      },
      set(value) {
        this.settingChanged(true);
        this.$store.commit("layout/setBorderColorLeft", value);
      },
    },
    borderColorRight: {
      get() {
        return this.$store.state.layout.borderColorRight;
      },
      set(value) {
        this.settingChanged(true);
        this.$store.commit("layout/setBorderColorRight", value);
      },
    },
    noteTextShadowColorForHome: {
      get() {
        return this.$store.state.layout.noteTextShadowColorForHome;
      },
      set(value) {
        this.settingChanged(true);
        this.$store.commit("layout/setNoteTextShadowColorForHome", value);
      },
    },
    styleForDiaryDayCounterPreview() {
      return { "font-family": this.$store.state.layout.defaultFont };
    },
    styleForPreviewBaseCardDiary() {
      return {
        "font-size": "10.5px",
        "font-family": this.$store.state.layout.defaultFont,
        "margin-left": "0px",
        "margin-right": "0px",
        "margin-top": "0px"

      };
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
