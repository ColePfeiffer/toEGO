<template>
  <div>
    <FolderCategoryStructure
      :currentTemplate="currentTemplate"
      :folders="folders"
      :categories="categories"
    />
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import FolderCategoryStructure from "./FolderCategoryStructure.vue";

export default {
  name: "FilterCategoryMenu",
  emits: [],
  props: {
    currentTemplate: Object,
    folders: Array,
    categories: Array,
    type: String,
  },
  components: { FolderCategoryStructure },
  data() {
    return {
      newCategoryName: "",
    };
  },
  computed: {},
  methods: {},
};
</script>
