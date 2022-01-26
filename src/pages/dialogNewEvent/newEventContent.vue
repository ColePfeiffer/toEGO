<template>
  <div class="container col">
    <q-scroll-area style="height: 95%">
      <!-- SCROLLABLE CONTENT -->

      <div class="column justify-between content-center">
        <div class="promptContainer q-ma-md col-md">
          <div class="promptTitle underlined col">
            How do you feel right now?
          </div>

          <div class="emojiSelection col q-ma-md">
            <q-icon name="theater_comedy" size="25px" />
            <q-icon name="theater_comedy" size="25px" />
            <q-icon name="theater_comedy" size="25px" />
            <q-icon name="theater_comedy" size="25px" />
            <q-icon name="theater_comedy" size="25px" />
          </div>
        </div>

        <div class="promptContainer q-ma-md col-md">
          <div class="promptTitle underlined col">What happened?</div>
          <div class="col">Lorem ipsum ....</div>
        </div>

        <div class="promptContainer q-ma-md col-md">
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
.container {
}
.container >>> .promptTitle {
  font-weight: bolder;
  font-size: 1.2em;
}

.container >>> .promptContainer {
  text-align: center;
  max-width: 60%;
}

.container >>> .baseButton {
  max-width: 0.3em;
}

.container >>> .buttonContainer {
  border: 1px solid black;
}
.emojiSelection {
}
.container >>> .underlined {
  border-bottom: 1px solid rgb(8, 0, 2);
  width: 100%;
  display: block;
}

.promptTitle .promptTitle.under .p .div {
  color: red !important;
  text-decoration: underline !important;
}
</style>