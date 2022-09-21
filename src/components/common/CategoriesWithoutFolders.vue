<template>
  <div v-if="isShowingTemplates === true">
    <div v-for="category in getNonEmptyFolderlessCategories" :key="category">
      <!-- is showing templates -->
      <q-item dense clickable>
        <CategoryItem :category="category" :currentTemplate="currentTemplate" :isShowingTemplates="true"
          :templates="templates" @templateClicked="templateClicked">
        </CategoryItem>
      </q-item>
    </div>
    <!-- show templates that aren't in categories -->
    <q-separator />
    <div v-for="template in getTemplates" :key="template">
      <q-item @click="templateClicked(template)" v-close-popup dense clickable>
        <TemplateItem :template="template"></TemplateItem>
      </q-item>
    </div>
  </div>
  <div v-else>
    <div v-for="category in getFolderlessCategories" :key="category">
      <!-- is not showing templates -->
      <q-item dense clickable @click="manageCategoryForTemplate(category)" :style="getTextColorForCategory(category)">
        <CategoryItem :category="category" :currentTemplate="currentTemplate" :isShowingTemplates="false"
          :templates="templates">
        </CategoryItem>
      </q-item>
    </div>
  </div>
</template>

<script>
import CategoryItem from "./CategoryItem.vue";
import TemplateItem from "./TemplateItem.vue";

export default {
  name: "CategoriesWithoutFolders",
  emits: ["templateClicked"],
  components: { CategoryItem, TemplateItem },
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
    return {};
  },
  methods: {
    isTemplateSetToThisCategory(category) {
      if (category.storedIDs.includes(this.currentTemplate.id)) {
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
    // kann evtl weg
    templateClicked(template) {
      this.$emit("templateClicked", template);
    },
    manageCategoryForTemplate(category) {
      let payload = {
        category: category,
        template: this.currentTemplate,
      };
      if (category.storedIDs.includes(this.currentTemplate.id)) {
        this.$store.commit("data/removeTemplateFromCategory", payload);
      } else {
        this.$store.commit("data/addTemplateToCategory", payload);
      }
    },
    manageCategoryForTag() { },
  },
  computed: {
    getFolderlessCategories() {
      return this.categories.filter((category) => {
        return category.isInFolder === false;
      });
    },

    // kann evtl weg
    // get templates that aren't in folders or categories
    getTemplates() {
      let array = [];

      this.templates.forEach((template) => {
        let payload = {
          template: template,
          categories: this.categories,
        };

        if (
          this.$store.getters["data/checkIfTemplateIsInCategory"](payload) ===
          true
        ) {
          array.push(template);
        }
      });
      return array;
    },
    getNonEmptyFolderlessCategories() {
      return this.categories.filter((category) => {
        return (
          category.storedIDs.length > 0 && category.isInFolder === false
        );
      });
    },
  },
};
</script>
