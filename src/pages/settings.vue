<template>
  <q-page>
    <BasePage titleOfPage="Settings">
      <template v-slot:title-bar-icon>
        <q-icon name="bi-menu-button-wide-fill"
          size="25px" />
      </template>
      <template v-slot:title-bar-controls></template>
      <template v-slot:content>
        <q-tabs v-model="settingsTab"
          class="text-lightgrey2 tab"
          :style="getStyleForSettingsTab"
          dense
          active-color="accent"
          indicator-color="accent"
          align="justify"
          no-caps
          narrow-indicator>
          <q-tab name="view"
            label="Design" />
          <q-tab name="other"
            label="Page Layout" />
          <q-tab name="account"
            label="Other"
            :disabled="true"
            :disable="true" />
        </q-tabs>

        <q-tab-panels v-model="settingsTab"
          animated>
          <q-tab-panel name="view">
            <BaseSettingsTabPanelGroup title="General">
              <template v-slot:q-item-section-content>
                <BaseItemForSettingsTabPanel title="Dark-Mode">
                  <template v-slot:content>
                    <q-toggle color="accent"
                      v-model="isDarkModeTurnedOn"
                      val="battery" />
                  </template>
                </BaseItemForSettingsTabPanel>

                <BaseItemForSettingsTabPanel title="Background-Image"
                  caption="Change Background image.">
                  <template v-slot:content>
                    <q-item-section class="col-12"
                      avatar>
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
                          {label: '2', value: 'url(\'https://64.media.tumblr.com/9e45fc59f535b1a82eace3dd4a62449a/tumblr_inline_nater8MFLq1qak244.gif\') repeat  center'},
                          {label: '3', value: 'url(\'https://64.media.tumblr.com/04ff549b92bb99db8ad725a83e288030/tumblr_inline_n258pty5wY1qhwjx8.gif\')'},
                          {label: '4', value: 'url(\'https://64.media.tumblr.com/74dbe32d98265cb64e291100117b6d4a/tumblr_inline_n2590ayYaL1qhwjx8.gif\')'},
                          {label: 'x', value: 'none'},
                        ]" />
                    </q-item-section>
                  </template>
                </BaseItemForSettingsTabPanel>
              </template>
            </BaseSettingsTabPanelGroup>

            <BaseSettingsTabPanelGroup title="Color Theme">
              <template v-slot:q-item-section-content>
                <BaseItemForSettingsTabPanel title="Color: Secondary">
                  <template v-slot:content>
                    <q-item-section class="col-6"
                      avatar>
                      <q-input filled
                        dense
                        v-model="secondaryColor"
                        :rules="['anyColor']"
                        class="color-picker-input">
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
                    </q-item-section>
                  </template>
                </BaseItemForSettingsTabPanel>

                <BaseItemForSettingsTabPanel title="Color: Accent">
                  <template v-slot:content>
                    <q-item-section class="col-6"
                      avatar>
                      <q-input filled
                        dense
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
                    </q-item-section>
                  </template>
                </BaseItemForSettingsTabPanel>

                <BaseItemForSettingsTabPanel title="Color: Accent2">
                  <template v-slot:content>
                    <q-item-section class="col-6"
                      avatar>
                      <q-input filled
                        dense
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
                    </q-item-section>
                  </template>
                </BaseItemForSettingsTabPanel>
              </template>
            </BaseSettingsTabPanelGroup>

            <BaseSettingsTabPanelGroup title="Font">
              <template v-slot:q-item-section-content>
                <BaseItemForSettingsTabPanel title="Font-Style"
                  caption="Change text style.">
                  <template v-slot:content>
                    <q-item-section class="col-6"
                      avatar>
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
                    </q-item-section>

                  </template>
                </BaseItemForSettingsTabPanel>

                <BaseItemForSettingsTabPanel title="Font-Size"
                  caption="Change text size (px).">
                  <template v-slot:content>
                    <q-item-section class="col-6"
                      avatar>
                      <q-input v-model.number="fontsize"
                        type="number"
                        filled
                        square
                        style="max-width: 80px; max-height: 55px" />
                    </q-item-section>
                  </template>
                </BaseItemForSettingsTabPanel>

              </template>
            </BaseSettingsTabPanelGroup>



          </q-tab-panel>

          <q-tab-panel name="other">
            <BaseSettingsTabPanelGroup title="Events">
              <template v-slot:q-item-section-content>
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
          </q-tab-panel>
        </q-tab-panels>
      </template>
      <template v-slot:footer></template>
    </BasePage>

  </q-page>
</template>

<script>
import { mapMutations } from "vuex";
import BasePage from "src/components/ui/BasePage.vue";
import BaseSettingsTabPanelGroup from "src/components/settings/BaseSettingsTabPanelGroup.vue";
import BaseItemForSettingsTabPanel from "src/components/settings/BaseItemForSettingsTabPanel.vue";

export default {
  components: { BasePage, BaseSettingsTabPanelGroup, BaseItemForSettingsTabPanel },
  data() {
    return {
      model: "1",
      notifications: "",
      settingsTab: 'view',
      isDarkModeTurnedOn: false,
      isUsingFont: 'PressStart',
      backgroundImage: 'url(/images/background_wide2.jpg) no-repeat center center fixed',
      fontsize: 12,
      isShowingExpandButtonForEventsViaDiary: false,
    };
  },
  watch: {
    isDarkModeTurnedOn(newValue) {
      console.log(newValue);
      this.setDarkMode();
    },
    isShowingExpandButtonForEventsViaDiary(newValue) {
      this.$store.commit("data/toggleExpandButtonForEventsOnDiaryPage");
    },
    fontsize(newValue) {
      this.$store.commit("layout/setFontsize", newValue);
    },
    isUsingFont(newValue) {
      console.log("change font!!");
      this.$store.commit("layout/setFont", newValue);
    },
    backgroundImage(imageURL) {
      this.$store.commit("layout/changeBackgroundImage", imageURL);
    }
  },
  methods: {
    ...mapMutations(["./store/data/showModal", "store/data/showModal"]),
    setDarkMode() {
      this.$q.dark.set(!this.$q.dark.isActive);
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
    getStyleForSettingsTab() {
      let style = {};

      style["font-size"] = "12px";
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      style["text-shadow"] = this.$store.state.layout.accent2 + this.$store.state.layout.lowOpacity + " 1px 1px 1px";

      if (this.$store.getters['layout/isDarkModeActive']) {
        style["background-color"] = this.$store.state.layout.blacksmoke;
      } else {
        style["background-color"] = this.$store.state.layout.whitesmoke;

      }
      return style;
    }
  }
};
</script>

<style scoped>
.color-picker-input {}

.borderStyleForTab {
  font-size: 12.5px;
  background: whitesmoke;
  border-radius: 0px;
}

.my-custom-toggle {
  border: 1px solid lightgrey;
  border-radius: 0px;
  border-style: solid;
}

.tab {
  font-size: 12.5px;
  background: whitesmoke;
}
</style>
