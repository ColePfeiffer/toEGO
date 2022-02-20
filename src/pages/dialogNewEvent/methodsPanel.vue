<template>
  <basePanelWithButtons
    :options="[
      { name: 'methods', value: 'methods', slot: 'methods' },
      { name: 'methods', value: 'templates', slot: 'templates' },
    ]"
    :isVisible="$store.state.data.newEventDialogIsOpen"
    @close="closeDialog"
    @save="saveChanges"
  >
    <template v-slot:dialogTitle>
      <q-icon name="theater_comedy" size="25px" />
      Event-Tracker
    </template>
    <template v-slot:content>
      <addEvent></addEvent>
    </template>
  </basePanelWithButtons>
</template>

<script>
import basePanelWithButtons from "../../components/ui/basePanelWithButtons.vue";

//import addEvent from "./content.vue";

export default {
  name: "DialogNewEvent",
  components: {
    basePanelWithButtons,
  },
  data() {
    return {};
  },
  methods: {
    closeDialog() {
      // reset everything
      console.log("triggering Reset!");
      //this.$refs.content.reset();
      this.$store.commit("data/setDialogVisibility");
    },
    saveChanges() {
      console.log("wooooow, saved.");
      this.closeDialog();
    },
  },
};
</script>

<style scoped>
</style>