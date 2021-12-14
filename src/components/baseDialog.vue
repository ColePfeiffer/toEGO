<template>
  <q-dialog
    :value="showDialog"
    class="dialogBox"
    full-width
    full-height
    persistent
  >
    <div class="dialogBox column full-height content-center q-pa-sm">
      <!-- TopBar -->
      <div class="topBarContainer full-width">
        <div class="topBar row justify-between">
          <div class="text-overline col-4 text-left">{{ dialogName }}</div>
          <div class="text-overline col-4 text-right">[-] [x]</div>
        </div>
        <q-separator class="row" />
      </div>
      <!-- Content -->
      <div
        class="contentContainer full-width"
        style="background-color: blue; height: 300px; opacity: 0.5"
      >
        <!-- ehhh vielleicht mit diesem template / blaupausen dings, wo dann content reingeladen wird... -->
        <!-- Make the following scrollable: -->
        <div>BlablaBlablaBlabla</div>
      </div>

      <!-- Buttons -->
      <div
        class="buttonsContainer full-width text-right"
        style="background-color: purple"
      >
        <q-btn flat label="Close" @click="closeDialog" />
        <q-btn flat label="Save" @click="closeDialog" />
      </div>
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: "baseDialog",
  emits: ["toggle-Dialog"],
  props: {
    showDialog: Boolean,
    //view: String, // CASH, NEW, CASH_UP_EXISTING
    //categories: Array,
    //existingArticle: Object // for cashing up existing items
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
    closeDialog() {
      console.log("meehhh");
      this.$emit("toggle-Dialog", false);

      // reset everything
      this.newEvent = {
        title: " ",
        mood: "",
        text: "",
        tags: "",
        createdOn: "",
        createdBy: "", // ref or id
      };
    },
  },
};
</script>

<style>
.dialogBox {
  background-color: #000;
  opacity: 0.65;
  color: #fff;
}
</style>