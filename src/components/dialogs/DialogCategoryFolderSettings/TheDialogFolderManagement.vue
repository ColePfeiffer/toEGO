<template>
  <BaseDialog v-model="isDialogVisible"
    dialogTitle="Folder and Category Settings"
    icon="bi-file-earmark-font"
    :button1="{isShown: true, text: 'Close'}"
    :button2="{isShown: false, text: ''}"
    :hasHelpOption="true"
    @closeDialog="closeDialog">
    <template v-slot:content>
      <div class="row items-center justify-center q-pt-md q-px-md q-mx-lg">
        <!-- Outer Container -->
        <div class="col-12">
          <q-list bordered
            padding>
            <TheFolderSection :type="type"
              :itemsToDisplay="folders"></TheFolderSection>
            <q-separator spaced />
            <TheCategorySection :type="type"
              :itemsToDisplay="categories"
              @delete-category="deleteCategory"></TheCategorySection>
          </q-list>
        </div>
      </div>
    </template>
  </BaseDialog>
</template>

<script>
import BaseDialog from "../../ui/baseDialog.vue";
import TheFolderSection from "./TheFolderSection.vue";
import TheCategorySection from "./TheCategorySection.vue";

export default {
  name: "openDialogFolderManagement",
  props: {
    type: String,
    isDialogFolderManagementVisible: Boolean,
  },
  emits: ["closeDialog", "setDialogVisibilty"],
  components: {
    BaseDialog,
    TheFolderSection,
    TheCategorySection,
  },
  data() {
    return {
      icon: true,
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
    deleteCategory(categoryToDelete) {
      console.log("categoryToDelete: ", categoryToDelete);
      let payload = {
        parents: this.folders,
        child: categoryToDelete,
        type: this.type,
      };
      this.$store.dispatch(
        "data/removeCategoryFromParentsAndDeleteIt",
        payload
      );
    },
    cancelCreatingNewFolder() {
      this.isCreatingNewFolder = false;
    },
    initiateCreatingNewFolder() {
      this.isCreatingNewFolder = true;
    },
    createNewFolder() { },
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
        if (this.isDialogFolderManagementVisible) {
          return true;
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
