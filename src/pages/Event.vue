<template>
  <BasePage icon="theater_comedy"
    titleOfPage="Creating a new event">
    <template v-slot:title-bar-icon>
      <q-icon name="theater_comedy"
        size="25px" />
    </template>
    <template v-slot:title-bar-controls>
      <div class="row justify-between items-center">
        <BaseButtonForTitleBar v-if="isShowingEditor"
          icon="bi-justify-left"
          @click-button="toggleVisibilityOfEventText">
        </BaseButtonForTitleBar>
        <BaseButtonForTitleBar class="q-ml-xs q-mr-xs no-box-shadow "
          :icon="getIconForEditorButton"
          @click-button="switchSection">
        </BaseButtonForTitleBar>
      </div>
    </template>
    <template v-slot:content>
      <div>
        <!-- Emoji-Selection, Title, What happened? -->
        <q-card v-if="isShowingEditor === false"
          class="transparent no-shadow">
          <q-card-section class="row items-center justify-center">
            <!-- How Are You-Section | Emoji-Selection -->
            <div class="promptContainer col-12 q-mx-md q-pa-md">
              <!-- Title -->
              <div class="row justify-center items-center">
                <div class="col-12 underlined promptTitle"
                  :style="$store.getters['layout/getStyleForHeadline']">
                  How are you feeling?
                </div>
              </div>
              <!-- Emoji Selection via Button Toggle -->
              <div class="emojiSelection q-mt-md row justify-center items-center">
                <div class="col-12">
                  <div class="align-center">
                    <q-btn-toggle v-model="mood"
                      toggle-color="accent"
                      padding="none"
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
                          :style="$store.state.layout.buttonFlatStyleTransparent"
                          flat
                          size="15px"
                          icon="las la-angry" />
                      </template>

                      <template v-slot:sad>
                        <q-btn padding="xs"
                          :style="$store.state.layout.buttonFlatStyleTransparent"
                          flat
                          size="15px"
                          icon="las la-sad-tear" />
                      </template>

                      <template v-slot:meh>
                        <q-btn padding="xs"
                          :style="$store.state.layout.buttonFlatStyleTransparent"
                          flat
                          size="15px"
                          icon="las la-meh" />
                      </template>

                      <template v-slot:content>
                        <q-btn padding="xs"
                          :style="$store.state.layout.buttonFlatStyleTransparent"
                          flat
                          size="15px"
                          icon="las la-smile" />
                      </template>

                      <template v-slot:happy>
                        <q-btn padding="xs"
                          :style="$store.state.layout.buttonFlatStyleTransparent"
                          flat
                          size="15px"
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
                  <q-input class="input body"
                    color="primary"
                    v-model="title"
                    stack-label
                    filled
                    square
                    label="Title"
                    input-style="max-height: 50px; min-height: 25px; font-size: 12.5px; font-family: Tahoma"
                    :rules="[
                      (val) =>
                        val.length <= 50 || 'Please use maximum 50 characters',
                    ]" />
                </div>
              </div>
              <!-- Text Input -->
              <div class="row justify-center q-mt-xs items-center">
                <div class="col-12">
                  <q-input class="input"
                    v-model="text"
                    label="What happened?"
                    stack-label
                    filled
                    square
                    autogrow
                    input-style="max-height: 335px; min-height: 220px; font-size: 12.5px; font-family: Tahoma" />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
        <!-- Content: Editor -->
        <div v-else
          class="column">
          <q-scroll-area :style="heightForScrollArea"
            ref="scrollArea">
            <div v-if="isShowingEventText"
              class="smallText"
              :style="$store.getters['layout/getStyleForQuotedEventText']">
              <q-scroll-area :style="styleEventTextScrollArea">
                <span class="bold">You wrote:</span> <br />
                <span class="text-justify keep-whitespace">{{
                textForQuoted
                }}</span>
              </q-scroll-area>
            </div>
            <!-- Editor -->
            <div class="row justify-center">
              <div class="col-12">
                <q-scroll-area :style="heightForScrollArea"
                  ref="scrollArea">
                  <BaseEditor class="no-border-radius no-box-shadow"
                    ref="editorRef1"
                    v-model="editor"
                    minHeight="535px"
                    type="EVENT"
                    @openDialogCreateTemplate="openDialogCreateTemplate"
                    @openDialogViewTemplates="openDialogViewTemplates"
                    @pasteTemplate="pasteTemplate" />
                </q-scroll-area>
              </div>
            </div>
          </q-scroll-area>
        </div>
      </div>

    </template>
    <template v-slot:footer>
      <BaseButtonForDialogFooter buttonText="Discard"
        @click-button="closeDialog">
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
  components: { BasePage, BaseEditor, BaseButtonForTitleBar, BaseButtonForDialogFooter },
  data() {
    return {
      isShowingEditor: false,
      styleEventTextScrollArea: {
        height: "125px",
      },
      heightForScrollArea: "height: 600px",
      isShowingEventText: false,
      widthOfDialog: 350,
    };
  },
  watch: {

  },

  computed: {
    textForRightButton() {


      if ((this.$store.state.data.eventData === undefined) | (this.$store.state.data.eventData.editor === "")) {
        return "Create";
      } else {
        return "Save";
      }
    },
    textForQuoted() {
      //eventData.text.substring(0, this.maxLengthOfCardText) + "..."
      if (this.text === "") {
        return "Nothing yet.";
      } else {
        return '"' + this.text + '"';
      }
    },


    getIconForEditorButton() {
      if (this.isShowingEditor) {
        return "bi-chevron-left";
      } else {
        return "bi-pencil-square";
      }
    },
    getLabelForEditorButton() {
      if (this.isShowingEditor) {
        return "Back";
      } else {
        return "Editor";
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
  },
  methods: {
    switchSection() {
      // applying default template
      let defaultTemplate =
        this.$store.getters["data/getDefaultTemplate"]("EVENT");
      if (defaultTemplate != undefined) {
        this.$store.commit("data/updateEditor", defaultTemplate);
      };

      this.isShowingEditor = !this.isShowingEditor;
    },
    pasteTemplate(template) {
      if (this.editor != "") {
        this.editor = this.editor + "<br>" + template.text;
      } else {
        this.editor = template.text;
      }
    },
    openDialogCreateTemplate() {
      let payload = {
        isVisible: true,
        isBackgroundVisible: true,
        nameOfCurrentDialog: "dialogCreateEventTemplate",
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },
    openDialogViewTemplates() {
      let payload = {
        isVisible: true,
        isBackgroundVisible: true,
        nameOfCurrentDialog: "dialogViewEventTemplates",
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },
    toggleVisibilityOfEventText() {
      this.isShowingEventText = !this.isShowingEventText;
    },

    closeDialog() {
      // TODO: if editing, dont save stuff on discord. reset changeData or something.
      let lastPath = this.$router.options.history.state.back;
      lastPath = lastPath.substring(1);
      this.$store.commit("data/resetEventData");
      this.$router.push(lastPath);
    },
    saveChanges() {
      // TODO:
      if (this.mood === "") {
        this.mood = "las la-meh-blank";
      }
      console.log("mode: ", this.$store.state.data.newEventIsInCreationMode);
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
}
</script>



<style scoped src="98.css">
.q-field__label,
.no-pointer-events {
  font-family: Tahoma !important;
  color: red !important;
}

.body {
  font-family: Tahoma !important;
}

.promptContainer {
  text-align: center;
}

.containerForSection {
  height: 600px;
}

.editorSection {
  background-color: white;
}

.test {
  color: puprle;
}
</style>

<style scoped>
.container {
  background-color: white;
  height: 600px;
}

.input {
  color: red;
  font-size: 11.5px;
  font-family: 'Tahoma';
  min-width: 250px !important;
  max-width: 250px !important;
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
