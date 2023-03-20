<template>
  <ItemClickable :item="item"
    :parent="parent"
    :icon="icon"
    style="padding-bottom: 0px"
    @click="isClicked"></ItemClickable>
</template>

<script>
import ItemClickable from 'src/components/common/ItemClickable.vue';
export default {
  name: "ItemForFolderManagement",
  emits: ["is-clicked"],
  props: {
    item: Object,
    icon: String,
    parent: Object,
  },
  components: { ItemClickable },
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

