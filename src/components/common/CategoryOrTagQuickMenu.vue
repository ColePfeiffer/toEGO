<template>
  <q-menu class="no-border-radius">
    <q-list dense>
      <!-- Add to/Remove from QuickList Button -->
      <q-item clickable
        @click="manageQuicklistStatus"
        :style="getTextColorForQuicklist">
        <q-item-section avatar>
          <q-icon color="secondary"
            size="xs"
            :name="iconForQuicklistItem" />
        </q-item-section>
        <q-item-section>{{ textForQuicklistItem }} </q-item-section>
        <q-item-section avatar>
          <q-btn dense
            :color="isTemplateInQuicklist === 'bi-dash' ? 'orange' : 'teal'"
            round
            flat
            :icon="isTemplateInQuicklist">
          </q-btn>
        </q-item-section>
      </q-item>
      <!-- Set as default -->
      <q-item clickable
        @click="setAsDefault"
        :style="getTextColorForDefault">
        <q-item-section avatar>
          <q-icon color="secondary"
            size="xs"
            :name="iconForDefaultItem" />
        </q-item-section>
        <q-item-section>{{ textForDefaultItem }} </q-item-section>
        <q-item-section avatar>
          <q-btn dense
            :color="this.currentTemplate.isSetToDefault ? 'orange' : 'teal'"
            round
            flat
            :icon="this.currentTemplate.isSetToDefault ? 'bi-dash' : 'bi-plus'">
          </q-btn>
        </q-item-section>
      </q-item>
      <!-- Unset all button -->
      <q-item clickable
        @click="unsetAllCategories">
        <q-item-section avatar>
          <q-icon color="secondary"
            size="xs"
            name="bi-x" />
        </q-item-section>
        <q-item-section>unset all</q-item-section>
      </q-item>
      <q-separator color="secondary" />
      <!-- new category button -->
      <q-item v-if="!isCreatingNewCategory"
        clickable
        @click="toggleNewCategoryCreation">
        <q-item-section avatar>
          <q-icon color="secondary"
            size="xs"
            name="bi-plus" />
        </q-item-section>
        <q-item-section>create category</q-item-section>
      </q-item>
      <q-item v-else>
        <q-item-section avatar>
          <q-btn size="10px"
            dense
            round
            flat
            color="secondary"
            icon="keyboard_arrow_left"
            @click="closeAndResetNewCategoryCreation">
          </q-btn>
        </q-item-section>
        <q-item-section>
          <q-input ref="nameRef"
            bottom-slots
            v-model="newCategoryName"
            counter
            maxlength="20"
            dense
            lazy-rules
            :rules="nameRules">
            <template v-slot:hint> Name of category </template>
          </q-input>
        </q-item-section>
        <q-item-section side>
          <q-btn round
            dense
            flat
            icon="bi-check"
            color="teal"
            @click="onSubmit" />
        </q-item-section>
      </q-item>
      <q-separator color="secondary" />

      <q-scroll-area :style="styleForScrollArea">
        <q-resize-observer @resize="onResize" />
        <!-- FIXME: this has to be adjusted to the new format -->
        <FolderCategoryTemplateStructure :currentTemplate="currentTemplate"
          :folders="folders"
          :categories="categories"
          :templates="templates"
          @templateClicked="templateClicked">
        </FolderCategoryTemplateStructure>
      </q-scroll-area>
    </q-list>
  </q-menu>
</template>

<script>
import { useQuasar } from "quasar";
import FolderCategoryTemplateStructure from "../dialogs/DialogTemplateViewer/FolderCategoryTemplateStructure.vue";

export default {
  name: "CategoryOrTagQuickMenu",
  props: {
    currentTemplate: Object,
    folders: Array,
    categories: Array,
    type: String,
    quicklist: Object,
    templates: Array,
  },
  components: { FolderCategoryTemplateStructure },
  data() {
    return {
      styleForScrollArea: { height: "20px" },
      newCategoryName: "",
      isCreatingNewCategory: false,
      nameRules: [
        (val) => (val && val.length > 0) || "Please name the category.",
      ],
    };
  },
  computed: {
    isTemplateInQuicklist() {
      if (this.quicklist.storedIDs.includes(this.currentTemplate.id)) {
        return "bi-dash";
      } else {
        return "bi-plus";
      }
    },
    iconForDefaultItem() {
      if (this.currentTemplate.isSetToDefault) {
        return "bi-suit-heart-fill"
      } else {
        return "bi-suit-heart"
      }
    },
    iconForQuicklistItem() {
      if (this.isTemplateInQuicklist === "bi-dash") {
        return "bi-star-fill"
      } else {
        return "bi-star"
      }
    },
    textForQuicklistItem() {
      if (this.isTemplateInQuicklist === "bi-dash") {
        return "is favorite"
      } else {
        return "not favorite"
      }
    },
    textForDefaultItem() {
      if (this.currentTemplate.isSetToDefault) {
        return "is default"
      } else {
        return "not default"
      }
    },
    getTextColorForDefault() {
      if (this.currentTemplate.isSetToDefault) {
        return { color: "var(--q-primary)" };
      } else {
        return { color: "#d3d3d3 " };
      }
    },
    getTextColorForQuicklist() {
      if (this.isTemplateInQuicklist === "bi-dash") {
        return {
          color: "var(--q-primary)",
        };
      } else {
        return {
          color: "#d3d3d3 ",
        };
      }
    },
  },
  methods: {
    setAsDefault() {
      let payload = {
        id: this.currentTemplate.id,
        templateList: this.templates,
      };
      this.$store.commit("data/setDefaultStatusOfTemplate", payload);
    },
    onResize(size) {
      this.styleForScrollArea = {
        height: size.height + "px",
        width: size.width + "px",
        "max-height": "120px",
      };
      //report.value = size;
    },
    templateClicked(template) {
    },
    onSubmit() {
      let nameInput = this.$refs.nameRef;
      nameInput.validate();

      // if form has error
      if (nameInput.hasError) {
      } else {
        this.$q.notify({
          icon: "bi-check",
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
      this.$store.commit("data/createCategory", payload);
      this.closeAndResetNewCategoryCreation();
    },
    unsetAllCategories() {
      let payload = {
        template: this.currentTemplate,
        categories: this.categories,
        quicklist: this.quicklist,
      };
      this.$store.commit("data/resetCategorySettingsForTemplate", payload);
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
