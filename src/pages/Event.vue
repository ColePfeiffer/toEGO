<template>
  <BasePage titleOfPage="Creating a new event"
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
        <BaseButtonForTitleBar class="q-ml-xs q-mr-xs no-box-shadow"
          :icon="getIconForEditorButton"
          @click-button="toggleEditorView">
        </BaseButtonForTitleBar>
      </div>
    </template>
    <template v-slot:content>
      <!-- Emoji-Selection, Title, What happened? -->
      <div v-if="isShowingEditor === false"
        class="row justify-center items-center text-center q-px-md">
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
            :color="getTextColor"
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
        <div class="col-12">
          <BaseInput class="q-mb-md q-mt-sm"
            v-model="title"
            title="Title"
            autofocus
            :eventMode="getEventMode"
            :inputStyle="getInputStyleForTitle"
            :rules="[
              (val) => val.length <= 50 || 'Please use maximum 50 characters',
            ]"></BaseInput>
        </div>

        <!-- Input: What happened -->
        <div class="col-12">
          <BaseInput v-model="text"
            class="q-mb-lg"
            title="What happened?"
            autogrow
            :eventMode="getEventMode"
            :inputStyle="getInputStyleForWhatHappened">
          </BaseInput>
        </div>
      </div>
      <!-- Content: Editor -->
      <div v-else
        class="row justify-center items-center text-center q-pa-none"
        :style="getPaddingForEditor">
        <!-- Editor -->
        <div class="col-12">
          <BaseEditor class="no-border-radius no-box-shadow"
            ref="editorRef1"
            v-model="editor"
            minHeight="535px"
            type="EVENT"
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
import BaseInput from "src/components/ui/BaseInput.vue";

export default {
  components: {
    BasePage,
    BaseEditor,
    BaseButtonForTitleBar,
    BaseButtonForDialogFooter,
    BaseInput,
  },
  data() {
    return {
      isShowingEditor: false,
      editor: this.$store.state.data.eventData.editor,
      title: this.$store.state.data.eventData.title,
      mood: this.$store.state.data.eventData.mood,
      text: this.$store.state.data.eventData.text
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
      this.text = this.$store.state.data.eventData.text;
    },
    resetEventData() {
      this.isShowingEditor = false;
      this.$store.commit("data/resetEventData");
      this.setEventData();
    },
    updateEventData() {
      this.$store.commit("data/updateEditor", this.editor);
      this.$store.commit("data/updateTitle", this.title);
      this.$store.commit("data/updateMood", this.mood);
      this.$store.commit("data/updateText", this.text);
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
    // TODO: maybe put this into editor or somewhere else, as it appears to be used in multiple places
    toggleEditorView() {
      // Applying default template
      let defaultTemplate =
        this.$store.getters["data/getDefaultTemplate"]("EVENT");
      if (defaultTemplate != undefined) {
        this.$store.commit("data/updateEditor", defaultTemplate);
      }
      this.isShowingEditor = !this.isShowingEditor;
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
        nameOfCurrentDialog: "template-viewer-for-events",
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },

  },
  computed: {
    pastedText() {
      return this.$store.state.data.pastedText;
    },
    // Styling _____________________
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
      style["text-shadow"] =
        this.$store.getters["layout/getTextColorForEvent"]["text-shadow"];
      return style;
    },
    getInputStyleForTitle() {
      let style = {};
      style["min-height"] = "25px";
      style["max-height"] = "50px";
      style["font-size"] = "12.5px";
      style["background-color"] = "transparent";
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      style["color"] = this.$store.getters[
        "layout/getColorBasedOnBackgroundColor"
      ](this.$store.state.layout.eventInputBackgroundColor);
      return style;
    },
    getInputStyleForWhatHappened() {
      let style = {};
      style["min-height"] = this.$store.state.layout.innerHeight * 0.4 + "px";
      style["font-size"] = "12.5px";
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      style["color"] = this.$store.getters[
        "layout/getColorBasedOnBackgroundColor"
      ](this.$store.state.layout.eventInputBackgroundColor);
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
</style>
