<template>
  <baseDialog
    v-model="isDialogVisible"
    @closeDialog="closeDialog"
    @save="saveChanges"
    @clickExtraButton="showEditor"
    :hasExtraButton="true"
    :extraButtonIcon="getIconForEditorButton"
    :hasHelpOption="false"
    :widthOfDialog="dialogWidth"
  >
    <template v-slot:dialogTitle>
      <q-icon name="theater_comedy" size="25px" />
      Event-Tracker
    </template>

    <template v-if="isShowingEditor === false" v-slot:content>
      <div style="width: 310px" class="container">
        <q-card class="testD transparent no-shadow">
          <q-card-section class="row items-center justify-center">
            <!-- How Are You-Section | Emoji-Selection -->
            <div class="promptContainer col-12 q-mx-md q-pa-md">
              <!-- Title -->
              <div class="row justify-center items-center">
                <div class="col-12 underlined promptTitle">
                  How do you feel right now?
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
                        { value: 'las la-meh', slot: 'unhappy' },
                        { value: 'las la-smile', slot: 'content' },
                        { value: 'las la-grin-alt', slot: 'happy' },
                      ]"
                    >
                      <template v-slot:angry>
                        <q-btn padding="xs" flat icon="las la-angry" />
                      </template>

                      <template v-slot:sad>
                        <q-btn padding="xs" flat icon="las la-sad-tear" />
                      </template>

                      <template v-slot:unhappy>
                        <q-btn padding="xs" flat icon="las la-meh" />
                      </template>

                      <template v-slot:content>
                        <q-btn padding="xs" flat icon="las la-smile" />
                      </template>

                      <template v-slot:happy>
                        <q-btn padding="xs" flat icon="las la-grin-alt" />
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
                <div class="col-11">
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
                <div class="col-11">
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
    </template>

    <template v-else v-slot:content>
      <div class="column">
        <!-- Button for showing event's text -->
        <div class="row justify-end">
          <q-btn class="col-2" icon="add" @click="showEventText"></q-btn>
        </div>
        <!-- Editor -->
        <div class="row justify-center">
          <div class="col-12 q-px-xs q-py-md">
            <q-scroll-area style="height: 400px" ref="scrollArea">
              <BaseEditor
                ref="editorRef1"
                v-model="editor"
                minHeight="300px"
                @showTemplateCreator="showTemplateCreator"
                @showTemplateViewer="showTemplateViewer"
              />
            </q-scroll-area>
          </div>
        </div>
      </div>
    </template>
  </baseDialog>
</template>

<script>
import BaseEditor from "../../ui/BaseEditor.vue";
import baseDialog from "../../ui/BaseDialog2.vue";
import shared from "../../../shared.js";
import { mapState } from "vuex";

export default {
  name: "DialogNewEvent",
  components: {
    baseDialog,
    BaseEditor,
  },
  created() {
    this.scroll = shared.scroll; // now I can call this.foo() in my functions/template
  },
  data() {
    return {
      isShowingEditor: false,
      dialogWidth: 315,
      icon: true,
      editor: "",
      options: [
        { value: "Diary", slot: "diaryBtnSlot" },
        { value: "Status", slot: "statusBtnSlot" },
      ],
      names: ["Diary", "Status"],
      simplifiedStyle: {
        //"background-color": "var(--q-secondary)",
        "background-color": "#ffffffd4",
        color: "black",
        height: "33px",
        "border-style": "unset",
        border: "1px solid black",
        "box-shadow": "none",
      },
    };
  },

  methods: {
    showEventText() {},
    showTemplateCreator() {
      console.log("showing template creator");
    },
    showTemplateViewer() {
      console.log("showing template viewer");
    },
    showEditor() {
      this.isShowingEditor = !this.isShowingEditor;
    },
    scrollDown() {
      this.scroll(+200);
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
  },
};
</script>

<style scoped>
.testD {
  max-height: 800px;
}

.container :deep(.promptTitle) {
  font-weight: bolder;
  font-size: 1.2em;
}

.container :deep(.promptContainer) {
  text-align: center;
}

.container :deep(.underlined) {
  border-bottom: 1px solid black;
  padding: 0 0 4px;
}

.container :deep(.q-textarea .q-field__native) {
  padding-top: 10px;
}
</style>
