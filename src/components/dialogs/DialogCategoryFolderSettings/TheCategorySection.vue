<template>
  <BaseSection @create-new-item="createCategory">
    <template v-slot:headername>Categories</template>
    <template v-slot:itemsToDisplay>
      <div v-for="category in itemsToDisplay"
        :key="category">
        <BaseMenuForFolderManagement childAsText="Templates: "
          :item="category"
          icon="bi-tags"
          dense
          style="padding-bottom: 0px"
          @rename-item="renameCategory"
          @delete-item="deleteCategory">
          <template v-slot:children>
            <div v-for="template in templates"
              :key="template">
              <BaseItemForFolderManagement :item="template"
                icon="bi-file-earmark-font"
                :parent="category">
              </BaseItemForFolderManagement>
            </div>
          </template>
        </BaseMenuForFolderManagement>
      </div>
    </template>
  </BaseSection>
</template>

<script>
import BaseSection from "./BaseSection.vue";
import BaseItemForFolderManagement from "./BaseItemForFolderManagement.vue";
import BaseMenuForFolderManagement from "./BaseMenuForFolderManagement.vue";

export default {
  name: "TheCategorySection",
  emits: ["delete-category"],
  props: {
    type: String,
    itemsToDisplay: Array,
  },
  components: {
    BaseSection,
    BaseItemForFolderManagement,
    BaseMenuForFolderManagement,
  },
  data() {
    return {};
  },
  computed: {
    isTypeSetToDiary() {
      if (this.type === "DIARY") {
        return true;
      } else {
        return false;
      }
    },
    templates() {
      if (this.isTypeSetToDiary) {
        return this.$store.state.data.diaryTemplates;
      } else {
        return this.$store.state.data.eventTemplates;
      }
    },
  },

  methods: {
    createCategory(name) {
      let payload = { categoryName: name, type: this.type };
      this.$store.commit("data/createCategory", payload);
    },
    // renames an existing folder
    renameCategory(payload) {
      this.$store.commit("data/renameCategory", payload);
    },
    deleteCategory(categoryToDelete) {
      this.$emit("delete-category", categoryToDelete);
    },
  },
};
</script>
