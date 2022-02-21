<template>
  <q-expansion-item
    switch-toggle-side
    expand-separator
    dense
    :icon="icon"
    :label="name"
    @show="onShow()"
    class="methodContainer"
  >
    <q-card :style="maxWidthOfExpansionItems" class="noBackground">
      <q-card-section :ref="refName" class="q-pa-xs">
        <slot name="content"> </slot>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
export default {
  name: "baseExpansionItem",
  emits: ["show"],
  data() {
    return {};
  },
  props: {
    icon: String,
    name: String,
    refName: String,
    maxWidthOfExpansionItems: Object,
  },
  methods: {
    onShow() {
      this.$emit("onShow");
    },
  },
};
</script>

<style scoped>
.methodContainer >>> .noBackground {
  background: none;
}
</style>

