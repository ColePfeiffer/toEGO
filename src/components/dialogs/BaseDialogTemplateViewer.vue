<template>
  <!-- muss später eventuell gesondert behandelt werden, dunno yet.... also mit type -->
  <DialogFolderManagement :isDialogFolderManagementVisible="isDialogFolderManagementVisible"
    type="DIARY"
    @closeDialog="setDialogVisibilty(false)"
    @saveChanges="saveChanges"
    @setDialogVisibilty="setDialogVisibilty">
  </DialogFolderManagement>
  <baseDialog v-model="isDialogVisible"
    @closeDialog="closeDialog"
    @save="pasteTemplateAndClose"
    @showHelp="showHelp"
    dialogTitle="Template Viewer"
    icon="bi-file-earmark-font"
    :button1="{isShown: true, text: 'Close'}"
    :button2="{isShown: true, text: 'Paste'}"
    :hasHelpOption="true"
    :isButton2Disabled="!isAtLeastOneTemplateCreated">
    <template v-slot:content>
      <div>
        <div v-if="isAtLeastOneTemplateCreated === true"
          class="row no-wrap full-width items-center justify-center q-pt-md">
          <q-btn class="col-md-2 col-xs-1"
            flat
            icon="keyboard_arrow_left"
            :style="$store.state.layout.buttonFlatOnlyIcon"
            :disable="isIndexAtZero"
            :color="isIndexAtZero ? 'grey-3' : 'accent'"
            @click="showTemplate('previous')">
          </q-btn>
          <div class="col-md-8 col-xs-9">
            <!-- Template and Filter Dropdown Buttons -->
            <div class="row no-wrap justify-center items-center containerForHeaderOfTemplateViewer">
              <!-- Pick template Dropdown Button  -->
              <q-btn :icon-right="expandIcon"
                :ripple="false"
                flat
                no-caps
                class="col-12 q-pa-none"
                square
                :style="getStyleForTemplatePickerButton"
                color="transparent"
                :text-color="this.$store.getters['layout/getTextColorOnSecondary']"
                label="Pick Template">
                <q-menu fit
                  full-width
                  class="no-border-radius "
                  v-model="qMenuModel">
                  <q-list>
                    <FolderCategoryTemplateStructure :isShowingTemplates="true"
                      categoryMode="EXPAND"
                      :currentTemplate="currentTemplate"
                      :folders="folders"
                      :categories="categories"
                      :templates="templateList"
                      @click-template="pickTemplate" />
                  </q-list>
                </q-menu>
              </q-btn>
            </div>

            <q-card flat
              bordered
              square
              :style="getStyleForCard">
              <q-card-section class="q-pb-xs">
                <div class="text-h6">{{ currentTemplate.name }}</div>
              </q-card-section>

              <q-card-section class="templateTextContainer q-pb-xs">
                <q-scroll-area :style="StyleTmplateTextScrollArea">
                  <div v-if="
                    currentTemplate.text.length >= maxNumberOfDisplayedChars
                  ">
                    <div v-html="
                      currentTemplate.text.substring(
                        0,
                        maxNumberOfDisplayedChars
                      ) + ' [...]'
                    "></div>
                  </div>
                  <div v-else
                    v-html="currentTemplate.text"></div>
                </q-scroll-area>
              </q-card-section>

              <q-card-actions class="row justify-center items-center">
                <q-btn class="cardButton"
                  icon="bi-tags"
                  flat
                  :ripple="false">
                  <CategoryOrTagQuickMenu @openDialogFolderManagement="openDialogFolderManagement"
                    :currentTemplate="currentTemplate"
                    :folders="folders"
                    :categories="categories"
                    :type="type"
                    :quicklist="quicklist"
                    :templates="templateList">
                  </CategoryOrTagQuickMenu>
                </q-btn>

                <!-- Set default status button -->
                <q-btn class="cardButton"
                  :icon="defaultTemplateIcon"
                  @click="setDefaultStatus"
                  flat>
                  <q-tooltip class="bg-secondary text-body2 text-black"
                    :offset="[10, 10]"
                    :delay="300">Set as default template
                  </q-tooltip>
                </q-btn>
                <!-- Paste Template button -->
                <q-btn class="cardButton"
                  icon="bi-clipboard-plus"
                  @click="pasteTemplate()"
                  flat>
                  <q-tooltip class="bg-secondary text-body2 text-black"
                    :offset="[10, 10]"
                    :delay="300">Paste template
                  </q-tooltip>
                </q-btn>
                <!--Delete Templates button -->
                <div>
                  <q-fab flat
                    direction="right"
                    padding="md">
                    <template v-slot:icon="{ opened }">
                      <q-icon :class="{
                        'example-fab-animate--hover': opened !== true,
                      }"
                        name="bi-trash"
                        size="20px"
                        style="top: -1px" />
                    </template>

                    <q-fab-action style="left: -30px"
                      class="fabButton"
                      flat
                      color="accent"
                      @click="deleteTemplate()"
                      icon="bi-check" />
                  </q-fab>
                </div>
              </q-card-actions>
            </q-card>
          </div>
          <q-btn class="col-md-2 col-xs-1"
            flat
            icon="keyboard_arrow_right"
            :style="$store.state.layout.buttonFlatOnlyIcon"
            :disable="isIndexAtMaxLength"
            :color="isIndexAtMaxLength ? 'grey-3' : 'accent'"
            @click="showTemplate('next')">
          </q-btn>
        </div>

        <div v-else
          class="row full-width items-center justify-center q-px-md q-pt-md">
          <div class="col-10 col-xs-12 q-pt-md q-px-md">
            <q-card flat
              bordered
              class="templateCard bg-grey-1">
              <q-card-section>
                <div class="text-h6">There is nothing here.</div>
              </q-card-section>
              <div class="templateTextContainer">
                <q-card-section class="q-pa-md">
                  You have no saved templates.
                </q-card-section>

                <q-card-section class="row justify-center items-center">
                  <div class="col-4"></div>
                  <q-img class="col-7"
                    :src="'/images/ghostcat_m.png'"
                    style="height: 150px; max-width: 128px; opacity: 0.5"
                    spinner-color="white" />
                </q-card-section>
              </div>
            </q-card>
          </div>
        </div>

        <br />
        <!-- make it so, that hoverups show up beneath the buttons or something instead of current's solution-->
        <div v-if="isHelpShown"
          class="col-12 text q-py-md">
          <div class="q-pa-sm q-ml-md">
            <q-icon class="q-px-sm"
              name="bi-bookmark-star"
              size="15px"></q-icon>
            Make default: Every new entry will start with this template.
          </div>
          <div class="q-pa-sm q-ml-md">
            <q-icon class="q-px-sm"
              name="bi-journal-plus"
              size="15px"></q-icon>
            Paste template.
          </div>
          <div class="q-pa-sm q-ml-md">
            <q-icon class="q-px-sm"
              name="bi-trash"
              size="15px"></q-icon>
            Delete template.
          </div>
        </div>
      </div>
    </template>
  </baseDialog>
</template>

<script>
import { useQuasar } from "quasar";
import baseDialog from "../ui/baseDialog.vue";
import CategoryOrTagQuickMenu from "../common/CategoryOrTagQuickMenu.vue";
import DialogFolderManagement from "./DialogCategoryFolderSettings/TheDialogFolderManagement.vue";
import FolderCategoryTemplateStructure from "./DialogTemplateViewer/FolderCategoryTemplateStructure.vue";

export default {
  name: "dialogViewTemplates",
  emits: ["pasteTemplate", "closeDialog"],
  components: {
    baseDialog,
    CategoryOrTagQuickMenu,
    DialogFolderManagement,
    FolderCategoryTemplateStructure
  },
  props: { templateList: Array, type: String },
  data() {
    return {

      isDialogFolderManagementVisible: false,
      qMenuModel: false,
      expandIcon: "expand_more",
      icon: true,
      isHelpShown: false,
      currentTemplate: this.templateList[0],
      maxNumberOfDisplayedChars: 1200,
      StyleTmplateTextScrollArea: {
        height: "270px",
      },
    };
  },
  watch: {
    qMenuModel(newValue) {
      if (newValue === true) {
        this.expandIcon = "expand_less";
      } else {
        this.expandIcon = "expand_more";
      }
    },
    // whenever the length of templates changes, this will reset the currentTemplate
    lengthOfTemplates(newLength) {
      this.currentTemplate = this.templateList[0];
    },
  },
  methods: {
    setDialogVisibilty(newValue) {
      this.isDialogFolderManagementVisible = newValue;
    },
    saveChanges() { },
    openDialogFolderManagement() {
      this.setDialogVisibilty(true);
    },
    pickTemplate(template) {
      this.currentTemplate = template;
      this.qMenuModel = false;
    },
    showTemplate(type) {
      if (type === "previous") {
        if (!this.isIndexAtZero) {
          let currentIndex = this.getIndexOfCurrentTemplate;
          currentIndex -= 1;
          this.currentTemplate = this.templateList[currentIndex];
        }
      } else {
        if (!this.isIndexAtMaxLength) {
          let currentIndex = this.getIndexOfCurrentTemplate;
          currentIndex += 1;
          this.currentTemplate = this.templateList[currentIndex];
        }
      }
    },
    deleteTemplate() {
      let payload = {
        parents: this.categories,
        child: this.currentTemplate,
        type: this.type,
      };
      this.$store.dispatch(
        "data/removeTemplateFromParentsAndDeleteIt",
        payload
      );
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
    getStyleForCard() {
      let style = {};

      if (this.$store.getters["layout/isDarkModeActive"]) {
        style["background-color"] = this.$store.state.layout.blacksmoke;
        style["color"] = "white";
      } else {
        style["background-color"] = "white";
        style["color"] = "black";
      }

      return style;
    },
    getStyleForTemplatePickerButton() {
      let style = {};
      style["text-shadow"] = this.$store.getters['layout/getLowOpacityShadowForAccent2'];
      return style;
    },
    getIndexOfCurrentTemplate() {
      return this.templateList.indexOf(this.currentTemplate);
    },
    isIndexAtZero() {
      if (this.getIndexOfCurrentTemplate === 0) {
        return true;
      } else {
        return false;
      }
    },
    isIndexAtMaxLength() {
      if (this.getIndexOfCurrentTemplate === this.templateList.length - 1) {
        return true;
      } else {
        return false;
      }
    },
    getScreenWidth() {
      // return this.$store.state.data.dialogWidth;
      let width = this.$q.screen.height;
      return {
        width,
      };
    },

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
.buttonDummy {
  min-width: 95px !important;
}

.containerForHeaderOfTemplateViewer {
  background-color: var(--q-secondary)
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
