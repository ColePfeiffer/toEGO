<template>
  <div>
    <BaseItemClickable v-if="!isShowingTemplates"
      :item="template"
      :parent="parent"
      icon="bi-file-earmark-font"
      :currentTemplate="currentTemplate"
      @click-item="clickTemplate"></BaseItemClickable>
    <BaseItem v-else
      :item="template"
      icon="bi-file-earmark-font"
      :textColorStyle="textColorStyle"
      @click-item="clickTemplate">
      <template v-slot:buttonSection>
        <q-item-section side>
          <div></div>
        </q-item-section>
      </template>
    </BaseItem>
  </div>

</template>

<script>
import BaseItemClickable from 'src/components/ui/BaseItemClickable.vue';
import BaseItem from 'src/components/ui/baseItem.vue';
export default {
  name: "TemplateItem",
  emits: ["click-template"],
  components: { BaseItemClickable, BaseItem },
  props: {
    isShowingTemplates: Boolean,
    template: Object,
    parent: {
      type: Object,
      default: null,
    },
    currentTemplate: Object,
  },
  data() {
    return {
    };
  },
  methods: {
    clickTemplate() {
      this.$emit("click-template", this.template);
    },
  },
  computed: {
    textColorStyle() {
      if (this.$store.getters["data/isDarkModeActive"]) {
        return { color: "white" };
      } else {
        return { color: "black" };
      }
    },
  }
};
</script>
