<template>
  <q-page class="q-pa-sm">
    <div class="outerContainer row justify-center items-center q-pa-md q-pt-xl">
      <div class="title-bar col-md-11 col-12 row" :style="getStyleForDialogTitleBar">
        <div class="title-bar-text">
          <div>
            <q-icon name="theater_comedy" size="25px" />
            Creating a new event
          </div>
        </div>
        <div class="title-bar-controls">
          <q-btn v-if="isShowingEditor" :style="$store.state.data.buttonFlatStyleTransparent" flat
            icon="bi-blockquote-right" @click="toggleVisibilityOfEventText"></q-btn>
        </div>
      </div>
      <!-- make scrollable -->
      <div class="col-md-11 col-12 container q-mt-sm" :style="outerContainerStyle">
        <q-scroll-area :style="heightForScrollArea" ref="scrollArea">
          <!-- Content: Emoji, Title, What happened? -->
          <q-card v-if="isShowingEditor === false" class="transparent no-shadow">
            <q-card-section class="row items-center justify-center">
              <!-- How Are You-Section | Emoji-Selection -->
              <div class="promptContainer col-12 q-mx-md q-pa-md">
                <!-- Title -->
                <div class="row justify-center items-center">
                  <div class="col-12 underlined promptTitle">
                    How are you feeling?
                  </div>
                </div>
                <!-- Emoji Selection via Button Toggle -->
                <div class="emojiSelection q-mt-md row justify-center items-center">
                  <div class="col-12">
                    <div class="align-center">
                      <q-btn-toggle v-model="mood" toggle-color="accent" padding="none" flat :options="[
                        { value: 'las la-angry', slot: 'angry' },
                        { value: 'las la-sad-tear', slot: 'sad' },
                        { value: 'las la-meh', slot: 'meh' },
                        { value: 'las la-smile', slot: 'content' },
                        { value: 'las la-grin-alt', slot: 'happy' },
                      ]">
                        <template v-slot:angry>
                          <q-btn padding="xs" :style="$store.state.data.buttonFlatStyleTransparent" flat size="15px"
                            icon="las la-angry" />
                        </template>

                        <template v-slot:sad>
                          <q-btn padding="xs" :style="$store.state.data.buttonFlatStyleTransparent" flat size="15px"
                            icon="las la-sad-tear" />
                        </template>

                        <template v-slot:meh>
                          <q-btn padding="xs" :style="$store.state.data.buttonFlatStyleTransparent" flat size="15px"
                            icon="las la-meh" />
                        </template>

                        <template v-slot:content>
                          <q-btn padding="xs" :style="$store.state.data.buttonFlatStyleTransparent" flat size="15px"
                            icon="las la-smile" />
                        </template>

                        <template v-slot:happy>
                          <q-btn padding="xs" :style="$store.state.data.buttonFlatStyleTransparent" flat size="15px"
                            icon="las la-grin-alt" />
                        </template>
                      </q-btn-toggle>
                    </div>
                  </div>
                </div>
              </div>

              <!-- What Happened-Section -->
              <div class="promptContainer col-12 q-mx-md q-mt-xs q-px-md">
                <!-- Title -->
                <div class="row justify-center items-center"></div>
                <!-- Text Input -->
                <div class="row justify-center q-mt-xs items-center">
                  <div class="col-12">
                    <q-input class="input" color="primary" v-model="title" stack-label filled square label="Title"
                      input-style="max-height: 50px; min-height: 25px; font-size: 12.5px" :rules="[
                        (val) =>
                          val.length <= 30 || 'Please use maximum 30 characters',
                      ]" />
                  </div>
                </div>
                <!-- Text Input -->
                <div class="row justify-center q-mt-xs items-center">
                  <div class="col-12">
                    <q-input class="input" v-model="text" label="What happened?" stack-label filled square autogrow
                      input-style="max-height: 280px; min-height: 220px; font-size: 12.5px" />
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
          <!-- Content: Editor -->
          <div v-else class="column">
            <div v-if="isShowingEventText" class="defaultFont smallText" :style="getStyleForQuotedEventText">
              <q-scroll-area :style="styleEventTextScrollArea">
                <span class="bold">You wrote:</span> <br />
                <span class="text-justify keep-whitespace">{{ quotedText }}</span>
              </q-scroll-area>
            </div>
            <!-- Editor -->
            <div class="row justify-center">
              <div class="col-12">
                <q-scroll-area style="height: 600px" ref="scrollArea">
                  <BaseEditor class="no-border-radius no-box-shadow" ref="editorRef1" v-model="editor" minHeight="400px"
                    @openDialogCreateTemplate="openDialogCreateTemplate"
                    @openDialogViewTemplates="openDialogViewTemplates" />
                </q-scroll-area>
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>


      <!-- Footer Slot | Option to hide buttons -->
      <div class="col-md-11 col-12 q-mt-sm">
        <div class="row justify-end items-center no-wrap">
          <q-btn no-caps no-wrap class="button col-2 q-mr-xs" flat :style="$store.state.data.buttonFlatStyleAccentColor"
            @click="showEditor">
            <div class="row items-center no-wrap">
              <q-icon size="15px" color="black" left :name="getIconForEditorButton" />
              <div class="text-center text-black">
                Editor
              </div>
            </div>
          </q-btn>
          <q-btn no-caps class="button col-2 q-mx-xs" :style="$store.state.data.buttonFlatStyle" flat
            @click="closeDialog">
            <div class="text-center text-black">
              Discard
            </div>
          </q-btn>




          <q-btn no-caps class="button col-2 q-ml-xs" :style="$store.state.data.buttonFlatStyle" flat
            @click="saveChanges">
            <div class="text-center text-black">
              Create
            </div>
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import BaseEditor from "../components/ui/BaseEditor.vue";

export default {
  name: "DialogNewEvent",
  components: {
    BaseEditor,
  },
  data() {
    return {
      heightForScrollArea: "height: 600px",
      isShowingEventText: false,
      isShowingEditor: false,
      widthOfDialog: 350,
      styleEventTextScrollArea: {
        height: "125px",
      },
      styleQuotedText: {
        background: "#f9f9f9",
        "border-left": "5px solid var(--q-secondary)",
        padding: "0.5em 10px",
        "margin-bottom": "10px",
        "margin-top": "2px",
      },
      styleQuotedTextDark: {
        "background": "var(--q-dark)",
        "text-shadow": "rgb(0 0 0) 2px 2px 2px",
        "border-left": "5px solid var(--q-secondary)",
        padding: "0.5em 10px",
        "margin-bottom": "10px",
        "margin-top": "2px",

      },
      styleDark: {
        "background-color": "rgb(0 0 0 / 77%)",
        color: "white",
      },
      styleLight: {
        "background-color": "rgb(255 255 255 )",
        color: "black",
      },
      accentBackground: {
        //"background-color": "var(--q-accent)",
        color: "var(--q-primary)",
        border: "1px solid var(--q-accent)",
      },
      styleForDialogTitleBar: { background: "var(--q-secondary)" },
      styleForDialogTitleBarDark: { background: "var(--q-secondary)" },
    };
  },
  methods: {
    openDialogCreateTemplate() {
      this.$emit("openDialogCreateTemplate");
    },
    openDialogViewTemplates() {
      this.$emit("openDialogViewTemplates");
    },
    toggleVisibilityOfEventText() {
      this.isShowingEventText = !this.isShowingEventText;
    },
    showEditor() {
      // applying default template
      let defaultTemplate =
        this.$store.getters["data/getDefaultTemplate"]("EVENT");
      if (defaultTemplate != undefined) {
        this.$store.commit("data/updateEditor", defaultTemplate);
      }

      this.isShowingEditor = !this.isShowingEditor;
    },
    closeDialog() {
      let lastPath = this.$router.options.history.state.back;
      lastPath = lastPath.substring(1);
      this.$store.commit("data/resetEventData");
      this.$router.push(lastPath);
    },
    saveChanges() {
      if (this.mood === "") {
        this.mood = "las la-meh-blank";
      }

      // check wether a new event is created or an existing one is being edited
      if (this.$store.state.data.newEventIsInCreationMode) {

        let lastPath = this.$router.options.history.state.back;

        // if we are at home, we want to use new Date
        if (lastPath === "/home") {
          // creating a new event:
          this.$store.commit("data/addEventToEvents", new Date());
          // if we are at the diary page, we want to use lastSelectedDate
        } else if (lastPath === "/diary") {
          // creating a new event:
          this.$store.commit(
            "data/addEventToEvents",
            this.$store.state.data.lastSelectedDate
          );
        }
      } else {
        // editing an existing event:
        this.$store.commit("data/saveChangesToEditedEvent");
      }
      this.closeDialog();
    },
  },
  computed: {
    outerContainerStyle() {
      let currentStyle;
      let styleDark = {
        "background-color": "var(--q-dark)",
        color: "white",
      };
      let styleLight = {
        "background-color": "rgb(255 255 255 )",
        color: "black",
      };

      if (this.$store.getters["data/isDarkModeActive"]) {
        currentStyle = styleDark;
      } else {
        currentStyle = styleLight;
      }

      if (this.isShowingEditor === true) {
        return "background-color: transparent";
      } else {
        return currentStyle;
      }

    },
    containerStyle() {
      if (this.isShowingEditor === true) {
        return "background-color: transparent";
      } else {
        return "";
      }
    },
    editor: {
      get() {
        return this.$store.state.data.eventData.editor;
      },
      set(value) {
        this.$store.commit("data/updateEditor", value);
      },
    },
    quotedText() {
      //eventData.text.substring(0, this.maxLengthOfCardText) + "..."
      if (this.text === "") {
        return "Nothing yet.";
      } else {
        return '"' + this.text + '"';
      }
    },
    getStyleForQuotedEventText() {
      if (this.$store.getters["data/isDarkModeActive"]) {
        return this.styleQuotedTextDark;
      } else {
        return this.styleQuotedText;
      }
    },
    getIconForEditorButton() {
      if (this.isShowingEditor) {
        return "bi-arrow-left";
      } else {
        return "bi-file-text";
      }
    },
    isDialogVisible: {
      get() {
        if (
          (this.$store.state.data.dialogSettings.isVisible === true) &
          ((this.$store.state.data.dialogSettings.nameOfCurrentDialog ===
            "dialogNewEvent") |
            (this.$store.state.data.dialogSettings.nameOfCurrentDialog ===
              "dialogEditEvent"))
        ) {
          return true;
        } else {
          return false;
        }
      },
      set(value) {
        let payload = {
          isVisible: value,
          isBackgroundVisible: false,
          nameOfCurrentDialog:
            this.$store.state.data.dialogSettings.nameOfCurrentDialog,
        };
        this.$store.commit("data/setDialogVisibility", payload);
      },
    },
    title: {
      get() {
        return this.$store.state.data.eventData.title;
      },
      set(value) {
        this.$store.commit("data/updateTitle", value);
      },
    },
    mood: {
      get() {
        return this.$store.state.data.eventData.mood;
      },
      set(value) {
        this.$store.commit("data/updateMood", value);
      },
    },
    text: {
      get() {
        return this.$store.state.data.eventData.text;
      },
      set(value) {
        this.$store.commit("data/updateText", value);
      },
    },
    getStyleForDialogTitleBar() {
      if (this.$store.getters["data/isDarkModeActive"]) {
        return this.styleForDialogTitleBarDark;
      } else {
        return this.styleForDialogTitleBar;
      }
    },
    getStyleForDialog() {
      if (this.$store.getters["data/isDarkModeActive"]) {
        return this.styleDark;
      } else {
        return this.styleLight;
      }
    },
  },
};
</script>

<style scoped src="98.css">
.promptContainer {
  text-align: center;
}

.test {
  color: puprle;
}
</style>

<style scoped>
.container {
  background-color: white;
}

.input {
  min-width: 250px;
  max-width: 250px;
}

.definedWidth {
  min-width: 250px;
  max-width: 250px;
}

.promptContainer {
  text-align: center;
}

.normalStyle {
  color: green;
}

.topMargin {
  margin-top: 20px;
}

.underlined {
  border-bottom: 1px solid black;
  padding: 0 0 4px;
}

.promptTitle {
  font-weight: bolder;
  font-size: 1.1em;
}
</style>
