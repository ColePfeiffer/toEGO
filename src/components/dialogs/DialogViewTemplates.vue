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
                  <q-btn class="cardButton" icon="bi-tags" flat :ripple="false">
                    <CategoryOrTagQuickMenuVue
                      :currentTemplate="currentTemplate"
                      :folders="folders"
                      :categories="categories"
                      :type="type"
                      :quicklist="quicklist"
                    >
                    </CategoryOrTagQuickMenuVue>
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
                    @click="pasteTemplate()"
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
                        @click="deleteTemplate()"
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
import CategoryOrTagQuickMenuVue from "../common/CategoryOrTagQuickMenu.vue";

import { useQuasar } from "quasar";

export default {
  name: "dialogViewTemplates",
  emits: ["pasteTemplate"],
  components: {
    baseDialog,
    CategoryOrTagQuickMenuVue,
  },
  props: { templateList: Array, type: String },
  data() {
    return {
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
    isDialogVisible(newState) {
      console.log("isDialogVisible changed to :", newState, " for ", this.type);
    },
  },
  methods: {
    deleteTemplate() {
      let payload = {
        template: this.currentTemplate,
        templateListType: this.type,
      };
      this.$store.commit("data/deleteTemplate", payload);
    },
    closeDialog() {
      let payload = {
        isVisible: false,
        isBackgroundVisible:
          this.$store.state.data.dialogSettings.isBackgroundVisible,
        nameOfCurrentDialog:
          this.$store.state.data.dialogSettings.nameOfCurrentDialog,
      };
      this.$store.commit("data/setDialogVisibility", payload);
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
    // for baseDialog
    showHelp() {
      this.isHelpShown = !this.isHelpShown;
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
    isTypeSetToDiary() {
      if (this.type === "DIARY") {
        return true;
      } else {
        return false;
      }
    },
    folders() {
      if (this.isTypeSetToDiary) {
        return this.$store.state.data.foldersForDiary;
      } else {
        return this.$store.state.data.foldersForEvents;
      }
    },
    categories() {
      if (this.isTypeSetToDiary) {
        return this.$store.state.data.categoriesForDiary;
      } else {
        return this.$store.state.data.categoriesForEvents;
      }
    },
    quicklist() {
      if (this.isTypeSetToDiary) {
        return this.$store.state.data.quicklistForDiary;
      } else {
        return this.$store.state.data.quicklistForEvents;
      }
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
        let nameOfDialog;
        if (this.type === "DIARY") {
          nameOfDialog = "dialogViewDiaryTemplates";
        } else {
          nameOfDialog = "dialogViewEventTemplates";
        }

        if (
          this.$store.state.data.dialogSettings.isVisible === true &&
          this.$store.state.data.dialogSettings.nameOfCurrentDialog ===
            nameOfDialog
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

.fabButton {
  font-size: 10px;
  font-size: 88px !important;
}

.cardButton {
  font-size: 11px;
}
</style>
