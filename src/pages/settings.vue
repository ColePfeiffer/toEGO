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
                  caption="Use a non-pixel font.">
                  <template v-slot:content>
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
                  </template>
                </BaseItemForSettingsTabPanel>

                <BaseItemForSettingsTabPanel title="Font-Size"
                  caption="Change the font size.">
                  <template v-slot:content>
                    <q-btn-toggle v-model="fontsize"
                      class="my-custom-toggle"
                      :style="$store.getters['layout/getFontsize']"
                      color="transparent"
                      square
                      unelevated
                      toggle-color="accent"
                      text-color="lightgrey1"
                      toggle-text-color="white"
                      no-caps
                      :options="[
                        {label: 'xs', value: 'xs'},
                        {label: 's', value: 's'},
                        {label: 'md', value: 'md'}
                      ]" />
                  </template>
                </BaseItemForSettingsTabPanel>

              </template>
            </BaseSettingsTabPanelGroup>

            <BaseSettingsTabPanelGroup title="Events">
              <template v-slot:q-item-section-content>
                <BaseItemForSettingsTabPanel title="Show expand button"
                  caption="Show the button to expand individual events on the diary page.">
                  <template v-slot:content>
                    <q-toggle color="accent"
                      v-model="isShowingExpandButtonForEventsViaDiary"
                      val="battery" />
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
      fontsize: 's',
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
      this.$store.dispatch(
        "layout/changeFontsize",
        newValue
      );

    },
  },
  methods: {
    ...mapMutations(["./store/data/showModal", "store/data/showModal"]),
    setDarkMode() {
      this.$q.dark.set(!this.$q.dark.isActive);
    },
  },
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
