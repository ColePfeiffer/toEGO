<template>
  <div class="q-pa-md">
    <q-card class="my-card shadow-3 text-justify">
      <!-- Mood, Title, Expand Button -->
      <q-item>
        <!-- mood emoji -->
        <q-item-section avatar>
          <q-icon
            size="22.5px"
            :name="eventData.mood"
            text-color="secondary"
            color="secondary"
          ></q-icon>
        </q-item-section>

        <!-- event title, expand button -->
        <q-item-section>
          <div class="row justify-center items-center">
            <div class="col-6 text-left">
              <q-item-label class="card-title">{{
                eventData.title
              }}</q-item-label>
            </div>
            <div
              v-if="isShowingExpandButtonOfEventCard === true"
              class="col-6 text-right"
            >
              <base-expandable-button
                :eventData="eventData"
                color="secondary"
                @expandMore="expand"
                @expandLess="expand"
              ></base-expandable-button>
            </div>
            <div v-else class="col-6 text-right"></div>
          </div>
        </q-item-section>
      </q-item>

      <q-separator class="card-separator" />
      <!-- Text, Extras -->
      <div class="q-pa-sm" style="min-height: 80px">
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
            <span style="white-space: pre-wrap"> {{ eventData.text }} </span>
          </q-card-section>
          <q-card-section class="q-py-xs card-time">
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
                    icon="delete"
                    color="secondary"
                    @click="deleteEvent"
                  ></q-btn>
                  <q-btn
                    class="col"
                    v-if="eventData.expanded === true"
                    flat
                    icon="edit"
                    color="secondary"
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
import BaseExpandableButton from "../ui/BaseExpandableButton.vue";
import { date } from "quasar";
//import TimeAgo from "vue3-timeago";

export default {
  name: "eventCard",
  components: {
    BaseExpandableButton,
    //TimeAgo,
  },
  props: {
    eventData: Object,
    isShowingExpandButtonOfEventCard: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["changeEventData", "deleteEvent", "editEvent"],
  data() {
    return {
      maxLengthOfCardText: 90,
      timeAgoGER: date.formatDate(this.eventData.createdOn, "HH:mm"),
      timeAgo: date.formatDate(this.eventData.createdOn, "h:mm A"),
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
    deleteEvent() {
      this.$emit("deleteEvent", this.eventData);
    },
    editEvent() {
      this.$emit("editEvent", this.eventData);
    },
    expand() {
      this.$emit("changeEventData", this.eventData);
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
.card-text,
.card-time {
  font-size: 12.5px;
}

.card-time {
  color: var(--q-secondary);
}

.card-title {
  color: var(--q-secondary);
}
</style>
