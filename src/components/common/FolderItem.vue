<template>
  <!-- WITHOUT TEMPLATES -->
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
      <q-item
        class="row align-center items-center"
        v-for="category in $store.getters['data/getFolderContent'](
          folder,
          categories
        )"
        :key="category"
        dense
        clickable
        @click="manageCategoryForTemplate(category)"
        :style="getTextColorForCategory(category)"
      >
        <CategoryItem
          :category="category"
          :currentTemplate="currentTemplate"
          :isShowingTemplates="isShowingTemplates"
        ></CategoryItem>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
import CategoryItem from "./categoryItem.vue";
// q screen

export default {
  name: "FolderItem",
  components: {
    CategoryItem,
  },
  emits: [],
  props: {
    folder: Object,
    currentTemplate: Object,
    categories: Array,
    isShowingTemplates: Boolean,
  },
  data() {
    return {};
  },
  methods: {
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
    manageCategoryForTemplate(category) {
      let payload = {
        category: category,
        templateID: this.currentTemplate.id,
      };
      if (category.templatesByID.includes(this.currentTemplate.id)) {
        this.$store.commit("data/removeTemplateFromCategory", payload);
      } else {
        this.$store.commit("data/addTemplateToCategory", payload);
      }
    },
  },
  computed: {},
};
</script>
