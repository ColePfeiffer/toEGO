<template>
  <div class="row items-center justify-center">
    <div style="max-width: 350px">
      <!-- categories that are in folders -->
      <div v-if="isShowingTemplates === false">
        <q-item dense clickable v-for="folder in folders" :key="folder">
          <FolderItem
            :folder="folder"
            :currentTemplate="currentTemplate"
            :categories="categories"
            :templates="templates"
            :isShowingTemplates="false"
            @categoryClicked="manageCategoryForTemplate"
            @templateClicked="templateClicked"
          ></FolderItem>
        </q-item>
      </div>

      <!-- is showing templates -->
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
            :isShowingTemplates="false"
            @categoryClicked="manageCategoryForTemplate"
            @templateClicked="templateClicked"
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
              @templateClicked="templateClicked"
            >
            </CategoryItem>
          </q-item>
        </div>
        <!-- show templates that aren't in categories -->
        <q-separator />
        <div v-for="template in getTemplates" :key="template">
          <q-item
            @click="templateClicked(template)"
            v-close-popup
            dense
            clickable
          >
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
    getNonEmptyFolders() {
      return this.$store.getters["data/getFoldersWithTemplates"](
        this.folders,
        this.categories
      );
    },
    getNonEmptyFolderlessCategories() {
      console.log("getNonEmptyFolderlessCategories");
      return this.categories.filter((category) => {
        console.log(category, "is being checked");
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
