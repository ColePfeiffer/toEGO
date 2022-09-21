<template>
  <BaseSection @create-new-item="createFolder">
    <template v-slot:headername>Folders</template>
    <template v-slot:itemsToDisplay>
      <div v-for="folder in itemsToDisplay" :key="folder">
        <BaseMenuForFolderManagement
          childAsText="Categories: "
          :item="folder"
          icon="bi-folder"
          @rename-item="renameFolder"
          @delete-item="deleteFolder"
        >
          <template v-slot:children>
            <div v-for="category in categories" :key="category">
              <BaseItemForFolderManagement
                :item="category"
                icon="bi-collection"
                :parent="folder"
              >
              </BaseItemForFolderManagement>
            </div>
          </template>
        </BaseMenuForFolderManagement>
      </div>
    </template>
  </BaseSection>
</template>

<script>
import BaseSection from "./BaseSection.vue";
import BaseItemForFolderManagement from "./BaseItemForFolderManagement.vue";
import BaseMenuForFolderManagement from "./BaseMenuForFolderManagement.vue";

export default {
  name: "TheFolderSection",
  props: {
    type: String,
    itemsToDisplay: Array,
  },
  components: {
    BaseSection,
    BaseItemForFolderManagement,
    BaseMenuForFolderManagement,
  },
  data() {
    return {};
  },
  computed: {
    isTypeSetToDiary() {
      if (this.type === "DIARY") {
        return true;
      } else {
        return false;
      }
    },
    categories() {
      if (this.isTypeSetToDiary) {
        return this.$store.state.data.categoriesForDiary;
      } else {
        return this.$store.state.data.categoriesForEvents;
      }
    },
  },
  methods: {
    createFolder(name) {
      let payload = { name: name, type: this.type };
      this.$store.commit("data/createFolder", payload);
    },
    // renames an existing folder
    renameFolder(payload) {
      this.$store.commit("data/renameFolder", payload);
    },
    deleteFolder(folderToDelete) {
      let payload = { folderToDelete: folderToDelete, type: this.type };
      this.$store.commit("data/deleteFolder", payload);
    },
  },
};
</script>
