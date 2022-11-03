<template>
  <BaseDialog v-model="isDialogVisible"
    @save="pasteTemplateAndClose"
    dialogTitle="Template Viewer"
    icon="bi-file-earmark-font"
    :button1="{ isShown: true, text: 'Close' }"
    :button2="{ isShown: true, text: 'Paste' }"
    :hasHelpOption="true"
    :isButton2Disabled="!isAtLeastOneTemplateCreated">
    <template v-slot:title-bar-controls>
      <BaseButtonForTitleBar class="q-mr-xs text-accent"
        :icon="iconForToggleButton"
        :button-text="labelForToggleButton"
        @click-button="toggleFolderManagement"
        style="text-shadow: var(--q-info) 1px 1px 7px !important;"
        size="11px">
      </BaseButtonForTitleBar>
      <BaseButtonForTitleBar class="no-box-shadow q-mr-xs"
        icon="bi-question"
        size="10px"
        @click-button="showHelp">
      </BaseButtonForTitleBar>
      <BaseButtonForTitleBar class="no-box-shadow q-mr-xs"
        icon="bi-x"
        size="10px"
        @click-button="closeDialog">
      </BaseButtonForTitleBar>
    </template>
    <template v-slot:content>
      <div>
        <!-- Section: Template Viewer -->
        <div v-if="isShowingTemplateViewer"
          :style="styleForTemplateViewerContainer">
          <div class="row no-wrap full-width items-center justify-center q-pt-md">
            <q-btn v-if="isAtLeastOneTemplateCreated"
              class="col-md-2 col-xs-1"
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
                  ref="nameRef"
                  class="col-12 q-pa-none"
                  square
                  stack-label
                  :bg-color="backgroundColorForInput"
                  :style="styleForNameInput"
                  :rules="nameRules"
                  input-style="font-family: Inter; font-size: 12.5px;"
                  v-model="name"
                  lazy-rules
                  label="Title">
                  <template v-slot:label>
                    <span class="text-weight-bold "
                      :style="$store.getters['layout/getNonDefaultFont']">Name</span>
                  </template>
                </q-input>
              </div>

              <div v-else-if="isAtLeastOneTemplateCreated"
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


                <div v-if="isInEditingMode">
                  <q-card-section class="q-px-none q-py-none">
                    <q-resize-observer @resize="onResize" />
                    <q-scroll-area style="height: 350px">
                      <BaseEditor editorTitle="Editing Template"
                        :editorWidth="editorWidth"
                        ref="editorRef1"
                        class="no-border-radius no-box-shadow q-pa-none q-pt-xs"
                        v-model="editor"
                        style="border-left: none; border-top: none; border-right: none"
                        @save="onSubmit"
                        minHeight="300px"
                        type="TEMPLATE"></BaseEditor>
                    </q-scroll-area>
                  </q-card-section>

                </div>

                <div v-else-if="isAtLeastOneTemplateCreated">
                  <q-card-section class="q-pb-xs">
                    <div class="text-h6"
                      style="font-family: 'Inter'">{{ currentTemplate.name }}</div>
                  </q-card-section>

                  <q-card-section class="templateTextContainer q-pb-xs">
                    <q-scroll-area style="height: 280px">
                      <div v-html="currentTemplate.text"></div>
                    </q-scroll-area>
                  </q-card-section>
                </div>

                <div v-else>
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
                </div>


                <q-card-actions class="row justify-center items-center no-wrap">
                  <div v-if="isInEditingMode"
                    class="row justify-between items-center no-wrap">
                    <q-btn flat
                      class="col-4 q-mx-sm"
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
                      class="col-4 q-mx-sm"
                      no-wrap
                      dense
                      stack
                      icon="fas fa-save"
                      :style="styleForButton"
                      :ripple="false"
                      :text-color="$store.getters['layout/getToolbarIconColor']"
                      label="save"
                      @click="onSubmit">
                    </q-btn>
                  </div>
                  <div v-else-if="isAtLeastOneTemplateCreated"
                    class="row justify-center items-center no-wrap">
                    <!-- Button: Manage -->
                    <q-btn flat
                      class="col-2 q-mx-sm"
                      no-wrap
                      dense
                      stack
                      :icon="iconForManageButton"
                      :style="styleForButton"
                      :ripple="false"
                      text-color="accent"
                      :label="labelForManageButton"
                      @click="manageTemplate">
                    </q-btn>
                    <!-- Button: Category Menu -->
                    <q-btn v-if="isShowingManagingButtons"
                      flat
                      class="col-2 q-mx-sm"
                      no-wrap
                      dense
                      stack
                      icon="bi-tags"
                      :style="styleForButton"
                      :ripple="false"
                      :text-color="$store.getters['layout/getToolbarIconColor']"
                      label="Categorize">
                      <CategoryOrTagQuickMenu :currentTemplate="currentTemplate"
                        :folders="folders"
                        :categories="categories"
                        :type="type"
                        :quicklist="quicklist"
                        :templates="templateList">
                      </CategoryOrTagQuickMenu>
                    </q-btn>
                    <!-- Button: Set Favorite -->
                    <q-btn flat
                      v-if="!isShowingManagingButtons"
                      class="col-2 q-mx-sm"
                      no-wrap
                      dense
                      stack
                      :icon="iconForFavoriteButton"
                      :style="styleForButton"
                      :ripple="false"
                      :text-color="$store.getters['layout/getToolbarIconColor']"
                      label="Favorite"
                      @click="setFavorite">
                    </q-btn>

                    <!-- Button: Edit -->
                    <q-btn flat
                      v-if="isShowingManagingButtons"
                      class="col-2 q-mx-sm"
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

                    <!-- Button: Delete -->
                    <div class="col-3 q-mx-xs"
                      v-if="isShowingManagingButtons">
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

                    <!-- Button: Paste -->
                    <q-btn flat
                      v-if="!isShowingManagingButtons"
                      class="col-2 q-mr-sm"
                      no-wrap
                      stack
                      dense
                      icon="bi-clipboard-plus"
                      :style="styleForButton"
                      :ripple="false"
                      :text-color="$store.getters['layout/getToolbarIconColor']"
                      label="paste"
                      :disable="!isPasteAllowed"
                      @click="pasteTemplate">
                    </q-btn>
                    <!-- Button: Create new -->
                    <q-btn flat
                      v-if="!isShowingManagingButtons"
                      class="col-2 q-mx-sm"
                      no-wrap
                      dense
                      stack
                      icon="bi-plus-lg"
                      :style="styleForButton"
                      :ripple="false"
                      :text-color="$store.getters['layout/getToolbarIconColor']"
                      label="create"
                      @click="createTemplate">
                    </q-btn>


                  </div>
                  <div v-else
                    class="row justify-center items-center no-wrap">
                    <!-- Button: Create new -->
                    <q-btn flat
                      class="col-2 q-mx-sm"
                      no-wrap
                      dense
                      stack
                      icon="bi-plus-lg"
                      :style="styleForButton"
                      :ripple="false"
                      :text-color="$store.getters['layout/getToolbarIconColor']"
                      label="create"
                      @click="createTemplate">
                    </q-btn>
                  </div>



                </q-card-actions>
              </q-card>
            </div>
            <q-btn v-if="isAtLeastOneTemplateCreated"
              class="col-md-2 col-xs-1"
              flat
              icon="keyboard_arrow_right"
              :style="$store.state.layout.buttonFlatOnlyIcon"
              :disable="isIndexAtMaxLength"
              :color="isIndexAtMaxLength ? 'grey-3' : 'accent'"
              @click="showTemplate('next')">
            </q-btn>
          </div>
        </div>
        <!-- Section: Folder Management  -->
        <div v-else>
          <div class="row items-center justify-center q-pt-md q-px-md">
            <div class="col-10 col-xs-12 col-sm-12 col-lg-9">
              <q-list bordered
                :style="styleForFolderManagerContainer"
                padding>
                <TheFolderSection :type="type"
                  :itemsToDisplay="folders"></TheFolderSection>
                <q-separator spaced />
                <TheCategorySection :type="type"
                  :itemsToDisplay="categories"
                  @delete-category="deleteCategory"></TheCategorySection>
              </q-list>
            </div>
          </div>
        </div>
        <br />
      </div>
    </template>
    <template v-slot:footer-buttons>
      <div>
        <BaseButtonForDialogFooter buttonText="Close"
          @click-button="closeDialog">
        </BaseButtonForDialogFooter>
        <BaseButtonForDialogFooter class="q-ml-sm"
          v-if="isShowingTemplateViewer && isPasteAllowed && lengthOfTemplates > 0"
          style="margin-right:2px; max-width: 120px"
          buttonText="Paste"
          @click-button="pasteTemplateAndClose">
        </BaseButtonForDialogFooter>
      </div>





    </template>
  </BaseDialog>
</template>

<script>
import { useQuasar } from "quasar";
import BaseDialog from "../ui/ImprovedBaseDialog.vue";
import CategoryOrTagQuickMenu from "../common/CategoryOrTagQuickMenu.vue";
import FolderCategoryTemplateStructure from "./DialogTemplateViewer/FolderCategoryTemplateStructure.vue";
import BaseButtonForDialogFooter from "../ui/BaseButtonForDialogFooter.vue";
import BaseEditor from "../ui/BaseEditor.vue";
import TheFolderSection from "./DialogCategoryFolderSettings/TheFolderSection.vue";
import TheCategorySection from "./DialogCategoryFolderSettings/TheCategorySection.vue";
import BaseButtonForTitleBar from "../ui/BaseButtonForTitleBar.vue";

export default {
  name: "dialogViewTemplates",
  emits: ["pasteTemplate", "closeDialog"],
  components: {
    BaseDialog,
    CategoryOrTagQuickMenu,
    FolderCategoryTemplateStructure,
    BaseButtonForDialogFooter,
    BaseEditor,
    TheFolderSection,
    TheCategorySection,
    BaseButtonForTitleBar
  },
  props: { type: String, templateList: Array },
  data() {
    return {
      // from management
      isCreatingNewCategory: false,
      isCreatingNewFolder: false,
      newCategoryName: "",
      newFolderName: "",
      nameRules: [
        (val) => (val && val.length > 0) || "Please enter a name.",
      ],
      //others...
      editor: "",
      name: "",
      isShowingTemplateViewer: true,
      editorWidth: 200,
      currentTemplate: this.templateList[0],
      qMenuModel: false,
      expandIcon: "expand_more",
      icon: true,
      isHelpShown: false,
      maxNumberOfDisplayedChars: 1200,
      isDeletingTemplate: false,
      isInEditingMode: false,
      isShowingManagingButtons: false,
      isCreatingNewTemplate: false,
      isPasteAllowed: true,
    };
  },
  watch: {
    nameOfCurrentDialog(newName) {
      let firstPart = newName.substring(0, 15);
      let secondPart = newName.substring(20);
      console.log(firstPart, secondPart);
      if (firstPart === 'template-viewer') {
        if (secondPart === 'diary' || secondPart === 'events') {
          // is showing via mainLayout, no paste function
          this.isPasteAllowed = false;
        } else {
          // is showing for editor, so paste is functionable
          this.isPasteAllowed = true;
        }
      }
      console.log(this.$store.state.data.dialogSettings.nameOfCurrentDialog.substring(20));

    },
    qMenuModel(newValue) {
      if (newValue === true) {
        this.expandIcon = "expand_less";
      } else {
        this.expandIcon = "expand_more";
      }
    },
    // whenever the length of templates changes, this will reset the currentTemplate
    lengthOfTemplates(newLength, oldLength) {
      if (newLength != 0) {
        this.currentTemplate = this.templateList[newLength - 1];
      }
    },
  },
  methods: {
    onSubmit() {
      let nameInput = this.$refs.nameRef;
      nameInput.validate();
      // if form has error
      if (nameInput.hasError) {
        this.$q.notify({
          icon: "bi-x",
          color: "secondary",
          textColor: this.$store.getters['layout/getTextColorOnSecondary'],
          message: "Please enter a name.",
        });
      } else {
        this.$q.notify({
          icon: "bi-check",
          color: "secondary",
          textColor: this.$store.getters['layout/getTextColorOnSecondary'],
          message: "Template created.",
        });
        this.saveTemplate();
      }
    },
    createTemplate() {
      this.isCreatingNewTemplate = true;
      this.editor = "";
      this.name = "";
      this.toggleEditingMode();
    },
    setFavorite() {
      let payload = {
        templateID: this.currentTemplate.id,
        quicklist: this.quicklist,
        type: this.type,
      };
      this.$store.commit("data/manageQuicklistStatusOfTemplate", payload);
    },
    manageTemplate() {
      this.isShowingManagingButtons = !this.isShowingManagingButtons;
    },
    // from manager...
    deleteCategory(categoryToDelete) {
      let payload = {
        parents: this.folders,
        child: categoryToDelete,
        type: this.type,
      };
      this.$store.dispatch(
        "data/removeCategoryFromParentsAndDeleteIt",
        payload
      );
    },
    cancelCreatingNewFolder() {
      this.isCreatingNewFolder = false;
    },
    initiateCreatingNewFolder() {
      this.isCreatingNewFolder = true;
    },
    createNewFolder() { },
    toggleNewCategoryCreation() {
      this.isCreatingNewCategory = !this.isCreatingNewCategory;
    },
    // TODO:
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
    resetDialog() {
      this.templateName = "";
      this.editor = "";
      this.isShowingTemplateViewer = true;
      this.isDeletingTemplate = false;
      this.isInEditingMode = false;
      this.isShowingManagingButtons = false;
      this.isCreatingNewTemplate = false;
    },
    toggleFolderManagement() {
      this.isShowingTemplateViewer = !this.isShowingTemplateViewer;
    },
    editTemplate() {
      this.toggleEditingMode();
      this.editor = this.currentTemplate.text;
      this.name = this.currentTemplate.name;
    },
    onResize(size) {
      this.editorWidth = size.width;
    },
    saveTemplate() {
      console.log(this.editor);
      // TODO: fullscreen
      if (this.isCreatingNewTemplate) {
        this.$store.commit("data/setEditorText", this.editor);
        let payload = { 'name': this.name, "type": this.type };
        this.$store.commit("data/createTemplateAndAddToList", payload);
        console.log(this.currentTemplate);
        console.log(this.templateList[this.lengthOfTemplates - 1]);
        this.currentTemplate = this.templateList[this.lengthOfTemplates - 1];
        this.isCreatingNewTemplate = false;
      } else {
        let payload = { "templateID": this.currentTemplate.id, "type": this.type, "name": this.name, "text": this.editor };
        this.$store.dispatch(
          "data/updateTemplate",
          payload
        );
      }
      this.toggleEditingMode();
    },
    toggleEditingMode() {
      this.isInEditingMode = !this.isInEditingMode;
    },
    initiateDeletion() {
      this.isDeletingTemplate = !this.isDeletingTemplate;
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
      this.isDeletingTemplate = false;
      this.$q.notify({
        icon: "bi-check",
        color: "secondary",
        textColor: this.$store.getters['layout/getTextColorOnSecondary'],
        message: "Template deleted.",
      });
    },
    closeDialog() {
      let payload = {
        isVisible: false,
        isBackgroundVisible:
          this.$store.state.data.dialogSettings.isBackgroundVisible,
        nameOfCurrentDialog:
          this.$store.state.data.dialogSettings.nameOfCurrentDialog,
      };
      this.resetDialog();
      this.$store.commit("data/setDialogVisibility", payload);
    },
    setDefaultStatus() {
      let payload = {
        id: this.currentTemplate.id,
        templateList: this.templateList,
      };
      this.$store.commit("data/setDefaultStatusOfTemplate", payload);
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
    backgroundColorForInput() {
      if (this.$store.getters["layout/isDarkModeActive"]) {
        return "dark"
      } else {
        return "white";
      }
    },
    styleForNameInput() {
      let style = {};
      style['border-top'] = '1px solid #d9d9d9';
      style['border-left'] = '1px solid #d9d9d9';
      style['border-right'] = '1px solid #d9d9d9';

      if (this.$store.getters["layout/isDarkModeActive"]) {
        style["border-color"] = "#6d6d6d";
      } else {
        style["border-color"] = "#d9d9d9";
      }
      return style;
    },
    nameOfCurrentDialog() {
      return this.$store.state.data.dialogSettings.nameOfCurrentDialog;
    },
    isTemplateInQuicklist() {
      if (this.quicklist.storedIDs.includes(this.currentTemplate.id)) {
        return true;
      } else {
        return false;
      }
    },
    iconForFavoriteButton() {
      if (this.isTemplateInQuicklist) {
        return 'bi-star-fill'
      } else {
        return 'bi-star'
      }
    },
    iconForManageButton() {
      if (this.isShowingManagingButtons) {
        return 'bi-chevron-left'
      } else {
        return 'bi-gear'
      }
    },
    labelForManageButton() {
      if (this.isShowingManagingButtons) {
        return 'back'
      } else {
        return 'manage'
      }
    },
    styleForTemplateViewerContainer() {
      let style = {};
      style['max-height'] = this.$store.state.layout.height * 0.60 + "px";
      return style;
    },
    styleForFolderManagerContainer() {
      let style = {};
      style['max-height'] = this.$store.state.layout.height * 0.55 + "px";
      style["padding-bottom"] = "12px";
      style['font-family'] = this.$store.state.layout.nonDefaultFont;
      if (this.$store.getters["layout/isDarkModeActive"]) {
        style["background-color"] = "var(--q-dark)";
      } else {
        style["background-color"] = "white";
      }
      return style;
    },
    labelForToggleButton() {
      if (this.isShowingTemplateViewer) {
        return 'Folders'
      } else {
        return 'Templates'
      }
    },
    iconForToggleButton() {
      if (this.isShowingTemplateViewer) {
        return 'bi-arrow-right-circle'
      } else {
        return 'bi-arrow-left-circle'
      }
    },
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
        if (
          this.$store.state.data.dialogSettings.isVisible === true && this.nameOfCurrentDialog.substring(0, 15) === nameOfDialog
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
  font-size: 12px;
  min-height: 250px;
  max-height: 300px;
}
</style>
