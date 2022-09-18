<template>
  <div>
    <DialogCreateTemplate :type="'DIARY'" @createTemplate="createTemplate" @closeDialog="closeDialog">
    </DialogCreateTemplate>
    <DialogViewDiaryTemplates :templateList="$store.state.data.diaryTemplates" @pasteTemplate="pasteTemplate">
    </DialogViewDiaryTemplates>

    <!-- Title, Buttons -->
    <div class="q-px-md q-pt-lg">
      <!-- Title, Button Row -->
      <div v-if="diaryEntry != undefined || isCreatingNewDiaryEntry === true"
        class="row justify-center items-center no-wrap">
        <!-- Title -->
        <div class="col-8 smallText text-left">
          <q-btn class="col-auto smallText text-left" dense flat :style="$store.state.data.headlineStyle"
            @click="isShowingDiarySection = true"> {{ getTitle }}</q-btn>
          <q-btn class="col-1 smallText" flat :icon="getSectionIcon" color="accent" @click="switchSection">
          </q-btn>
        </div>

        <!-- Buttons -->
        <!-- Left-Side Buttons -->
        <div class="smallText col-2 text-right">
          <!-- Button: Back -->
          <q-btn v-if="viewingMode === 'edit'" class="col-2 smallText  text-right" dense flat icon="bi-chevron-left"
            color="white" @click="changeView('view')" :style="$store.state.data.sTextAccentShadow" size="10px"
            :label="$q.screen.lt.sm?'':'back'">
          </q-btn>
          <!-- Button: Enter Fullscreen Button -->
          <q-btn v-else-if="
            viewingMode === 'view' && editor != undefined && editor != ''
          " class="col-2 smallText" flat dense icon="bi-eye" color="white" @click="openEntryInFullscreen"
            :label="$q.screen.lt.sm?'':'view'" :style="$store.state.data.sTextAccentShadow" size="10px"></q-btn>
        </div>

        <!-- Right-Side Buttons -->
        <!-- Save Button -->
        <q-btn v-if="viewingMode === 'edit'" class="col-2 smallText " flat dense icon="fas fa-save" color="accent"
          :label="$q.screen.lt.sm?'':'save'" @click="saveChanges" :style="textStyleAccent" size="10px">
        </q-btn>
        <!-- Edit Button -->
        <q-btn v-else-if="
          viewingMode === 'view' && editor != undefined && editor != ''
        " class="col-2 smallText text-right" flat dense icon="bi-pencil-fill" color="accent" @click="editDiaryEntry"
          :style="textStyleAccent" size="9.5px" :label="$q.screen.lt.sm?'':'edit'"></q-btn>
        <div v-else class="col-2"></div>
      </div>

    </div>

    <!-- Case 1: There is no diary entry for the selected day. -->
    <div v-if="diaryEntry === undefined && isCreatingNewDiaryEntry === false">
      <div class="q-pa-md q-mx-xs">
        <q-card class="my-card shadow-3 text-justify">
          <q-card-section class="card-text text-center">
            Nothing here yet. Add an event
            <q-btn color="accent" flat dense icon="bi-plus" @click="showDialogForNewEvent" />
            <br />
            or create an entry.
            <q-btn color="accent" flat dense icon="bi-journal-plus" @click="createDiaryEntry" />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- Case 2: There is an entry. -->
    <div v-else>
      <!-- Case 2A: Showing entry. -->
      <div v-if="diaryEntry != undefined || isCreatingNewDiaryEntry === true">
        <div class="row justify-center items-center q-pa-md q-ma-md">
          <!-- IS SHOWING DIARY -->
          <div v-if="isShowingDiarySection" class="col">
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
                    <q-btn color="accent" flat dense icon="bi-plus" @click="createDiaryEntry" />
                  </q-card-section>
                </q-card>
              </div>
              <!-- EDIT MODE -->
              <div class="editorContainer" v-else>
                <BaseEditor ref="editorRef1" v-model="changeData.editor" @openDialogCreateTemplate="showTemplateCreator"
                  @openDialogViewTemplates="showTemplateViewer" @pasteTemplate="pasteTemplate" minHeight="445px"
                  type="DIARY" />
              </div>
            </q-scroll-area>
          </div>
          <!-- IS SHOWING STATUS -->
          <div v-else class="col">
            <!-- MODE: VIEW -->
            <div v-if="viewingMode === 'view'" class="column">
              <div class="col text-left">Overall Mood</div>
              <div class="col text-center">O O O O O</div>

              <div class="col text-left">Weather</div>
              <div class="col text-center">O O O O O</div>
              <div class="col text-left">Tags</div>
              <div class="col text-center">O O O O O</div>
            </div>
            <!-- MODE: EDIT -->
            <div v-else>
              <div class="row justify-end">
                <q-btn class="col=1" flat icon="fas fa-folder-open" color="secondary"></q-btn>
                <q-select dense borderless v-model="statusTemplateModel" :options="statusTemplateOptions"
                  label="templates">
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
            </div>
          </div>
        </div>
      </div>
      <!-- Case 2B: Empty diary entry. Show create. -->
      <div v-else-if="changeData.editor === undefined || changeData.editor === ''">
        <div class="row justify-center items-center q-pa-md q-ma-md">
          <div class="col">
            <q-card class="editorCard shadow-3 text-justify">
              <q-card-section class="card-text text-center">
                <q-btn color="accent" flat dense icon="bi-plus" @click="createDiaryEntry" />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseEditor from "../ui/BaseEditor.vue";
import DialogCreateTemplate from "../dialogs/DialogCreateTemplate.vue";
import DialogViewDiaryTemplates from "../dialogs/DialogViewDiaryTemplates.vue";

export default {
  name: "TheDiaryPanels",
  components: {
    BaseEditor,
    DialogCreateTemplate,
    DialogViewDiaryTemplates,
  },
  emits: [
    "scroll",
    "change-view",
    "save-changes",
    "openEntryInFullscreen",
    "showDialogForNewEvent",
  ],
  data() {
    return {
      textStyleDark: {
        "text-shadow": "2px 2px #000000",
        "text-shadow": "rgb(0 0 0) 2px 2px 2px",
      },
      textStyle: {
        "text-color": "white",
        //"text-shadow": "0 0 3px var(--q-secondary), 0 0 5px var(--q-secondary)",
        "text-shadow": "2px 2px 3px rgba(255,255,255,0.1)",
      },
      textStyleAccent: {
        color: "var(--q-accent)",
        //"text-shadow": "0 0 3px var(--q-secondary), 0 0 5px var(--q-secondary)",
        "text-shadow": "var(--q-info) 2px 2px 2px",
      },
      isShowingDiarySection: true,
      storedTemplateString: "",
      isCreatingNewDiaryEntry: false,
      changeData: {},
      heightForScrollArea: "height: 520px",
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
    getTitle() {
      if (this.isShowingDiarySection === true) {
        return "DIARY";
      } else {
        return "STATUS";
      }
    },
    getSectionIcon() {
      if (this.isShowingDiarySection === true) {
        return "bi-toggle2-off";
      } else {
        return "bi-toggle2-on";
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
    showDialogForNewEvent() {
      this.$emit("showDialogForNewEvent");
    },
    switchSection() {
      this.isShowingDiarySection = !this.isShowingDiarySection;
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
    // template Viewer
    showTemplateViewer() {
      let payload = {
        isVisible: true,
        isBackgroundVisible: true,
        nameOfCurrentDialog: "dialogViewDiaryTemplates",
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },
    pasteTemplate(template) {
      console.log("pasting...... WHOOOOO INSIDE diary section");
      if (this.changeData.editor != "") {
        this.changeData.editor =
          this.changeData.editor + "<br>" + template.text;
      } else {
        this.changeData.editor = template.text;
      }
    },
    // Template Creator
    showTemplateCreator() {
      let payload = {
        isVisible: true,
        isBackgroundVisible: true,
        nameOfCurrentDialog: "dialogCreateDiaryTemplate",
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },

    createTemplate(templateName) {
      let newTemplate = {
        name: templateName,
        text: this.changeData.editor,
        type: "DIARY",
      };
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
    editDiaryEntry() {
      this.changeView("edit");
      this.changeData = {
        id: this.diaryEntry.id,
        date: this.diaryEntry.date,
        editor: this.diaryEntry.editor,
        events: this.diaryEntry.events,
      };
    },
    createDiaryEntry() {
      console.log("creating new diary entry");
      this.changeView("edit");
      this.isCreatingNewDiaryEntry = true;

      this.changeData = {
        id: "",
        date: "",
        editor: "",
        events: [],
      };

      // applying default template
      let defaultTemplate =
        this.$store.getters["data/getDefaultTemplate"]("DIARY");
      if (defaultTemplate != undefined) {
        this.changeData.editor = defaultTemplate;
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
</style>
