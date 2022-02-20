<template>
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
          <div class="emojiSelection q-mt-md row justify-center items-center">
            <div class="col-12">
              <div class="align-center">
                <q-btn-toggle
                  v-model="model"
                  toggle-color="accent"
                  padding="none"
                  flat
                  :options="[
                    { value: 'angry', slot: 'angry' },
                    { value: 'sad', slot: 'sad' },
                    { value: 'unhappy', slot: 'unhappy' },
                    { value: 'content', slot: 'content' },
                    { value: 'happy', slot: 'happy' },
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
                    <q-btn padding="xs" flat icon="las  la-grin" />
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
          <!-- Button Toggle -->

          <div class="row justify-center items-center">
            
             
            </div>
          </div>
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
import baseButton from "../../components/ui/baseButton.vue";
import handlingEmotions from "./methods/handlingEmotions.vue";
import fiveToOneMethod from "./methods/FiveToOneMethod.vue";
import shared from "./../../shared.js";

export default {
  name: "addEvent",
  components: {
    baseButton,
    handlingEmotions,
    fiveToOneMethod,
  },
  data() {
    return {
      //250px for not much of a change, extends on bigger devices only

      maxWidthOfExpansionItems: { "max-width": "350px" },

      panel: "",
      title: "",
      showPanels: false,
      methodsTab: "",
      text: "",
      model: "angry",
      dialogName: "ADD EVENT",
      newEvent: {
        title: " ",
        mood: "",
        text: "",
        tags: "",
        createdOn: "",
        createdBy: "", // ref or id
      },
    };
  },

  created() {
    this.scroll = shared.scroll; // now you can call this.foo() (in your functions/template)
    // or just use shared.scroll();
  },
  methods: {
    scrollDown(refName) {
      this.scroll(200);
      console.log(refName);
    },
    expandItem() {
      console.log("EXPAND ITEM!");
      //const ele = document.getElementById("oneToFiveMethode");

      //this.$nextTick(() => this.$refs[refName].$el.scrollIntoView());
      //this.scroll(+200);
      this.scroll(+200);
      /*
      this.$nextTick(() =>
        this.$refs[refName].$el.scrollIntoView({
          block: "center",
          inline: "end",
        })
      );*/
    },

    setPanel(name) {
      console.log("Panel: " + this.panel);
      // Show Panel again by double-clicking on a tab
      if (this.panel === name && this.showPanels === false) {
        this.showPanels = true;
        this.panel = name;

        this.expandItem(name);
        // Showing Panel or switching to a different panel
      } else if (this.panel != name) {
        console.log("Changing!");
        this.panel = name;
        this.showPanels = true;

        this.expandItem(name);

        // Hide Panel
      } else {
        console.log("Setting to hidden!");
        this.showPanels = false;
        this.panel = "hidden";
      }
      console.log("Panel: " + this.panel);
    },
    openTab(name) {
      console.log("opening ", name);
    },
    reset() {
      this.newEvent = {
        title: " ",
        mood: "",
        text: "",
        tags: "",
        createdOn: "",
        createdBy: "", // ref or id
      };
    },
    getName() {
      console.log(this.dialogName);
      return this.dialogName;
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
.container >>> .noBackground {
  background: none;
}
.container >>> ::-webkit-scrollbar {
  display: none;
}
.container >>> .promptTitle {
  font-weight: bolder;
  font-size: 1.2em;
}

.container >>> .promptContainer {
  text-align: center;
}

.container >>> .underlined {
  border-bottom: 1px solid black;
  padding: 0 0 4px;
}
/* Adjusting the top padding for the input field */
.container >>> .q-textarea .q-field__native {
  padding-top: 10px;
}

fieldset {
  position: relative;
}

.FloatingButton {
  border: none;

  position: relative;
  bottom: 1.5em;
}
</style>