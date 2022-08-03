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

      <!-- categories that are in folders -->
      <q-item
        dense
        clickable
        v-for="folder in $store.state.data.foldersForDiary"
        :key="folder"
      >
        <q-item-section avatar>
          <q-icon dense size="xs" color="secondary" name="bi-folder" />
        </q-item-section>
        <q-item-section>{{ folder.name }}</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right" />
        </q-item-section>
        <!-- Submenu -->
        <!-- screen.lt Tells if current screen width is lower than breakpoint-name -->
        <q-menu
          :cover="$q.screen.lt.sm"
          anchor="top end"
          self="top start"
          separate-close-popup
        >
          <q-list>
            <div v-if="$q.screen.lt.sm">
              <q-item dense clickable v-close-popup>
                <q-item-section avatar>
                  <q-icon dense size="xs" name="keyboard_arrow_left" />
                </q-item-section>
                <q-item-section>Back</q-item-section>
              </q-item>
              <q-separator />
            </div>

            <q-item
              class="row align-center items-center"
              v-for="category in $store.getters['data/getFolderContent'](
                folder
              )"
              :key="category"
              dense
              clickable
              @click="manageCategoryForTemplate(category)"
              :style="getTextColorForCategory(category)"
            >
              <q-item-section avatar>
                <q-icon color="secondary" size="xs" name="bi-collection" />
              </q-item-section>
              <q-item-section>{{ category.name }}</q-item-section>
              <q-item-section side top>
                <q-btn
                  dense
                  :color="
                    isTemplateSetToThisCategory(category) === 'bi-dash'
                      ? 'orange'
                      : 'teal'
                  "
                  round
                  flat
                  :icon="isTemplateSetToThisCategory(category)"
                >
                </q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-item>

      <q-separator />
      <!-- categories that aren't in folders -->
      <q-item
        dense
        clickable
        v-for="category in getFolderlessCategories"
        :key="category"
        @click="manageCategoryForTemplate(category)"
        :style="getTextColorForCategory(category)"
      >
        <div
          class="row align-center items-center"
          v-if="category.isInFolder === false"
        >
          <q-item-section avatar>
            <q-icon color="secondary" size="xs" name="bi-collection" />
          </q-item-section>
          <q-item-section>{{ category.name }}</q-item-section>
          <q-item-section side top>
            <q-btn
              dense
              :color="
                isTemplateSetToThisCategory(category) === 'bi-dash'
                  ? 'orange'
                  : 'teal'
              "
              round
              flat
              :icon="isTemplateSetToThisCategory(category)"
            >
            </q-btn>
          </q-item-section>
        </div>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
import { useQuasar } from "quasar";

export default {
  name: "CategoryOrTagQuickMenu",
  emits: [],
  props: { currentTemplate: Object },
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
        type: "DIARY",
      };
      this.$store.commit("data/addNewCategory", payload);
      this.closeAndResetNewCategoryCreation();
    },
    unsetAllCategories() {
      this.$store.commit(
        "data/resetCategorySettingsForTemplate",
        this.currentTemplate.id
      );
    },
    openDialogForSettings() {},
    isTemplateInQuicklist() {
      if (
        this.$store.state.data.quickListForDiary.templatesById.includes(
          this.currentTemplate.id
        )
      ) {
        return "bi-dash";
      } else {
        return "bi-plus";
      }
    },
    manageQuicklistStatus() {
      this.$store.commit(
        "data/manageQuicklistStatusOfTemplate",
        this.currentTemplate.id
      );
    },
    isTemplateSetToThisCategory(category) {
      if (category.templatesByID.includes(this.currentTemplate.id)) {
        return "bi-dash";
      } else {
        return "bi-plus";
      }
    },
    getTextColorForCategory(category) {
      if (this.isTemplateSetToThisCategory(category) === "bi-dash") {
        return {
          color: "var(--q-primary)",
        };
      } else {
        return {
          color: "#d3d3d3 ",
        };
      }
    },

    manageCategoryForTemplate(category) {
      let payload = {
        category: category,
        templateID: this.currentTemplate.id,
      };

      if (category.templatesByID.includes(this.currentTemplate.id)) {
        this.$store.commit("data/removeTemplateFromDiaryCategory", payload);
      } else {
        this.$store.commit("data/addTemplateToDiaryCategory", payload);
      }
    },
  },
  computed: {
    getFolderlessCategories() {
      return this.$store.state.data.categoriesForDiary.filter((category) => {
        return category.isInFolder === false;
      });
    },
  },
};
</script>

<style scoped></style>
