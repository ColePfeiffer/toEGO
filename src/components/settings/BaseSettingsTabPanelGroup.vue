<template>
  <div class="q-mb-xl">
    <div class="q-px-none  settings-panel-group-title"
      :style="getStyleForTitle">
      <div class="row justify-between items-center">
        <p class="col-9 q-my-none">
          {{ title }}
        </p>
        <div v-if="isShowingNavigationButton && isExpanded"
          class="col-1">
          <q-btn flat
            color="secondary"
            padding="5px"
            size="10px"
            icon="bi-asterisk"
            @click="navigationButtonClicked">
            <BaseTooltip text="Will take you to the dialog, so you can see made changes.">
            </BaseTooltip>
          </q-btn>
        </div>
        <BaseButtonExpandable class="col-1"
          :isEventExpanded="isExpanded"
          @expand="expandGroup">
        </BaseButtonExpandable>


      </div>
    </div>
    <div class="q-mb-xl"
      v-if="isExpanded">
      <div class="settings-tab q-mt-md"
        :style="getStyle">
        <q-list class="q-tb-md">
          <slot name="q-item-section-content">
          </slot>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButtonExpandable from '../ui/BaseButtonExpandable.vue';
import BaseTooltip from "../ui/BaseTooltip.vue";

export default {
  name: "BaseSettingsTabPanelGroup",
  emits: ["toggle-expand-state", "navigation-button-clicked"],
  props: {
    title: String,
    isExpanded: {
      type: Boolean,
      default: false
    },
    isShowingNavigationButton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    };
  },
  methods: {
    expandGroup() {
      this.$emit("toggle-expand-state");
    },
    navigationButtonClicked() {
      this.$emit("navigation-button-clicked");
    }
  },
  computed: {
    getStyle() {
      let style = {};
      style["border-radius"] = "0px";
      style["font-size"] = "12px";
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      if (this.$store.getters["layout/isDarkModeActive"]) {
        style["background-color"] = this.$store.state.layout.blacksmoke;
      }
      else {
        style["background-color"] = this.$store.state.layout.whitesmoke;
      }
      return style;
    },
    getStyleForTitle() {
      let style = this.$store.getters["layout/getNonDefaultFont"];

      style["font-size"] = "12.5px";
      style["font-weight"] = "600";

      if (this.$store.getters["layout/isDarkModeActive"]) {
        style["color"] = "whitesmoke";
        style["border-bottom"] = "1px solid " + this.$store.state.layout.secondary + this.$store.state.layout.lowOpacity;
      }
      else {
        style["color"] = this.$store.state.layout.blacksmoke;
        style["border-bottom"] = "1px solid lightgrey";
      }
      return style;
    }
  },
  components: { BaseButtonExpandable, BaseTooltip }
};
</script>

<style scoped>
.underlined {
  border-bottom: 1px solid lightgrey;
}

.settings-panel-group-title {
  font-size: 12.5px;
  color: lightgrey;
  padding-bottom: 0px;
  margin-bottom: -10px;
}
</style>
