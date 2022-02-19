<template>
  <div class="container col">
    <!-- Scroll Area for scrollable content -->
    <q-scroll-area style="height: 95%">
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
        <div class="promptContainer col q-mx-md q-mt-md q-pa-md">
          <!-- Title -->
          <div class="row justify-center items-center">
            <div class="col-12 underlined promptTitle">What happened?</div>
          </div>
          <!-- Text Input -->
          <div class="row justify-center q-mt-xs items-center">
            <div class="col-12">
              <q-input
                class="input"
                v-model="text"
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
            <div class="col-12 ButtonWrapper" :style="hideBorder">
              <q-btn-toggle
                v-model="panel"
                toggle-color="accent"
                flat
                :options="[
                  { value: 'worries', slot: 'worries' },
                  { value: 'templates', slot: 'templates' },
                ]"
              >
                <template v-slot:worries>
                  <baseButton
                    :text="'methods'"
                    :changeColor="false"
                    :setStyleTo="'styleA'"
                    class="FloatingButton"
                    @onClick="setPanel('worries')"
                  ></baseButton>
                </template>

                <template v-slot:templates>
                  <baseButton
                    :text="'templates'"
                    :changeColor="false"
                    :setStyleTo="'styleB'"
                    class="FloatingButton"
                    @onClick="setPanel('templates')"
                  ></baseButton>
                </template>
              </q-btn-toggle>

              <!-- Panels -->
              <div v-if="showPanels === true">
                <q-tab-panels
                  v-model="panel"
                  animated
                  class="noBackground row justify-center q-mt-none items-center"
                  style="margin-top: -15px"
                >
                  <q-tab-panel name="worries">
                    <div class="text-h6">Methods</div>
                    <div class="underlined promptTitle"></div>

                    <q-expansion-item
                      switch-toggle-side
                      expand-separator
                      dense
                      :style="maxWidthOfExpansionItems"
                      icon="perm_identity"
                      label="1-to-5 Methode"
                      @show="expandItem('oneToFiveMethode')"
                    >
                      <q-card style="max-width: inherit" class="noBackground">
                        <q-card-section ref="oneToFiveMethode">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Quidem, eius reprehenderit eos corrupti commodi
                          magni quaerat ex numquam, dolorum officiis modi facere
                          maiores architecto suscipit iste eveniet doloribus
                          ullam aliquid.
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                    <q-expansion-item
                      switch-toggle-side
                      expand-separator
                      dense
                      icon="perm_identity"
                      label="Handling Emotions"
                      @show="expandItem('handlingEmotions')"
                    >
                      <q-card
                        :style="maxWidthOfExpansionItems"
                        class="noBackground"
                      >
                        <q-card-section ref="handlingEmotions">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Quidem, eius reprehenderit eos corrupti commodi
                          magni quaerat ex numquam, dolorum officiis modi facere
                          maiores architecto suscipit iste eveniet doloribus
                          ullam aliquid.
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>

                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-tab-panel>

                  <q-tab-panel name="templates">
                    <div class="text-h6">Templates</div>
                    <div class="underlined promptTitle"></div>

                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-tab-panel>
                </q-tab-panels>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
import baseButton from "../../components/ui/baseButton.vue";

export default {
  name: "addEvent",
  components: {
    baseButton,
  },
  data() {
    return {
      maxWidthOfExpansionItems: { "max-width": "250px" },
      panel: "",
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
  computed: {
    hideBorder() {
      var style = {};

      if (this.showPanels) {
        console.log("Computed: Show panels");

        style = { border: "1px solid black" };
      } else {
        console.log("Computed:  Hide panels");
        style = { border: "none" };
      }

      return style;
    },
  },
  methods: {
    expandItem(refName) {
      console.log("EXPAND ITEM!");
      //const ele = document.getElementById("oneToFiveMethode");

      this.$nextTick(() => this.$refs[refName].$el.scrollIntoView());
      window.scroll({
        top: -80,
        left: 0,
        behavior: "smooth",
      });
      /**
      this.$nextTick(() =>
        this.$refs[refName].$el.scrollIntoView({
          block: "center",
          inline: "end",
        })
      ); */
    },

    setPanel(name) {
      console.log("Panel: " + this.panel);
      if (this.panel === name && this.showPanels === false) {
        this.showPanels = true;
        this.panel = name;
      } else if (this.panel != name) {
        console.log("Changing!");
        this.panel = name;
        this.showPanels = true;
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

.container >>> .buttonContainer {
  border: 1px solid black;
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

.ButtonWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-left: 5%;
  margin-right: 5%;
  box-sizing: border-box;
  margin-bottom: 5%;
  margin-top: 5%;
  border: 1px solid black;
}

.FloatingButton {
  border: none;

  position: relative;
  bottom: 1.5em;
}
</style>