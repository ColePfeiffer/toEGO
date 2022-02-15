<template>
  <div class="container col">
    <!-- Scroll Area for scrollable content -->
    <q-scroll-area style="height: 95%">
      <!-- Column -->
      <div class="column justify-between content-center">
        <!-- HowAreYou Section | Emoji-Selection -->
        <div class="promptContainer col q-mx-md">
          <div class="column">
            <div class="promptTitle col">
              <div class="row justify-center items-center">
                <div class="col-9 underlined">How do you feel right now?</div>
              </div>
            </div>
            <!-- WIP https://quasar.dev/vue-components/button-toggle -->
            <q-btn-toggle
              v-model="model"
              toggle-color="primary"
              flat
              :options="[
                { label: 'One', value: 'one' },
                { label: 'Two', value: 'two' },
                { label: 'Three', value: 'three' },
              ]"
            />
            <div class="emojiSelection col q-mx-md q-mt-md">
              <div class="row justify-center items-center">
                <q-btn
                  flat
                  class="col offset-2"
                  icon="las la-angry"
                  size="md"
                />
                <q-btn flat class="col" icon="las la-sad-tear" />

                <q-btn flat class="col" icon="las la-frown" size="md" />

                <q-btn flat class="col" icon="las la-smile" />
                <q-btn flat class="col" icon="las  la-grin" />

                <div class="col-2"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="promptContainer q-pa-md q-ma-md">
          <div class="promptTitle col">
            <div class="row justify-center items-center">
              <div class="col-10 underlined">What happened?</div>
            </div>
          </div>

          <div class="col">Lorem ipsum ....</div>
        </div>

        <div class="promptContainer q-ma-md">
          <fieldset>
            <legend>
              <div class="row justify-between">
                <baseButton
                  class="col-md-auto"
                  :text="'worries'"
                  @click="openTab('worries')"
                ></baseButton>

                <baseButton
                  class="col-md-auto"
                  :text="'templates'"
                  @click="openTab('templates')"
                ></baseButton>
              </div>
            </legend>
            <div class="col">* * * * * *</div>
          </fieldset>
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
      model: ref("one"),
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

.container >>> .baseButton {
}

.container >>> .buttonContainer {
  border: 1px solid black;
}
.emojiSelection {
}
.container >>> .underlined {
  border-bottom: 1px solid black;
  padding: 0 0 4px;
}

.promptTitle .promptTitle.under .p .div {
  color: red !important;
}
</style>