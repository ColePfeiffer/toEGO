<template>
  <BasePage titleOfPage="Settings"
    mode="default"
    :isUsingBackgroundColorAsDefaultColor="true"
    backgroundColor="white">
    <template v-slot:title-bar-icon>
      <div style="padding: 4px">
        <q-icon name="bi-menu-button-wide-fill"
          size="19px" />
      </div>
    </template>
    <template v-slot:title-bar-controls></template>
    <template v-slot:content-without-scrollarea>
      <div :style="getBackgroundColor"
        class="fit no-margin">
        <q-tabs v-model="settingsTab"
          :style="getStyleForTabsNavigation"
          dense
          indicator-color="accent"
          align="justify"
          no-caps
          narrow-indicator>
          <q-tab name="view"
            label="Design" />
          <q-tab name="other"
            label="Page Layout" />
          <q-tab name="Account"
            label="Account" />
        </q-tabs>

        <BaseScrollArea :style="styleForScrollArea">
          <template v-slot:content>
            <q-tab-panels v-model="settingsTab"
              animated>
              <q-tab-panel name="view">
                <DesignSettings :hasSettingChanged="hasSettingChanged"
                  @setting-changed="settingHasChanged"></DesignSettings>
              </q-tab-panel>
              <q-tab-panel name="other">
                <PageSettings :hasSettingChanged="hasSettingChanged"
                  @setting-changed="settingHasChanged"></PageSettings>
              </q-tab-panel>
              <q-tab-panel name="Account">
                <AccountSettings></AccountSettings>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </BaseScrollArea>
      </div>

    </template>
    <template v-slot:footer>
      <BaseButtonFooter v-if="hasSettingChanged"
        buttonText="Discard"
        style="border-radius: 0px"
        @click-button="discardChanges">
      </BaseButtonFooter>
      <BaseButtonFooter v-if="hasSettingChanged"
        buttonText="Save"
        style="border-radius: 0px"
        @click-button="saveChangesToFirebase">
      </BaseButtonFooter>
    </template>
  </BasePage>
</template>

<script>
import BasePage from "src/components/common/BasePage.vue";
import BaseScrollArea from "src/components/common/BaseScrollArea.vue";
import PageSettings from "src/components/Settings/TheSettingsTabForViewLayout.vue";
import DesignSettings from "../components/Settings/TheSettingsTabForDesign.vue";
import AccountSettings from "../components/Settings/TheSettingsTabForAccount.vue";
import BaseButtonFooter from "../components/common/BaseButtonFooter.vue";

export default {
  components: { BasePage, PageSettings, DesignSettings, AccountSettings, BaseScrollArea, BaseButtonFooter },
  data() {
    return {
      settingsTab: 'view',
      hasSettingChanged: false,
    };
  },
  watch: {
    settingsTab(value) {
      this.$store.commit("data/setPlusFabButtonOpened", false);
    }
  },
  methods: {
    discardChanges() {
      // reset changes to userTheme
      this.hasSettingChanged = false;
      this.$store.dispatch("layout/discardChangesToLayout");
    },
    saveChangesToFirebase() {
      this.$store.dispatch("layout/saveLayoutChangesInFirebase");
      this.hasSettingChanged = false;
    },
    settingHasChanged(value) {
      this.$store.commit("data/setPlusFabButtonOpened", false);
      this.hasSettingChanged = value;
    },
  },
  computed: {
    userTheme() {
      return this.$store.state.data.userTheme;
    },
    isDarkModeActive() {
      return this.$store.state.data.userSettings.isDarkModeActive;
    },
    styleForScrollArea() {
      let style = {};
      style['height'] = this.$store.state.layout.height * .69 + "px";
      if (this.isDarkModeActive) {
        style["background-color"] = "var(--q-dark)";
      } else {
        style["background-color"] = "white";
      }
      return style;
    },
    getBackgroundColor() {
      let style = {};
      if (this.isDarkModeActive) {
        style["background-color"] = this.$store.state.layout.blacksmoke;
      } else {
        style["background-color"] = this.$store.state.layout.whitesmoke;
      }
      return style;
    },
    getStyleForTabsNavigation() {
      let style = {};
      style["font-size"] = "12px";
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      style["text-shadow"] = this.$store.state.layout.accent2 + this.$store.state.layout.lowOpacity + " 1px 1px 1px";
      return style;
    },
  }
};
</script>

<style scoped>

</style>
