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
            <div class="col-9 text-left">
              <q-item-label class="card-title">{{
              eventData.title
              }}</q-item-label>
            </div>
            <div
              v-if="isShowingExpandButtonOfEventCard === true"
              class="col-3 text-right"
            >
              <BaseButtonExpandable
                :eventData="eventData"
                color="secondary"
                @expandMore="expand"
                @expandLess="expand"
              ></BaseButtonExpandable>
            </div>
            <div
              v-else
              class="col-3"
            ></div>
          </div>
        </q-item-section>
      </q-item>

      <q-separator class="card-separator" />
      <!-- Text, Extras -->
      <div>
        <!-- view when not expanded + shortened text -->
        <div
          v-if="
            eventData.expanded === false &&
            eventData.text.length >= maxLengthOfCardText
          "
          class="q-pa-sm"
          style="min-height: 80px"
        >


          <q-card-section
            v-if="!isEventEditorEmpty"
            class="card-text"
          >
            {{ eventData.text.substring(0, this.maxLengthOfCardText - 5) }}
            <span style="color: var(--q-secondary)">
              (<q-icon
                size="22.5px"
                name="bi-three-dots"
                text-color="secondary"
                color="secondary"
              >
              </q-icon>)
            </span>
          </q-card-section>
          <q-card-section
            v-else
            class="card-text"
          >
            {{ eventData.text.substring(0, this.maxLengthOfCardText) + "..." }}
          </q-card-section>

        </div>
        <!-- view when not expanded -->
        <div
          v-else-if="eventData.expanded === false"
          class="q-pa-sm"
          style="min-height: 80px"
        >
          <q-card-section class="card-text">
            {{ eventData.text }}
            <span
              v-if="!isEventEditorEmpty"
              style="color: var(--q-secondary)"
            >
              (<q-icon
                size="22.5px"
                name="bi-three-dots"
                text-color="secondary"
                color="secondary"
              >
              </q-icon>)
            </span>
          </q-card-section>
        </div>
        <!-- view when expanded and editor text is empty -->
        <div v-else-if="eventData.expanded === true && isEventEditorEmpty">
          <div class="q-pa-sm">
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
        <!-- view when expanded and editor text isn't empty -->
        <div v-else-if="eventData.expanded === true && !isEventEditorEmpty">
          <div class="q-pa-sm">
            <q-card-section class="card-text">
              <span style="white-space: pre-wrap"> {{ eventData.text }} </span>
            </q-card-section>
          </div>
          <q-separator class="card-separator" />
          <div class="q-pa-sm">
            <q-card-section
              class="card-text"
              style="white-space: pre-wrap"
              v-html="eventData.editor"
            >
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
      </div>
    </q-card>
  </div>
</template>

<script>
import BaseButtonExpandable from "../ui/BaseButtonExpandable.vue";
import { date } from "quasar";
//import TimeAgo from "vue3-timeago";

export default {
  name: "eventCard",
  components: {
    BaseButtonExpandable,
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

  computed: {
    isEventEditorEmpty() {
      if (this.eventData.editor != undefined && this.eventData.editor != "") {
        return false;
      } else {
        return true;
      }
    },

    /*
    expanded: {
      get() {
        return this.$store.state.data.eventData.expanded;
      },
      set(value) {
        this.$store.commit("data/updateExpanded", value);
      },
    },*/
  },

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
