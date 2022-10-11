<template>
  <BasePage titleOfPage="Creating a new event"
    :mode="getEventMode"
    :backgroundColor="getBackgroundColor">
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
      <!-- Emoji-Selection, Title, What happened? -->
      <div v-if="isShowingEditor === false"
        class="row justify-center items-center text-center q-px-md">
        <!-- How are you feeling? -->
        <p class="col-10 text-center q-mt-lg "
          :style="$store.getters['layout/getStyleForHeadline']">
          How are you feeling?
        </p>
        <!-- Mood Selection -->
        <div class="col-12">
          <q-btn-toggle v-model="mood"
            class="col-12 q-mb-md"
            toggle-color="accent"
            padding="none"
            :color="$store.getters['layout/getTextColorForEvent']['color']"
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
        <div class="col-12 ">
          <BaseInput class="q-mb-md q-mt-sm"
            v-model="title"
            title="Title"
            autofocus
            eventMode="eventMode"
            :inputStyle="getInputStyleForTitle"
            :rules="[(val) => val.length <= 50 || 'Please use maximum 50 characters']"></BaseInput>
        </div>


        <!-- Input: What happened -->
        <div class="col-12">
          <BaseInput v-model="text"
            class="q-mb-lg"
            title="What happened?"
            autogrow
            eventMode="eventMode"
            :inputStyle="getInputStyleForWhatHappened">
          </BaseInput>
        </div>

      </div>
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
import BaseInput from "src/components/ui/BaseInput.vue";

export default {
  components: { BasePage, BaseEditor, BaseButtonForTitleBar, BaseButtonForDialogFooter, BaseInput },
  data() {
    return {
      isShowingEditor: false,
      styleEventTextScrollArea: {
        height: "125px",
      },
      heightForScrollArea: "900px",
      isShowingEventText: false,
      style: {},
    };
  },
  watch: {
  },

  computed: {
    getStyleForEmojiButton() {
      let style = {};

      style["box-shadow"] = "none";
      style["background-color"] = "transparent";
      style["text-shadow"] = this.$store.getters['layout/getTextColorForEvent']["text-shadow"];

      return style;

    },
    getInputStyleForTitle() {
      let style = {};
      style["min-height"] = "25px";
      style["max-height"] = "50px";
      style["font-size"] = "12.5px";
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      style["color"] = this.$store.getters['layout/getColorBasedOnBackgroundColor'](this.$store.state.layout.eventInputBackgroundColor);
      return style;
    },
    getInputStyleForWhatHappened() {
      let style = {};
      style["min-height"] = this.$store.state.layout.innerHeight * 0.40 + "px";
      style["font-size"] = "12.5px";
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      style["color"] = this.$store.getters['layout/getColorBasedOnBackgroundColor'](this.$store.state.layout.eventInputBackgroundColor);
      return style;
    },
    getEventMode() {
      return this.$store.state.layout.eventMode;
    },
    getBackgroundColor() {
      return this.$store.state.layout.eventBackgroundColor;
    },
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
</style>

<style scoped>
.topMargin {
  margin-top: 20px;
}
</style>
