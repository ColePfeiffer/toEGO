<template>
  <div class="q-mb-xl">
    <div class="q-px-none  settings-panel-group-title"
      :style="getStyleForTitle">
      <div class="row justify-between items-center">
        <p class="col-10 q-my-none">
          {{title}}
        </p>
        <BaseButtonExpandable class="col-2"
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
export default {
  name: "BaseSettingsTabPanelGroup",
  props: {
    title: String,
  },
  data() {
    return {
      isExpanded: false
    };
  },
  methods: {
    expandGroup() {
      this.isExpanded = !this.isExpanded;
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
      if (this.$store.getters["layout/isDarkModeActive"]) {
        style["color"] = this.$store.state.layout.secondary + this.$store.state.layout.lowOpacity;
        style["border-bottom"] = "1px solid " + this.$store.state.layout.secondary + this.$store.state.layout.lowOpacity;
      }
      else {
        style["color"] = "lightgrey";
        style["border-bottom"] = "1px solid lightgrey";
      }
      return style;
    }
  },
  components: { BaseButtonExpandable }
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
