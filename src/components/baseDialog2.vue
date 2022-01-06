<template>
  <q-dialog
    :value="showDialog"
    class="dialogBox"
    full-width
    full-height
    persistent
  >
    <div
      class="dialogBox column full-height q-pa-sm"
      style="border: 1px solid white"
    >
      <div class="col-1">
        <div class="topContainer row">
          <div class="col text-overline text-left">
            {{ dialogName }}
          </div>
          <!-- <div class="col text-overline text-right">[-] [x]</div> -->
        </div>
      </div>
      <div class="col">
        <q-scroll-area style="height: 95%">
          <!-- SCROLLABLE CONTENT -->
          <!-- SPÄTER AUSLAGERN -->
          <div class="column q-ma-md justify-between content-center">
            <div class="col-4 q-ma-md">
              <div class="col">How do you feel?</div>
              <div class="col">o o o o o o</div>
            </div>
            <div class="col-4 q-ma-md">
              <div class="col">What happened?</div>
              <div class="col">Text-Area</div>
            </div>
            <div class="col q-ma-md">
              <div class="col">TAGS + EXTRAS</div>
              <div class="col">* * * * * *</div>
            </div>
          </div>
        </q-scroll-area>
      </div>
      <div class="col=1 text-right">
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