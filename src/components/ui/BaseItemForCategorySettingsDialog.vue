<template>
  <q-item v-if="itemType === 'folder'" clickable :ripple="false">
    <q-menu fit square class="no-border-radius" v-model="qMenuModel">
      <q-list>
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
      <div class="row">
        <div class="col-6 q-pr-md">
          <q-btn dense round flat icon="bi-trash" size="10.5px" :ripple="false">
          </q-btn>
        </div>
        <div class="col-6 ">
          <q-btn dense round flat :icon="expandIcon" size="10.5px" :ripple="false" @click="openMenu">
          </q-btn>



        </div>
      </div>
    </q-item-section>
  </q-item>

  <!-- CATEGORY -->
  <q-item v-else clickable v-ripple>
    <q-menu fit square class="no-border-radius" v-model="qMenuModel">
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
  emits: [],
  components: {
    SelectableCategoriesForFolderManagement,
    SelectableTemplatesForCategoryManagement
  },
  data() {
    return {
      expandIcon: "expand_more",
      qMenuModel: false,
    };
  },
  watch: {
    qMenuModel(newValue) {
      if (newValue === true) {
        this.expandIcon = "expand_less";
      } else {
        this.expandIcon = "expand_more";
      }
    },
  },
  methods: {
    openMenu() {
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
