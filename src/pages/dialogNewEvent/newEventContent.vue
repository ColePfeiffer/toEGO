<template>
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
</template>

<script>
export default {
  name: "addEvent",
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

<style>
</style>