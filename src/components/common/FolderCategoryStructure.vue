<template>
  <!-- categories that are in folders -->
  <q-item dense clickable v-for="folder in folders" :key="folder">
    <q-item-section avatar>
      <q-icon dense size="xs" color="secondary" name="bi-folder" />
    </q-item-section>
    <q-item-section>{{ folder.name }}</q-item-section>

    <q-item-section side top>
      <q-btn dense round flat icon="keyboard_arrow_right"> </q-btn>
    </q-item-section>
    <!-- Submenu -->
    <!-- screen.lt Tells if current screen width is lower than breakpoint-name -->
    <q-menu
      :cover="$q.screen.lt.sm"
      anchor="top end"
      self="top start"
      separate-close-popup
    >
      <q-list>
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
          <q-item-section avatar>
            <q-icon color="secondary" size="xs" name="bi-collection" />
          </q-item-section>
          <q-item-section>{{ category.name }}</q-item-section>
          <q-item-section side top>
            <q-btn
              dense
              :color="
                isTemplateSetToThisCategory(category) === 'bi-dash'
                  ? 'orange'
                  : 'teal'
              "
              round
              flat
              :icon="isTemplateSetToThisCategory(category)"
            >
            </q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-item>

  <q-separator />
  <!-- categories that aren't in folders -->
  <q-item
    class="row align-center items-center"
    @click="manageCategoryForTemplate(category)"
    v-for="category in getFolderlessCategories"
    :key="category"
    dense
    clickable
    :style="getTextColorForCategory(category)"
  >
    <q-item-section avatar>
      <q-icon color="secondary" size="xs" name="bi-collection" />
    </q-item-section>
    <q-item-section>{{ category.name }}</q-item-section>
    <q-item-section side top>
      <q-btn
        dense
        :color="
          isTemplateSetToThisCategory(category) === 'bi-dash'
            ? 'orange'
            : 'teal'
        "
        round
        flat
        :icon="isTemplateSetToThisCategory(category)"
      >
      </q-btn>
    </q-item-section>
  </q-item>
</template>

<script>
import { useQuasar } from "quasar";

export default {
  name: "CategoryOrTagQuickMenu",
  emits: [],
  props: { currentTemplate: Object, folders: Array, categories: Array },
  data() {
    return {
      newCategoryName: "",
      isCreatingNewCategory: false,
    };
  },
  methods: {
    isTemplateSetToThisCategory(category) {
      if (category.templatesByID.includes(this.currentTemplate.id)) {
        return "bi-dash";
      } else {
        return "bi-plus";
      }
    },
    getTextColorForCategory(category) {
      if (this.isTemplateSetToThisCategory(category) === "bi-dash") {
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
    manageCategoryForTag() {},
  },
  computed: {
    getFolderlessCategories() {
      return this.categories.filter((category) => {
        return category.isInFolder === false;
      });
    },
  },
};
</script>
