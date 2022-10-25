<template>
  <BaseSectionForDiary>
    <template v-slot:nameOfTitle>
      {{ getTextForFirstHeadline }}
    </template>
    <!-- Button: Initiate Viewing-Mode -->
    <template v-slot:leftSideButton>
      <ButtonForDiarySection v-if="$store.state.data.eventsOnDiaryPageAreExpanded || splitterModel >= 9"
        textColor="white"
        icon="bi-eye-slash"
        label="view"
        :style="$store.state.layout.sTextAccentShadow"
        @click-button="hideEvents">
        <template v-slot:tooltip>
          <BaseTooltip text="Hide Events"
            :delay="15"></BaseTooltip>
        </template>
      </ButtonForDiarySection>
      <ButtonForDiarySection v-if="!$store.state.data.eventsOnDiaryPageAreExpanded && hasEvents"
        textColor="white"
        icon="bi-eye-fill"
        label="view"
        :style="$store.state.layout.sTextAccentShadow"
        @click-button="expandMore">
        <template v-slot:tooltip>
          <BaseTooltip text="Show Events"
            :delay="15"></BaseTooltip>
        </template>
      </ButtonForDiarySection>
    </template>

    <template v-slot:rightSideButton>
      <!-- Button: Create new event -->
      <ButtonForDiarySection textColor="white"
        icon="bi-plus-lg"
        class="q-mr-xs"
        label="new "
        :style="$store.state.layout.sTextAccentShadow"
        @click-button="goToEventSetToCreationMode">
        <template v-slot:tooltip>
          <BaseTooltip text="Add new event"
            :delay="15"></BaseTooltip>
        </template>
      </ButtonForDiarySection>
    </template>

    <template v-slot:content>
      <TheEventViewer :backgroundColor="backgroundColor"
        :diaryEntry="diaryEntry"
        @go-to-event-set-to-creation-mode="goToEventSetToCreationMode"
        @go-to-event-set-to-editing-mode="goToEventSetToEditingMode"
        :showMessageIfThereAreNoEvents="false">
      </TheEventViewer>
    </template>
  </BaseSectionForDiary>
</template>


<script>
import BaseSectionForDiary from './Base/BaseSectionForDiary.vue';
import ButtonForDiarySection from './Base/ButtonForDiarySection.vue';
import TheEventViewer from '../common/TheEventViewer.vue';
import BaseTooltip from "../ui/BaseTooltip.vue"
export default {
  name: "TheSectionForEvents",
  components: {
    BaseSectionForDiary,
    ButtonForDiarySection,
    TheEventViewer,
    BaseTooltip
  },
  emits: ["go-to-event-set-to-creation-mode", "go-to-event-set-to-editing-mode", "hide-events"],
  props: {
    isDiarySectionVisible: Boolean,
    diaryEntry: Object,
    backgroundColor: {
      type: String,
      default: "#f5f5f5",
    },
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
    getTextForFirstHeadline() {
      if (this.diaryEntry != undefined) {
        return this.diaryEntry.events.length + " EVENTS";
      } else {
        return "";
      }
    },
    hasEvents() {
      if (this.diaryEntry != undefined) {
        if (this.diaryEntry.events.length > 0) {
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
    goToEventSetToEditingMode(eventData) {
      this.$emit("go-to-event-set-to-editing-mode", eventData);
    },
    hideEvents() {
      this.expandLess();
      this.$emit("hide-events");
    },
    expandMore() {
      this.$store.commit("data/setExpandedStatusOfEventsOnDiaryPage", true);
      this.toggleExpansedStatusOfAllEvents(true);
    },
    expandLess() {
      this.$store.commit("data/setExpandedStatusOfEventsOnDiaryPage", false);
      this.toggleExpansedStatusOfAllEvents(false);
    },
    toggleExpansedStatusOfAllEvents(isExpanded) {
      let payload = {
        diaryEntryRef: this.diaryEntry,
        isExpanded: isExpanded,
      };
      this.$store.commit("data/setExpandedStatusOfAllEvents", payload);
    },
  },

}
</script>
