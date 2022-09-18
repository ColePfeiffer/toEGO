<template>
  <div v-for="item in items" :key="item">
    <!-- is not showing templates -->
    <q-item dense clickable @click="updateParentsIDListForItem(item)" :style="getTextColor(item)">
      <!-- ICON -->
      <q-item-section avatar class="q-pl-sm">
        <q-icon color="secondary" size="xs" :name="leftIcon" />
      </q-item-section>
      <!-- NAME -->
      <q-item-section>{{ item.name }}</q-item-section>
      <!-- BUTTONS -->
      <q-item-section side>
        <q-btn dense round flat :color="getIconColor(item)" :icon="getIconForRightButton(item)">
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
    folderOrCategory: Object,
    categories: Array,
    itemType: String, // TEMPLATE / CATEGORY
    type: String, // DIARY / STATUS
  },
  data() {
    return {
      leftIcon: "bi-collection",
    };
  },
  methods: {
    isItemInParentsIDList(item) {
      if (this.itemType == "folder") {
        if (this.folderOrCategory.categoriesByID.includes(item.id)) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.category.templatesByID.includes(item.id)) {
          return true;
        } else {
          return false;
        }
      }
    },
    getIconForRightButton(item) {
      if (this.isItemInParentsIDList(item)) {
        return "bi-dash";
      } else {
        return "bi-plus";
      }
    },
    getIconColor(item) {
      if (this.isItemInParentsIDList(item)) {
        return "orange";
      } else {
        return "teal";
      }
    },
    getTextColor(item) {
      if (this.isItemInParentsIDList(item)) {
        return {
          color: "var(--q-primary)",
        };
      } else {
        return {
          color: "#d3d3d3 ",
        };
      }
    },
    updateParentsIDListForItem(item) {
      if (this.itemType == "folder") {
        let payload = {
          folder: this.folderOrCategory,
          category: item,
        };
        if (this.isItemInParentsIDList(item)) {
          this.$store.commit("data/removeCategoryFromFolder", payload);
        } else {
          this.$store.commit("data/addCategoryToFolder", payload);
        }
      } else {
        let payload = {
          category: this.folderOrCategory,
          template: item,
        };

        if (this.isCategorySetToFolder(category)) {
          this.$store.commit("data/removeTemplateFromCategory", payload);
        } else {
          this.$store.commit("data/addTemplateToCategory", payload);
        }
      }
    },


  },
};
</script>
