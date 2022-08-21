<template>
  <q-item-section avatar>
    <q-icon dense size="xs" color="secondary" name="bi-folder" />
  </q-item-section>
  <q-item-section>{{ folder.name }}</q-item-section>
  <q-item-section side top>
    <q-btn dense round flat icon="keyboard_arrow_right"> </q-btn>
  </q-item-section>
  <!-- Submenu -->
  <q-menu
    :cover="$q.screen.lt.sm"
    anchor="top end"
    self="top start"
    separate-close-popup
  >
    <q-list>
      <!-- Closing Option for small devices -->
      <div v-if="$q.screen.lt.sm">
        <q-item dense clickable v-close-popup>
          <q-item-section avatar>
            <q-btn
              size="xs"
              dense
              round
              flat
              color="secondary"
              icon="keyboard_arrow_left"
            >
            </q-btn>
          </q-item-section>
          <q-item-section>Close Folder</q-item-section>
        </q-item>
        <q-separator />
      </div>

      <!-- Categories inside folder -->
      <div v-if="isShowingTemplates">
        <q-item
          v-for="category in $store.getters['data/getFolderContent'](
            folder,
            categories
          )"
          :key="category"
          dense
          clickable
          @click="categoryClicked(category)"
        >
          <CategoryItem
            :category="category"
            :currentTemplate="currentTemplate"
            :isShowingTemplates="true"
            :templates="templates"
            @templateClicked="templateClicked"
          ></CategoryItem>
        </q-item>
      </div>
      <div v-else>
        <q-item
          v-for="category in $store.getters['data/getFolderContent'](
            folder,
            categories
          )"
          :key="category"
          dense
          clickable
          @click="categoryClicked(category)"
          :style="getTextColorForCategory(category)"
        >
          <CategoryItem
            :category="category"
            :currentTemplate="currentTemplate"
            :isShowingTemplates="isShowingTemplates"
            :templates="templates"
            @templateClicked="templateClicked"
          ></CategoryItem>
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
    return {};
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
  computed: {},
};
</script>
