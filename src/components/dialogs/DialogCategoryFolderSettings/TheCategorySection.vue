<template>
  <BaseSection :type="type" :itemType="itemType" :itemsToDisplay="itemsToDisplay" @create-new-item="createCategory"
    @rename-item="renameCategory" @delete-item="deleteCategory">
    <template v-slot:headername>Categories</template>
  </BaseSection>
</template>

<script>
import BaseSection from "./BaseSection.vue";

export default {
  name: "TheCategorySection",
  props: {
    type: String,
    itemType: String, // FOLDER, CATEGORY
    itemsToDisplay: Array,
  },
  components: {
    BaseSection,
  },
  data() {
    return {
    };
  },
  methods: {
    createCategory(name) {
      let payload = { categoryName: name, type: this.type }
      this.$store.commit("data/createCategory", payload);
    },
    // renames an existing folder
    renameCategory(payload) {
      this.$store.commit("data/renameCategory", payload);
    },
    deleteCategory(categoryToDelete) {
      let payload = { categoryToDelete: categoryToDelete, type: this.type }
      this.$store.commit("data/deleteCategory", payload);
    },
  }
}
</script>
