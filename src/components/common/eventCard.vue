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
      <div :style="styleForEventContent">
        <!-- Expanded: False -->
        <q-card-section v-if="!eventData.expanded"
          class="row justify-left items-center">
          <div v-if="nonExpandedEditor.length >= maxLengthOfCardText">
            <!-- Text is shortened -->
            <div style="white-space: no-wrap"
              v-html="nonExpandedEditor.substring(0, this.maxLengthOfCardText) + '...'">
            </div>
          </div>
          <!-- Text can be used as is -->
          <div v-else>
            <div style="white-space: pre-wrap"
              v-html="nonExpandedEditor">
            </div>
          </div>
        </q-card-section>
        <!-- Expanded: True -->
        <div v-else>
          <!-- Full event text -->
          <q-card-section>
            <!-- Event text -->
            <div style="white-space: pre-wrap"
              v-html="clearEditor">
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
import DOMPurify from 'dompurify';

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
    styleForEventContent() {
      return {
        'width': this.$store.state.layout.innerWidth * 0.91 + "px",
        'min-height': '80px'
      };
    },
    clearEditor() {
      console.log("dirty: ", this.eventData.editor);
      let sanitazedEditor = DOMPurify.sanitize(this.eventData.editor, { USE_PROFILES: { html: true } }, { FORBID_TAGS: ['style'] }, { FORBID_ATTR: ['style'] });
      console.log("only allow safe html: ", sanitazedEditor);
      return sanitazedEditor;
    },
    nonExpandedEditor() {
      let sanitazedEditor = DOMPurify.sanitize(this.eventData.editor, { ALLOWED_TAGS: ['b', 'i', 'br'], ALLOWED_ATTR: [] });
      sanitazedEditor = sanitazedEditor.replaceAll("<br>", " ");
      return sanitazedEditor;
    },
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
