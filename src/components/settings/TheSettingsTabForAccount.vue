<template>
  <div class="q-pa-sm">
    <BaseSettingsTabPanelGroup title="Account"
      :isExpanded="isGeneralGroupExpanded"
      @toggle-expand-state="isGeneralGroupExpanded = !isGeneralGroupExpanded">
      <template v-slot:q-item-section-content>
        <div class="row justify-end items-center q-pa-md">
          <q-btn label="Logout"
            @click="logout"
            :style="styleForButton"
            color="secondary"></q-btn>
        </div>
      </template>
    </BaseSettingsTabPanelGroup>
  </div>
</template>

<script>
import BaseSettingsTabPanelGroup from './Base/BaseSettingsTabPanelGroup.vue';


export default {
  components: { BaseSettingsTabPanelGroup, },
  data() {
    return {
      isGeneralGroupExpanded: true,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch(
        "auth/logoutUser");
    },
  },
  computed: {
    styleForButton() {
      let style = {};
      style["border-radius"] = "0px";
      style["text-shadow"] = this.$store.state.layout.accent2 + this.$store.state.layout.lowOpacity + " 1px 1px 1px";
      return style;
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
