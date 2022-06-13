<template>
  <div>
    <DialogCreateTemplate @createTemplate="createTemplate" @closeDialog="closeDialog"></DialogCreateTemplate>
    <DialogViewTemplates @pasteTemplate="pasteTemplate" @deleteTemplate="deleteTemplate" @closeDialog="closeDialog">
    </DialogViewTemplates>
    <!--shown when in viewing mode -->
    <div v-if="viewingMode === 'view'" class="row justify-end">
      <q-btn v-if="(editor != undefined) & (editor != '')" class="col-4 smallText" flat icon="bi-fullscreen"
        label="view" color="secondary" @click="openEntryInFullscreen"></q-btn>
      <div v-else class="col-4"></div>
      <q-btn class="col-4 smallText" flat :icon="getEditCreateIcon" color="secondary" :label="editBtnText"
        @click="editCreate"></q-btn>
    </div>
    <!-- shown when in editing mode -->
    <div v-else class="row justify-end">
      <q-btn class="col-4 smallText" flat icon="fas fa-save" label="save" color="secondary" @click="saveChanges">
      </q-btn>
      <q-btn class="col-4 smallText" flat icon="fas fa-angle-left" color="secondary" label="back"
        @click="changeView('view')"></q-btn>
    </div>
    <!-- entry exists -->
    <div v-if="diaryEntry != undefined || isCreatingNewDiaryEntry === true">
      <BasePanelWithButtons class="secondary" :options="options" :names="names" :hideBordersOnInit="hideBordersOnInit"
        :showNames="showNames" :buttonLeftStyle="simplifiedStyle" :buttonRightStyle="simplifiedStyle">
        <template v-slot:panelLeftSlot>
          <div class="row justify-center items-center">
            <div class="col">
              <q-scroll-area :style="heightForScrollArea" ref="scrollArea">
                <!-- VIEW MODE -->
                <div v-if="viewingMode === 'view'">
                  <!-- If there is an entry for that day. -->
                  <q-card v-if="editor != ''" class="editorCard shadow-3 text-justify">
                    <q-item>
                      <q-item-section v-html="editor"> </q-item-section>
                    </q-item>
                  </q-card>
                  <!-- If there is no entry yet for that day. -->
                  <q-card v-else class="editorCard shadow-3 text-justify">
                    <q-card-section class="card-text text-center">
                      There is no diary entry for this day yet.

                    </q-card-section>
                  </q-card>
                </div>
                <!-- EDIT MODE -->
                <div class="editorContainer" v-else>
                  <BaseEditor ref="editorRef1" v-model="changeData.editor" @showTemplateCreator="showTemplateCreator"
                    @showTemplateViewer="showTemplateViewer" />
                </div>
              </q-scroll-area>
            </div>
          </div>
        </template>
        <!-- right slot -->
        <template v-if="viewingMode === 'view'" v-slot:panelRightSlot>
          <div class="column">
            <div class="col text-left">Overall Mood</div>
            <div class="col text-center">O O O O O</div>
          </div>
          <div class="col text-left">Weather</div>
          <div class="col text-center">O O O O O</div>
          <div class="col text-left">Tags</div>
          <div class="col text-center">O O O O O</div>
        </template>
        <template v-else v-slot:panelRightSlot>
          <div class="row justify-end">
            <q-btn class="col=1" flat icon="fas fa-folder-open" color="secondary"></q-btn>
            <q-select dense borderless v-model="statusTemplateModel" :options="statusTemplateOptions" label="templates">
            </q-select>
          </div>
          <div class="column">
            <div class="col text-left">Overall Mood</div>
            <div class="col text-center">O O O O O</div>
          </div>
          <div class="col text-left">Weather</div>
          <div class="col text-center">O O O O O</div>
          <div class="col text-left">Tags</div>
          <div class="col text-center">O O O O O</div>
        </template>
      </BasePanelWithButtons>
    </div>
    <!-- diary entry doesn't exist yet. -->
    <div v-else></div>
  </div>
</template>

<script>
import BasePanelWithButtons from "../ui/BasePanelWithButtons.vue";
import BaseEditor from "../ui/BaseEditor.vue";
import DialogCreateTemplate from "../dialogs/DialogCreateTemplate.vue";
import DialogViewTemplates from "../dialogs/DialogViewTemplates.vue";

export default {
  name: "TheDiaryPanels",
  components: {
    BasePanelWithButtons,
    BaseEditor,
    DialogCreateTemplate,
    DialogViewTemplates,
  },
  emits: ["scroll", "change-view", "save-changes", "openEntryInFullscreen"],
  data() {
    return {
      storedTemplateString: "",
      isCreatingNewDiaryEntry: false,
      changeData: {},
      heightForScrollArea: "height: 250px",
      //"<div style='text-align: left;'><b>What did go well today?</b><br></div><div style='text-align: left;'><span style='text-align: right;'>Got work done. Yaay.</span></div><div style='text-align: left;'><b><br></b></div><div style='text-align: right;'><div style='text-align: right;'><b>What are you grateful for?</b></div><div style='text-align: right;'>Grateful for my boyfriend, my mom, my dad, my sister. Life. Music. Food. Sun.&nbsp;</div></div><div style='text-align: center;'><br></div><div style='text-align: left;'><b>What will you do tomorrow?</b></div>",
      statusTemplateModel: "default",
      statusTemplateOptions: ["default", "gratitude"],
      options: [
        { value: "Diary", slot: "diaryBtnSlot" },
        { value: "Status", slot: "statusBtnSlot" },
      ],
      names: ["Diary", "Status"],
      hideBordersOnInit: false,
      showNames: false,
      simplifiedStyle: {
        "background-color": "var(--q-accent)",

        color: "black",
        height: "33px",
        "border-style": "unset",
        border: "1px solid black",
        "box-shadow": "none",
      },
    };
  },
  props: {
    diaryEntry: Object,
    viewingMode: String,
  },
  computed: {
    getEditCreateIcon() {
      if (this.editBtnText === "create") {
        return "bi-file-earmark-plus-fill";
      } else {
        return "bi-file-earmark-text-fill";
      }
    },
    editBtnText() {
      if ((this.diaryEntry === undefined) | (this.editor === "")) {
        return "create";
      } else {
        return "edit";
      }
    },
    editor() {
      if (this.diaryEntry === undefined) {
        return undefined;
      } else {
        return this.diaryEntry.editor;
      }
    },
  },
  methods: {
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
    // template Viewer
    showTemplateViewer() {
      let payload = {
        isVisible: true,
        isBackgroundVisible: true,
        nameOfCurrentDialog: "dialogViewTemplates",
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },
    pasteTemplate(template) {
      if (this.changeData.editor != "") {
        this.changeData.editor =
          this.changeData.editor + "<br>" + template.text;
      } else {
        this.changeData.editor = template.text;
      }
    },
    deleteTemplate(template) {
      this.$store.commit("data/deleteTemplate", template);
    },

    // Template Creator
    showTemplateCreator() {
      let payload = {
        isVisible: true,
        isBackgroundVisible: true,
        nameOfCurrentDialog: "dialogCreateTemplate",
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },

    createTemplate(templateName) {
      let newTemplate = { name: templateName, text: this.changeData.editor };
      this.$store.commit("data/createTemplateAndAddToList", newTemplate);
      this.closeDialog();
    },
    onScroll(info) {
      console.log("scroll! ", info);
    },
    openEntryInFullscreen() {
      console.log("openEntryInFullscreen");
      this.$emit("openEntryInFullscreen", this.editor);
    },
    scroll(offset) {
      this.$emit("scroll", offset);
    },

    // for diary panels
    changeView(viewMode) {
      this.isCreatingNewDiaryEntry = false;
      this.$emit("change-view", viewMode);
    },
    editCreate() {
      this.changeView("edit");
      this.scroll(1);
      // creating: create a new changeData
      if (this.editBtnText === "create") {
        this.isCreatingNewDiaryEntry = true;

        this.changeData = {
          id: "",
          date: "",
          editor: "",
          events: [],
        };

        let defaultTemplate = this.$store.getters["data/getDefaultTemplate"];
        if (defaultTemplate != undefined) {
          console.log("default is set to: ", defaultTemplate);
          this.changeData.editor = defaultTemplate;
        }
        // editing: paste data from entry to changeData
      } else {
        this.changeData = {
          id: this.diaryEntry.id,
          date: this.diaryEntry.date,
          editor: this.diaryEntry.editor,
          events: this.diaryEntry.events,
        };
      }
    },
    saveChanges() {
      this.isCreatingNewDiaryEntry = false;
      this.$emit("save-changes", this.changeData);
      this.$emit("change-view", "view");
    },
  },
};
</script>

<style scoped>
.test {
  background-color: rgba(255, 255, 255, 0.3);
}



.editor {
  border-style: unset;
  border-radius: 0px;
  margin: 3px;
}

.templateSelector {
  font-size: 12.5px;
}

.editorCard {
  font-size: 12.5px;
}

.editorContainer {}
</style>
