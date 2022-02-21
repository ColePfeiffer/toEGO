<template>
  <baseDialog
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
  </baseDialog>
</template>

<script>
import baseDialog from "../../components/ui/baseDialog.vue";
import addEvent from "./newEventContent.vue";
//import addEvent from "./content.vue";

export default {
  name: "DialogNewEvent",
  components: {
    addEvent,
    baseDialog,
  },
  data() {
    return {};
  },
  methods: {
    closeDialog() {
      // reset everything
      //this.$refs.content.reset();
      this.$store.commit("data/setDialogVisibility");
    },
    saveChanges() {
      this.closeDialog();
    },
  },
};
</script>

<style scoped>
</style>