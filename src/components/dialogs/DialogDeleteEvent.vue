<template>
  <baseDialog
    v-model="isDialogVisible"
    :widthOfDialog="330"
    @closeDialog="closeDialog"
    @save="deleteEvent"
  >
    <template v-slot:confirm-button> Yes </template>
    <template v-slot:close-button> No </template>
    <template v-slot:dialogTitle>
      <q-icon :name="menuIcon" size="25px" />
      Deleting Event
    </template>
    <template v-slot:content>
      <q-card class="transparent no-shadow">
        <q-card-section class="row items-center">
          <div class="col-3">
            <q-avatar icon="delete" color="primary" text-color="white" />
          </div>
          <div class="col">
            <span class="q-ml-sm"
              >Do you really want to delete this event?</span
            >
          </div>
        </q-card-section>
      </q-card>
    </template>
  </baseDialog>
</template>

<script>
import baseDialog from "../ui/baseDialog2.vue";

export default {
  name: "DialogDeleteEvent",
  emits: ["deleteEvent", "closeDialog"],
  components: {
    baseDialog,
  },
  data() {
    return {
      icon: true,
      menuIcon: "delete",
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    deleteEvent() {
      this.$emit("deleteEvent");
    },
  },
  computed: {
    isDialogVisible: {
      get() {
        if (
          this.$store.state.data.dialogSettings.isVisible === true &&
          this.$store.state.data.dialogSettings.nameOfCurrentDialog ===
            "dialogDeleteEvent"
        ) {
          return true;
        } else {
          return false;
        }
      },
      set(value) {
        let payload = {
          isVisible: value,
          isBackgroundVisible:
            this.$store.state.data.dialogSettings.isBackgroundVisible,
          nameOfCurrentDialog:
            this.$store.state.data.dialogSettings.nameOfCurrentDialog,
        };
        this.$store.commit("data/setDialogVisibility", payload);
      },
    },
  },
};
</script>
