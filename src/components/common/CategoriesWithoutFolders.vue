<template>
  <div v-if="isShowingTemplates === true">
    <div v-for="category in getNonEmptyFolderlessCategories" :key="category">
      <!-- is showing templates -->
      <q-item dense clickable>
        <CategoryItem
          :category="category"
          :currentTemplate="currentTemplate"
          :isShowingTemplates="true"
          :templates="templates"
          @templateClicked="templateClicked"
        >
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
</template>

<script>
import CategoryItem from "./CategoryItem.vue";
import TemplateItem from "./TemplateItem.vue";

export default {
  name: "CategoriesWithFolders",
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
    templateClicked(template) {
      this.$emit("templateClicked", template);
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
      let array = [];

      console.log("getTemplates looking through all templates");
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
      console.log("getTemplates", array);
      return array;
    },
    getNonEmptyFolderlessCategories() {
      console.log("getNonEmptyFolderlessCategories");
      return this.categories.filter((category) => {
        console.log(category, "is being checked");
        return category.templatesByID.length != 0;
      });
    },
  },
};
</script>
