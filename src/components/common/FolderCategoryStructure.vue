<template>
  <div style="max-width: 350px">
    <CategoriesWithFolders :currentTemplate="currentTemplate" :folders="folders" :categories="categories"
      :templates="templates" :isShowingTemplates="isShowingTemplates" @templateClicked="templateClicked">
    </CategoriesWithFolders>

    <q-separator />
    <!-- folderless categories -->
    <CategoriesWithoutFolders :currentTemplate="currentTemplate" :folders="folders" :categories="categories"
      :templates="templates" :isShowingTemplates="isShowingTemplates" @templateClicked="templateClicked">
    </CategoriesWithoutFolders>
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
  },
};
</script>
