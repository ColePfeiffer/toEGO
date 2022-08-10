<template>
  <div v-if="isShowingTemplates === true" class="row justify-between items-center" style="background: pink">
    <q-item-section avatar>
      <q-icon dense size="xs" color="secondary" name="bi-collection" />
    </q-item-section>
    <q-item-section>{{ category.name }}</q-item-section>
    <q-item-section side top>
      <q-btn dense round flat :color="color" :icon="isTemplateIDInCategory">
      </q-btn>
    </q-item-section>
  </div>
  <div class="row justify-between items-center" v-else>
    <q-item-section class="col-3" avatar style="background: greenyellow">
      <q-icon color="secondary" size="xs" name="bi-collection" />
    </q-item-section>
    <q-item-section class="col-6" style="background: blueviolet">{{ category.name }}</q-item-section>
    <q-item-section class="col-3" avatar style="background: red">
      <q-btn dense :color="color" round flat :icon="isTemplateIDInCategory">
      </q-btn>
    </q-item-section>
  </div>
</template>

<script>
// q screen

export default {
  name: "CategoryItem",
  emits: [],
  props: {
    category: Object,
    currentTemplate: Object,
    isShowingTemplates: Boolean,
  },
  data() {
    return {};
  },
  methods: {},
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
