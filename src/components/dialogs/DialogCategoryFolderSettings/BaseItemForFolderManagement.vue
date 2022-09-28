<template>
  <div>
    <BaseItemClickable
      :item="item"
      :parent="parent"
      :icon="icon"
      @click-item="clickItem"
    ></BaseItemClickable>
  </div>

</template>

<script>
import BaseItemClickable from 'src/components/ui/BaseItemClickable.vue';
export default {
  name: "BaseItemForFolderManagement",
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
    clickItem() {
      console.log("item clicked lololololol :O")
    },
  },

};
</script>

