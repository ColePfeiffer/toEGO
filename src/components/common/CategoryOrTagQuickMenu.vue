<template>
  <q-menu dense anchor="top middle" self="bottom middle">
    <q-list dense style="min-width: 100px">
      <!-- new category button -->
      <q-item
        v-if="!isCreatingNewCategory"
        clickable
        @click="toggleNewCategoryCreation"
      >
        <q-item-section avatar>
          <q-icon color="secondary" name="bi-plus" />
        </q-item-section>
        <q-item-section>New category</q-item-section>
      </q-item>
      <q-item v-else>
        <q-input
          bottom-slots
          v-model="newCategoryName"
          counter
          maxlength="12"
          dense
        >
          <template v-slot:before>
            <q-btn
              round
              dense
              flat
              icon="keyboard_arrow_left"
              @click="closeAndResetNewCategoryCreation"
            />
          </template>

          <template v-slot:hint> Name of category </template>

          <template v-slot:append>
            <q-btn
              round
              dense
              flat
              icon="bi-check"
              @click="createNewCategory"
            />
          </template>
        </q-input>
      </q-item>

      <!-- Settings button -->
      <q-item clickable v-close-popup @click="openDialogForSettings">
        <q-item-section avatar>
          <q-icon color="secondary" name="bi-gear" />
        </q-item-section>
        <q-item-section>Settings</q-item-section>
      </q-item>
      <!-- Unset all button -->
      <q-item clickable @click="unsetAllCategories">
        <q-item-section avatar>
          <q-icon color="secondary" name="bi-x" />
        </q-item-section>
        <q-item-section>Unset all</q-item-section>
      </q-item>
      <!-- Add to/Remove from QuickList Button -->
      <q-item
        clickable
        @click="manageQuicklistStatus"
        :style="
          isTemplateInQuicklist() === 'bi-dash'
            ? 'color: #d3d3d3'
            : 'color: var(--q-primary)'
        "
      >
        <q-item-section avatar>
          <q-icon color="secondary" name="bi-star" />
        </q-item-section>
        <q-item-section>Add to quick-list</q-item-section>
        <q-item-section side>
          <q-btn
            dense
            :color="isTemplateInQuicklist() === 'bi-dash' ? 'orange' : 'teal'"
            round
            flat
            :icon="isTemplateInQuicklist()"
          >
          </q-btn>
        </q-item-section>
      </q-item>
      <q-separator />
      <FolderCategoryStructure
        :currentTemplate="currentTemplate"
        :folders="folders"
        :categories="categories"
      >
      </FolderCategoryStructure>
    </q-list>
  </q-menu>
</template>

<script>
import { useQuasar } from "quasar";
import FolderCategoryStructure from "./FolderCategoryStructure.vue";

export default {
  name: "CategoryOrTagQuickMenu",
  emits: [],
  props: {
    currentTemplate: Object,
    folders: Array,
    categories: Array,
    type: String,
    quicklist: Object,
  },
  components: { FolderCategoryStructure },
  data() {
    return {
      newCategoryName: "",
      isCreatingNewCategory: false,
    };
  },
  methods: {
    toggleNewCategoryCreation() {
      this.isCreatingNewCategory = !this.isCreatingNewCategory;
    },
    closeAndResetNewCategoryCreation() {
      this.isCreatingNewCategory = false;
      this.newCategoryName = "";
    },
    createNewCategory() {
      let payload = {
        categoryName: this.newCategoryName,
        type: this.type,
      };
      this.$store.commit("data/addNewCategory", payload);
      this.closeAndResetNewCategoryCreation();
    },
    unsetAllCategories() {
      let payload = {
        templateID: this.currentTemplate.id,
        categories: this.categories,
      };
      this.$store.commit("data/resetCategorySettingsForTemplate", payload);
    },
    openDialogForSettings() {},
    isTemplateInQuicklist() {
      if (this.quicklist.templatesById.includes(this.currentTemplate.id)) {
        return "bi-dash";
      } else {
        return "bi-plus";
      }
    },
    manageQuicklistStatus() {
      let payload = {
        templateID: this.currentTemplate.id,
        quicklist: this.quicklist,
        type: this.type,
      };
      this.$store.commit("data/manageQuicklistStatusOfTemplate", payload);
    },
  },
};
</script>

<style scoped></style>
