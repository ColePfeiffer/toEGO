<template>
  <DialogViewTemplates
    :type="'DIARY'"
    :templateList="$store.state.data.diaryTemplates"
    @pasteTemplate="pasteTemplate"
  >
  </DialogViewTemplates>
</template>

<script>
import DialogViewTemplates from "./DialogViewTemplates.vue";

export default {
  name: "DialogViewDiaryTemplates",
  emits: ["pasteTemplate"],
  props: { templateList: Array, type: String },
  components: {
    DialogViewTemplates,
  },

  emits: ["pasteTemplate"],
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
