<template>
  <BaseDialog v-model="isDialogVisible" :hasHelpOption="true" :widthOfDialog="315" @closeDialog="closeDialog"
    @save="createTemplate">
    <template v-slot:confirm-button> Create </template>
    <template v-slot:close-button> Back </template>
    <template v-slot:dialogTitle>
      <q-icon :name="menuIcon" size="22px" />
      Folder and Category Settings
    </template>
    <template v-slot:content>
      <div class="row items-center justify-center q-pt-md q-pa-xl">
        <!-- Outer Container -->
        <div class="col-9 col-md-9 col-xs-12">
          <q-list bordered padding>
            <TheFolderSection :type="type" itemType="FOLDER" :itemsToDisplay="folders"></TheFolderSection>
            <q-separator spaced />
            <TheCategorySection :type="type" itemType="CATEGORY" :itemsToDisplay="categories"></TheCategorySection>
          </q-list>
        </div>
      </div>


    </template>
  </baseDialog>

</template>

<script>
import BaseDialog from "../ui/BaseDialog2.vue";
import TheFolderSection from "./DialogCategoryFolderSettings/TheFolderSection.vue";
import TheCategorySection from "./DialogCategoryFolderSettings/TheCategorySection.vue";

export default {
  name: "openDialogCategorySettings",
  props: {
    type: String,
    isDialogCategorySettingsVisible: Boolean,
  },
  emits: ["closeDialog", "setDialogVisibilty"],
  components: {
    BaseDialog,
    TheFolderSection,
    TheCategorySection
  },
  data() {
    return {
      icon: true,
      menuIcon: "bi-file-earmark-font",
      templateName: "",
      isCreatingNewCategory: false,
      isCreatingNewFolder: false,
      newCategoryName: "",
      newFolderName: "",
      nameRules: [
        (val) => (val && val.length > 0) || "Please name the folder.",
      ],
    };
  },
  methods: {
    cancelCreatingNewFolder() {
      this.isCreatingNewFolder = false;
    },
    initiateCreatingNewFolder() {
      this.isCreatingNewFolder = true;
    },
    createNewFolder() {

    },

    showNamingDialog() {
      let payload = {
        isVisible: true,
        isBackgroundVisible: true,
        nameOfCurrentDialog: "dialogCreateFolder",
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },

    toggleNewCategoryCreation() {
      this.isCreatingNewCategory = !this.isCreatingNewCategory;
    },

    closeAndResetNewCategoryCreation() {
      this.$refs.nameRef.resetValidation();
      this.isCreatingNewCategory = false;
      this.newCategoryName = "";
    },

    createNewCategory() {
      let payload = {
        categoryName: this.newCategoryName,
        type: this.type,
      };
      this.$store.commit("data/createCategory", payload);
      this.closeAndResetNewCategoryCreation();
    },
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


<style scoped>
.header {
  text-decoration: underline;
}

.inputField {
  margin-top: 15px;
  padding-top: 0px;
}
</style>
