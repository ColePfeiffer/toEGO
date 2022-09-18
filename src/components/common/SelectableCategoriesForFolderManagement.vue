<template>
  <div v-for="category in categories" :key="category">
    <!-- is not showing templates -->
    <q-item dense clickable @click="manageCategoryForFolder(category)" :style="getTextColor(category)">
      <!-- ICON -->
      <q-item-section avatar class="q-pl-sm">
        <q-icon color="secondary" size="xs" name="bi-collection" />
      </q-item-section>
      <!-- NAME -->
      <q-item-section>{{ category.name }}</q-item-section>
      <!-- BUTTONS -->
      <q-item-section side>
        <q-btn dense round flat :color="getIconColor(category)" :icon="getIcon(category)">
        </q-btn>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>

export default {
  name: "SelectableCategoriesForFolderManagement",
  emits: ["templateClicked"],
  props: {
    folder: Object,
    categories: Array,
    itemType: String,
  },
  data() {
    return {
    };
  },
  computed: {

  },
  methods: {
    isCategorySetToFolder(category) {
      if (this.folder.categoriesByID.includes(category.id)) {
        return true;
      } else {
        return false;
      }
    },
    getIcon(category) {
      if (this.isCategorySetToFolder(category)) {
        return "bi-dash";
      } else {
        return "bi-plus";
      }
    },
    getIconColor(category) {
      if (this.isCategorySetToFolder(category)) {
        return "orange";
      } else {
        return "teal";
      }
    },
    getTextColor(category) {
      if (this.isCategorySetToFolder(category)) {
        return {
          color: "var(--q-primary)",
        };
      } else {
        return {
          color: "#d3d3d3 ",
        };
      }
    },
    manageCategoryForFolder(category) {
      let payload = {
        folder: this.folder,
        category: category,
      };
      if (this.isCategorySetToFolder(category)) {
        this.removeCategoryFromFolder(payload);
      } else {
        this.addCategoryToFolder(payload);
      }
    },
    addCategoryToFolder(payload) {
      this.$store.commit("data/addCategoryToFolder", payload);
    },
    removeCategoryFromFolder(payload) {
      this.$store.commit("data/removeCategoryFromFolder", payload);
    }

  },
};
</script>
