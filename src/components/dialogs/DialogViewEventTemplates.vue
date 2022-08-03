<template>
  <DialogViewTemplates
    :type="'EVENT'"
    :templateList="$store.state.data.eventTemplates"
    @pasteTemplate="pasteTemplate"
  >
  </DialogViewTemplates>
</template>

<script>
import DialogViewTemplates from "./DialogViewTemplates.vue";

export default {
  name: "DialogViewEventTemplates",
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
