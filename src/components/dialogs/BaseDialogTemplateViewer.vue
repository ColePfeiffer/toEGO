<template>
  <!-- TODO: muss später eventuell gesondert behandelt werden, dunno yet.... also mit type -->
  <DialogFolderManagement :isDialogFolderManagementVisible="isDialogFolderManagementVisible"
    :type="type"
    @closeDialog="setDialogVisibilty(false)"
    @saveChanges="saveChanges"
    @setDialogVisibilty="setDialogVisibilty">
  </DialogFolderManagement>
  <BaseDialog v-model="isDialogVisible"
    @closeDialog="closeDialog"
    @save="pasteTemplateAndClose"
    @showHelp="showHelp"
    dialogTitle="Template Viewer"
    icon="bi-file-earmark-font"
    :button1="{ isShown: true, text: 'Close' }"
    :button2="{ isShown: true, text: 'Paste' }"
    :hasHelpOption="true"
    :isButton2Disabled="!isAtLeastOneTemplateCreated">
    <template v-slot:content>
      <div>
        <div v-if="isAtLeastOneTemplateCreated === true"
          class="row no-wrap full-width items-center justify-center q-pt-md">
          <q-btn class="col-md-2 col-xs-1"
            flat
            style="touch-action: manipulation"
            icon="keyboard_arrow_left"
            :style="$store.state.layout.buttonFlatOnlyIcon"
            :disable="isIndexAtZero"
            :color="isIndexAtZero ? 'grey-3' : 'accent'"
            @click="showTemplate('previous')">
          </q-btn>
          <div class="col-md-8 col-xs-9">
            <!-- Template and Filter Dropdown Buttons -->
            <div v-if="isInEditingMode"
              class="row no-wrap justify-center items-center">
              <q-input filled
                label-slot
                class="col-12 q-pa-none"
                bg-color="white"
                square
                style="border-top: 1px solid #d9d9d9; border-left: 1px solid #d9d9d9; border-right: 1px solid #d9d9d9"
                input-style="font-family: Inter; font-size: 12.5px;"
                v-model="name"
                label="Title">
                <template v-slot:label>
                  <span class="text-weight-bold text-secondary"
                    :style="$store.getters['layout/getNonDefaultFont']">Name</span>
                </template>
              </q-input>
            </div>

            <div v-else
              class="row no-wrap justify-center items-center containerForHeaderOfTemplateViewer">
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

              <div v-if="!isInEditingMode">
                <q-card-section class="q-pb-xs">
                  <div class="text-h6"
                    style="font-family: 'Inter'">{{ currentTemplate.name }}</div>
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
              </div>

              <div v-else>
                <q-card-section class="q-px-none q-py-none">
                  <q-resize-observer @resize="onResize" />
                  <q-scroll-area :style="StyleTmplateTextScrollArea">
                    <BaseEditor editorTitle="Editing Template"
                      :editorWidth="editorWidth"
                      ref="editorRef1"
                      class="no-border-radius no-box-shadow q-pa-none q-pt-xs"
                      v-model="editor"
                      @save="saveTemplate"
                      minHeight="300px"
                      type="TEMPLATE"></BaseEditor>
                  </q-scroll-area>
                </q-card-section>

              </div>

              <q-card-actions class="row justify-center items-center no-wrap">
                <div v-if="!isInEditingMode"
                  class="row justify-center items-center no-wrap">
                  <q-btn flat
                    class="col-2 q-mx-sm"
                    no-wrap
                    dense
                    stack
                    icon="bi-tags"
                    :style="styleForButton"
                    :ripple="false"
                    :text-color="$store.getters['layout/getToolbarIconColor']"
                    label="manage"
                    @click="setDefaultStatus">
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
                  <q-btn flat
                    class="col-2 q-mr-sm"
                    no-wrap
                    dense
                    stack
                    icon="bi-pencil"
                    :style="styleForButton"
                    :ripple="false"
                    :text-color="$store.getters['layout/getToolbarIconColor']"
                    label="edit"
                    @click="editTemplate">
                  </q-btn>
                  <!-- Paste Template button -->
                  <q-btn flat
                    class="col-2 q-mr-sm"
                    no-wrap
                    stack
                    dense
                    icon="bi-clipboard-plus"
                    :style="styleForButton"
                    :ripple="false"
                    :text-color="$store.getters['layout/getToolbarIconColor']"
                    label="paste"
                    @click="pasteTemplate">
                  </q-btn>
                  <!--Delete Templates button -->
                  <div class="col-3 q-mx-xs">
                    <div class="row no-wrap">
                      <q-btn flat
                        no-wrap
                        stack
                        dense
                        :icon="iconForDeleteButton"
                        :style="styleForDeleteButton"
                        :ripple="false"
                        :text-color="$store.getters['layout/getToolbarIconColor']"
                        :label="labelForDeleteButton"
                        @click="initiateDeletion" />
                      <q-btn v-if="isDeletingTemplate"
                        flat
                        no-wrap
                        stack
                        dense
                        icon="bi-check"
                        style="margin-bottom: 10px"
                        :style="styleForButton"
                        :ripple="false"
                        :text-color="$store.getters['layout/getToolbarIconColor']"
                        @click="deleteTemplate">
                      </q-btn>
                    </div>
                  </div>

                </div>
                <div v-else
                  class="row justify-between items-center no-wrap">
                  <q-btn flat
                    class="col-2 q-mx-sm"
                    no-wrap
                    dense
                    stack
                    icon="bi-chevron-left"
                    :style="styleForButton"
                    :ripple="false"
                    :text-color="$store.getters['layout/getToolbarIconColor']"
                    label="discard"
                    @click="toggleEditingMode">
                  </q-btn>
                  <q-btn flat
                    class="col-2 q-mx-sm"
                    no-wrap
                    dense
                    stack
                    icon="fas fa-save"
                    :style="styleForButton"
                    :ripple="false"
                    :text-color="$store.getters['layout/getToolbarIconColor']"
                    label="save"
                    @click="saveTemplate">
                  </q-btn>
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
    <template v-slot:footer-buttons>
      <div>
        <BaseButtonForDialogFooter class="q-mr-sm "
          icon="bi-list-ul"
          background-color="black"
          color="black"
          text-color="white"
          style="font-size: 9.5px; min-height: 25px;  max-width: 100px"
          @click-button="openDialogFolderManagement">
          Switch
        </BaseButtonForDialogFooter>
        <BaseButtonForDialogFooter class="q-mr-sm "
          buttonText="Close"
          @click-button="closeDialog">
        </BaseButtonForDialogFooter>
        <BaseButtonForDialogFooter style="margin-right:2px; max-width: 120px"
          buttonText="Create"
          @click-button="saveChanges">
        </BaseButtonForDialogFooter>
      </div>





    </template>
  </BaseDialog>
</template>

<script>
import { useQuasar } from "quasar";
import BaseDialog from "../ui/ImprovedBaseDialog.vue";
import CategoryOrTagQuickMenu from "../common/CategoryOrTagQuickMenu.vue";
import DialogFolderManagement from "./DialogCategoryFolderSettings/TheDialogFolderManagement.vue";
import FolderCategoryTemplateStructure from "./DialogTemplateViewer/FolderCategoryTemplateStructure.vue";
import BaseButtonForDialogFooter from "../ui/BaseButtonForDialogFooter.vue";
import BaseEditor from "../ui/BaseEditor.vue";

export default {
  name: "dialogViewTemplates",
  emits: ["pasteTemplate", "closeDialog"],
  components: {
    BaseDialog,
    CategoryOrTagQuickMenu,
    DialogFolderManagement,
    FolderCategoryTemplateStructure,
    BaseButtonForDialogFooter,
    BaseEditor
  },
  props: { type: String, templateList: Array },
  data() {
    return {
      editor: "",
      name: "",
      editorWidth: 200,
      currentTemplate: this.templateList[0],
      isDialogFolderManagementVisible: false,
      qMenuModel: false,
      expandIcon: "expand_more",
      icon: true,
      isHelpShown: false,
      maxNumberOfDisplayedChars: 1200,
      StyleTmplateTextScrollArea: {
        height: "350px",
      },
      isDeletingTemplate: false,
      isInEditingMode: false,
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
    editTemplate() {
      this.toggleEditingMode();
      this.editor = this.currentTemplate.text;
      this.name = this.currentTemplate.name;
    },
    onResize(size) {
      this.editorWidth = size.width;
    },
    saveTemplate() {
      let payload = { "templateID": this.currentTemplate.id, "type": this.type, "name": this.name, "text": this.editor };
      this.$store.dispatch(
        "data/updateTemplate",
        payload
      );
      this.toggleEditingMode();
    },
    toggleEditingMode() {
      this.isInEditingMode = !this.isInEditingMode;
    },
    initiateDeletion() {
      this.isDeletingTemplate = !this.isDeletingTemplate;
    },
    setDialogVisibilty(newValue) {
      this.isDialogFolderManagementVisible = newValue;
    },
    // TODO: ???
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
      this.pasteTemplate();
      this.closeDialog();
    },
  },
  computed: {
    iconForDeleteButton() {
      if (this.isDeletingTemplate) {
        return "bi-x"
      } else {
        return "bi-trash"
      }
    },
    labelForDeleteButton() {
      if (this.isDeletingTemplate) {
        return "  "
      } else {
        return "delete"
      }
    },
    styleForDeleteButton() {
      if (this.isDeletingTemplate) {
        return {
          "font-family": this.$store.state.layout.nonDefaultFont,
          "font-size": "9.5px",
          "background-color": "transparent",
          "border-style": "unset",
          "box-shadow": "none",
          "min-width": "20px",
          "max-width": "60px",
          "padding": "0px",
          "margin-left": "10px",
          "min-height": "20px",
          "margin-bottom": "10px",
        }
      } else {
        return this.styleForButton;
      }
    },
    styleForButton() {
      return {
        "font-family": this.$store.state.layout.nonDefaultFont,
        "font-size": "9.5px",
        "background-color": "transparent",
        "border-style": "unset",
        "box-shadow": "none",
        "min-width": "20px",
        "max-width": "60px",
        "padding": "0px",
        "margin-left": "10px",
        "min-height": "20px",
      }
    },
    getStyleForCard() {
      let style = {};
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
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
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
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
        let nameOfDialog = "template-viewer";
        let nameOfCurrentDialog = this.$store.state.data.dialogSettings.nameOfCurrentDialog.substring(0, 15);
        if (
          this.$store.state.data.dialogSettings.isVisible === true && nameOfCurrentDialog === nameOfDialog
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
  background-color: var(--q-secondary)
}

.templateTextContainer {
  min-height: 250px;
  max-height: 300px;
}
</style>
