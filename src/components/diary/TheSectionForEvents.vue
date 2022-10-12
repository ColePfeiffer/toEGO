<template>
  <BaseSectionForDiary :heightForScrollArea="heightForScrollArea">
    <template v-slot:nameOfTitle>
      {{ getTextForFirstHeadline }}
    </template>
    <!-- Button: Initiate Viewing-Mode -->
    <template v-if="isShowingButtons"
      v-slot:leftSideButton>
      <ButtonForDiarySection v-if="!$store.state.data.eventsOnDiaryPageAreExpanded"
        textColor="white"
        icon="bi-eye"
        label="view"
        :style="$store.state.data.sTextAccentShadow"
        @click-button="expandMore"></ButtonForDiarySection>
      <!-- Button: Leave Viewing-Mode -->
      <ButtonForDiarySection v-else
        textColor="white"
        icon="bi-chevron-left"
        label="back"
        :style="$store.state.data.sTextAccentShadow"
        @click-button="expandLess"></ButtonForDiarySection>
    </template>

    <template v-if="isShowingButtons"
      v-slot:rightSideButton>
      <!-- Button: Create new event -->
      <ButtonForDiarySection textColor="accent"
        icon="bi-plus-lg"
        label="new "
        :style="$store.state.data.sTextAccentShadow"
        @click-button="goToPageNewEventSetToCreationMode" />
    </template>

    <template v-slot:content>
      <TheEventViewer :diaryEntry="diaryEntry"
        :isShowingExpandButtonOfEventCard="isShowingExpandButtonOfEventCard"
        :showMessageIfThereAreNoEvents="false">
      </TheEventViewer>
    </template>
  </BaseSectionForDiary>
</template>


<script>
import BaseSectionForDiary from './Base/BaseSectionForDiary.vue';
import ButtonForDiarySection from './Base/ButtonForDiarySection.vue';
import TheEventViewer from '../common/TheEventViewer.vue';
export default {
  name: "TheSectionForEvents",
  components: {
    BaseSectionForDiary,
    ButtonForDiarySection,
    TheEventViewer
  },
  emits: ["go-to-new-event-in-creation-mode", "set-visibility-of-diarysection"],
  props: {
    isDiarySectionVisible: Boolean,
    diaryEntry: Object,
    // TODO: kann maybe weg? prüfe.
    isShowingExpandButtonOfEventCard: {
      type: Boolean,
      default: true,
    },

  },
  data() {
    return {
      heightForScrollArea: 175,
      size: 350,
    };
  },
  computed: {
    // FIXME: maybe rethink this
    isShowingButtons() {
      if (this.hasEvents || this.isDiarySectionVisible === false) {
        return true;
      } else {
        return false;
      }
    },
    getTextForFirstHeadline() {
      if (this.diaryEntry != undefined) {
        return "EVENTS";
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
    goToPageNewEventSetToCreationMode() {
      this.$emit("go-to-new-event-in-creation-mode");
    },
    expandMore() {
      this.$store.commit("data/setExpandedStatusOfEventsOnDiaryPage", true);
      this.toggleExpansedStatusOfAllEvents(true);
      this.setVisibilityOfDiarySection(false);
      this.heightForScrollArea = 650;
    },
    expandLess() {
      this.$store.commit("data/setExpandedStatusOfEventsOnDiaryPage", false);
      this.heightForScrollArea = 175;
      this.toggleExpansedStatusOfAllEvents(false);
      this.setVisibilityOfDiarySection(true);
    },
    toggleExpansedStatusOfAllEvents(isExpanded) {
      let payload = {
        diaryEntryRef: this.diaryEntry,
        isExpanded: isExpanded,
      };
      this.$store.commit("data/setExpandedStatusOfAllEvents", payload);
    },
    setVisibilityOfDiarySection(newValue) {
      this.$emit("set-visibility-of-diarysection", newValue);
    },
  },

}
</script>

<style scoped>

</style>
