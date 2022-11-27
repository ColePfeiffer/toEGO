<template>
  <BaseCard :isTextSetToCentered="false"
    :borderColorLeft="borderColorLeft"
    :borderColorRight="borderColorRight"
    :backgroundColor="backgroundColor">
    <template v-slot:content>
      <!-- Mood, Title, Expand Button -->
      <q-item>
        <q-item-section>
          <div class="row justify-between items-center q-pa-none">
            <div class="col-1 ">
              <q-icon size="22.5px"
                :style="styleForTitleRow"
                :name="currentNote.mood"></q-icon>
            </div>
            <div class="col-10 text-left q-pl-md">
              <q-item-label :style="styleForTitleRow">{{
                  currentNote.title
              }}</q-item-label>
            </div>
            <div class="col-1 text-right ">
              <BaseButtonExpandable v-if="isShowingExpandButton"
                color="secondary"
                style="font-size: 11px"
                dense
                :isNoteExpanded="currentNote.expanded"
                @expand="expand"></BaseButtonExpandable>
              <div v-else></div>
            </div>
          </div>
        </q-item-section>
      </q-item>

      <q-separator />

      <!-- Text, Buttons -->
      <div class="fit"
        :style="styleForNoteContent">
        <!-- Expanded: False -->
        <q-card-section v-if="!currentNote.expanded"
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
                    v-if="currentNote.expanded === true"
                    flat
                    icon="delete"
                    color="secondary"
                    @click="deleteNote"></q-btn>
                  <q-btn class="col"
                    v-if="currentNote.expanded === true"
                    flat
                    icon="edit"
                    color="secondary"
                    @click="editNote"></q-btn>
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
  name: "TheNoteCard",
  components: {
    BaseButtonExpandable,
    BaseCard
  },
  props: {
    currentNote: Object,
    backgroundColor: {
      type: String,
      default: "#f5f5f5",
    },
    borderColorLeft: {
      type: String,
      default: ""
    },
    borderColorRight: {
      type: String,
      default: ""
    },
    isNoteTitleColorful: {
      type: Boolean,
      default: true
    },
    textShadowColor: {
      type: String,
      default: "",
    },
    isShowingExpandButton: {
      type: Boolean,
      default: true
    }
  },
  emits: ["change-note-data", "delete-note", "edit-note"],
  data() {
    return {
      maxLengthOfCardText: 90,
      timeAgoGER: date.formatDate(this.currentNote.date, "HH:mm"),
      timeAgo: date.formatDate(this.currentNote.date, "h:mm A"),
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },

  computed: {
    calculatedTextShadow() {
      if (this.textShadowColor != '') {
        return this.textShadowColor;
      } else {
        return this.$store.state.layout.noteTextShadowColor;
      }
    },
    isTextShortened() {
      if (this.clearEditorNonExpanded.length >= this.maxLengthOfCardText) {
        return true;
      } else {
        return false;
      }
    },
    isDarkModeActive() {
      return this.$store.state.data.userSettings.isDarkModeActive;
    },
    styleForTitleRow() {
      let style = {};
      style["text-shadow"] = "2px 2px 3px " + this.calculatedTextShadow;

      if (this.isDarkModeActive & this.isNoteTitleColorful) {
        style["color"] = this.$store.state.layout.secondary + " !important";
      } else if (this.isDarkModeActive & !this.isNoteTitleColorful) {
        style["color"] = "white !important";
      } else if (!this.isDarkModeActive & !this.isNoteTitleColorful) {
        style["color"] = this.getColorBasedOnBackgroundColor["color"] + " !important";
      } else {
        style["color"] = this.$store.state.layout.secondary + " !important"
      }
      return style;
    },
    getColorBasedOnBackgroundColor() {
      return { "color": this.$store.getters["layout/getColorBasedOnBackgroundColor"](this.backgroundColor) };
    },
    styleForNoteContent() {
      return {
        'width': this.$store.state.layout.innerWidth * 0.87 + "px",
        'min-height': '80px'
      };
    },
    clearEditor() {
      let sanitazedEditor = DOMPurify.sanitize(this.currentNote.editor, { USE_PROFILES: { html: true } }, { FORBID_TAGS: ['style'] }, { FORBID_ATTR: ['style'] });
      return sanitazedEditor;
    },
    clearEditorNonExpanded() {
      let sanitazedEditor = DOMPurify.sanitize(this.currentNote.editor, { ALLOWED_TAGS: ['b', 'i', 'br', 'div'], ALLOWED_ATTR: [] });
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
    deleteNote() {
      this.$emit("delete-note", this.currentNote);
    },
    editNote() {
      this.$emit("edit-note", this.currentNote);
    },
    expand() {
      this.$emit("change-note-data", this.currentNote);
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
