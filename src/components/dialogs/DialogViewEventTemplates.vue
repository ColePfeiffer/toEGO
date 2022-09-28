<template>
  <BaseDialogTemplateViewer
    :type="'EVENT'"
    :templateList="$store.state.data.eventTemplates"
    @pasteTemplate="pasteTemplate"
  >
  </BaseDialogTemplateViewer>
</template>

<script>
import BaseDialogTemplateViewer from "./BaseDialogTemplateViewer.vue";

export default {
  name: "DialogViewEventTemplates",
  emits: ["pasteTemplate", "closeDialog", "deleteTemplate"],
  props: { templateList: Array, type: String },
  components: {
    BaseDialogTemplateViewer,
  },
  data() {
    return {
      icon: true,
    };
  },
  methods: {
    pasteTemplate(template) {
      this.$emit("pasteTemplate", template);
    },
  },
};
</script>

<style></style>
