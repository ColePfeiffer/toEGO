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
            <!-- Label / Header: Name and button to create new folder -->
            <q-item-label header>
              <div class="row justify-between items-center no-wrap">
                <!-- Header: Folders -->
                <div v-if="!isCreatingNewFolder" class="header col-10">Folders</div>
                <!-- Creating new folder mode: Input field -->
                <div v-else class="col-10">
                  <div class="row justify-between items-center">
                    <div class="col-1">
                      <!-- Button: Cancel Creation of new folder -->
                      <q-btn dense round flat color="secondary" icon="bi-chevron-left" size="10px" :ripple="false"
                        @click="cancelCreatingNewFolder">
                      </q-btn>

                    </div>
                    <!-- Input field -->
                    <q-input class="col-9" input-class="inputField" ref="nameRef" bottom-slots v-model="newFolderName"
                      counter maxlength="20" dense lazy-rules :rules="nameRules">
                      <template v-slot:hint>Enter a folder name</template>
                    </q-input>
                  </div>



                </div>
                <!-- Buttons -->
                <div class="col-2 row justify-end no-wrap">
                  <div class="col-2 q-pr-lg">
                    <!-- Button: Initiate Creation of new folder -->
                    <q-btn v-if="!isCreatingNewFolder" class="col-2 q-px-md" color="accent" dense round flat
                      icon="bi-plus-lg" size="10px" :ripple="false" @click="initiateCreatingNewFolder">
                    </q-btn>
                    <!-- Button: Confirm Creation of new folder -->
                    <q-btn v-else class="col-2 q-px-md" dense round flat color="teal" icon="bi-check" size="10px"
                      :ripple="false" @click="createNewFolder">
                    </q-btn>
                  </div>
                </div>
              </div>

            </q-item-label>
            <div v-for="folder in folders" :key="folder.id">
              <BaseItemForCategorySettingsDialog :type="type" itemType="folder" :folderOrCategory="folder"
                :categories="categories" @deleteItem="deleteFolder" @renameItem="renameFolder">
              </BaseItemForCategorySettingsDialog>
            </div>
            <q-separator spaced />
            <q-item-label header class="row justify-center items-center">
              <div class="col-8 ">
                <div class="header">Categories</div>
                <div v-if="isCreatingNewCategory" class="row justify-center items-center">
                  <q-input class="col-10" ref="nameRef" bottom-slots v-model="newCategoryName" counter maxlength="20"
                    dense lazy-rules :rules="nameRules">
                  </q-input>
                </div>

              </div>
              <div class="col-4 text-right ">
                <q-btn v-if="!isCreatingNewCategory" class="smallText" flat dense icon="bi-plus-lg" color="accent"
                  size="10px" @click="toggleNewCategoryCreation"></q-btn>
                <div v-else>
                  <q-btn class="smallText" label="Cancel" size="10px" dense flat color="secondary"
                    icon="keyboard_arrow_left" @click="closeAndResetNewCategoryCreation">
                  </q-btn>
                  <q-btn class="smallText" label="Create" size="10px" dense flat color="teal" icon="bi-check"
                    @click="onSubmit" />
                </div>

              </div>
            </q-item-label>
            <q-scroll-area style="height: 170px">
              <div v-for="category in categories" :key="category.id">
                <BaseItemForCategorySettingsDialog :type="type" itemType="category" :folderOrCategory="category"
                  :categories="categories">
                </BaseItemForCategorySettingsDialog>
              </div>
            </q-scroll-area>
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
    BaseItemForCategorySettingsDialog,
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
    deleteFolder(folderToDelete) {
      let payload = { folderToDelete: folderToDelete, type: this.type }
      this.$store.commit("data/deleteFolder", payload);
    },
    // renames an existing folder
    renameFolder(payload) {
      this.$store.commit("data/renameFolder", payload);
    },
    showNamingDialog() {
      let payload = {
        isVisible: true,
        isBackgroundVisible: true,
        nameOfCurrentDialog: "dialogCreateFolder",
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },
    onSubmit() {
      let nameInput = this.$refs.nameRef;
      console.log(nameInput);
      nameInput.validate();

      // if form has error
      if (nameInput.hasError) {
      } else {
        this.$q.notify({
          icon: "done",
          color: "secondary",
          textColor: "black",
          message: "Category created.",
        });
        this.createNewCategory();
      }
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
      this.$store.commit("data/addNewCategory", payload);
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
