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
            <div class="col-12 ButtonWrapper" :style="hideBorder">
              <q-btn-toggle
                v-model="panel"
                toggle-color="accent"
                flat
                :options="[
                  { value: 'methods', slot: 'methods' },
                  { value: 'templates', slot: 'templates' },
                ]"
              >
                <template v-slot:methods>
                  <baseButton
                    :text="'methods'"
                    :changeColor="false"
                    :setStyleTo="'styleA'"
                    class="FloatingButton"
                    @onClick="setPanel('methods')"
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
                  <q-tab-panel name="methods" ref="methods">
                    <div class="text-h6">Methods</div>
                    <div class="underlined promptTitle"></div>

                    <q-expansion-item
                      switch-toggle-side
                      expand-separator
                      dense
                      icon="task_alt"
                      label="1-to-5 Methode"
                      @show="expandItem('oneToFiveMethode')"
                    >
                      <q-card
                        :style="maxWidthOfExpansionItems"
                        class="noBackground"
                      >
                        <q-card-section ref="oneToFiveMethode" class="q-pa-xs">
                          <ul style="text-align: left">
                            <li>
                              Name
                              <strong style="color: purple">five</strong> things
                              you can see.
                            </li>
                            <li>
                              Name
                              <strong style="color: purple">four</strong> things
                              you can touch.
                            </li>
                            <li>
                              Name
                              <strong style="color: purple">three</strong>
                              things you can hear.
                            </li>
                            <li>
                              Name
                              <strong style="color: purple">two</strong> things
                              you can smell.
                            </li>
                            <li>
                              Name
                              <strong style="color: purple">one</strong> thing
                              you can taste.
                            </li>
                          </ul>
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                    <q-expansion-item
                      switch-toggle-side
                      expand-separator
                      dense
                      icon="spa"
                      label="Handling Emotions"
                      @show="expandItem('handlingEmotions')"
                    >
                      <q-card
                        :style="maxWidthOfExpansionItems"
                        class="noBackground"
                      >
                        <q-card-section class="q-pa-xs" ref="handlingEmotions">
                          <div>
                            Accept that the problem is there and surrender
                            fighting it. Pay attention to your body. Is there
                            any tension?

                            <strong style="color: white"
                              >Breathe in, breathe out.</strong
                            >

                            <br />
                            <q-separator />
                            <br />

                            <div class="promptTitle">
                              Imagine a friend is struggling with this problem.
                              They ask for your advice.
                            </div>

                            <q-input
                              class="input"
                              v-model="friendAdvice"
                              autogrow
                              filled
                              label="What would you tell
                              them?"
                              input-style="max-height: 150px; min-height: 20px;"
                              :rules="[
                                (val) =>
                                  val.length <= 500 ||
                                  'Please use maximum 500 characters',
                              ]"
                            />

                            <div class="promptTitle">
                              Is there something you can do about your problem?
                            </div>

                            <q-radio
                              keep-color
                              v-model="problemIsBeyondOwnControl"
                              val="yes"
                              label="yes"
                              color="teal"
                            />
                            <q-radio
                              keep-color
                              v-model="problemIsBeyondOwnControl"
                              val="no"
                              label="no"
                              color="orange"
                            />
                            <div v-if="problemIsBeyondOwnControl === 'yes'">
                              What are you going to do and when can you start?

                              <q-input
                                class="input"
                                v-model="friendAdvice"
                                autogrow
                                filled
                                label="
                                   What and when?"
                                input-style="max-height: 150px; min-height: 20px;"
                                :rules="[
                                  (val) =>
                                    val.length <= 500 ||
                                    'Please use maximum 500 characters',
                                ]"
                              />
                            </div>
                            <div v-else>
                              <q-separator />
                              Even if you can't control a situation, you can
                              control your response to it. Recognize that you
                              are feeling anxiety. Remind yourself that worrying
                              about something outside your control won't change
                              the outcome. Challenge your self-talk. Focus your
                              attention on the things which are in your power.
                              <q-separator />
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>

                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-tab-panel>

                  <q-tab-panel name="templates" ref="templates">
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
      //250px for not much of a change, extends on bigger devices only
      problemIsBeyondOwnControl: "yes",
      showFriendAdvicePrompt: "false",
      maxWidthOfExpansionItems: { "max-width": "350px" },
      friendAdvice: "",
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

      //this.$nextTick(() => this.$refs[refName].$el.scrollIntoView());
      this.scroll(+200);
      /*
      this.$nextTick(() =>
        this.$refs[refName].$el.scrollIntoView({
          block: "center",
          inline: "end",
        })
      );*/
    },

    scroll(offset) {
      // + offset: scrolls less
      // - offset: scrolls more
      const scrollArea = this.$refs.scrollArea;
      const scrollTarget = scrollArea.getScrollTarget();

      console.log(scrollTarget);
      console.log(scrollTarget.scrollHeight);
      console.log(scrollTarget.scrollHeight - offset);
      const duration = 300; // ms - use 0 to instant scroll
      scrollArea.setScrollPosition(
        scrollTarget.scrollHeight - offset,
        duration
      );
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