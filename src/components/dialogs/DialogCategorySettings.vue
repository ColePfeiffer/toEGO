<template>
  <BaseDialog v-model="isDialogVisible" :hasHelpOption="true" :widthOfDialog="315" @closeDialog="closeDialog"
    @save="createTemplate">
    <template v-slot:confirm-button> Create </template>
    <template v-slot:close-button> Cancel </template>
    <template v-slot:dialogTitle>
      <q-icon :name="menuIcon" size="22px" />
      Folder and Category Settings
    </template>
    <template v-slot:content>
      <div class="row items-center justify-center q-pt-md q-pa-xl">
        <div class="col-9 col-md-9 col-xs-12">
          <q-list bordered padding>
            <q-item-label header>Folders</q-item-label>
            <div v-for="folder in folders" :key="folder.id">
              <BaseItemForCategorySettingsDialog :type="type" itemType="folder" :folderOrCategory="folder"
                :categories="categories">
              </BaseItemForCategorySettingsDialog>
            </div>
            <q-separator spaced />
            <q-item-label header>Categories</q-item-label>
            <div v-for="category in categories" :key="category.id">
              <BaseItemForCategorySettingsDialog :type="type" itemType="category" :folderOrCategory="category"
                :categories="categories">
              </BaseItemForCategorySettingsDialog>
            </div>
          </q-list>
        </div>
      </div>


    </template>
  </baseDialog>

</template>

<script>
import BaseDialog from "../ui/BaseDialog2.vue";
import BaseItemForCategorySettingsDialog from "../ui/BaseItemForCategorySettingsDialog.vue";

export default {
  name: "openDialogCategorySettings",
  props: {
    type: String,
    isDialogCategorySettingsVisible: Boolean,
  },
  emits: ["saveChanges", "closeDialog", "setDialogVisibilty"],
  components: {
    BaseDialog,
    BaseItemForCategorySettingsDialog
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
    isTypeSetToDiary() {
      if (this.type === "DIARY") {
        return true;
      } else {
        return false;
      }
    },
    folders() {
      if (this.isTypeSetToDiary) {
        return this.$store.state.data.foldersForDiary;
      } else {
        return this.$store.state.data.foldersForEvents;
      }
    },
    categories() {
      if (this.isTypeSetToDiary) {
        return this.$store.state.data.categoriesForDiary;
      } else {
        return this.$store.state.data.categoriesForEvents;
      }
    },
    isDialogVisible: {
      get() {
        if (this.isDialogCategorySettingsVisible) {
          return true
        } else {
          return false;
        }
      },
      set(value) {
        this.$emit("setDialogVisibilty", value);
      },
    },
  },
};

</script>


