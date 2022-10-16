<template>
  <BaseSettingsTabPanelGroup title="General"
    :isExpanded="isGeneralGroupExpanded"
    @toggle-expand-state="isGeneralGroupExpanded = !isGeneralGroupExpanded">
    <template v-slot:q-item-section-content>
      <BaseItemForSettingsTabPanel title="Dark-Mode">
        <template v-slot:content>
          <q-toggle color="accent"
            v-model="isDarkModeTurnedOn"
            val="battery" />
        </template>
      </BaseItemForSettingsTabPanel>

      <BaseItemForSettingsTabPanel title="Themes"
        :isOnSameLine="false">
        <template v-slot:content>
          <q-btn-toggle v-model="theme"
            class="my-custom-toggle"
            color="transparent"
            square
            unelevated
            toggle-color="accent"
            text-color="lightgrey"
            toggle-text-color="white"
            no-caps
            :options="[
              {label: '1', value: 'default'},
              {label: '2', value: 'Night Sky'},
              {label: '3', value: 'Clouds'},
            ]" />
        </template>
      </BaseItemForSettingsTabPanel>

      <BaseItemForSettingsTabPanel title="Background-Image"
        :isOnSameLine="false">
        <template v-slot:content>
          <q-btn-toggle v-model="backgroundImage"
            class="my-custom-toggle"
            color="transparent"
            square
            unelevated
            toggle-color="accent"
            text-color="lightgrey"
            toggle-text-color="white"
            no-caps
            :options="[
              {label: '1', value: 'url(/images/background_wide2.jpg) no-repeat center center fixed'},
              {label: '2', value: 'url(/images/tumblr_inline_mvbeksKtt61qak244.png) repeat  center'},
              {label: '3', value: 'url(/images/tumblr_inline_mkjlcqZOBM1qz4rgp.png) repeat  center'},
              {label: '4', value: 'url(\'https://64.media.tumblr.com/04ff549b92bb99db8ad725a83e288030/tumblr_inline_n258pty5wY1qhwjx8.gif\')'},
              {label: '5', value: 'url(\'https://64.media.tumblr.com/74dbe32d98265cb64e291100117b6d4a/tumblr_inline_n2590ayYaL1qhwjx8.gif\')'},
              {label: '[x]', value: 'none'},
            ]" />
        </template>
      </BaseItemForSettingsTabPanel>

      <BaseItemForSettingsTabPanel v-if="backgroundImage === 'none'"
        title="Color: Background">
        <template v-slot:content>
          <q-input filled
            dense
            hide-bottom-space
            v-model="backgroundColor"
            :rules="['anyColor']"
            class="color-picker-input ">
            <template v-slot:append>
              <q-icon name="colorize"
                class="cursor-pointer">
                <q-popup-proxy cover
                  transition-show="scale"
                  transition-hide="scale">
                  <q-color v-model="backgroundColor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </template>
      </BaseItemForSettingsTabPanel>



    </template>
  </BaseSettingsTabPanelGroup>

  <BaseSettingsTabPanelGroup title="Colors"
    :isExpanded="isColorGroupExpanded"
    @toggle-expand-state="isColorGroupExpanded = !isColorGroupExpanded">
    <template v-slot:q-item-section-content>
      <BaseItemForSettingsTabPanel title="Secondary">
        <template v-slot:content>
          <q-input filled
            dense
            hide-bottom-space
            v-model="secondaryColor"
            :rules="['anyColor']"
            class="color-picker-input ">
            <template v-slot:append>
              <q-icon name="colorize"
                class="cursor-pointer">
                <q-popup-proxy cover
                  transition-show="scale"
                  transition-hide="scale">
                  <q-color v-model="secondaryColor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </template>
      </BaseItemForSettingsTabPanel>

      <BaseItemForSettingsTabPanel title="Accent">
        <template v-slot:content>

          <q-input filled
            dense
            hide-bottom-space
            v-model="accentColor"
            :rules="['anyColor']"
            class="color-picker-input ">
            <template v-slot:append>
              <q-icon name="colorize"
                class="cursor-pointer">
                <q-popup-proxy cover
                  transition-show="scale"
                  transition-hide="scale">
                  <q-color v-model="accentColor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </template>
      </BaseItemForSettingsTabPanel>

      <BaseItemForSettingsTabPanel title="Shadows">
        <template v-slot:content>
          <q-input filled
            dense
            hide-bottom-space
            v-model="accent2Color"
            :rules="['anyColor']"
            class="color-picker-input">
            <template v-slot:append>
              <q-icon name="colorize"
                class="cursor-pointer">
                <q-popup-proxy cover
                  transition-show="scale"
                  transition-hide="scale">
                  <q-color v-model="accent2Color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </template>
      </BaseItemForSettingsTabPanel>
    </template>
  </BaseSettingsTabPanelGroup>

  <BaseSettingsTabPanelGroup title="Font"
    :isExpanded="isFontGroupExpanded"
    @toggle-expand-state="isFontGroupExpanded = !isFontGroupExpanded">
    <template v-slot:q-item-section-content>
      <BaseItemForSettingsTabPanel title="Font-Style"
        caption="Change text style.">
        <template v-slot:content>
          <q-btn-toggle v-model="isUsingFont"
            class="my-custom-toggle"
            color="transparent"
            square
            unelevated
            toggle-color="accent"
            text-color="lightgrey"
            toggle-text-color="white"
            no-caps
            :options="[
              {label: '1', value: 'PressStart'},
              {label: '2', value: 'Inter'},
              {label: '3', value: 'Munro'},
            ]" />

        </template>
      </BaseItemForSettingsTabPanel>

      <BaseItemForSettingsTabPanel title="Font-Size"
        caption="Change text size (px).">
        <template v-slot:content>
          <q-input v-model.number="fontsize"
            type="number"
            filled
            hide-bottom-space
            dense
            square
            style="max-height: 55px" />
        </template>
      </BaseItemForSettingsTabPanel>

    </template>
  </BaseSettingsTabPanelGroup>
</template>

<script>
import { mapMutations } from "vuex";
import BaseItemForSettingsTabPanel from './BaseItemForSettingsTabPanel.vue';
import BaseSettingsTabPanelGroup from './BaseSettingsTabPanelGroup.vue';

export default {
  components: { BaseItemForSettingsTabPanel, BaseSettingsTabPanelGroup },
  data() {
    return {
      isGeneralGroupExpanded: true,
      isColorGroupExpanded: true,
      isFontGroupExpanded: true,
      isDarkModeTurnedOn: false,
      backgroundImage: this.$store.state.layout.backgroundImageURL,
      backgroundColor: this.$store.state.layout.backgroundColor,
      isUsingFont: this.$store.state.layout.defaultFont,
      fontsize: 12,
      theme: this.$store.state.layout.theme,
    };
  },
  watch: {
    isDarkModeTurnedOn() {
      this.setDarkMode();
    },
    fontsize(newValue) {
      this.$store.commit("layout/setFontsize", newValue);
    },
    isUsingFont(newValue) {
      this.$store.commit("layout/setFont", newValue);
    },
    backgroundImage(imageURL) {
      this.$store.commit("layout/changeBackgroundImage", imageURL);
    },
    backgroundColor(color) {
      this.$store.commit("layout/changeBackgroundColor", color);
    },
    theme(value) {
      this.$store.commit("layout/setThemeNightSky", value);
    }
  },
  methods: {
    ...mapMutations(["./store/data/showModal", "store/data/showModal"]),
    setDarkMode() {
      this.$q.dark.set(!this.$q.dark.isActive);
      this.$store.commit("layout/toggleDarkMode");
    },
  },
  computed: {
    secondaryColor: {
      get() {
        return this.$store.state.layout.secondary;
      },
      set(value) {
        this.$store.dispatch("layout/setSecondaryColor", value);
      },
    },
    accentColor: {
      get() {
        return this.$store.state.layout.accent;
      },
      set(value) {
        this.$store.commit("layout/setAccent", value);
      },
    },
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
