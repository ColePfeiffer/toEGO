<template>
  <basePanelWithButtons :options="options" :names="names" @scroll="scroll()">
    <template v-slot:panelLeftSlot>
      <fiveToOneMethod @onShow="scroll"></fiveToOneMethod>
      <handlingEmotions @onShow="scroll"></handlingEmotions>
    </template>

    <template v-slot:panelRightSlot> Yayayadadada. </template>
  </basePanelWithButtons>
</template>

<script>
import basePanelWithButtons from "../DialogNewEvent/methodsPanel.vue";

export default {
  name: "methodsPanel",
  components: {
    basePanelWithButtons,
    fiveToOneMethod,
    handlingEmotions,
  },
  emits: ["scroll"],
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
