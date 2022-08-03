<template>
  <DialogViewTemplates
    :templateList="$store.state.data.diaryTemplates"
    @pasteTemplate="pasteTemplate"
    @deleteTemplate="deleteTemplate"
    @closeDialog="closeDialog"
  >
  </DialogViewTemplates>
</template>

<script>
import DialogCreateTemplate from "../dialogs/DialogCreateTemplate.vue";

export default {
  name: "DialogViewDiaryTemplates",
  components: {
    DialogViewTemplates,
  },
  emits: [],
  data() {},
};
</script>

<style></style>
