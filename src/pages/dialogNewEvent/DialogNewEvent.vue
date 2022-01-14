<template>
  <baseDialog2
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
  </baseDialog2>
</template>

<script>
import baseDialog2 from "../../components/ui/baseDialog2.vue";
import addEvent from "./newEventContent.vue";

export default {
  name: "DialogNewEvent",
  components: {
    addEvent,
    baseDialog2,
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