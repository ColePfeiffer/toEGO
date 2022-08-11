<template>
  <div class="row items-center justify-center">
    <div style="max-width: 350px">
      <!-- categories that are in folders -->
      <!-- -->
      <div v-if="!isShowingTemplates">
        <q-item dense clickable v-for="folder in folders" :key="folder">
          <FolderItem
            :folder="folder"
            :currentTemplate="currentTemplate"
            :categories="categories"
            :templates="templates"
            @categoryClicked="manageCategoryForTemplate(category)"
          ></FolderItem>
        </q-item>
      </div>

      <!-- -->
      <div v-else>
        <q-item
          dense
          clickable
          v-for="folder in getNonEmptyFolders"
          :key="folder"
        >
          <FolderItem
            :folder="folder"
            :currentTemplate="currentTemplate"
            :categories="categories"
            :templates="templates"
          ></FolderItem>
        </q-item>
      </div>

      <q-separator />
      <!-- folderless categories -->
      <div v-if="isShowingTemplates === true">
        <div
          v-for="category in getNonEmptyFolderlessCategories"
          :key="category"
        >
          <!-- is showing templates -->
          <q-item dense clickable>
            <CategoryItem
              :category="category"
              :currentTemplate="currentTemplate"
              :isShowingTemplates="true"
              :templates="templates"
            >
            </CategoryItem>
          </q-item>
        </div>
        <div v-for="template in getTemplates" :key="template">
          <!-- is not showing templates -->
          <q-item dense clickable>
            <TemplateItem :template="template"></TemplateItem>
          </q-item>
        </div>
      </div>
      <div v-else>
        <div v-for="category in getFolderlessCategories" :key="category">
          <!-- is not showing templates -->
          <q-item
            dense
            clickable
            @click="manageCategoryForTemplate(category)"
            :style="getTextColorForCategory(category)"
          >
            <CategoryItem
              :category="category"
              :currentTemplate="currentTemplate"
              :isShowingTemplates="false"
              :templates="templates"
            >
            </CategoryItem>
          </q-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import CategoryItem from "./categoryItem.vue";
import FolderItem from "./folderItem.vue";
import TemplateItem from "./TemplateItem.vue";

export default {
  name: "CategoryOrTagQuickMenu",
  emits: [],
  props: {
    currentTemplate: Object,
    folders: Array,
    categories: Array,
    isShowingTemplates: {
      type: Boolean,
      default: false,
    },
    templates: Array,
  },
  data() {
    return {
      newCategoryName: "",
      isCreatingNewCategory: false,
    };
  },
  methods: {
    isTemplateSetToThisCategory(category) {
      if (category.templatesByID.includes(this.currentTemplate.id)) {
        return "bi-dash";
      } else {
        return "bi-plus";
      }
    },
    getTextColorForCategory(category) {
      if (this.isTemplateSetToThisCategory(category) === "bi-dash") {
        return {
          color: "var(--q-primary)",
        };
      } else {
        return {
          color: "#d3d3d3 ",
        };
      }
    },
    manageCategoryForTemplate(category) {
      let payload = {
        category: category,
        template: this.currentTemplate,
      };
      if (category.templatesByID.includes(this.currentTemplate.id)) {
        this.$store.commit("data/removeTemplateFromCategory", payload);
      } else {
        this.$store.commit("data/addTemplateToCategory", payload);
      }
    },
    manageCategoryForTag() {},
  },
  computed: {
    // get templates that aren't in folders or categories
    getTemplates() {
      return this.templates.filter((template) => {
        return template.isInCategory === false;
      });
    },
    getNonEmptyFolders() {
      return this.$store.getters["data/getFoldersWithTemplates"](
        this.folders,
        this.categories
      );
    },
    getNonEmptyFolderlessCategories() {
      return this.categories.filter((category) => {
        return category.templatesByID.length != 0;
      });
    },
    getFolderlessCategories() {
      return this.categories.filter((category) => {
        return category.isInFolder === false;
      });
    },
  },
  components: { CategoryItem, FolderItem, TemplateItem },
};
</script>
