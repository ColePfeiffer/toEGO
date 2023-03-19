<template>
  <BaseSection @create-new-item="createCategory">
    <template v-slot:headername>Categories</template>
    <template v-slot:itemsToDisplay>
      <div v-for="category in categories"
        :key="category.id">
        <MenuForFolderManagement childAsText="Templates: "
          :item="category"
          childIcon="bi-file-earmark-font"
          :childList="templates"
          icon="bi-tags"
          dense
          style="padding-bottom: 0px"
          @rename-item="renameCategory"
          @delete-item="deleteCategory">
        </MenuForFolderManagement>
      </div>
    </template>
  </BaseSection>
</template>

<script>
import BaseSection from "./BaseSection.vue";
import MenuForFolderManagement from "./MenuForFolderManagement.vue";

export default {
  name: "TheCategorySection",
  emits: ["delete-category"],
  props: {
    type: String,
  },
  components: {
    BaseSection,
    MenuForFolderManagement,
  },
  data() {
    return {
    };
  },
  computed: {
    categories() {
      return this.$store.getters["templates/getCategoriesByType"](this.type);
    },
    isTypeSetToDiary() {
      if (this.type === "DIARY") {
        return true;
      } else {
        return false;
      }
    },
    templates() {
      return this.$store.getters["templates/getTemplatesByType"](this.type);
    },
  },
  methods: {
    createCategory(name) {
      let payload = { name: name, type: this.type };
      this.$store.dispatch("templates/firebaseCreateCategory", payload);
    },
    // renames an existing folder
    renameCategory(payload) {
      let updatedCategory = Object.assign({}, payload.item);
      updatedCategory.name = payload.newName;
      this.$store.dispatch("templates/firebaseUpdateCategory", updatedCategory);
    },
    deleteCategory(categoryToDelete) {
      this.$emit("delete-category", categoryToDelete);
    },
  },
};
</script>
