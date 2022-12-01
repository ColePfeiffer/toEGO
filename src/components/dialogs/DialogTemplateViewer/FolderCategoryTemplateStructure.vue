<template>
  <div>
    <div v-if="getNonEmptyFolders.length > 0">
      <!-- Non-Empty-Folders -->
      <FolderItem v-for="folder in getNonEmptyFolders"
        :key="folder"
        :isShowingTemplates="isShowingTemplates"
        :folder="folder"
        :categories="categories"
        :templates="templates"
        :currentTemplate="currentTemplate"
        @click-folder="clickFolder"
        @click-category="clickCategoryInsideFolder"
        @click-template="clickTemplateInsideCategoryInsideFolder"></FolderItem>
      <q-separator />
    </div>
    <!-- Categories which aren't stored in Folders -->
    <CategoryItem v-for="category in displayedCategories"
      :key="category"
      :categoryMode="categoryMode"
      :isShowingTemplates="isShowingTemplates"
      :category="category"
      :currentTemplate="currentTemplate"
      :templates="templates"
      @click-category="clickCategory"
      @click-template="clickTemplateInsideCategory"></CategoryItem>

    <!-- templates which are not in categories -->
    <q-separator v-if="isShowingTemplates" />
    <div v-if="isShowingTemplates">
      <TemplateItem v-for="template in getTemplatesWithoutCategories"
        :key="template"
        :isShowingTemplates="isShowingTemplates"
        :template="template"
        :currentTemplate="currentTemplate"
        @click-template="clickTemplate"></TemplateItem>
    </div>

  </div>
</template>

<script>
import FolderItem from './ItemFolder.vue';
import CategoryItem from './ItemCategory.vue';
import TemplateItem from './ItemTemplate.vue';

export default {
  name: "FolderCategoryTemplateStructure",
  components: { FolderItem, CategoryItem, TemplateItem },
  emits: ["click-folder", "click-category", "click-template"],
  props: {
    isShowingTemplates: {
      type: Boolean,
      default: false,
    },
    categoryMode: String,
    currentTemplate: Object,
    categories: Array,
    templates: Array,
    folders: Array,
  },
  data() {
    return {
    };
  },
  methods: {

    clickFolder(folder) {
      this.$emit("click-folder", folder);
    },
    clickCategoryInsideFolder() {
    },
    clickTemplateInsideCategoryInsideFolder(template) {
      this.clickTemplate(template);
    },
    clickCategory(category) {
      this.$emit("click-category", category);
    },
    clickTemplateInsideCategory(template) {
      this.$emit("click-template", template);
    },
    clickTemplate(template) {
      this.$emit("click-template", template);
    },
  },
  computed: {
    displayedCategories() {
      if (this.isShowingTemplates) {
        return this.getCategoriesWithoutFoldersButWithTemplates
      } else {
        return this.getCategoriesWithoutFolders;
      }
    },
    getCategoriesWithoutFolders() {
      if (this.getNonEmptyFolders.length > 0) {
        return this.$store.getters["templates/getCategoriesWithoutFolders"]({
          folders: this.folders,
          categories: this.categories,
        });
      } else {
        return this.categories;
      }

    },
    getNonEmptyFolders() {
      return this.$store.getters["templates/getNonEmptyFolders"](
        this.folders,
        this.categories
      );
    },
    // only returns category-items that are not stored in any folder and hold at least one template-item
    getCategoriesWithoutFoldersButWithTemplates() {
      let test;
      test = this.getCategoriesWithoutFolders.filter((category) => {
        return category.storedIDs != undefined && category.storedIDs.length > 0;
      });
      return test;
    },
    getTemplatesWithoutCategories() {
      if (this.displayedCategories.length > 0 || this.getNonEmptyFolders.length > 0) {
        return this.$store.getters["templates/getTemplatesWithoutCategories"]({
          templates: this.templates,
          categories: this.categories,
        });
      } else {
        return this.templates;
      }

    },
  }
};
</script>
