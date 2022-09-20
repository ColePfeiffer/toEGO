<template>
  <q-item v-if="itemType === 'folder'" clickable :ripple="false">
    <q-menu fit square cover anchor="top left" class="no-border-radius" ref="qMenuModelRef" v-model="qMenuModel">
      <q-list>
        <!-- new category button -->
        <q-item v-if="!isRenaming">
          <!-- Button: Close Dropdown Menu -->
          <q-item-section avatar>
            <q-btn size="10px" dense flat color="secondary" class="q-pl-sm" icon="bi-chevron-left" @click="toggleMenu">
            </q-btn>
          </q-item-section>
          <!-- Name and Buttons -->
          <q-item-section>
            <div class="row justify-center items-center">
              <!-- Name -->
              <div class="col-8 name">
                {{folderOrCategory.name}}
              </div>
              <!-- Button: Edit-->
              <q-btn v-if="!isDeleting" class="col-2" color="primary" dense round flat icon="bi-pencil" size="10px"
                :ripple="false" @click="initiateRenaming">
              </q-btn>
              <!-- Button: Cancel Deleting -->
              <q-btn v-else class="col-2" dense round flat color="primary" icon="bi-x" size="10.5px" :ripple="false"
                @click="cancelDeleting">
              </q-btn>
              <!-- Button: Initiate Deletion -->
              <q-btn v-if="!isDeleting" class="col-2" color="primary" dense round flat icon="bi-trash" size="10px"
                :ripple="false" @click="initiateDeletion">
              </q-btn>
              <!-- Button: Confirm Deleting -->
              <q-btn v-else class="col-2" dense round flat color="red" icon="bi-check" size="10.5px" :ripple="false"
                @click="deleteItem">
              </q-btn>
            </div>

          </q-item-section>
        </q-item>
        <q-item v-else>
          <!-- Button: Cancel Editing -->
          <q-item-section avatar>
            <q-btn size="10px" dense round flat color="secondary" class="q-pl-sm" icon="bi-chevron-left"
              @click="cancelRenaming">
            </q-btn>
          </q-item-section>
          <!-- Input for changing name -->
          <q-item-section>
            <div class="row justify-center items-center">
              <q-input input-class="inputField" class="col-10" ref="nameRef" bottom-slots v-model="newName" counter
                maxlength="20" dense lazy-rules :rules="nameRules">
                <template v-slot:hint>Renaming...</template>
              </q-input>
              <q-btn class="col-2" round dense flat icon="bi-check" color="teal" @click="submitNewName" />
            </div>
          </q-item-section>
        </q-item>
        <q-separator></q-separator>
        <SelectableCategoriesForFolderManagement :categories="categories" :folder="folderOrCategory" />
      </q-list>
    </q-menu>

    <q-item-section avatar top>
      <q-avatar icon="bi-folder" color="transparent" text-color="secondary" />
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{ folderOrCategory.name }}</q-item-label>
      <q-item-label caption>Categories: {{ getAmount() }}</q-item-label>
    </q-item-section>


    <q-item-section side>
      <div class="row justify-end items-center q-px-lg">
        <div class="col-1">
          <q-btn dense round flat :icon="expandIcon" color="secondary" size="10.5px" :ripple="false" @click="showQMenu">
          </q-btn>
        </div>
      </div>
    </q-item-section>
  </q-item>

  <!-- CATEGORY -->
  <q-item v-else clickable v-ripple>
    <q-menu fit square class="no-border-radius" v-model="qMenuModel2">
      <q-list>
        <SelectableTemplatesForCategoryManagement :itemType="itemType" :type="type"
          :folderOrCategory="folderOrCategory">
        </SelectableTemplatesForCategoryManagement>
      </q-list>
    </q-menu>
    <q-item-section avatar top>
      <q-avatar icon="bi-collection" color="transparent" text-color="secondary" />
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{ folderOrCategory.name }}</q-item-label>
      <q-item-label caption>Templates: {{ getAmount() }} </q-item-label>
    </q-item-section>




    <q-item-section avatar>
      <div class="row">
        <div class="col-6 q-pr-md">
          <q-btn dense round flat icon="bi-trash" size="10px">
          </q-btn>
        </div>
        <div class="col-6 ">
          <q-btn dense round flat icon="expand_more" size="10px">
          </q-btn>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>


<script>
import SelectableCategoriesForFolderManagement from '../common/SelectableCategoriesForFolderManagement.vue';
import SelectableTemplatesForCategoryManagement from '../common/selectableTemplatesForCategoryManagement.vue';
export default {
  name: "BaseItemForCategorySettingsDialog",
  props: {
    type: String, // DIARY / STATUS
    itemType: String, // folder, category
    folderOrCategory: Object,
    categories: Array,
  },
  emits: ["deleteItem", "renameItem"],
  components: {
    SelectableCategoriesForFolderManagement,
    SelectableTemplatesForCategoryManagement
  },
  data() {
    return {
      expandIcon: "bi-chevron-down",
      qMenuModel: false,
      qMenuModel2: false,
      isDeleting: false,
      isRenaming: false,
      newName: this.folderOrCategory.name,
      nameRules: [
        (val) => (val && val.length > 0) || "Please enter a name",
      ],
    };
  },
  watch: {
    qMenuModel(newValue) {
      if (newValue === true) {
        this.expandIcon = "bi-chevron-up";
      } else {
        this.expandIcon = "bi-chevron-down";
      }
    },
  },
  methods: {
    // TODO
    submitNewName() {
      let payload = { item: this.folderOrCategory, newName: this.newName }
      this.$emit("renameItem", payload)
      this.isRenaming = false;
    },
    initiateDeletion() {
      this.isDeleting = true;
    },
    cancelDeleting() {
      this.isDeleting = false;
    },
    deleteItem() {
      this.$emit("deleteItem", this.folderOrCategory)
    },
    initiateRenaming() {
      this.isRenaming = !this.isRenaming;
    },

    cancelRenaming() {
      this.$refs.nameRef.resetValidation();
      this.isRenaming = false;
      this.newName = this.folderOrCategory.name;
    },

    createNewCategory() {
      let payload = {
        categoryName: this.newName,
        type: this.type,
      };
      this.$store.commit("data/addNewCategory", payload);
      this.closeAndResetNewCategoryCreation();
    },
    showQMenu() {
      this.$refs.qMenuModelRef.show;
    },
    toggleMenu() {
      this.qMenuModel = !this.qMenuModel;
    },
    getAmount() {
      let amount;
      if (this.folderOrCategory.templatesByID != undefined) {
        amount = this.folderOrCategory.templatesByID.length;
      } else {
        amount = this.folderOrCategory.categoriesByID.length;
      }
      return amount;
    }
  },
};




</script>

<style>
.name {
  font-weight: 500;
}

.inputField {
  margin-top: 15px;
  padding-top: 0px;
}
</style>
