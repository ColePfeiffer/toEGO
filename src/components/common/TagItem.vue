<template>
  <q-item-section avatar>
    <q-icon color="secondary" size="xs" name="bi-file-earmark-font" />
  </q-item-section>
  <q-item-section>{{ tag.name }}</q-item-section>
  <q-item-section side top>
    <q-btn
      dense
      :color="isTagSelected(tagSelection) === 'bi-dash' ? 'orange' : 'teal'"
      round
      flat
      :icon="isTagSelected(tagSelection)"
    >
    </q-btn>
  </q-item-section>
</template>

<script>
export default {
  name: "TagItem",
  emits: [],
  props: {
    tag: Object,
    tagSelection: Array,
  },
  data() {
    return {};
  },
  methods: {
    isTemplateSetToThisCategory(category) {},
    isTagSelected() {
      if (tagSelection.includes(tag)) {
        return "bi-dash";
      } else {
        return "bi-plus";
      }
    },
  },
  computed: {},
};
</script>
