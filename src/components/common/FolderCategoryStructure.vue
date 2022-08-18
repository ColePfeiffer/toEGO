<template>
  <div class="row items-center justify-center">
    <div style="max-width: 350px">
      <CategoriesWithFolders
        :currentTemplate="currentTemplate"
        :folders="folders"
        :categories="categories"
        :templates="templates"
        :isShowingTemplates="false"
        @templateClicked="templateClicked"
      ></CategoriesWithFolders>

      <q-separator />
      <!-- folderless categories -->
      <CategoriesWithoutFolders></CategoriesWithoutFolders>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import CategoriesWithFolders from "./CategoriesWithFolders.vue";
import CategoriesWithoutFolders from "./CategoriesWithoutFolders.vue";

export default {
  name: "FolderCategoryStructure",
  components: { CategoriesWithFolders, CategoriesWithoutFolders },
  emits: ["templateClicked"],
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
    templateClicked(template) {
      console.log(
        "template clicked triggered in folderCategoryStructure: ",
        template
      );
      this.$emit("templateClicked", template);
    },
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
    getNonEmptyFolders() {
      return this.$store.getters["data/getFoldersWithTemplates"](
        this.folders,
        this.categories
      );
    },

    getFolderlessCategories() {
      return this.categories.filter((category) => {
        return category.isInFolder === false;
      });
    },
  },
};
</script>
