<template>
  <!-- infoHeader including status and intentionOfTheWeek -->
  <div class="fit row no-wrap justify-between items-center content-center">
    <!-- Container that holds information about tasks -->
    <div class="statusContainer col-3">
      <!-- Diary Entry Made? -->
      <div class="statusEntryMade fit row no-wrap">
        <q-btn
          class="statusElementIcon col=10 items-center"
          flat
          icon="bi-journal-bookmark-fill"
          color="primary"
        ></q-btn>
        <div class="col=6 statusElementText items-center">
          <span style="color: White">X</span>
        </div>
      </div>
      <!-- Status Updates Made? -->
      <div class="statusUpdatesMade fit row no-wrap">
        <q-btn
          class="statusElementIcon col=6 items-center"
          flat
          icon="bi-chat-left-fill"
          color="primary"
        ></q-btn>
        <p class="col=6 statusElementText items-center">1/3</p>
      </div>
    </div>
    <!-- Col=6 Intention of the Week -->
    <div class="col-flex"></div>
    <div class="intentionOfTheWeek col=6">
      <div class="fit row no-wrap">
        <q-btn class="col=1" flat icon="fas fa-eye" color="primary"></q-btn>
        <span class="col=10" style="font-weight: bold">CURRENT INTENTION</span>
      </div>
      <q-separator class="seperator" color="primary" />
      <div class="fit row reverse no-wrap">
        <span class="col=10">- {{ text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "infoHeader",
  emits: ["save-changes", "toggle-dialogCashUp"],
  components: {},
  data() {
    return {
      //text: "Going outside and doing some cool stuff",
      text: "get work done!",
    };
  },
  methods: {
    saveChangesInProfilePage(roomie, changeData) {
      roomie.username = changeData.username;
      roomie.description = changeData.description;
      roomie.profilePicture = changeData.profilePicture;
      roomie.color = changeData.color;

      roomie.showProfilePage = false;
    },

    saveChanges() {
      this.$emit("save-changes", this.roomie, this.changeData);
    },

    toggleDialogCashUp() {
      this.$emit("toggle-dialogCashUp", true);
    },
  },
};
</script>

<style>
.seperator {
  opacity: 0;
}

.statusContainer {
  padding: 5px;
  width: 100px;
}

.intentionOfTheWeek {
  padding: 15px;
  font-size: 85%;
  max-width: 200px;
}

.balance-plus {
  color: green;
}

.balance-minus {
  color: red;
}

.statusElementIcon {
  width: 35px;
  height: 35px;
  padding: 2px;
}

.statusElementText {
  width: 35px;
  height: 35px;
  padding: 10px;

  font-weight: bold;
  font-size: 85%;
}
</style>