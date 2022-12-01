<template>
  <BaseSection @create-new-item="createFolder">
    <template v-slot:headername>Folders</template>
    <template v-slot:itemsToDisplay>
      <div v-for="folder in folders"
        :key="folder.id">
        <BaseMenuForFolderManagement childAsText="Templates: "
          :item="folder"
          childIcon="bi-tags"
          :childList="categories"
          icon="bi-folder"
          dense
          style="padding-bottom: 0px"
          @rename-item="renameFolder"
          @delete-item="deleteFolder">
        </BaseMenuForFolderManagement>
      </div>
    </template>
  </BaseSection>
</template>

<script>
import BaseSection from "./Base/BaseSection.vue";
import BaseMenuForFolderManagement from "./Base/BaseMenuForFolderManagement.vue";

export default {
  name: "TheFolderSection",
  props: {
    type: String,
    folders: Array,
  },
  components: {
    BaseSection,
    BaseMenuForFolderManagement,
  },
  data() {
    return {
      qMenuModel: false,
    };
  },
  computed: {
    categories() {
      return this.$store.getters["templates/getCategoriesByType"](this.type);
    },
  },
  methods: {
    createFolder(name) {
      let payload = { name: name, type: this.type };
      this.$store.dispatch("templates/firebaseCreateFolder", payload);
    },
    renameFolder(payload) {
      let updatedFolder = Object.assign({}, payload.item);
      updatedFolder.name = payload.newName;
      this.$store.dispatch("templates/firebaseUpdateFolder", updatedFolder);
    },
    deleteFolder(folderToDelete) {
      this.$store.dispatch("templates/firebaseDeleteFolder", folderToDelete);
    },
  },
};
</script>
