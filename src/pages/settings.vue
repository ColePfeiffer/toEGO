<template>
  <q-page>
    <BasePage icon="bi-gear-fill"
      titleOfPage="Settings">
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
            label="View" />
          <q-tab name="other"
            label="Other" />
          <q-tab name="account"
            label="Account" />
        </q-tabs>
        <q-separator color="lightgrey" />

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
                <BaseItemForSettingsTabPanel title="Font-Style"
                  caption="Change text style.">
                  <template v-slot:content>
                    <q-item-section class="col-6"
                      avatar>
                      <q-btn-toggle v-model="isUsingNonPixelFont"
                        class="my-custom-toggle"
                        color="transparent"
                        square
                        unelevated
                        toggle-color="accent"
                        text-color="lightgrey1"
                        toggle-text-color="white"
                        no-caps
                        :options="[
                          {label: '1', value: '1'},
                          {label: '2', value: '2'},
                          {label: '3', value: '3'}
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
      isUsingNonPixelFont: '1',
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
      console.log(newValue);
      this.$store.commit("data/toggleExpandButtonForEventsOnDiaryPage");
    },
    fontsize(newValue) {
      console.log("calling mutation")
      this.$store.commit("layout/setFontsize", newValue);
    },
  },
  methods: {
    ...mapMutations(["./store/data/showModal", "store/data/showModal"]),
    setDarkMode() {
      this.$q.dark.set(!this.$q.dark.isActive);
    },
  },
  computed: {
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
