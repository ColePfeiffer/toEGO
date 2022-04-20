<template>
  <div class="row justify-center q-pa-md">
    <q-card class="my-card col-12" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar text-color="secondary" :icon="eventData.mood"></q-avatar>
        </q-item-section>

        <q-item-section>
          <div class="row justify-center items-center">
            <div class="col-6 text-left">
              <q-item-label class="card-title">{{
                eventData.title
              }}</q-item-label>
            </div>

            <div class="col-6 text-right">
              <q-btn
                flat
                icon="expand_more"
                color="secondary"
                @click="expanded = !expanded"
              ></q-btn>
            </div>
          </div>
        </q-item-section>
      </q-item>

      <q-separator class="card-separator" />
      <q-item>
        <q-card-section class="card-text" v-if="expanded === false">
          {{
            mergeText(eventData).substring(0, this.maxLengthOfCardText) + "..."
          }}
        </q-card-section>
        <q-card-section class="card-text" v-else>
          {{ mergeText(eventData) }}
        </q-card-section>
      </q-item>
    </q-card>
  </div>
</template>
      
    
   <script>
//import TimeAgo from "vue3-timeago";

export default {
  name: "eventCard",
  components: {
    //TimeAgo,
  },
  props: {
    eventData: Object,
  },
  data() {
    return {
      expanded: false,
      maxLengthOfCardText: 120,
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  methods: {
    mergeText(eventData) {
      let output = eventData.text;
      // check if text is empty; if so show title
      if (eventData.text == "") {
        output = eventData.title;
        // später löschen, nur zum testen
        output = this.lorem;
      }
      console.log([output][0]);
      return [output][0];
    },
  },
  setExpanded() {
    // to set the expanded status from parent
  },
};
</script>
    
<style scoped>
.my-card {
}

.card-text {
  font-size: 12.5px;
}

.card-title {
  color: var(--q-secondary);
}

.card-separator {
  background-color: rgba(157, 157, 213, 0.6);
}
</style>
    