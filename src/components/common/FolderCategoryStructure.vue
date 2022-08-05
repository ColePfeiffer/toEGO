<template>
  <div
    v-if="isShowingTemplates === true"
    class="row items-center justify-between"
  >
    <q-list>
      <!-- categories that are in folders -->
      <q-item dense clickable v-for="folder in folders" :key="folder">
        <FolderItem
          :folder="folder"
          :currentTemplate="currentTemplate"
          :categories="categories"
        ></FolderItem>
      </q-item>
      <q-separator />
      <!-- folderless categories -->
      <q-item
        dense
        clickable
        v-for="category in getFolderlessCategories"
        :key="category"
        @click="manageCategoryForTemplate(category)"
        :style="getTextColorForCategory(category)"
      >
        <CategoryItem
          :category="category"
          :currentTemplate="currentTemplate"
          :categories="categories"
          :isShowingTemplates="true"
        >
        </CategoryItem>
      </q-item>
    </q-list>
  </div>
  <div v-else class="row items-center justify-between">
    <!-- categories that are in folders -->
    <q-list>
      <q-item dense clickable v-for="folder in folders" :key="folder">
        <FolderItem
          :folder="folder"
          :currentTemplate="currentTemplate"
          :categories="categories"
        ></FolderItem>
      </q-item>

      <q-separator />

      <q-item
        class="row align-center items-center"
        @click="manageCategoryForTemplate(category)"
        v-for="category in getFolderlessCategories"
        :key="category"
        dense
        clickable
        :style="getTextColorForCategory(category)"
      >
        <CategoryItem
          :category="category"
          :currentTemplate="currentTemplate"
          :isShowingTemplates="false"
        ></CategoryItem>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import CategoryItem from "./categoryItem.vue";
import FolderItem from "./folderItem.vue";

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
        templateID: this.currentTemplate.id,
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
    getFolderlessCategories() {
      return this.categories.filter((category) => {
        return category.isInFolder === false;
      });
    },
  },
  components: { CategoryItem, FolderItem },
};
</script>
