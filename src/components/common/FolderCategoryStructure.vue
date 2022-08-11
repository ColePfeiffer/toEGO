<template>
  <div class="row items-center justify-center">
    <div style="max-width: 350px">
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
      <div v-for="category in getFolderlessCategories" :key="category">
        <!-- is showing templates -->
        <q-item
          dense
          clickable
          v-if="isShowingTemplates === true"
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
        <!-- is not showing templates -->
        <q-item
          v-else
          @click="manageCategoryForTemplate(category)"
          dense
          clickable
          :style="getTextColorForCategory(category)"
        >
          <CategoryItem
            :category="category"
            :currentTemplate="currentTemplate"
            :isShowingTemplates="false"
          >
          </CategoryItem>
        </q-item>
      </div>
    </div>
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
