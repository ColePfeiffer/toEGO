<template>
  <DiaryBaseHeader>
    <template v-slot:nameOfTitle>
      {{ getTitle }}
    </template>
    <template v-slot:buttons>
      <!-- Buttons: Left -->
      <div class="row no-wrap">
        <ButtonForDiarySection v-if="$store.state.data.eventsOnDiaryPageAreExpanded || splitterModel >= 10"
          textColor="white"
          icon="bi-eye-slash"
          size="10px"
          label=""
          :style="$store.getters['layout/diarySectionButton']"
          @click-button="hideNotes">
          <template v-slot:tooltip>
            <BaseTooltip text="hide notes"
              :delay="15"></BaseTooltip>
          </template>
        </ButtonForDiarySection>
        <ButtonForDiarySection v-if="hasEvents && splitterModel <= 175"
          textColor="white"
          icon="bi-eye"
          size="10px"
          label=""
          :style="$store.getters['layout/diarySectionButton']"
          @click-button="expandMore">
          <template v-slot:tooltip>
            <BaseTooltip text="show notes"
              :delay="15"></BaseTooltip>
          </template>
        </ButtonForDiarySection>
      </div>
      <!-- Buttons: Right -->
      <div>
        <!-- Button: Create new event -->
        <ButtonForDiarySection textColor="white"
          icon="bi-plus-lg"
          class="q-mr-xs"
          label=""
          :style="$store.getters['layout/diarySectionButton']"
          @click-button="goToEventSetToCreationMode">
          <template v-slot:tooltip>
            <BaseTooltip text="create note"
              :delay="15"></BaseTooltip>
          </template>
        </ButtonForDiarySection>
      </div>
    </template>
  </DiaryBaseHeader>
</template>

<script>
import BaseTooltip from "../ui/BaseTooltip.vue";
import ButtonForDiarySection from "./Base/ButtonForDiarySection.vue";
import DiaryBaseHeader from "./Base/DiaryBaseHeader.vue";

export default {
  name: "TheHeaderForNoteSection",
  components: {
    ButtonForDiarySection,
    BaseTooltip,
    DiaryBaseHeader
  },
  emits: ["go-to-event-set-to-creation-mode", "hide-notes", "show-notes"],
  props: {
    diaryEntry: Object,
    splitterModel: {
      type: Number,
      default: 999,
    }
  },
  data() {
    return {
    };
  },
  computed: {
    notesArray() {
      return this.$store.getters['diaryentries/getNotesAsRevertedArrayByDiaryEntryID'](this.diaryEntry.id);
    },
    numberOfNotes() {
      if (this.notesArray != undefined) {
        return this.notesArray.length
      } else {
        return 0;
      }
    },
    getTitle() {
      if (this.diaryEntry != undefined) {
        if (this.numberOfNotes === 1) {
          return this.numberOfNotes + " NOTE";
        } else {
          return this.numberOfNotes + " NOTES";
        }

      } else {
        return "";
      }
    },
    hasEvents() {
      if (this.diaryEntry != undefined) {
        if (this.numberOfNotes > 0) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    goToEventSetToCreationMode() {
      this.$emit("go-to-event-set-to-creation-mode");
    },
    hideNotes() {
      this.$emit("hide-notes");
      this.$store.commit("diaryentries/setExpandedStatusOfEventsOnDiaryPage", false);
    },
    expandMore() {
      this.$emit("show-notes");
      this.$store.commit("diaryentries/setExpandedStatusOfEventsOnDiaryPage", true);

    },
  },
}
</script>
