<template>
  <BaseSection :scrollAreaHeight="scrollAreaHeight"
    @create-new-item="createFolder">
    <template v-slot:headername>Folders</template>
    <template v-slot:itemsToDisplay>
      <div v-for="folder in folders"
        :key="folder.id">
        <MenuForFolderManagement childAsText="Templates: "
          :item="folder"
          childIcon="bi-tags"
          :childList="categories"
          icon="bi-folder"
          dense
          style="padding-bottom: 0px"
          @rename-item="renameFolder"
          @delete-item="deleteFolder">
        </MenuForFolderManagement>
      </div>
    </template>
  </BaseSection>
</template>

<script>
import BaseSection from "./BaseSection.vue";
import MenuForFolderManagement from "./MenuForFolderManagement.vue";

export default {
  name: "TheFolderSection",
  props: {
    type: String,
    folders: Array,
  },
  components: {
    BaseSection,
    MenuForFolderManagement,
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
    scrollAreaHeight() {
      return this.$store.state.layout.height * 0.20;
    }
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
