<template>
  <div v-if="isShowingTemplates === false">
    <q-item dense clickable v-for="folder in folders" :key="folder">
      <FolderItem :folder="folder" :currentTemplate="currentTemplate" :categories="categories" :templates="templates"
        :isShowingTemplates="false" @categoryClicked="manageCategoryForTemplate" @templateClicked="templateClicked">
      </FolderItem>
    </q-item>
  </div>
  <div v-else>
    <q-item dense clickable v-for="folder in getNonEmptyFolders" :key="folder">
      <FolderItem :folder="folder" :currentTemplate="currentTemplate" :categories="categories" :templates="templates"
        :isShowingTemplates="true" @templateClicked="templateClicked"></FolderItem>
    </q-item>
  </div>
</template>

<script>
import FolderItem from "./FolderItem.vue";
export default {
  name: "CategoriesWithFolders",
  emits: ["templateClicked"],
  components: { FolderItem },
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
      if (category.storedIDs.includes(this.currentTemplate.id)) {
        this.$store.commit("data/removeTemplateFromCategory", payload);
      } else {
        this.$store.commit("data/addTemplateToCategory", payload);
      }
    },
    manageCategoryForTag() { },
  },
  computed: {
    getNonEmptyFolders() {
      return this.$store.getters["data/getNonEmptyFolders"](
        this.folders,
        this.categories
      );
    },
  },
};
</script>
