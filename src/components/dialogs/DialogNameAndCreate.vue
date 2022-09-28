<template>
  <BaseDialog
    v-model="isDialogVisible"
    :widthOfDialog="315"
    :isSaveButtonDisabled="!isNameValid"
    @closeDialog="closeDialog"
    @save="create"
  >
    <template v-slot:confirm-button> Create </template>
    <template v-slot:close-button> Cancel </template>
    <template v-slot:dialogTitle>
      <q-icon :name="menuIcon" size="22px" />
      {{ dialogName }}
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
            <span class="q-ml-sm">{{ text }}</span>
            <q-input
              filled
              square
              v-model="name"
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
  </BaseDialog>
</template>

<script>
import BaseDialog from "../ui/baseDialog.vue";

export default {
  name: "DialogCreateTemplate",
  props: {
    // can be 'DIARY', 'EVENT', 'CATEGORY', 'TEMPLATE'
    type: String,
    menuIcon: {
      type: String,
      default: "bi-file-earmark-font",
    },
    text: {
      type: String,
      default: "Name your template...",
    },
    dialogName: {
      type: String,
      default: "Template Creator",
    },
  },
  emits: ["create", "closeDialog"],
  components: {
    BaseDialog,
  },
  data() {
    return {
      icon: true,
      name: "",
    };
  },
  methods: {
    closeDialog() {
      this.reset();
      this.$emit("closeDialog");
    },
    create() {
      this.$emit("create", this.name);
      this.reset();
    },
    reset() {
      this.name = "";
    },
  },
  computed: {
    isNameValid() {
      if (this.name.length >= 2 && this.name.length <= 25) {
        return true;
      } else {
        return false;
      }
    },
    isDialogVisible: {
      get() {
        let nameOfDialog;
        if (this.type === "DIARY") {
          nameOfDialog = "dialogCreateDiaryTemplate";
        } else if (this.type === "EVENT") {
          nameOfDialog = "dialogCreateEventTemplate";
        } else if (this.type === "FOLDER") {
          nameOfDialog = "dialogCreateFolder";
        }

        if (
          (this.$store.state.data.dialogSettings.isVisible === true) &
          (this.$store.state.data.dialogSettings.nameOfCurrentDialog ===
            nameOfDialog)
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
