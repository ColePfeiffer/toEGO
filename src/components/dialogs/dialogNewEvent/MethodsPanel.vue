<template>
  <BasePanelWithButtons
    :options="options"
    :names="names"
    :hideBordersOnInit="hideBordersOnInit"
    :showNames="showNames"
    @scroll="scroll()"
  >
    <template v-slot:panelLeftSlot>
      <fiveToOneMethod @onShow="scroll"></fiveToOneMethod>
      <handlingEmotions @onShow="scroll"></handlingEmotions>
    </template>

    <template v-slot:panelRightSlot> Yayayadadada. </template>
  </BasePanelWithButtons>
</template>

<script>
import BasePanelWithButtons from "../../ui/BasePanelWithButtons.vue";
import fiveToOneMethod from "./methods/FiveToOneMethod.vue";
import handlingEmotions from "./methods/handlingEmotions.vue";

export default {
  name: "methodsPanel",
  components: {
    BasePanelWithButtons,
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
      showNames: true,
    };
  },
  methods: {
    scroll(offset) {
      this.$emit("scroll", offset);
    },
  },
};
</script>
