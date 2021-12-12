<template>
  <q-dialog :value="showDialog" class="dialogBox" full-width full-height persistent>
    <q-card class="column full-height dialogBox" style="width: 300px">
      <q-card-section>
        <div class="text-overline">LOGGING EVENT</div>
        <div class="moodPicker fit row no-wrap items-center">
          <div class="col-12">How do you feel?</div>
        </div>
        <div class="moodPicker fit row no-wrap items-center">
          <q-separator class="col" color="primary" />
        </div>

        <div class="moodPicker fit row no-wrap items-center content-start">
          <div class="col">:) :I :(</div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" @click="closeDialog" />
        <q-btn flat label="Save" @click="closeDialog" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "baseDialog",
  emits: ["toggle-Dialog"],
  props: {
    showDialog: Boolean
    //view: String, // CASH, NEW, CASH_UP_EXISTING
    //categories: Array,
    //existingArticle: Object // for cashing up existing items
  },
  data() {
    return {
      newEvent: {
        title: " ",
        mood: "",
        text: "",
        tags: "",
        createdOn: "",
        createdBy: "" // ref or id
      }
    };
  },
  methods: {
    closeDialog() {
      this.$emit("toggle-Dialog", false);

      // reset everything
      this.newEvent = {
        title: " ",
        mood: "",
        text: "",
        tags: "",
        createdOn: "",
        createdBy: "" // ref or id
      };
    }
  }
};
</script>

<style>
.dialogBox {
  background-color: #000;
  opacity: 0.65;
  color: #fff;
}
</style>