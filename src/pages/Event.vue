<template>
  <BasePage titleOfPage="Writing a note"
    :mode="getEventMode"
    :backgroundColor="$store.getters['layout/getEventBackgroundColor']">
    <template v-slot:title-bar-icon>
      <div style="padding: 1.5px">
        <q-icon name="theater_comedy"
          size="24px" />
      </div>
    </template>
    <template v-slot:title-bar-controls>
      <div class="row justify-between items-center">
        <BaseButtonForTitleBar class="no-box-shadow q-mr-xs"
          icon="bi-x"
          size="10px"
          @click-button="leavePage">
        </BaseButtonForTitleBar>
      </div>
    </template>
    <template v-slot:content>
      <!-- Emoji-Selection, Title, What happened? -->
      <div class="row justify-center items-center text-center q-px-md">
        <!-- How are you feeling? -->
        <p class="col-10 text-center q-mt-lg"
          :style="getStyleForHeadline">
          How are you feeling?
        </p>
        <!-- Mood Selection -->
        <div class="col-12">
          <q-btn-toggle v-model="mood"
            class="col-12 q-mb-md"
            toggle-color="accent"
            padding="none"
            :style="getTextColor"
            flat
            :options="[
              { value: 'las la-angry', slot: 'angry' },
              { value: 'las la-sad-tear', slot: 'sad' },
              { value: 'las la-meh', slot: 'meh' },
              { value: 'las la-smile', slot: 'content' },
              { value: 'las la-grin-alt', slot: 'happy' },
            ]">
            <template v-slot:angry>
              <q-btn padding="xs"
                :style="getStyleForEmojiButton"
                flat
                size="15px"
                icon="las la-angry" />
            </template>

            <template v-slot:sad>
              <q-btn padding="xs"
                :style="getStyleForEmojiButton"
                flat
                size="15px"
                icon="las la-sad-tear" />
            </template>

            <template v-slot:meh>
              <q-btn padding="xs"
                :style="getStyleForEmojiButton"
                flat
                size="15px"
                icon="las la-meh" />
            </template>

            <template v-slot:content>
              <q-btn padding="xs"
                :style="getStyleForEmojiButton"
                flat
                size="15px"
                icon="las la-smile" />
            </template>

            <template v-slot:happy>
              <q-btn padding="xs"
                :style="getStyleForEmojiButton"
                flat
                size="15px"
                icon="las la-grin-alt" />
            </template>
          </q-btn-toggle>
        </div>
        <!-- Input: Title -->
        <div class="col-12 q-mb-md q-mt-sm">
          <q-input class="no-border-radius no-box-shadow"
            color="secondary"
            v-model="title"
            dense
            autofocus
            borderless
            placeholder="Title"
            :style="getStyleForInput"
            :input-style="getInputStyleForTitle"
            hide-bottom-space
            :rules="[
              (val) => val.length <= 50 || 'Please use maximum 50 characters',
            ]">
          </q-input>
        </div>

        <!-- Input: What happened -->
        <div class="col-12 q-mb-lg"
          :style="getInputStyleForWhatHappened">
          <BaseEditor placeholderText="What happened?"
            :textColor="editorTextColor"
            :backgroundColor="editorBackgroundColor"
            backgroundColorDark="transparent"
            :editorWidth="getWidthForInputFields"
            class="no-border-radius no-box-shadow"
            ref="editorRef1"
            v-model="editor"
            :style="editorHeight"
            type="EVENT"
            @save="saveChanges"
            @show-dialog-template-creator="openDialogCreateTemplate"
            @show-dialog-template-viewer="openDialogViewTemplates"
            @paste-template-from-quicklist="pasteTemplateFromQuicklist" />
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <BaseButtonForDialogFooter buttonText="Discard"
        @click-button="leavePage">
      </BaseButtonForDialogFooter>
      <BaseButtonForDialogFooter :buttonText="textForRightButton"
        @click-button="saveChanges">
      </BaseButtonForDialogFooter>
    </template>
  </BasePage>
</template>

<script>
import BasePage from "src/components/ui/BasePage.vue";
import BaseEditor from "src/components/ui/BaseEditor.vue";
import BaseButtonForTitleBar from "src/components/ui/BaseButtonForTitleBar.vue";
import BaseButtonForDialogFooter from "src/components/ui/BaseButtonForDialogFooter.vue";

export default {
  components: {
    BasePage,
    BaseEditor,
    BaseButtonForTitleBar,
    BaseButtonForDialogFooter,
  },
  data() {
    return {
      editor: "",
      title: "",
      mood: "",
    };
  },
  // gets called anytime this component is set to active
  activated() {
    // if mode is set to editing mode, we fetch the updated eventData
    if (!this.$store.state.data.newEventIsInCreationMode) {
      this.setEventData();
    }
  },
  watch: {
    pastedText(text) {
      if (this.$store.state.data.dialogTemplateViewerIsSetToDiaryMode === false && text != "") {
        if (this.editor != "") {
          this.editor = this.editor + "<br>" + text;
        } else {
          this.editor = text;
        }
        this.$store.commit("data/setPastedText", "");
      }
    }
  },
  methods: {
    setEventData() {
      this.editor = this.$store.state.data.eventData.editor;
      this.title = this.$store.state.data.eventData.title;
      this.mood = this.$store.state.data.eventData.mood;
    },
    resetEventData() {
      this.$store.commit("data/resetEventData");
      this.setEventData();
    },
    updateEventData() {
      this.$store.commit("data/updateEditor", this.editor);
      this.$store.commit("data/updateTitle", this.title);
      this.$store.commit("data/updateMood", this.mood);
    },
    leavePage() {
      let lastPath = this.$router.options.history.state.back;
      lastPath = lastPath.substring(1);
      this.$router.push(lastPath);
      this.resetEventData();
    },
    saveChanges() {
      if (this.mood === "") {
        this.mood = "las la-meh-blank";
      }
      // check wether a new event is created or an existing one is being edited
      if (this.$store.state.data.newEventIsInCreationMode) {
        let lastPath = this.$router.options.history.state.back;
        if (lastPath === "/diary") {
          this.updateEventData();
          this.$store.commit(
            "data/addEventToEvents",
            this.$store.state.data.lastSelectedDate
          );
        } else {
          this.updateEventData();
          // if we are at home, we want to use new Date
          this.$store.commit("data/addEventToEvents", new Date());
        }
      } else {
        this.updateEventData();
        this.$store.commit("data/saveChangesToEditedEvent");
        this.$store.commit("data/setModeForNewEvent", "CREATE");

      }
      this.leavePage();
    },
    pasteTemplateFromQuicklist(template) {
      if (this.editor != "") {
        this.editor = this.editor + "<br>" + template.text;
      } else {
        this.editor = template.text;
      }
    },
    openDialogCreateTemplate() {
      this.$store.commit("data/setEditorText", this.editor);
      let payload = {
        isVisible: true,
        isBackgroundVisible: true,
        nameOfCurrentDialog: "template-creator-for-event",
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },
    openDialogViewTemplates() {
      let payload = {
        isVisible: true,
        isBackgroundVisible: true,
        nameOfCurrentDialog: "template-viewer-for-events-editor",
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },

  },
  computed: {
    editorBackgroundColor(){
      if(this.getEventMode === 'default'){
        if(this.$store.getters['layout/isDarkModeActive']){
          return this.$store.state.layout.blacksmoke;
        }else{
          return this.$store.state.layout.whitesmoke;
        }
      }else{
        return this.$store.state.layout.eventBackgroundColor;
      }
    },
    getStyleForInput() {
      let style = {};
      style["font-size"] = "12px";
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      style["width"] = this.getWidthForInputFields + "px";
      style["padding"] = "0 12px";
      style["border-radius"] = "0px";

      if (this.getEventMode === "default") {
        style["background-color"] = "transparent";
        if (this.$store.getters["layout/isDarkModeActive"]) {
          style["border"] = "1px solid #ffffff1f";
        } else {
          style["border"] = "1px solid rgba(0, 0, 0, 0.12)";
        }

      } else {
        style["background-color"] = this.$store.state.layout.eventInputBackgroundColor;
        style["border"] = "1px solid " + this.getColorBasedOnBackgroundColor + "52";
      }
      return style;
    },
    pastedText() {
      return this.$store.state.data.pastedText;
    },
    // Styling _____________________
    editorTextColor() {
      if (this.getEventMode != 'default') {
        return this.getColorBasedOnBackgroundColorAsName;
      } else {
        if (this.$store.getters["layout/isDarkModeActive"]) {
          return "white";
          /*
           style["color"] = this.$store.getters[
                  "layout/getColorBasedOnBackgroundColor"
                ](this.$store.state.layout.eventInputBackgroundColor);
          */
        } else {
          return "black";
        }

      }
    },
    editorHeight() {
      let style = {};
      style["min-height"] = this.$store.state.layout.height * 0.35 + "px";
      return style;
    },
    getColorBasedOnBackgroundColorAsName() {
      return this.$store.getters["layout/getColorBasedOnBackgroundColorAsName"](this.$store.state.layout.eventBackgroundColor);
    },
    getColorBasedOnBackgroundColor() {
      return this.$store.getters["layout/getColorBasedOnBackgroundColor"](this.$store.state.layout.eventBackgroundColor);
    },
    getEventMode() {
      return this.$store.state.layout.eventMode;
    },
    getStyleForHeadline() {
      return this.$store.getters["layout/getStyleForHeadline"];
    },
    getTextColor() {
      return this.$store.getters["layout/getTextColorForEvent"]["color"];
    },
    getPaddingForEditor() {
      if (this.getEventMode === "border") {
        return {
          "padding-top": "5px",
          "padding-left": "5px",
          "padding-right": "5px",
        };
      } else if (this.getEventMode != "default") {
        return { "padding-left": "5px", "padding-right": "5px" };
      } else {
        return "padding: none";
      }
    },
    getStyleForEmojiButton() {
      let style = {};
      style["box-shadow"] = "none";
      style["background-color"] = "transparent";
      style["text-shadow"] = this.$store.getters["layout/getTextColorForEvent"]["text-shadow"];
      style["color"] = this.$store.getters["layout/getTextColorForEvent"]["color"];
      return style;
    },
    getInputStyleForTitle() {
      let style = {};
      style["min-height"] = "25px";
      style["max-height"] = "50px";
      style["font-size"] = "12px";
      style["background-color"] = "transparent";
      style["font-family"] = this.$store.state.layout.nonDefaultFont;

      if (this.getEventMode != 'default') {
        style["color"] = this.getColorBasedOnBackgroundColor + "!important";
      } else {
        if (this.$store.getters["layout/isDarkModeActive"]) {
          style["color"] = "white";
          /*
           style["color"] = this.$store.getters[
                  "layout/getColorBasedOnBackgroundColor"
                ](this.$store.state.layout.eventInputBackgroundColor);
          */
        } else {
          style["color"] = "black";
        }

      }



      return style;
    },
    getWidthForInputFields() {
      return this.$store.state.layout.innerWidth * 0.8;
    },
    getInputStyleForWhatHappened() {
      let style = {};
      style["font-size"] = "12px";
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      style["width"] = this.getWidthForInputFields + "px";
      return style;
    },
    getBackgroundColor() {
      return this.$store.state.layout.eventBackgroundColor;
    },
    // Conditional Stuff for buttons
    textForRightButton() {
      if (this.$store.state.data.newEventIsInCreationMode) {
        return "Create";
      } else {
        return "Save";
      }
    },
    getIconForEditorButton() {
      if (this.isShowingEditor) {
        return "bi-chevron-left";
      } else {
        return "bi-pencil-square";
      }
    },
  },
};
</script>

<style scoped src="98.css">
.q-field__label,
.no-pointer-events {
  font-family: Tahoma !important;
  color: red !important;
}
</style>

<style scoped>
.topMargin {
  margin-top: 20px;
}

.my_class input::placeholder {
  font-weight: 600;
  color: black;
}

.my_class input::-ms-input-placeholder {
  font-weight: 600;
  color: black;
}
</style>
