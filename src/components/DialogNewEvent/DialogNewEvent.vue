<template>
  <baseDialog
    v-model="showDialog"
    @closeDialog="closeDialog"
    @save="saveChanges"
  >
    <template v-slot:dialogTitle>
      <q-icon name="theater_comedy" size="25px" />
      Event-Tracker
    </template>
    <template v-slot:content>
      <div class="container col">
        <!-- Scroll Area for scrollable content -->
        <q-scroll-area style="height: 95%" ref="scrollArea">
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
                    label="Title"
                    input-style="max-height: 50px; min-height: 25px;"
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
                    autogrow
                    input-style="max-height: 200px; min-height: 100px;"
                  />
                </div>
              </div>
            </div>
            <!-- Methods-Section -->
            <div class="promptContainer col q-mx-md q-mt-xs q-pa-md">
              <methodsPanel @scroll="scrollDown"> </methodsPanel>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </template>
  </baseDialog>
</template>

<script>
import baseDialog from "../ui/baseDialog.vue";
import shared from "../../shared.js";
import methodsPanel from "./methodsPanel.vue";
import { mapState } from "vuex";

export default {
  name: "DialogNewEvent",
  components: {
    methodsPanel,
    baseDialog,
  },
  created() {
    this.scroll = shared.scroll; // now I can call this.foo() in my functions/template
  },
  data() {
    return {
      icon: true,
    };
  },

  methods: {
    scrollDown() {
      this.scroll(+200);
    },
    closeDialog() {
      this.$store.commit("data/resetEventData");
      this.$store.commit("data/setDialogVisibility", false);
    },
    saveChanges() {
      console.log("mood: ", this.mood);
      if (this.mood === "") {
        this.mood = "las la-meh-blank";
      }
      console.log("mood: ", this.mood);
      this.$store.commit("data/addEventToEvents", new Date());
      this.closeDialog();
    },
  },
  computed: {
    showDialog: {
      get() {
        return this.$store.state.data.newEventDialogIsOpen;
      },
      set(value) {
        this.$store.commit("data/setDialogVisibility", value);
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
html {
  height: 100%;
  overflow: auto;
}
body {
  height: 100%;
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