<template>
  <BaseSettingsTabPanelGroup title="General"
    :isExpanded="isGeneralGroupExpanded"
    @toggle-expand-state="isGeneralGroupExpanded = !isGeneralGroupExpanded">
    <template v-slot:q-item-section-content>
      <BaseItemForSettingsTabPanel title="Themes">
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
              {label: '1', value: 'default', slot: 'lilac-dreams'},
              {label: '2', value: 'Night Sky', slot: 'night-sky'},
              {label: '3', value: 'Clouds', slot: 'clouds'},
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
            unelevated
            toggle-color="accent"
            text-color="lightgrey"
            toggle-text-color="white"
            no-caps
            :options="[
              {label: '1', value: 'url(/images/background_wide2.jpg) no-repeat center center fixed'},
              {label: '2', value: 'url(https://i.imgur.com/RUstJjN.png) repeat '},
              {label: '3', value: 'url(https://i.imgur.com/xltwj7g.gif) repeat  center'},
              {label: '4', value: 'url(https://i.imgur.com/Dryps1y.png)'},
              {label: '5', value: 'url(https://i.imgur.com/TPnaBOX.png)'},
              {label: '', icon: 'bi-x', value: 'none'},
              {label: '', icon: 'bi-image', value: 'custom'},
            ]" />
        </template>
      </BaseItemForSettingsTabPanel>

      <BaseItemForSettingsTabPanel v-if="backgroundImage === 'custom'"
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
      <BaseItemForSettingsTabPanel title="Dark-Mode">
        <template v-slot:content>
          <q-toggle color="accent"
            v-model="isDarkModeTurnedOn"
            val="battery" />
        </template>
      </BaseItemForSettingsTabPanel>

      <BaseItemForSettingsTabPanel v-if="isDarkModeTurnedOn"
        title="Card Border: Left Color">
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

      <BaseItemForSettingsTabPanel v-if="isDarkModeTurnedOn"
        title="Card Border: Right Color">
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
import BaseTooltip from '../ui/BaseTooltip.vue';

export default {
  components: { BaseItemForSettingsTabPanel, BaseSettingsTabPanelGroup, BaseTooltip },
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
      customBackgroundImage: "",
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
    backgroundImageURL(newURL) {
      this.backgroundImage = newURL;
    },
    backgroundImage(imageURL) {
      console.log(imageURL);
      if (imageURL != 'custom') {
        this.$store.commit("layout/changeBackgroundImage", imageURL);
      }
    },
    backgroundColor(color) {
      this.$store.commit("layout/changeBackgroundColor", color);
    },
    theme(value) {
      this.$store.dispatch(
        "layout/setTheme",
        value
      );
    }
  },
  methods: {
    ...mapMutations(["./store/data/showModal", "store/data/showModal"]),
    setDarkMode() {
      this.$q.dark.set(!this.$q.dark.isActive);
      this.$store.commit("layout/toggleDarkMode");
    },
    useCustomImage() {
      let url = "url(" + this.customBackgroundImage + ")";
      this.$store.commit("layout/changeBackgroundImage", url);
    },
  },
  computed: {
    backgroundImageURL() {
      return this.$store.state.layout.backgroundImageURL;
    },
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
