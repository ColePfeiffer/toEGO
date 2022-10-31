<template>
  <BaseCard :isTextSetToCentered="false"
    :backgroundColor="backgroundColor">
    <template v-slot:content>
      <!-- Mood, Title, Expand Button -->
      <q-item>
        <q-item-section>
          <div class="row justify-between items-center q-pa-none"
            :style="styleForHeader">
            <div class="col-1 ">
              <q-icon size="22.5px"
                :name="eventData.mood"></q-icon>
            </div>
            <div class="col-10 text-left  q-pl-md">
              <q-item-label>{{
                  eventData.title
              }}</q-item-label>
            </div>
            <div class="col-1 text-right ">
              <BaseButtonExpandable color="secondary"
                style="font-size: 11px"
                dense
                :isEventExpanded="eventData.expanded"
                @expand="expand"></BaseButtonExpandable>
            </div>
          </div>


        </q-item-section>
      </q-item>

      <q-separator />

      <!-- Text, Buttons -->
      <div :style="styleForEventContent">
        <!-- Expanded: False -->
        <q-card-section v-if="!eventData.expanded"
          class="row justify-left items-center">
          <div style="white-space: pre-wrap"
            v-html="nonExpandedEditor">
          </div>
        </q-card-section>
        <!-- Expanded: True -->
        <div v-else>
          <q-card-section>
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
    isTextShortened() {
      if (this.clearEditorNonExpanded.length >= this.maxLengthOfCardText) {
        return true;
      } else {
        return false;
      }
    },
    styleForHeader() {
      if (this.$store.getters["layout/isTitleAndEmojiColorSetToSecondary"]) {
        return { "color": this.$store.getters['layout/getTextColorBasedOnDarkMode'] };
      } else {
        return { 'color': this.$store.state.layout.secondary }
      }
    },
    styleForEventContent() {
      return {
        //TODO: check if this is right for all resolutions... should be close tho.
        'width': this.$store.state.layout.innerWidth * 0.87 + "px",
        'min-height': '80px'
      };
    },
    clearEditor() {
      console.log("dirty: ", this.eventData.editor);
      let sanitazedEditor = DOMPurify.sanitize(this.eventData.editor, { USE_PROFILES: { html: true } }, { FORBID_TAGS: ['style'] }, { FORBID_ATTR: ['style'] });
      console.log("only allow safe html: ", sanitazedEditor);
      return sanitazedEditor;
    },
    clearEditorNonExpanded() {
      let sanitazedEditor = DOMPurify.sanitize(this.eventData.editor, { ALLOWED_TAGS: ['b', 'i', 'br', 'div'], ALLOWED_ATTR: [] });
      sanitazedEditor = sanitazedEditor.replaceAll("<br>", " ");
      sanitazedEditor = sanitazedEditor.replaceAll("<div>", " ");
      sanitazedEditor = sanitazedEditor.replaceAll("</div>", "");
      return sanitazedEditor;
    },
    nonExpandedEditor() {
      if (this.isTextShortened) {
        return this.clearEditorNonExpanded.substring(0, this.maxLengthOfCardText) + "<b>...</b>";
      } else {
        return this.clearEditorNonExpanded;
      }
    },
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
</style>
