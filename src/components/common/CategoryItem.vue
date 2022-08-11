<template>
  <q-item-section avatar>
    <q-icon color="secondary" size="xs" name="bi-collection" />
  </q-item-section>
  <q-item-section>{{ category.name }}</q-item-section>
  <!-- is showing templates -->
  <q-item-section v-if="isShowingTemplates" side top>
    <q-btn dense round flat icon="keyboard_arrow_right"> </q-btn>
  </q-item-section>
  <!-- Submenu -->
  <q-menu
    v-if="isShowingTemplates"
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
          <q-item-section color="secondary">Close Folder</q-item-section>
        </q-item>
        <q-separator />
      </div>

      <!-- Templates inside Category -->
      <q-item
        v-for="template in $store.getters['data/getTemplatesFromCategory'](
          category,
          templates
        )"
        :key="template"
        dense
        v-close-popup="2"
        clickable
        @click="templateClicked(template)"
      >
        <TemplateItem :template="template"> </TemplateItem>
      </q-item>
    </q-list>
  </q-menu>
  <!-- isn't showing templates -->
  <q-item-section v-else avatar>
    <q-btn dense :color="color" round flat :icon="isTemplateIDInCategory">
    </q-btn>
  </q-item-section>
</template>

<script>
// q screen
import TemplateItem from "./TemplateItem.vue";

export default {
  name: "CategoryItem",
  emits: ["templateClicked"],
  components: { TemplateItem },
  props: {
    category: Object,
    currentTemplate: Object,
    isShowingTemplates: Boolean,
    templates: Array,
  },
  data() {
    return {};
  },
  methods: {
    templateClicked(template) {
      console.log("template clicked triggered in categoryItem: ", template);
      this.$emit("templateClicked", template);
    },
  },
  computed: {
    isTemplateIDInCategory() {
      if (this.category.templatesByID.includes(this.currentTemplate.id)) {
        // is included
        return "bi-dash";
      } else {
        // is not included
        return "bi-plus";
      }
    },
    color() {
      if (this.isTemplateIDInCategory === "bi-dash") {
        // is included
        return "orange";
      } else {
        // is not included
        return "teal";
      }
    },
  },
};
</script>
