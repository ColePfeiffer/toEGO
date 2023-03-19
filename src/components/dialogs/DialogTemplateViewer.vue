<template>
  <div>
    <BaseDialog v-model="isDialogVisible"
      dialogTitle="Template Viewer"
      icon="bi-file-earmark-font"
      :button1="{ isShown: true, text: 'Close' }"
      :button2="{ isShown: true, text: 'Paste' }"
      :hasHelpOption="true"
      :isButton2Disabled="this.lengthOfTemplates > 0">
      <template v-slot:title-bar-controls>
        <BaseButtonForTitleBar class="q-mr-xs text-accent"
          :icon="iconForToggleButton"
          :button-text="labelForToggleButton"
          @click-button="toggleFolderManagement"
          :style="styleForButtonCategory"
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
        <BaseGhostHelper v-if="(!$store.state.data.userSettings.hasFinishedHelpForTemplatesForTheFirstTime)"
          style="font-family: PixeloidSans !important; z-index: 99999"
          :messages="messages"
          background-color="black"
          textColor="white"
          :isBackgroundColored="true"
          :numberOfMessages="numberOfMessages"
          @show-next="showNext"
          @show-last="showLast"
          @finish="finish"></BaseGhostHelper>
        <div>
          <!-- Section: Template Viewer -->
          <TheTemplateViewer v-if="isShowingTemplateViewer"
            ref="templateViewer"
            :isButtonForTagsHighlighted="isButtonForTagsHighlighted"
            :type="type"
            :isPasteAllowed="isPasteAllowed"
            @paste-template="pasteTemplate"></TheTemplateViewer>
          <TheFolderManagement :type="type"
            v-else></TheFolderManagement>
        </div>
      </template>
      <template v-slot:footer-buttons>
        <div>
          <div>
            <BaseButtonForFooter buttonText="
                Close"
              @click-button="closeDialog">
            </BaseButtonForFooter>
            <BaseButtonForFooter class="q-ml-sm"
              v-if="isShowingTemplateViewer && isPasteAllowed && lengthOfTemplates > 0"
              style="margin-right:2px; max-width: 120px"
              buttonText="Paste"
              @click-button="pasteTemplateAndClose">
            </BaseButtonForFooter>
          </div>
        </div>
      </template>
    </BaseDialog>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import BaseDialog from "./ImprovedBaseDialog.vue";
import BaseButtonForFooter from "../common/BaseButtonForFooter.vue";
import BaseButtonForTitleBar from "../common/BaseButtonForTitleBar.vue";
import TheFolderManagement from "./DialogTemplateViewer/TheFolderManagement.vue";
import TheTemplateViewer from "./DialogTemplateViewer/TheTemplateViewer.vue";
import BaseGhostHelper from "src/components/Helper/BaseGhostHelper.vue";

export default {
  name: "DialogTemplateViewer",
  emits: ["paste-template", "close-dialog"],
  components: {
    BaseDialog,
    BaseButtonForFooter,
    TheFolderManagement,
    TheTemplateViewer,
    BaseButtonForTitleBar,
    BaseGhostHelper
  },
  props: { type: String },
  data() {
    return {
      messages: [" "],
      numberOfMessages: 5,
      isCategoryButtonHighlighted: false,
      isButtonForTagsHighlighted: false,
      isShowingTemplateViewer: true,
      isPasteAllowed: true,
      /*
            // from management
            isCreatingNewCategory: false,
            isCreatingNewFolder: false,
            newCategoryName: "",
            newFolderName: "",
              isCreatingNewTemplate: false,
             */
    };
  },
  watch: {
    nameOfCurrentDialog(newName) {
      let firstPart = newName.substring(0, 15);
      let secondPart = newName.substring(20);
      if (firstPart === 'template-viewer') {
        if (secondPart === 'diary' || secondPart === 'notes') {
          // is showing via mainLayout, no paste function
          this.isPasteAllowed = false;
        } else {
          // is showing for editor, so paste is functionable
          this.isPasteAllowed = true;
        }
      }
    },
  },
  methods: {
    showLast() {
      this.messages.pop();
      if (this.messages.length === 3) {
        this.isButtonForTagsHighlighted = true;
        this.isCategoryButtonHighlighted = false;
      } else if (this.messages.length === 4) {
        this.isButtonForTagsHighlighted = false;
        this.isCategoryButtonHighlighted = true;
      } else {
        this.isCategoryButtonHighlighted = false;
        this.isButtonForTagsHighlighted = false;
      }
    },
    finish() {
      this.messages = [" "];
      if (!this.$store.state.data.userSettings.hasFinishedHelpForTemplatesForTheFirstTime) {
        this.$store.dispatch("data/setHelpForTemplatesToCompleted", true);
      }
    },
    showNext(index) {
      if (index === 1) {
        this.messages = [];
        this.messages.push("Hello again. Here you can create, organize and utilize templates.");
      } else if (index === 2) {
        this.messages.push("I use them for storing questions I want to answer regurarly, for goals and grounding techniques or for formatting text.");
      } else if (index === 3) {
        this.isButtonForTagsHighlighted = true;
        this.messages.push("You can sort templates! Click on the tag symbol. There you get to set categories and default-status. If setting a template to default, it will always show up when creating a new entry. When you mark a template as favorite, it will show up in your quicklist, so you can paste it faster.");
      } else if (index === 4) {
        this.isButtonForTagsHighlighted = false;
        this.isCategoryButtonHighlighted = true;
        this.messages.push("Clicking on the highlighted button will allow you to manage your categories and folders.");
      } else if (index === 5) {
        this.isCategoryButtonHighlighted = false;
        this.messages.push("I added a few templates, categories and folders for you. Feel free to delete them and create ones that fit your needs.");
      } else {
        this.messages = [" "];
      }
    },
    toggleFolderManagement() {
      this.isShowingTemplateViewer = !this.isShowingTemplateViewer;
    },
    closeDialog() {
      if (this.isShowingTemplateViewer) {
        this.$refs.templateViewer.resetDialog;
      }
      this.$emit("close-dialog");
    },
    // for baseDialog
    showHelp() {
      this.$store.dispatch("data/setHelpForTemplatesToCompleted", false);
    },
    pasteTemplate() {
      this.$emit("paste-template", this.$refs.templateViewer.currentTemplate);
      this.$q.notify({
        icon: "bi-check",
        color: "secondary",
        textColor: this.$store.getters['layout/getTextColorOnSecondary'],
        message: "Template pasted.",
      });
    },
    pasteTemplateAndClose() {
      this.pasteTemplate();
      this.closeDialog();
    },
  },
  computed: {
    styleForButtonCategory() {
      let style = {};
      style["text-shadow"] = "var(--q-info) 1px 1px 7px !important";

      if (this.isCategoryButtonHighlighted === true) {
        style["background-color"] = "#FFF01F !important";
        style["border-radius"] = "12px !important";
      } else {
        style["background-color"] = "transparent !important";
      }
      return style;
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
    nameOfCurrentDialog() {
      return this.$store.state.data.dialogSettings.nameOfCurrentDialog;
    },
    templates() {
      return this.$store.getters["templates/getTemplatesByType"](this.type).slice();
    },
    lengthOfTemplates() {
      return this.templates.length;
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
  },
};
</script>
