<template>
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
        <!-- TODO: add help -->
        <div v-if="isHelpVisible">
          <div class="row justify-center items-center">
            <div class="col-10">
              <TheHelpStepperForTemplateViewer class="q-mt-none"
                @finish="finish"></TheHelpStepperForTemplateViewer>
            </div>
          </div>
        </div>
        <TheTemplateViewer v-else-if="isShowingTemplateViewer"
          ref="templateViewer"
          :type="type"
          :isPasteAllowed="isPasteAllowed"
          @paste-template="pasteTemplate"></TheTemplateViewer>
        <TheFolderManagement :type="type"
          v-else></TheFolderManagement>
        <br />
      </div>
    </template>
    <template v-slot:footer-buttons>
      <div>
        <div v-if="!isHelpVisible">
          <BaseButtonFooter buttonText="
          Close"
            @click-button="closeDialog">
          </BaseButtonFooter>
          <BaseButtonFooter class="q-ml-sm"
            v-if="isShowingTemplateViewer && isPasteAllowed && lengthOfTemplates > 0"
            style="margin-right:2px; max-width: 120px"
            buttonText="Paste"
            @click-button="pasteTemplateAndClose">
          </BaseButtonFooter>
        </div>
      </div>
    </template>
  </BaseDialog>
</template>

<script>
import { useQuasar } from "quasar";
import BaseDialog from "./ImprovedBaseDialog.vue";
import BaseButtonFooter from "../common/BaseButtonFooter.vue";
import BaseButtonForTitleBar from "../common/BaseButtonForTitleBar.vue";
import TheHelpStepperForTemplateViewer from "./DialogTemplateViewer/TheHelpStepperForTemplateViewer.vue";
import TheFolderManagement from "./DialogTemplateViewer/TheFolderManagement.vue";
import TheTemplateViewer from "./DialogTemplateViewer/TheTemplateViewer.vue";

export default {
  name: "DialogTemplateViewer",
  emits: ["paste-template", "close-dialog"],
  components: {
    BaseDialog,
    BaseButtonFooter,
    TheFolderManagement,
    TheTemplateViewer,
    BaseButtonForTitleBar,
    TheHelpStepperForTemplateViewer
  },
  props: { type: String },
  data() {
    return {
      isShowingTemplateViewer: true,
      isHelpVisible: false,
      isHelpShown: false,
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
      this.isHelpVisible = !this.isHelpVisible;
    },
    finish() {
      this.isHelpVisible = false;
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
