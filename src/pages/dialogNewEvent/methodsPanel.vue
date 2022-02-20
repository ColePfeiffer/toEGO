<template>
  <basePanelWithButtons :options="options" :names="names" @scroll="scroll()">
    <template slot="Methods">
      <fiveToOneMethod @onShow="onShow()"></fiveToOneMethod>
      <handlingEmotions @onShow="onShow()"></handlingEmotions>
    </template>
    <template slot="Templates"> Yayayadadada. </template>
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
        { value: "Methods", slot: "methodsBtnSlot" },
        { value: "Templates", slot: "templatesBtnSlot" },
      ],
      names: ["Methods", "Templates"],
    };
  },

  methods: {
    scroll(offset) {
      this.$emit("scroll", offset);
    },
  },
};
</script>

<style scoped>
</style>