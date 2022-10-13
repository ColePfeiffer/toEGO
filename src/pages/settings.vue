<template>
  <q-page>
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
      <template v-slot:content>
        <div :style="getBackgroundColor"
          class="fit no-margin full-height">
          <q-tabs v-model="settingsTab"
            class="text-lightgrey2"
            :style="getStyleForTabsNavigation"
            dense
            color="lightgrey"
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
              <DesignSettings></DesignSettings>
            </q-tab-panel>

            <q-tab-panel name="other">
              <PageSettings></PageSettings>
            </q-tab-panel>
          </q-tab-panels>
        </div>

      </template>
      <template v-slot:footer></template>
    </BasePage>

  </q-page>
</template>

<script>
import BasePage from "src/components/ui/BasePage.vue";
import PageSettings from "src/components/settings/PageSettings.vue";
import DesignSettings from "../components/settings/DesignSettings.vue";

export default {
  components: { BasePage, PageSettings, DesignSettings },
  data() {
    return {
      settingsTab: 'view',
    };
  },
  computed: {
    getBackgroundColor() {
      let style = {};
      if (this.$store.getters['layout/isDarkModeActive']) {
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
    getStyleForTabPanel() {
      let style = {};

      return style;
    }
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
