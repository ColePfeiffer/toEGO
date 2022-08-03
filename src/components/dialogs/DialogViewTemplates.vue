<template>
  <baseDialog
    v-model="isDialogVisible"
    @closeDialog="closeDialog"
    @save="pasteTemplateAndClose"
    @showHelp="showHelp"
    :widthOfDialog="315"
    :hasHelpOption="true"
    :isSaveButtonDisabled="!isAtLeastOneTemplateCreated"
  >
    <template v-slot:confirm-button>Paste</template>
    <template v-slot:close-button> Back </template>
    <template v-slot:dialogTitle>
      <q-icon :name="menuIcon" size="22px" />
      Template Viewer
    </template>
    <template v-slot:content>
      <!-- v-for list of templates, kommt später weg -->
      <!-- class fixedHeight-->
      <div class="row items-center justify-center q-px-md q-pt-md">
        <div class="column items-center justify-center">
          <div class="row no-wrap justify-center items-center">
            <div v-if="isAtLeastOneTemplateCreated === true">
              <!-- Template and Filter Dropdown Buttons -->
              <div
                class="row no-wrap justify-center items-center containerForHeaderOfTemplateViewer"
              >
                <!-- Pick template Dropdown Button  -->
                <q-btn-dropdown
                  ref="btnDropdown"
                  class="col-8"
                  :ripple="false"
                  flat
                  no-caps
                  color="transparent"
                  text-color="black"
                  label="Pick Template"
                >
                  <q-virtual-scroll
                    style="max-height: 300px"
                    :items="templates"
                    separator
                    v-slot="{ item, index }"
                  >
                    <q-item :key="index" dense clickable>
                      <q-item-section>
                        <q-btn flat @click="setTemplate(index)"
                          >#{{ index }} - {{ item.name }}</q-btn
                        >
                      </q-item-section>
                    </q-item>
                  </q-virtual-scroll>
                </q-btn-dropdown>
                <!-- Filter Dropdown Button -->
                <q-btn-dropdown
                  ref="btnDropdown "
                  class="col-4"
                  :ripple="false"
                  flat
                  no-caps
                  color="transparent"
                  text-color="black"
                  label="Filter"
                >
                  <q-virtual-scroll
                    style="max-height: 300px"
                    :items="templates"
                    separator
                    v-slot="{ item, index }"
                  >
                    <q-item :key="index" dense clickable>
                      <q-item-section>
                        <q-btn flat @click="setTemplate(index)"
                          >#{{ index }} - {{ item.name }}</q-btn
                        >
                      </q-item-section>
                    </q-item>
                  </q-virtual-scroll>
                </q-btn-dropdown>
              </div>

              <q-card flat bordered square class="bg-grey-1">
                <q-card-section class="q-pb-xs">
                  <div class="text-h6">{{ currentTemplate.name }}</div>
                </q-card-section>

                <q-card-section class="templateTextContainer q-pb-xs">
                  <q-scroll-area :style="StyleTmplateTextScrollArea">
                    <div
                      v-if="
                        currentTemplate.text.length >= maxNumberOfDisplayedChars
                      "
                    >
                      <div
                        v-html="
                          currentTemplate.text.substring(
                            0,
                            maxNumberOfDisplayedChars
                          ) + ' [...]'
                        "
                      ></div>
                    </div>
                    <div v-else v-html="currentTemplate.text"></div>
                  </q-scroll-area>
                </q-card-section>

                <q-card-actions class="row justify-center items-center">
                  <q-btn
                    class="cardButton"
                    icon="bi-tags"
                    @click="openSetCategoryMenu"
                    flat
                    :ripple="false"
                  >
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
                        <q-item
                          clickable
                          v-close-popup
                          @click="openSetCategoryMenu"
                        >
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
                              :color="
                                isTemplateInQuicklist() === 'bi-dash'
                                  ? 'orange'
                                  : 'teal'
                              "
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
                            <q-icon
                              dense
                              size="xs"
                              color="secondary"
                              name="bi-folder"
                            />
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
                                    <q-icon
                                      dense
                                      size="xs"
                                      name="keyboard_arrow_left"
                                    />
                                  </q-item-section>
                                  <q-item-section>Back</q-item-section>
                                </q-item>
                                <q-separator />
                              </div>

                              <q-item
                                class="row align-center items-center"
                                v-for="category in $store.getters[
                                  'data/getFolderContent'
                                ](folder)"
                                :key="category"
                                dense
                                clickable
                                @click="manageCategoryForTemplate(category)"
                                :style="getTextColorForCategory(category)"
                              >
                                <q-item-section avatar>
                                  <q-icon
                                    color="secondary"
                                    size="xs"
                                    name="bi-collection"
                                  />
                                </q-item-section>
                                <q-item-section>{{
                                  category.name
                                }}</q-item-section>
                                <q-item-section side top>
                                  <q-btn
                                    dense
                                    :color="
                                      isTemplateSetToThisCategory(category) ===
                                      'bi-dash'
                                        ? 'orange'
                                        : 'teal'
                                    "
                                    round
                                    flat
                                    :icon="
                                      isTemplateSetToThisCategory(category)
                                    "
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
                              <q-icon
                                color="secondary"
                                size="xs"
                                name="bi-collection"
                              />
                            </q-item-section>
                            <q-item-section>{{ category.name }}</q-item-section>
                            <q-item-section side top>
                              <q-btn
                                dense
                                :color="
                                  isTemplateSetToThisCategory(category) ===
                                  'bi-dash'
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
                  </q-btn>
                  <!-- Set default status button -->
                  <q-btn
                    class="cardButton"
                    :icon="defaultTemplateIcon"
                    @click="setDefaultStatus"
                    flat
                  >
                    <q-tooltip
                      class="bg-secondary text-body2 text-black"
                      :offset="[10, 10]"
                      :delay="300"
                      >Set as default template
                    </q-tooltip>
                  </q-btn>
                  <!-- Paste Template button -->
                  <q-btn
                    class="cardButton"
                    icon="bi-clipboard-plus"
                    @click="pasteTemplate(currentTemplate.text)"
                    flat
                  >
                    <q-tooltip
                      class="bg-secondary text-body2 text-black"
                      :offset="[10, 10]"
                      :delay="300"
                      >Paste template
                    </q-tooltip>
                  </q-btn>
                  <!--Delete Templates button -->
                  <div>
                    <q-fab flat direction="right" padding="md">
                      <template v-slot:icon="{ opened }">
                        <q-icon
                          :class="{
                            'example-fab-animate--hover': opened !== true,
                          }"
                          name="bi-trash"
                          size="20px"
                          style="top: -1px"
                        />
                      </template>

                      <q-fab-action
                        style="left: -30px"
                        class="fabButton"
                        flat
                        color="accent"
                        @click="deleteTemplate"
                        icon="bi-check"
                      />
                    </q-fab>
                  </div>
                </q-card-actions>
              </q-card>
            </div>
            <div v-else>
              <q-card flat bordered class="templateCard bg-grey-1">
                <q-card-section>
                  <div class="text-h6">There is nothing here.</div>
                </q-card-section>

                <q-card-section class="templateTextContainer">
                  You have no saved templates yet.
                </q-card-section>
                <q-separator />
              </q-card>
            </div>

            <br />
            <div v-if="isHelpShown" class="text">
              <div class="q-pa-sm q-ml-md">
                <q-icon
                  class="q-px-sm"
                  name="bi-bookmark-star"
                  size="15px"
                ></q-icon>
                Make default: Every new entry will start with this template.
              </div>
              <div class="q-pa-sm q-ml-md">
                <q-icon
                  class="q-px-sm"
                  name="bi-journal-plus"
                  size="15px"
                ></q-icon>
                Paste template.
              </div>
              <div class="q-pa-sm q-ml-md">
                <q-icon class="q-px-sm" name="bi-trash" size="15px"></q-icon>
                Delete template.
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </baseDialog>
</template>

<script>
import baseDialog from "../ui/BaseDialog2.vue";
import { useQuasar } from "quasar";

export default {
  name: "dialogViewTemplates",
  emits: ["pasteTemplate", "deleteTemplate", "closeDialog"],
  components: {
    baseDialog,
  },
  props: { templateList: Array },
  data() {
    return {
      newCategoryName: "",
      isCreatingNewCategory: false,
      icon: true,
      menuIcon: "bi-file-earmark-font",
      isHelpShown: false,
      currentTemplate: this.templateList[0],
      maxNumberOfDisplayedChars: 1200,
      StyleTmplateTextScrollArea: {
        height: "270px",
      },
    };
  },
  watch: {
    // whenever the length of templates changes, this will reset the currentTemplate
    lengthOfTemplates(newLength) {
      this.currentTemplate = this.templateList[0];
    },
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
    isTemplateSetToThisCategory(category) {
      if (category.templatesByID.includes(this.currentTemplate.id)) {
        return "bi-dash";
      } else {
        return "bi-plus";
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
    openSetCategoryMenu() {
      console.log("MEHEHE");
    },
    setDefaultStatus() {
      let payload = {
        id: this.currentTemplate.id,
        templateList: this.templateList,
      };
      this.$store.commit("data/setDefaultStatusOfTemplate", payload);
    },
    setTemplate(index) {
      this.currentTemplate = this.templates[index];
      this.$refs.btnDropdown.hide();
    },
    deleteTemplate() {
      this.$emit("deleteTemplate", this.currentTemplate);
    },
    // for baseDialog
    showHelp() {
      this.isHelpShown = !this.isHelpShown;
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
    pasteTemplate() {
      this.$emit("pasteTemplate", this.currentTemplate);
    },
    pasteTemplateAndClose() {
      this.$emit("pasteTemplate", this.currentTemplate);
      this.closeDialog();
    },
  },
  computed: {
    computedgetTextColorForCategory() {
      return (category) => {
        let payload = {
          category: category,
          templateID: this.currentTemplate.id,
        };

        if (
          this.$store.getters["data/isTemplateInCategory"](payload) === true
        ) {
          return {
            color: "var(--q-primary)",
          };
        } else {
          return {
            color: "#d3d3d3 ",
          };
        }
      };
    },
    getFolderlessCategories() {
      return this.$store.state.data.categoriesForDiary.filter((category) => {
        return category.isInFolder === false;
      });
    },
    isAtLeastOneTemplateCreated() {
      if (this.lengthOfTemplates != 0) {
        return true;
      } else {
        return false;
      }
    },
    defaultTemplateIcon() {
      if (this.currentTemplate.isSetToDefault === true) {
        return "bi-bookmark-star-fill";
      } else {
        return "bi-bookmark-star";
      }
    },
    templates() {
      return this.templateList.slice();
    },
    lengthOfTemplates() {
      return this.templateList.length;
    },
    isDialogVisible: {
      get() {
        if (
          this.$store.state.data.dialogSettings.isVisible === true &&
          this.$store.state.data.dialogSettings.nameOfCurrentDialog ===
            "dialogViewTemplates"
        ) {
          return true;
        } else {
          return false;
        }
      },
      set(value) {
        let payload = {
          isVisible: value,
          isBackgroundVisible:
            this.$store.state.data.dialogSettings.isBackgroundVisible,
          nameOfCurrentDialog:
            this.$store.state.data.dialogSettings.nameOfCurrentDialog,
        };
        this.$store.commit("data/setDialogVisibility", payload);
      },
    },
  },
};
</script>

<style scoped>
.containerForHeaderOfTemplateViewer {
  background-color: var(--q-secondary);
}

.fixedHeight {
  height: 600px;
}

.templateTextContainer {
  min-height: 250px;
  max-height: 300px;
}

.cardButton {
  font-size: 11px;
}

.fabButton {
  font-size: 10px;
  font-size: 88px !important;
}
</style>
