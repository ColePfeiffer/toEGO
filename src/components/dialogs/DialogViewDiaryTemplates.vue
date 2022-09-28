<template>
  <BaseDialogTemplateViewer
    :type="'DIARY'"
    :templateList="$store.state.data.diaryTemplates"
    @pasteTemplate="pasteTemplate"
  >
  </BaseDialogTemplateViewer>
</template>

<script>
import BaseDialogTemplateViewer from "./BaseDialogTemplateViewer.vue";

export default {
  name: "DialogViewDiaryTemplates",
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
