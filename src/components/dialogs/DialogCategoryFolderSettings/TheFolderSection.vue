<template>
  <BaseSection :type="type" :itemType="itemType" :itemsToDisplay="itemsToDisplay" @create-new-item="createFolder"
    @rename-item="renameFolder" @delete-item="deleteFolder">
    <template v-slot:headername>Folders</template>
  </BaseSection>
</template>

<script>
import BaseSection from "./BaseSection.vue";

export default {
  name: "TheFolderSection",
  props: {
    type: String,
    itemType: String, // FOLDER, CATEGORY
    itemsToDisplay: Array,
  },
  components: {
    BaseSection,
  },
  data() {
    return {

    };
  },
  methods: {
    createFolder(name) {
      let payload = { name: name, type: this.type }
      this.$store.commit("data/createFolder", payload);
    },
    // renames an existing folder
    renameFolder(payload) {
      this.$store.commit("data/renameFolder", payload);
    },
    deleteFolder(folderToDelete) {
      let payload = { folderToDelete: folderToDelete, type: this.type }
      this.$store.commit("data/deleteFolder", payload);
    },

  }
}
</script>
