<template>
  <q-item-section avatar>
    <q-icon dense size="xs" color="secondary" name="bi-folder" />
  </q-item-section>
  <q-item-section>{{ folder.name }}</q-item-section>
  <q-item-section side top>
    <q-btn dense round flat :icon="expandIcon"> </q-btn>
  </q-item-section>
  <!-- Submenu -->
  <q-menu fit dense separate-close-popup class="no-border-radius" v-model="qMenuModel">
    <q-list>
      <!-- Closing Option for small devices -->


      <!-- Categories inside folder -->
      <div v-if="isShowingTemplates">
        <q-item v-for="category in $store.getters['data/getFolderContent'](
          folder,
          categories
        )" :key="category" dense clickable @click="categoryClicked(category)">
          <CategoryItem :category="category" :currentTemplate="currentTemplate" :isShowingTemplates="true"
            :templates="templates" @templateClicked="templateClicked"></CategoryItem>
        </q-item>
      </div>
      <div v-else>
        <q-item v-for="category in $store.getters['data/getFolderContent'](
          folder,
          categories
        )" :key="category" dense clickable @click="categoryClicked(category)"
          :style="getTextColorForCategory(category)">
          <CategoryItem :category="category" :currentTemplate="currentTemplate" :isShowingTemplates="isShowingTemplates"
            :templates="templates" @templateClicked="templateClicked"></CategoryItem>
        </q-item>
      </div>
    </q-list>
  </q-menu>
</template>

<script>
import CategoryItem from "./CategoryItem.vue";
// q screen

export default {
  name: "FolderItem",
  components: {
    CategoryItem,
  },
  emits: ["categoryClicked", "templateClicked"],
  props: {
    folder: Object,
    currentTemplate: Object,
    categories: Array,
    isShowingTemplates: Boolean,
    templates: Array,
  },
  data() {
    return {
      isClicked: false,
      expandIcon: "expand_more",
      qMenuModel: false,
    };
  },
  watch: {
    qMenuModel(newValue) {
      if (newValue === true) {
        this.expandIcon = "expand_less";
      } else {
        this.expandIcon = "expand_more";
      }
    },
  },
  methods: {
    categoryClicked(category) {
      this.$emit("categoryClicked", category);
    },
    templateClicked(template) {
      console.log("template clicked triggered in FolderItem: ", template);
      this.$emit("templateClicked", template);
    },

    isTemplateIDInCategory(category) {
      if (category.templatesByID.includes(this.currentTemplate.id)) {
        return "bi-dash";
      } else {
        return "bi-plus";
      }
    },
    getTextColorForCategory(category) {
      if (this.isTemplateIDInCategory(category) === "bi-dash") {
        return {
          color: "var(--q-primary)",
        };
      } else {
        return {
          color: "#d3d3d3 ",
        };
      }
    },
  },
  computed: {
    getIconBasedOnExpandStatus() {
      if (this.isClicked) {
        return 'expand_more'
      } else {
        return 'expand_less'
      }
    }
  },
};
</script>
