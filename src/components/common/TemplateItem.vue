<template>
  <q-item-section avatar>
    <q-icon color="secondary" size="xs" name="bi-file-earmark-font" />
  </q-item-section>
  <q-item-section>{{ template.name }}</q-item-section>
  <q-item-section side top>
    <div style="min-width: 25px"></div>
  </q-item-section>
</template>

<script>
export default {
  name: "TemplateItem",
  emits: [],
  props: {
    template: Object,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>
