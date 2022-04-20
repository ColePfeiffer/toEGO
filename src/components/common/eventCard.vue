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
              <base-expandable-button
                :eventData="eventData"
                color="secondary"
                @expandMore="expand"
                @expandLess="expand"
              ></base-expandable-button>
            </div>
          </div>
        </q-item-section>
      </q-item>
      <q-separator class="card-separator" />

      <div class="q-pa-sm">
        <!-- view when not expanded + shortened text -->
        <q-card-section
          class="card-text"
          v-if="
            eventData.expanded === false &&
            eventData.text.length >= maxLengthOfCardText
          "
        >
          {{ eventData.text.substring(0, this.maxLengthOfCardText) + "..." }}
        </q-card-section>
        <!-- view when not expanded -->
        <q-card-section
          class="card-text"
          v-else-if="eventData.expanded === false"
        >
          {{ eventData.text }}
        </q-card-section>
        <!-- view when expanded -->
        <div v-else>
          <q-card-section class="card-text">
            {{ eventData.text }}
          </q-card-section>
          <q-card-section class="q-py-xs">
            <div class="row justify-between items-center">
              <div class="col-3">
                {{ timeAgo }}
              </div>
              <div class="col-3">
                <div class="row no-wrap">
                  <q-btn
                    class="col"
                    v-if="eventData.expanded === true"
                    flat
                    icon="fas fa-eye"
                    color="accent"
                    @click="editEvent"
                  ></q-btn>
                  <q-btn
                    class="col"
                    v-if="eventData.expanded === true"
                    flat
                    icon="edit"
                    color="accent"
                    @click="editEvent"
                  ></q-btn>
                </div>
              </div>
            </div>
          </q-card-section>
        </div>
      </div>
    </q-card>
  </div>
</template>
      
    
   <script>
import BaseExpandableButton from "../ui/baseExpandableButton.vue";
//import TimeAgo from "vue3-timeago";

export default {
  name: "eventCard",
  components: {
    BaseExpandableButton,
    //TimeAgo,
  },
  props: {
    eventData: Object,
  },
  data() {
    return {
      maxLengthOfCardText: 90,
      timeAgo: "4:20 pm",
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  /*
  computed: {
    expanded: {
      get() {
        return this.$store.state.data.eventData.expanded;
      },
      set(value) {
        this.$store.commit("data/updateExpanded", value);
      },
    },
  }, */

  methods: {
    expand() {
      this.$store.commit("data/updateExpandedByEventID", this.eventData.id);
    },
    mergeText(eventData) {
      let output = eventData.text;
      // check if text is empty; if so show title
      if (eventData.text == "") {
        output = eventData.title;
        // später löschen, nur zum testen
        //output = this.lorem;
      }
      //console.log([output][0]);
      return [output][0];
    },
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
    