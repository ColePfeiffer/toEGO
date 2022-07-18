<template>
  <q-page class="q-pa-sm">
    <div class="outerContainer row justify-center items-center">
      <div class="title-bar col-12 row" :style="getStyleForDialogTitleBar">
        <div class="title-bar-text">
          <div>
            <q-icon name="theater_comedy" size="25px" />
            Creating a new event
          </div>
        </div>
        <div class="title-bar-controls">
          <q-btn
            v-if="isShowingEditor"
            :style="$store.state.data.buttonFlatStyleTransparent"
            flat
            icon="bi-blockquote-right"
            @click="toggleVisibilityOfEventText"
          ></q-btn>
        </div>
      </div>
      <!-- make scrollable -->
      <!-- Content: Emoji, Title, What happened? -->
      <div class="col-12 container q-mt-sm" v-if="isShowingEditor === false">
        <q-card class="transparent no-shadow" style="max-height: 800px">
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
              <div
                class="emojiSelection q-mt-md row justify-center items-center"
              >
                <div class="col-12">
                  <div class="align-center">
                    <q-btn-toggle
                      v-model="mood"
                      toggle-color="accent"
                      padding="none"
                      flat
                      :options="[
                        { value: 'las la-angry', slot: 'angry' },
                        { value: 'las la-sad-tear', slot: 'sad' },
                        { value: 'las la-meh', slot: 'meh' },
                        { value: 'las la-smile', slot: 'content' },
                        { value: 'las la-grin-alt', slot: 'happy' },
                      ]"
                    >
                      <template v-slot:angry>
                        <q-btn
                          padding="xs"
                          :style="$store.state.data.buttonFlatStyleTransparent"
                          flat
                          size="15px"
                          icon="las la-angry"
                        />
                      </template>

                      <template v-slot:sad>
                        <q-btn
                          padding="xs"
                          :style="$store.state.data.buttonFlatStyleTransparent"
                          flat
                          size="15px"
                          icon="las la-sad-tear"
                        />
                      </template>

                      <template v-slot:meh>
                        <q-btn
                          padding="xs"
                          :style="$store.state.data.buttonFlatStyleTransparent"
                          flat
                          size="15px"
                          icon="las la-meh"
                        />
                      </template>

                      <template v-slot:content>
                        <q-btn
                          padding="xs"
                          :style="$store.state.data.buttonFlatStyleTransparent"
                          flat
                          size="15px"
                          icon="las la-smile"
                        />
                      </template>

                      <template v-slot:happy>
                        <q-btn
                          padding="xs"
                          :style="$store.state.data.buttonFlatStyleTransparent"
                          flat
                          size="15px"
                          icon="las la-grin-alt"
                        />
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
                  <q-input
                    class="input"
                    color="primary"
                    v-model="title"
                    filled
                    square
                    label="Title"
                    input-style="max-height: 50px; min-height: 25px; font-size: 12.5px"
                    :rules="[
                      (val) =>
                        val.length <= 30 || 'Please use maximum 30 characters',
                    ]"
                  />
                </div>
              </div>
              <!-- Text Input -->
              <div class="row justify-center q-mt-xs items-center">
                <div class="col-12">
                  <q-input
                    class="input"
                    v-model="text"
                    label="What happened?"
                    filled
                    square
                    autogrow
                    input-style="max-height: 280px; min-height: 220px; font-size: 12.5px"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <!-- Content: Editor -->
      <div
        class="col-12 container q-mt-sm"
        style="background-color: transparent"
        v-else
      >
        <div class="column">
          <div
            v-if="isShowingEventText"
            class="q-pa-md defaultFont smallText"
            :style="getStyleForQuotedEventText"
          >
            <q-scroll-area :style="styleEventTextScrollArea">
              <span class="bold">You wrote:</span> <br />
              <span class="text-justify keep-whitespace">{{ quotedText }}</span>
            </q-scroll-area>
          </div>
          <!-- Editor -->
          <div class="row justify-center">
            <div class="col-12 q-px-xs q-py-md">
              <q-scroll-area style="height: 400px" ref="scrollArea">
                <BaseEditor
                  ref="editorRef1"
                  v-model="editor"
                  minHeight="300px"
                  @openDialogCreateTemplate="openDialogCreateTemplate"
                  @openDialogViewTemplates="openDialogViewTemplates"
                />
              </q-scroll-area>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Slot | Option to hide buttons -->
      <div class="col-12 q-mt-sm">
        <div class="row justify-end items-center no-wrap">
          <q-btn
            class="button col-2 q-mr-xs"
            flat
            :style="$store.state.data.buttonFlatStyleAccentColor"
            :icon="getIconForEditorButton"
            @click="showEditor"
          >
          </q-btn>

          <q-btn
            class="button col-2 q-mx-xs"
            :style="$store.state.data.buttonFlatStyle"
            flat
            @click="closeDialog"
          >
            discard
          </q-btn>

          <q-btn
            class="button col-2 q-ml-xs"
            :style="$store.state.data.buttonFlatStyle"
            flat
            @click="saveChanges"
          >
            save
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
      isShowingEventText: false,
      isShowingEditor: false,
      widthOfDialog: 350,
      styleEventTextScrollArea: {
        height: "125px",
      },
      styleQuotedText: {
        background: "#f9f9f9",
        "border-left": "5px solid var(--q-secondary)",
        margin: "1.5em 10px",
        padding: "0.5em 10px",
      },
      styleQuotedTextDark: {
        background: "#ffffff2b",
        "border-left": "5px solid var(--q-secondary)",
        margin: "1.5em 10px",
        padding: "0.5em 10px",
      },
      styleDark: {
        width: this.widthOfDialog + "px",
        "background-color": "rgb(0 0 0 / 77%)",
        color: "white",
      },
      styleLight: {
        width: this.widthOfDialog + "px",
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
      this.$store.commit("data/resetEventData");
      let payload = {
        isVisible: false,
        isBackgroundVisible: true,
        nameOfCurrentDialog:
          this.$store.state.data.dialogSettings.nameOfCurrentDialog,
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },
    saveChanges() {
      if (this.mood === "") {
        this.mood = "las la-meh-blank";
      }

      // check wether a new event is created or an existing one is being edited
      if (
        this.$store.state.data.dialogSettings.nameOfCurrentDialog ===
        "dialogNewEvent"
      ) {
        let route = this.$route.path;

        // if we are at home, we want to use new Date
        if (route === "/home") {
          console.log("home");
          // creating a new event:
          this.$store.commit("data/addEventToEvents", new Date());
          // if we are at the diary page, we want to use lastSelectedDate
        } else if (route === "/diary") {
          console.log("diary");
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
        return "bi-plus-lg";
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
.outerContainer {
  min-width: 350px;
  max-width: 350px;
}
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
