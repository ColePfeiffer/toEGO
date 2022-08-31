<template>
  <q-menu dense anchor="top middle" self="bottom middle" class="no-border-radius">
    <q-list dense style="min-width: 100px">
      <!-- new category button -->
      <q-item v-if="!isCreatingNewCategory" clickable @click="toggleNewCategoryCreation">
        <q-item-section avatar>
          <q-icon color="secondary" size="xs" name="bi-plus" />
        </q-item-section>
        <q-item-section>New category</q-item-section>
      </q-item>
      <q-item v-else>
        <q-item-section avatar>
          <q-btn size="10px" dense round flat color="secondary" icon="keyboard_arrow_left"
            @click="closeAndResetNewCategoryCreation">
          </q-btn>
        </q-item-section>
        <q-item-section>
          <q-input ref="nameRef" bottom-slots v-model="newCategoryName" counter maxlength="20" dense lazy-rules
            :rules="nameRules">
            <template v-slot:hint> Name of category </template>
          </q-input>
        </q-item-section>
        <q-item-section side>
          <q-btn round dense flat icon="bi-check" color="teal" @click="onSubmit" />
        </q-item-section>
      </q-item>

      <!-- Settings button -->
      <q-item clickable v-close-popup @click="openDialogCategorySettings">
        <q-item-section avatar>
          <q-icon color="secondary" size="xs" name="bi-gear" />
        </q-item-section>
        <q-item-section>Settings</q-item-section>
      </q-item>
      <!-- Unset all button -->
      <q-item clickable @click="unsetAllCategories">
        <q-item-section avatar>
          <q-icon color="secondary" size="xs" name="bi-x" />
        </q-item-section>
        <q-item-section>Unset all</q-item-section>
      </q-item>
      <!-- Add to/Remove from QuickList Button -->
      <q-item clickable @click="manageQuicklistStatus" :style="getTextColorForQuicklist">
        <q-item-section avatar>
          <q-icon color="secondary" size="xs" name="bi-star" />
        </q-item-section>
        <q-item-section>Add to quick-list</q-item-section>
        <q-item-section avatar>
          <q-btn dense :color="isTemplateInQuicklist() === 'bi-dash' ? 'orange' : 'teal'" round flat
            :icon="isTemplateInQuicklist()">
          </q-btn>
        </q-item-section>
      </q-item>
      <q-separator color="secondary" />
      <q-scroll-area style="height: 120px">
        <FolderCategoryStructure :currentTemplate="currentTemplate" :folders="folders" :categories="categories"
          :templates="templates" @templateClicked="templateClicked">
        </FolderCategoryStructure>
      </q-scroll-area>
    </q-list>
  </q-menu>
</template>

<script>
import { useQuasar } from "quasar";
import FolderCategoryStructure from "./FolderCategoryStructure.vue";

export default {
  name: "CategoryOrTagQuickMenu",
  emits: ["openDialogCategorySettings"],
  props: {
    currentTemplate: Object,
    folders: Array,
    categories: Array,
    type: String,
    quicklist: Object,
    templates: Array,
  },
  components: { FolderCategoryStructure },
  data() {
    return {
      heightForScrollArea: {
        height: "120px",
        "max-width": "300px",
      },
      newCategoryName: "",
      isCreatingNewCategory: false,
      nameRules: [
        (val) => (val && val.length > 0) || "Please name the category.",
      ],
    };
  },
  computed: {
    getTextColorForQuicklist() {
      if (this.isTemplateInQuicklist() === "bi-dash") {
        console.log("black");
        return {
          color: "var(--q-primary)",
        };
      } else {
        console.log("gray");
        return {
          color: "#d3d3d3 ",
        };
      }
    },
  },
  methods: {
    openDialogCategorySettings() {
      // maybe emit type too
      this.$emit("openDialogCategorySettings");
    },
    templateClicked(template) {
      console.log(
        "template clicked triggered in categoryTagQuickMenu: ",
        template
      );
      console.log("template clicked!!!", template);
    },
    onSubmit() {
      let nameInput = this.$refs.nameRef;
      console.log(nameInput);
      nameInput.validate();

      // if form has error
      if (nameInput.hasError) {
      } else {
        this.$q.notify({
          icon: "done",
          color: "secondary",
          textColor: "black",
          message: "Category created.",
        });
        this.createNewCategory();
      }
    },
    toggleNewCategoryCreation() {
      this.isCreatingNewCategory = !this.isCreatingNewCategory;
    },
    closeAndResetNewCategoryCreation() {
      this.$refs.nameRef.resetValidation();
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
        quicklist: this.quicklist,
      };
      this.$store.commit("data/resetCategorySettingsForTemplate", payload);
    },
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

<style scoped>
</style>
