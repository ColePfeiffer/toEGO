<template>
  <BaseItemClickable :item="item"
    :parent="parent"
    :icon="icon"
    style="padding-bottom: 0px"
    @click="isClicked"></BaseItemClickable>
</template>

<script>
import BaseItemClickable from 'src/components/common/BaseItemClickable.vue';
export default {
  name: "BaseItemForFolderManagement",
  emits: ["is-clicked"],
  props: {
    item: Object,
    icon: String,
    parent: Object,
  },
  components: { BaseItemClickable },
  data() {
    return {};
  },
  methods: {
    isClicked() {
      this.$emit("is-clicked");
    }
  },

};
</script>

