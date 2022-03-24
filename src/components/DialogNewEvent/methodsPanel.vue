<template>
  <basePanelWithButtons
    :options="options"
    :names="names"
    :hideBordersOnInit="hideBordersOnInit"
    @scroll="scroll()"
  >
    <template v-slot:panelLeftSlot>
      <fiveToOneMethod @onShow="scroll"></fiveToOneMethod>
      <handlingEmotions @onShow="scroll"></handlingEmotions>
    </template>

    <template v-slot:panelRightSlot> Yayayadadada. </template>
  </basePanelWithButtons>
</template>

<script>
import basePanelWithButtons from "../ui/basePanelWithButtons.vue";
import fiveToOneMethod from "./methods/FiveToOneMethod.vue";
import handlingEmotions from "./methods/handlingEmotions.vue";

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
      hideBordersOnInit: true,
    };
  },
  methods: {
    scroll(offset) {
      this.$emit("scroll", offset);
    },
  },
};
</script>
