<template>
  <div :style="styleForTemplateViewerContainer">
    <div class="row no-wrap full-width items-center justify-center q-pt-md">
      <q-btn v-if="isAtLeastOneTemplateCreated && !isInEditingMode"
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
            :style="styleForButtonTemplatePicker"
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
                  :templates="templates"
                  @click-template="pickTemplate" />
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <q-card flat
          bordered
          square
          :style="styleForCard">
          <div v-if="isInEditingMode">
            <q-card-section class="q-px-none q-py-none">
              <q-resize-observer @resize="onResize" />
              <q-scroll-area style="height: 350px">
                <BaseEditor placeholderText="Template"
                  :backgroundColorDark="$store.state.layout.blacksmoke"
                  backgroundColor="white"
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
          <div class="q-mx-none q-px-none"
            v-else-if="isAtLeastOneTemplateCreated">
            <q-card-section class="q-mx-none q-px-none q-pb-xs row items-center ">
              <!-- Button: Category Menu -->
              <div class="col-12 row items-center no-wrap">
                <q-btn flat
                  class="col-1 q-mx-none q-mr-xs"
                  no-wrap
                  dense
                  stack
                  icon="bi-tags"
                  :style="styleForButton"
                  :ripple="false"
                  :text-color="$store.getters['layout/getToolbarIconColor']">
                  <CategoryOrTagQuickMenu :currentTemplate="currentTemplate"
                    :folders="folders"
                    :categories="categories"
                    :type="type"
                    :quicklist="favorites"
                    :templates="templates"
                    @set-favorite="setFavorite">
                  </CategoryOrTagQuickMenu>
                </q-btn>
                <div class="column">
                  <span class="text-h6 fit"
                    style="font-size: 16.5px; font-family: 'Inter'; display: block">
                    {{ currentTemplate.name }}
                  </span>
                </div>
              </div>
            </q-card-section>
            <q-card-section class=" q-pb-xs q-pt-none">
              <div class="col-12">
                <div class="row "
                  style="max-width: 300px; margin-left: -4px"
                  :class="{ 'truncate-chip-labels': true }">
                  <div v-for="category in categoriesOfCurrentTemplate"
                    :key="category.id">
                    <q-chip removable
                      style="font-size: 11px"
                      value="category"
                      color="secondary"
                      outline
                      text-color="white"
                      @remove="removeTemplateFromCategory(category)"
                      :label="category.name" />
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-card-section class="templateTextContainer q-pb-xs">
              <q-scroll-area :style="heightForScrollAreaForTemplateText">
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
                :label="labelForManageButton"
                @click="manageTemplate">
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
      <q-btn v-if="isAtLeastOneTemplateCreated && !isInEditingMode"
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
</template>

<script>
import CategoryOrTagQuickMenu from 'src/components/common/CategoryOrTagQuickMenu.vue';
import FolderCategoryTemplateStructure from './FolderCategoryTemplateStructure.vue';
import BaseEditor from 'src/components/ui/BaseEditor.vue';

export default {
  name: "TheTemplateViewer",
  emits: ["paste-template"],
  components: { CategoryOrTagQuickMenu, FolderCategoryTemplateStructure, BaseEditor },
  props: {
    type: String,
    isPasteAllowed: Boolean,
  },
  data() {
    return {
      nameRules: [
        (val) => (val && val.length > 0) || "Please enter a name.",
      ],
      expandIcon: "expand_more",
      editorWidth: 200,
      isInEditingMode: false,
      editor: "",
      name: "",
      indexOfCurrentTemplate: 0,
      isDeletingTemplate: false,
      qMenuModel: false,
      icon: true,
      isShowingManagingButtons: false,
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
    lengthOfTemplates(newLength, oldLength) {
      if (newLength != 0) {
        this.indexOfCurrentTemplate = newLength - 1;
      }
    }
  },
  methods: {
    pasteTemplate() {
      this.$emit("paste-template");
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
    editTemplate() {
      this.toggleEditingMode();
      this.editor = this.currentTemplate.text;
      this.name = this.currentTemplate.name;
    },
    onResize(size) {
      this.editorWidth = size.width;
    },
    toggleEditingMode() {
      this.isInEditingMode = !this.isInEditingMode;
    },
    createTemplate() {
      this.isCreatingNewTemplate = true;
      this.editor = "";
      this.name = "";
      this.toggleEditingMode();
    },
    setFavorite() {
      let payload = { templateID: this.currentTemplate.id, value: !this.currentTemplate.isFavorite };
      this.$store.dispatch("templates/firebaseSetFavorite", payload);
    },
    manageTemplate() {
      this.isShowingManagingButtons = !this.isShowingManagingButtons;
    },
    removeTemplateFromCategory(category) {
      let payload = { "parent": category, "child": this.currentTemplate };
      this.$store.dispatch("templates/firebaseRemoveChildFromParent", payload);
    },
    pickTemplate(template) {
      let payload = { templateID: template.id, templates: this.templates };
      this.indexOfCurrentTemplate = this.$store.getters["templates/getTemplateIndexByID"](payload);
      this.qMenuModel = false;
    },
    initiateDeletion() {
      this.isDeletingTemplate = !this.isDeletingTemplate;
    },
    deleteTemplate() {
      let payload = {
        parents: this.categories,
        child: this.currentTemplate,
      };
      this.$store.dispatch(
        "templates/firebaseDeleteTemplate",
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
    saveTemplate() {
      console.log(this.editor);
      // TODO: fullscreen
      if (this.isCreatingNewTemplate) {
        this.$store.commit("templates/setEditorText", this.editor);
        let payload = { name: this.name, type: this.type };
        this.$store.dispatch("templates/firebaseCreateTemplate", payload);
        this.indexOfCurrentTemplate = this.lengthOfTemplates - 1;
        this.isCreatingNewTemplate = false;
      } else {
        let payload = { template: this.currentTemplate, name: this.name, text: this.editor };
        this.$store.dispatch(
          "templates/firebaseUpdateTemplate",
          payload
        );
      }
      this.toggleEditingMode();
    },
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
    showTemplate(type) {
      if (type === "previous") {
        if (!this.isIndexAtZero) {
          let currentIndex = this.getIndexOfCurrentTemplate;
          currentIndex -= 1;
          this.indexOfCurrentTemplate = currentIndex;
        }
      } else {
        if (!this.isIndexAtMaxLength) {
          let currentIndex = this.getIndexOfCurrentTemplate;
          currentIndex += 1;
          this.indexOfCurrentTemplate = currentIndex;
        }
      }
    },
  },
  computed: {
    currentTemplate() {
      return this.templates[this.indexOfCurrentTemplate];
    },
    templates() {
      return this.$store.getters["templates/getTemplatesByType"](this.type); // slice();
    },
    categories() {
      return this.$store.getters["templates/getCategoriesByType"](this.type);
    },
    folders() {
      return this.$store.getters["templates/getFoldersByType"](this.type);
    },
    lengthOfTemplates() {
      return this.templates.length;
    },
    favorites() {
      return this.$store.getters["templates/getFavoritesByType"](this.type);
    },
    currentTemplateFavoriteState() {
      return this.currentTemplate.isFavorite;
    },
    isTemplateFavorite() {
      if (this.currentTemplateFavoriteState) {
        return true;
      } else {
        return false;
      }
    },
    categoriesOfCurrentTemplate() {
      let data = { parents: this.categories, child: this.currentTemplate };
      let output = this.$store.getters['templates/getParentsOfChild'](data);
      return output;
    },
    getIndexOfCurrentTemplate() {
      return this.templates.indexOf(this.currentTemplate);
    },
    isIndexAtZero() {
      if (this.getIndexOfCurrentTemplate === 0) {
        return true;
      } else {
        return false;
      }
    },
    isIndexAtMaxLength() {
      if (this.getIndexOfCurrentTemplate === this.templates.length - 1) {
        return true;
      } else {
        return false;
      }
    },
    isAtLeastOneTemplateCreated() {
      if (this.lengthOfTemplates != 0) {
        return true;
      } else {
        return false;
      }
    },
    // Buttons
    labelForManageButton() {
      if (this.isShowingManagingButtons) {
        return 'back'
      } else {
        return 'manage'
      }
    },
    iconForManageButton() {
      if (this.isShowingManagingButtons) {
        return 'bi-chevron-left'
      } else {
        return 'bi-gear'
      }
    },
    labelForDeleteButton() {
      if (this.isDeletingTemplate) {
        return "  "
      } else {
        return "delete"
      }
    },
    iconForDeleteButton() {
      if (this.isDeletingTemplate) {
        return "bi-x"
      } else {
        return "bi-trash"
      }
    },
    defaultTemplateIcon() {
      if (this.currentTemplate.isSetToDefault === true) {
        return "bi-bookmark-star-fill";
      } else {
        return "bi-bookmark-star";
      }
    },
    iconForFavoriteButton() {
      if (this.isTemplateFavorite) {
        return 'bi-star-fill'
      } else {
        return 'bi-star'
      }
    },
    // Styles
    heightForScrollAreaForTemplateText() {
      return { "height": this.$store.state.layout.height * 0.33 + "px" }
    },
    isDarkModeActive() {
      return this.$store.state.data.userSettings.isDarkModeActive;
    },
    styleForCard() {
      let style = {};
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      if (this.isDarkModeActive) {
        style["background-color"] = this.$store.state.layout.blacksmoke;
        style["color"] = "white";
      } else {
        style["background-color"] = "white";
        style["color"] = "black";
      }
      return style;
    },
    styleForTemplateViewerContainer() {
      let style = {};
      style['max-height'] = this.$store.state.layout.height * 0.80 + "px";
      return style;
    },
    styleForButtonTemplatePicker() {
      let style = {};
      style["text-shadow"] = this.$store.getters['layout/getLowOpacityShadowForAccent2'];
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      style["font-size"] = "12.5px";
      return style;
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
    styleForNameInput() {
      let style = {};
      style['border-top'] = '1px solid #d9d9d9';
      style['border-left'] = '1px solid #d9d9d9';
      style['border-right'] = '1px solid #d9d9d9';

      if (this.isDarkModeActive) {
        style["border-color"] = "#6d6d6d";
      } else {
        style["border-color"] = "#d9d9d9";
      }
      return style;
    },
    backgroundColorForInput() {
      if (this.isDarkModeActive) {
        return this.$store.state.layout.blacksmoke;
      } else {
        return "white";
      }
    },

  }
};
</script>

<style scoped>
.containerForHeaderOfTemplateViewer {
  background-color: var(--q-secondary)
}

.templateTextContainer {
  font-size: 12px;
  min-height: 250px;
  max-height: 500px;
}
</style>
