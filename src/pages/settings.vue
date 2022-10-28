<template>
  <BasePage titleOfPage="Settings"
    mode="default"
    heightForContent="77vh"
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
        </q-tabs>

        <BaseScrollArea :style="styleForScrollArea">
          <template v-slot:content>
            <q-tab-panels v-model="settingsTab"
              animated>
              <q-tab-panel name="view">
                <DesignSettings></DesignSettings>
              </q-tab-panel>

              <q-tab-panel name="other">
                <PageSettings></PageSettings>
              </q-tab-panel>
            </q-tab-panels>
          </template>

        </BaseScrollArea>

      </div>

    </template>
    <template v-slot:footer></template>
  </BasePage>
</template>

<script>
import BasePage from "src/components/ui/BasePage.vue";
import BaseScrollArea from "src/components/ui/BaseScrollArea.vue";
import PageSettings from "src/components/settings/PageSettings.vue";
import DesignSettings from "../components/settings/DesignSettings.vue";

export default {
  components: { BasePage, PageSettings, DesignSettings, BaseScrollArea },
  data() {
    return {
      settingsTab: 'view',
    };
  },
  computed: {
    styleForScrollArea() {
      let style = {};
      style['height'] = this.$store.state.layout.innerHeight * 0.96 + "px";
      if (this.$store.getters['layout/isDarkModeActive']) {
        style["background-color"] = "black";
      } else {
        style["background-color"] = "white";
      }
      return style;
    },
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
  }
};
</script>

<style scoped>

</style>
