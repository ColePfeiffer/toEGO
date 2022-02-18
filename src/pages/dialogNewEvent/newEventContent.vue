<template>
  <div class="container col">
    <!-- Scroll Area for scrollable content -->
    <q-scroll-area style="height: 95%">
      <!-- Column -->
      <div class="column content-center">
        <!-- How Are You-Section | Emoji-Selection -->
        <div class="promptContainer col q-mx-md">
          <!-- Title -->
          <div class="row justify-center items-center">
            <div class="col-12 underlined promptTitle">
              How do you feel right now?
            </div>
          </div>
          <!-- Emoji Selection via Button Toggle -->
          <div class="emojiSelection q-mt-md row justify-center items-center">
            <div class="col-10">
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
        <div class="promptContainer col-auto q-mx-md q-mt-md">
          <!-- Title -->
          <div class="row justify-center items-center">
            <div class="col-12 underlined promptTitle">What happened?</div>
          </div>
          <!-- Text Input -->
          <div class="row justify-center items-center">
            <div class="col-12">
              <q-input
                v-model="text"
                filled
                autogrow
                input-style="max-height: 200px"
              />
            </div>
          </div>
        </div>
        <!-- Methods-Section -->
        <div class="promptContainer col q-mx-md q-mt-md">
          <!-- Buttons -->
          <div class="row justify-center items-center">
            <div class="col-12">
              <baseButton
                class="col-3 col-md-auto q-ma-xs"
                :text="'worries'"
                @click="openTab('worries')"
              ></baseButton>
              <baseButton
                class="col-3 col-md-auto q-ma-xs"
                :text="'templates'"
                @click="openTab('templates')"
              ></baseButton>
            </div>
          </div>
          <!-- Text Input -->
          <div class="row justify-center items-center">
            <div class="col-12">ddddddd</div>
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
      text: "Bla",
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
  methods: {
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
</style>