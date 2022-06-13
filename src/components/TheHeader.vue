<template>
  <!-- infoHeader including status and intentionOfTheWeek -->
  <div v-if="false">
    <div class=" row no-wrap  q-pa-md items-center content-center">
      <!-- Container that holds information about tasks -->

      <div class="col ">
        <q-btn class="col-2" flat icon="bi-eye-slash" color="primary"></q-btn>
        <q-btn flat icon="bi-eye-fill" class="col-2" color="primary"></q-btn>
      </div>
      <span class="col-6 " style="font-weight: bold">{{ getIntentionText }}</span>

    </div>
    <span class="col-12 q-pa-md">{{ text }}</span>
    <!-- Col=6 Intention of the Week -->

  </div>
  <div v-if="false">
    <div class="q-pa-md">
      <q-card class="my-card  shadow-3 row justify-center ">
        <q-card-section class="card-text">
          {{ getIntentionText }}
          <q-btn color="accent" flat dense icon="bi-envelope" />
        </q-card-section>
        <q-card-section>
          <q-input class="card-input" v-model="text" filled autogrow />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div class="q-pa-md">

    <q-expansion-item v-model="expanded" icon="bi-envelope" :label="getIntentionText"
      class="q-pa-xs text-center justify-center">
      <q-card class="my-card shadow-3 q-py-md q-mt-md">
        <q-card-section>
          <div class="cursor-pointer smallText">
            {{ text }}
            <q-popup-edit v-model="text" auto-save v-slot="scope">
              <q-input type="textarea" v-model="scope.value" autofocus counter @keyup.enter="scope.set" />
            </q-popup-edit>
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
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
      text: "Be productive. Get the project done! Celebrate yourself.",
      expanded: false,
    };
  },
  methods: {
    getShortenedIntentionText() {
      if (this.text.length >= 25) {
        return this.text.substring(0, 25) + "...";
      } else {
        return this.text;
      }
    },
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
  computed: {
    getIntentionText() {
      return this.$store.state.data.intentionText
    }
  }
};
</script>

<style scoped>
.card-input {
  color: white;
  border-left: 1px solid black;
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
