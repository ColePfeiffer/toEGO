<template>
  <q-dialog
    :value="showDialog"
    class="dialogBox"
    full-width
    full-height
    persistent
  >
    <div class="dialogBox full-height content-center q-pa-sm">
      <!-- TopBar -->

      <div class="topBar col justify-between">
        <div class="row">
          <div class="text-overline col text-left">{{ dialogName }}</div>
          <div class="text-overline col text-right">[-] [x]</div>
        </div>
      </div>
      <q-separator class="column" />
      <!-- Content -->
      <div
        class="contentContainer column"
        style="background-color: blue; height: 300px; opacity: 0.5"
      >
        <!-- ehhh vielleicht mit diesem template / blaupausen dings, wo dann content reingeladen wird... -->
        <!-- Make the following scrollable: -->
        <div>BlablaBlablaBlabla</div>
        <div>BlablaBlablaBlabla</div>
        <div>BlablaBlablaBlabla</div>
        <div>BlablaBlablaBlabla</div>
      </div>

      <!-- Buttons -->
      <div
        class="buttonsContainer col=4 fixed-bottom"
        style="background-color: purple"
      >
        <div class="col text-right">
          <q-btn flat label="Close" @click="closeDialog" />
          <q-btn flat label="Save" @click="closeDialog" />
        </div>
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