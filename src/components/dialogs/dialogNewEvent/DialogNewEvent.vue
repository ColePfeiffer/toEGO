<template>
  <baseDialog
    v-model="isDialogVisible"
    @closeDialog="closeDialog"
    @save="saveChanges"
    :hasHelpOption="false"
    :widthOfDialog="315"
  >
    <template v-slot:confirm-button>
      {{ confirmButtonText }}
    </template>
    <template v-slot:dialogTitle>
      <q-icon name="theater_comedy" size="25px" />
      Event-Tracker
    </template>
    <template v-slot:content>
      <div style="width: 300px">
        <q-card class="testD transparent no-shadow">
          <q-card-section class="row items-center">
            <div class="container">
              <!-- Scroll Area for scrollable content -->
              <!-- Column -->
              <div class="column content-center">
                <!-- How Are You-Section | Emoji-Selection -->
                <div class="promptContainer col q-mx-md q-pa-md">
                  <!-- Title -->
                  <div class="row justify-center items-center">
                    <div class="col-12 underlined promptTitle">
                      How do you feel right now?
                    </div>
                  </div>
                  <!-- Emoji Selection via Button Toggle -->
                  <div
                    class="
                      emojiSelection
                      q-mt-md
                      row
                      justify-center
                      items-center
                    "
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
                            { value: 'las la-frown', slot: 'unhappy' },
                            { value: 'las la-smile', slot: 'content' },
                            { value: 'las la-grin', slot: 'happy' },
                          ]"
                        >
                          <template v-slot:angry>
                            <q-btn padding="xs" flat icon="las la-angry" />
                          </template>

                          <template v-slot:sad>
                            <q-btn padding="xs" flat icon="las la-sad-tear" />
                          </template>

                          <template v-slot:unhappy>
                            <q-btn padding="xs" flat icon="las la-frown" />
                          </template>

                          <template v-slot:content>
                            <q-btn padding="xs" flat icon="las la-smile" />
                          </template>

                          <template v-slot:happy>
                            <q-btn padding="xs" flat icon="las la-grin" />
                          </template>
                        </q-btn-toggle>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- What Happened-Section -->
                <div class="promptContainer col q-mx-md q-mt-xs q-px-md">
                  <!-- Title -->
                  <div class="row justify-center items-center">
                    <div class="col-12 underlined promptTitle">
                      What's on your mind?
                    </div>
                  </div>
                  <!-- Text Input -->
                  <div class="row justify-center q-mt-xs items-center">
                    <div class="col-12">
                      <q-input
                        class="input"
                        v-model="title"
                        filled
                        square
                        label="Title"
                        input-style="max-height: 50px; min-height: 25px;"
                        :rules="[
                          (val) =>
                            val.length <= 30 ||
                            'Please use maximum 30 characters',
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
                        input-style="max-height: 250px; min-height: 100px;"
                      />
                    </div>
                  </div>
                </div>
                <!-- Methods-Section -->
                <div>
                  <div class="row justify-center q-pa-md">
                    <BaseButton
                      :text="''"
                      :changeColor="false"
                      :setStyleTo="simplifiedStyle"
                      :icon="getIconForEditorButton"
                      ref="button1"
                      class="FloatingButton"
                      @onClick="showEditor"
                    ></BaseButton>
                  </div>

                  <div
                    v-if="isEditorShown"
                    class="row justify-center items-center"
                  >
                    <div class="col">
                      <q-scroll-area style="height: 250px" ref="scrollArea">
                        <!-- EDIT MODE -->
                        <div class="editorContainer">
                          <BaseEditor
                            ref="editorRef1"
                            v-model="editor"
                            @showTemplateCreator="showTemplateCreator"
                            @showTemplateViewer="showTemplateViewer"
                          />
                        </div>
                      </q-scroll-area>
                    </div>
                  </div>
                </div>
                <div
                  v-if="false"
                  class="promptContainer col q-mx-md q-mt-xs q-pa-md"
                >
                  <methodsPanel @scroll="scrollDown"> </methodsPanel>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </template>
  </baseDialog>
</template>

<script>
import BaseButton from "../../ui/baseButton.vue";
import BaseEditor from "../../ui/BaseEditor.vue";
import baseDialog from "../../ui/baseDialog2.vue";
import shared from "../../../shared.js";
import methodsPanel from "./MethodsPanel.vue";
import { mapState } from "vuex";

export default {
  name: "DialogNewEvent",
  components: {
    methodsPanel,
    baseDialog,
    BaseButton,
    BaseEditor,
  },
  created() {
    this.scroll = shared.scroll; // now I can call this.foo() in my functions/template
  },
  data() {
    return {
      isEditorShown: false,
      icon: true,
      editor: "",
      options: [
        { value: "Diary", slot: "diaryBtnSlot" },
        { value: "Status", slot: "statusBtnSlot" },
      ],
      names: ["Diary", "Status"],
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

  methods: {
    showTemplateCreator() {},
    showTemplateViewer() {},
    showEditor() {
      this.isEditorShown = !this.isEditorShown;
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
      if (this.isEditorShown) {
        return "bi-pencil";
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
    confirmButtonText() {
      if (
        this.$store.state.data.dialogSettings.nameOfCurrentDialog ===
        "dialogEditEvent"
      ) {
        return "edit";
      } else {
        return "save";
      }
    },
  },
};
</script>

<style scoped>
.testD {
  max-height: 800px;
}
.container {
  width: 315px;
}
.container :deep(::-webkit-scrollbar) {
  display: none;
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
/* Adjusting the top padding for the input field */
.container :deep(.q-textarea .q-field__native) {
  padding-top: 10px;
}
</style>
