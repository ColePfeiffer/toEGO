<template>
  <BaseDialog v-model="isDialogVisible"
    dialogTitle="Deleting Note"
    :icon="menuIcon"
    :button1="{ isShown: true, text: 'No' }"
    :button2="{ isShown: true, text: 'Yes' }"
    :minHeight="200"
    @closeDialog="closeDialog"
    @save="deleteNote">
    <template v-slot:content>
      <q-card class="transparent no-shadow">
        <q-card-section class="row q-pa-md items-center justify-center text-center ">
          <div class="col-10 q-mt-md">
            <span class="q-ml-sm ">Do you really want to delete this note?</span>
          </div>
        </q-card-section>
      </q-card>
    </template>
  </BaseDialog>
</template>

<script>
import BaseDialog from "./BaseDialog.vue";

export default {
  name: "DialogDeleteNote",
  emits: ["delete-note", "close-dialog"],
  components: {
    BaseDialog,
  },
  data() {
    return {
      icon: true,
      menuIcon: "delete",
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    deleteNote() {
      this.$emit("delete-note");
    },
  },
  computed: {
    isDialogVisible: {
      get() {
        if (
          this.$store.state.data.dialogSettings.isVisible === true &&
          this.$store.state.data.dialogSettings.nameOfCurrentDialog ===
          "DialogDeleteNote"
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
