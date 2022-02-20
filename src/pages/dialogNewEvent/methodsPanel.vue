<template>
  <basePanelWithButtons :options="options">
    <template v-slot:methodsTab>
      <fiveToOneMethod @onShow="onShow()"></fiveToOneMethod>
      <handlingEmotions @onShow="onShow()"></handlingEmotions>
    </template>
    <template v-slot:templatesTab> Yayayadadada. </template>
  </basePanelWithButtons>
</template>

<script>
import basePanelWithButtons from "../../components/ui/basePanelWithButtons.vue";
import fiveToOneMethod from "./methods/FiveToOneMethod.vue";
import handlingEmotions from "./methods/handlingEmotions.vue";

export default {
  name: "methodsPanel",
  components: {
    basePanelWithButtons,
    fiveToOneMethod,
    handlingEmotions,
  },
  emits: ["onShow"],
  data() {
    return {
      options: [
        { value: "Methods", slot: "methods" },
        { value: "Templates", slot: "templates" },
      ],
      names: ["Methods", "Templates"],
    };
  },

  methods: {
    onShow() {
      this.$emit("onShow");
    },
  },
};
</script>

<style scoped>
</style>