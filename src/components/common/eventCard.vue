<template>
  <BaseCard :isTextSetToCentered="false"
    :backgroundColor="backgroundColor">
    <template v-slot:content>
      <!-- Mood, Title, Expand Button -->
      <q-item>
        <q-item-section>
          <div class="row justify-between items-center q-pa-none">
            <div class="col-1 ">
              <q-icon size="22.5px"
                :name="eventData.mood"
                text-color="secondary"
                color="secondary"></q-icon>
            </div>
            <div class="col-10 text-left  q-pl-md">
              <q-item-label class="card-title">{{
                  eventData.title
              }}</q-item-label>
            </div>
            <div class="col-1 text-right ">
              <BaseButtonExpandable color="secondary"
                dense
                :isEventExpanded="eventData.expanded"
                @expand="expand"></BaseButtonExpandable>
            </div>
          </div>


        </q-item-section>
      </q-item>

      <q-separator color="whitestorm" />
      <!-- Text, Extras -->
      <div style="min-height: 80px">
        <!-- Expanded: False -->
        <q-card-section v-if="!eventData.expanded"
          class="row justify-left items-center">
          <div v-if="eventData.text.length >= maxLengthOfCardText">
            <!-- Text is shortened -->
            {{ eventData.text.substring(0, this.maxLengthOfCardText) + "..." }}
          </div>
          <!-- Text can be used as is -->
          <div v-else>
            {{ eventData.text }}
          </div>
          <!-- Indicator whether or not this event holds editor-content -->
          <span v-if="!isEventEditorEmpty"
            class="q-ml-xs"
            style="color: var(--q-secondary)">
            (<q-icon size="22.5px"
              name="bi-three-dots"
              text-color="secondary"
              color="secondary">
            </q-icon>)
          </span>
        </q-card-section>
        <!-- Expanded: True -->
        <div v-else>
          <!-- Full event text + editor content (if not empty)-->
          <q-card-section>
            <!-- Event text -->
            <span style="white-space: pre-wrap"> {{ eventData.text }} </span>
            <!-- If Editor isn't empty, show content here -->
            <div v-if="!isEventEditorEmpty"
              style="white-space: pre-wrap"
              v-html="eventData.editor">
            </div>
          </q-card-section>
          <q-card-section class="q-pa-xs q-pl-md">
            <!-- Creation time, buttons to edit and delete -->
            <div class="row justify-between items-center q-pr-none card-time">
              <div class="col-3">
                {{ timeAgo }}
              </div>
              <div class="col-3 text-right">
                <div class="row no-wrap">
                  <q-btn class="col"
                    v-if="eventData.expanded === true"
                    flat
                    icon="delete"
                    color="secondary"
                    @click="deleteEvent"></q-btn>
                  <q-btn class="col"
                    v-if="eventData.expanded === true"
                    flat
                    icon="edit"
                    color="secondary"
                    @click="editEvent"></q-btn>
                </div>
              </div>
            </div>
          </q-card-section>
        </div>

      </div>
    </template>
  </BaseCard>

</template>

<script>
import BaseButtonExpandable from "../ui/BaseButtonExpandable.vue";
import { date } from "quasar";
import BaseCard from "../ui/BaseCard.vue";
//import TimeAgo from "vue3-timeago";

export default {
  name: "eventCard",
  components: {
    BaseButtonExpandable,
    BaseCard
  },
  props: {
    eventData: Object,
    backgroundColor: {
      type: String,
      default: "#f5f5f5",
    }
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
  padding-bottom: 2px;
  padding-top: 2px;
}

.card-title {
  color: var(--q-secondary);
}
</style>
