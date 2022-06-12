<template>
  <baseDialog
    v-model="isDialogVisible"
    :widthOfDialog="315"
    :isSaveButtonDisabled="!isNameValid"
    @closeDialog="closeDialog"
    @save="createTemplate"
  >
    <template v-slot:confirm-button> Create </template>
    <template v-slot:close-button> Cancel </template>
    <template v-slot:dialogTitle>
      <q-icon :name="menuIcon" size="22px" />
      Template Creator
    </template>
    <template v-slot:content>
      <q-card class="transparent no-shadow">
        <q-card-section class="row items-center">
          <div class="col-3">
            <q-avatar
              icon="bi-journal-plus"
              color="primary"
              text-color="white"
            />
          </div>
          <div class="col">
            <span class="q-ml-sm">Name your template...</span>
            <q-input
              filled
              square
              v-model="templateName"
              :rules="[
                (val) => !!val || '* Required',
                (val) => val.length >= 2 || 'Please use minimum 2 characters',
                (val) => val.length <= 20 || 'Please use maximum 25 characters',
              ]"
            />
          </div>
        </q-card-section>
      </q-card>
    </template>
  </baseDialog>
</template>

<script>
import baseDialog from "../ui/BaseDialog2.vue";

export default {
  name: "DialogCreateTemplate",
  emits: ["createTemplate", "closeDialog"],
  components: {
    baseDialog,
  },
  data() {
    return {
      icon: true,
      menuIcon: "bi-file-earmark-font",
      templateName: "",
    };
  },
  methods: {
    closeDialog() {
      this.reset();
      this.$emit("closeDialog");
    },
    createTemplate() {
      this.$emit("createTemplate", this.templateName);
      this.reset();
    },
    reset() {
      this.templateName = "";
    },
  },
  computed: {
    isNameValid() {
      if (this.templateName.length >= 2 && this.templateName.length <= 25) {
        return true;
      } else {
        return false;
      }
    },
    isDialogVisible: {
      get() {
        if (
          (this.$store.state.data.dialogSettings.isVisible === true) &
          (this.$store.state.data.dialogSettings.nameOfCurrentDialog ===
            "dialogCreateTemplate")
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
