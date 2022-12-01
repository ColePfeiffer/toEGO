<template>
  <div class="q-pa-sm">


    <BaseSettingsTabPanelGroup title="General"
      :isExpanded="isGeneralGroupExpanded"
      @toggle-expand-state="isGeneralGroupExpanded = !isGeneralGroupExpanded">
      <template v-slot:q-item-section-content>
        <BaseItemForSettingsTabPanel title="Dark-Mode">
          <template v-slot:content>
            <q-toggle color="accent"
              v-model="darkMode"
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
                { label: '1', value: 'lilacSky', slot: 'lilac-dreams' },
                { label: '2', value: 'nightSky', slot: 'night-sky' },
                { label: '3', value: 'clouds', slot: 'clouds' },
                { label: '4', value: 'theme4', slot: 'custom' },
                { label: '5', value: 'theme5', slot: 'custom' },
              ]">
              <template v-slot:lilac-dreams>
                <BaseTooltip text="Lilac Dreams"
                  :delay="0"></BaseTooltip>
              </template>
              <template v-slot:night-sky>
                <BaseTooltip text="Night Sky"
                  :delay="0"></BaseTooltip>
              </template>
              <template v-slot:clouds>
                <BaseTooltip text="Clouds"
                  :delay="0"></BaseTooltip>
              </template>
              <template v-slot:custom>
                <BaseTooltip text="Custom"
                  :delay="0"></BaseTooltip>
              </template>
            </q-btn-toggle>
          </template>
        </BaseItemForSettingsTabPanel>

        <BaseItemForSettingsTabPanel title="Background-Image"
          :isOnSameLine="false">
          <template v-slot:content>
            <q-btn-toggle v-model="backgroundImage"
              class="my-custom-toggle"
              color="transparent"
              square
              padding="sm"
              dense
              unelevated
              toggle-color="accent"
              text-color="lightgrey"
              toggle-text-color="white"
              no-caps
              :options="[
                { label: '1', value: 'url(/images/background_wide2.jpg) no-repeat center center fixed', slot: 'lilac-dreams' },
                { label: '2', value: 'url(https://i.imgur.com/RUstJjN.png) repeat ', slot: 'growing' },
                { label: '3', value: 'url(https://i.imgur.com/xltwj7g.gif) repeat  center', slot: 'jellyfish' },
                { label: '4', value: 'url(https://i.imgur.com/Dryps1y.png)', slot: 'night-sky' },
                { label: '5', value: 'url(https://i.imgur.com/TPnaBOX.png)', slot: 'clouds' },
                { label: '', icon: 'bi-x', value: 'none', slot: 'none' },
                { label: '', icon: 'bi-image', value: 'custom', slot: 'custom' },
              ]">
              <template v-slot:lilac-dreams>
                <BaseTooltip text="Lilac Dreams"
                  :delay="0"></BaseTooltip>
              </template>
              <template v-slot:growing>
                <BaseTooltip text="Growing"
                  :delay="0"></BaseTooltip>
              </template>
              <template v-slot:jellyfish>
                <BaseTooltip text="Jellyfish"
                  :delay="0"></BaseTooltip>
              </template>
              <template v-slot:night-sky>
                <BaseTooltip text="Night Sky"
                  :delay="0"></BaseTooltip>
              </template>
              <template v-slot:clouds>
                <BaseTooltip text="Clouds"
                  :delay="0"></BaseTooltip>
              </template>
              <template v-slot:none>
                <BaseTooltip text="Use a color instead"
                  :delay="0"></BaseTooltip>
              </template>
              <template v-slot:custom>
                <BaseTooltip text="Set a custom image"
                  :delay="0"></BaseTooltip>
              </template>

            </q-btn-toggle>

          </template>
        </BaseItemForSettingsTabPanel>

        <BaseItemForSettingsTabPanel class="q-pa-md"
          v-if="backgroundImage === 'custom'"
          title="Use custom image"
          caption="Upload your image somewhere and put the direct link here."
          :isOnSameLine="false">
          <template v-slot:content>
            <q-input v-model="customBackgroundImage"
              type="url"
              hint="E.g.: https://someSite.myImage.png"
              filled
              bottom-slots>
              <template v-slot:before>
                <q-icon name="bi-image" />
              </template>

              <template v-slot:append>
                <q-btn round
                  dense
                  flat
                  icon="add"
                  @click="useCustomImage" />
              </template>
            </q-input>
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
        <BaseItemForSettingsTabPanel title="Main Color"
          :color="secondaryColor"
          icon="bi-square-fill">
          <template v-slot:content>
            <q-input filled
              dense
              hide-bottom-space
              color="secondary"
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

        <BaseItemForSettingsTabPanel title="Buttons"
          :color="accentColor"
          icon="bi-square-fill">
          <template v-slot:content>
            <q-input filled
              dense
              hide-bottom-space
              color="accent"
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

        <BaseItemForSettingsTabPanel title="Shadows"
          caption="used for some headers and icons"
          :color="accent2Color"
          icon="bi-square-fill">
          <template v-slot:content>
            <q-input filled
              dense
              color="info"
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
        <p class="q-pa-md text-justify">You can change the style and size of the font here. Below is a preview:</p>
        <blockquote class="text-justify q-ma-md q-pa-md"
          :style="getStyleForTextPreview">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
        </blockquote>
        <BaseItemForSettingsTabPanel title="Font-Style"
          :isOnSameLine="false"
          caption="Change text style.">
          <template v-slot:content>
            <q-btn-toggle v-model="fontFamily"
              class="my-custom-toggle"
              color="transparent"
              square
              unelevated
              toggle-color="accent"
              text-color="lightgrey"
              toggle-text-color="white"
              no-caps
              :options="[
                { label: '1', value: 'PressStart', slot: 'pressStart' },
                { label: '2', value: 'PixeloidSans', slot: 'PixeloidSans' },
                { label: '3', value: 'Inter', slot: 'inter' },
                { label: '4', value: 'Munro', slot: 'munro' },
                { label: '5', value: 'RedAlert', slot: 'RedAlert' },
              ]">
              <template v-slot:pressStart>
                <BaseTooltip text="Pixelfont: Default"
                  :delay="0"></BaseTooltip>
              </template>
              <template v-slot:inter>
                <BaseTooltip text="Clean: Inter"
                  :delay="0"></BaseTooltip>
              </template>
              <template v-slot:munro>
                <BaseTooltip text="Pixelfont: Munro"
                  :delay="0"></BaseTooltip>
              </template>
            </q-btn-toggle>

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

  </div>
</template>

<script>
import BaseItemForSettingsTabPanel from './Base/BaseSettingsTabPanelItem.vue';
import BaseSettingsTabPanelGroup from './Base/BaseSettingsTabPanelGroup.vue';
import BaseTooltip from '../common/BaseTooltip.vue';


export default {
  components: { BaseItemForSettingsTabPanel, BaseSettingsTabPanelGroup, BaseTooltip },
  emits: ["setting-changed"],
  props: { hasSettingChanged: Boolean },
  data() {
    return {
      isGeneralGroupExpanded: true,
      isColorGroupExpanded: false,
      isFontGroupExpanded: false,
      backgroundImage: this.$store.state.layout.backgroundImageURL,
      customBackgroundImage: "",
    };
  },
  watch: {
    backgroundImageURL(newURL) {
      this.backgroundImage = newURL;
    },
    backgroundImage(imageURL) {
      this.setHasSettingChanged(true);
      if (imageURL != 'custom') {
        this.$store.commit("layout/changeBackgroundImage", imageURL);
      }
    },
  },
  methods: {
    setHasSettingChanged(value) {
      this.$emit("setting-changed", value);
    },
    toggleDarkMode() {
      this.$q.dark.set(!this.$q.dark.isActive);
      this.$store.dispatch("layout/firebaseToggleDarkMode");
      //this.$store.commit("layout/toggleDarkMode");
    },
    useCustomImage() {
      let url = "url(" + this.customBackgroundImage + ")";
      this.$store.commit("layout/changeBackgroundImage", url);
    },

  },
  computed: {
    backgroundColor: {
      get() {
        return this.$store.state.layout.backgroundColor;
      },
      set(color) {
        this.setHasSettingChanged(true);
        this.$store.commit("layout/changeBackgroundColor", color);
      }
    },
    fontFamily: {
      get() {
        return this.$store.state.layout.defaultFont;
      },
      set(value) {
        this.setHasSettingChanged(true);
        this.$store.commit("layout/setFont", value);
      }
    },
    fontsize: {
      get() {
        return this.$store.state.layout.fontsize;
      },
      set(value) {
        this.setHasSettingChanged(true);
        this.$store.commit("layout/setFontsize", value);
      }
    },
    theme: {
      get() {
        return this.$store.state.data.userSettings.currentTheme;
      },
      set(value) {
        this.setHasSettingChanged(true);
        this.$store.dispatch(
          "layout/setTheme",
          value);
      },
    },
    darkMode: {
      get() {
        return this.$store.state.data.userSettings.isDarkModeActive;
      },
      set() {
        this.toggleDarkMode();
      },
    },
    getStyleForTextPreview() {
      return {
        "border-left": "3px solid var(--q-secondary)",
        "font-family": this.fontFamily,
        "font-size": this.fontsize + "px",
      };
    },
    backgroundImageURL() {
      return this.$store.state.layout.backgroundImageURL;
    },
    secondaryColor: {
      get() {
        return this.$store.state.layout.secondary;
      },
      set(value) {
        this.setHasSettingChanged(true);
        this.$store.dispatch("layout/setSecondaryColor", value);
      },
    },
    accentColor: {
      get() {
        return this.$store.state.layout.accent;
      },
      set(value) {
        this.setHasSettingChanged(true);
        this.$store.commit("layout/setAccent", value);
      },
    },

    accent2Color: {
      get() {
        return this.$store.state.layout.accent2;
      },
      set(value) {
        this.setHasSettingChanged(true);
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
