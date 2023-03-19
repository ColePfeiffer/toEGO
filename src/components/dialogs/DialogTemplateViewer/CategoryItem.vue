<template>
  <div>
    <div v-if="isShowingTemplates">
      <BaseItemExpandable :item="category"
        :currentTemplate="currentTemplate"
        icon="bi-tags"
        :isExpanded="menuModel"
        @click-item="clickCategory">
      </BaseItemExpandable>
      <!-- Submenu -->
      <BaseMenu v-if="isShowingTemplates"
        :menuModel="menuModel"
        :items="getTemplatesFromCategory"
        @changed-menu-state="changedMenuState">
        <template v-slot:itemsInsideList>
          <!-- Templates inside Category -->
          <TemplateItem v-for="template in getTemplatesFromCategory"
            :key="template.id"
            v-close-popup="2"
            :isShowingTemplates="isShowingTemplates"
            :template="template"
            :parent="category"
            :currentTemplate="currentTemplate"
            @click-template="clickTemplate">
          </TemplateItem>
        </template>
      </BaseMenu>
    </div>
    <div v-else>
      <ItemClickable :item="category"
        :currentTemplate="currentTemplate"
        icon="bi-tags"
        @click-item="clickCategory"></ItemClickable>
    </div>


  </div>
</template>

<script>
import ItemClickable from 'src/components/common/ItemClickable.vue';
import BaseItemExpandable from 'src/components/common/BaseItemExpandable.vue';
import BaseMenu from './BaseMenu.vue';
import TemplateItem from './TemplateItem.vue';

export default {
  name: "CategoryItem",
  emits: ["click-category", "click-template"],
  components: { ItemClickable, BaseItemExpandable, BaseMenu, TemplateItem },
  props: {
    isShowingTemplates: {
      type: Boolean,
      default: false,
    },
    category: Object,
    parent: {
      type: Object,
      default: null,
    },
    // EXPAND, CLICKABLE
    categoryMode: {
      type: String,
      default: "EXPAND",
    },
    currentTemplate: Object,
    templates: Array, // add default

  },
  data() {
    return {
      menuModel: false,

    };
  },
  methods: {
    clickCategory() {
      this.$emit("click-category", this.category);
    },
    clickTemplate(template) {
      this.$emit("click-template", template);
    },
    changedMenuState(newValue) {
      this.menuModel = newValue;
    }
  },
  computed: {
    getTemplatesFromCategory() {
      return this.$store.getters['templates/getTemplatesFromCategory'](this.category, this.templates);
    }
  },
};
</script>
