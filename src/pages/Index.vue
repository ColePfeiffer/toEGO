<template>
  <BasePage titleOfPage="Today"
    :mode="getModeForHome"
    :backgroundColor="getBackgroundColor">
    <template v-slot:title-bar-icon>
      <q-icon name="bi-eye"
        size="22px" />
    </template>
    <template v-slot:title-bar-controls>
      <div class="row justify-between items-center q-pr-sm">
        <BaseButtonForTitleBar class="q-ml-xs  no-box-shadow "
          :icon="getLetterIcon"
          @click-button="toggleLetterVisibility">
        </BaseButtonForTitleBar>
      </div>
    </template>
    <template v-slot:content>
      <div>
        <TheHeader v-if="isLetterVisible"
          class="q-px-md "></TheHeader>
        <TheEventViewer :diaryEntry="getDiaryEntry"
          :marginBottom="22"
          @goToEventSetToCreationMode="goToEventSetToCreationMode"
          @goToEventSetToEditingMode="goToEventSetToEditingMode"
          class="q-px-md q-pt-md "></TheEventViewer>
      </div>
    </template>
  </BasePage>
</template>


<script>
import TheHeader from "src/components/home/TheHeader.vue";
import TheEventViewer from "src/components/common/TheEventViewer.vue";
import BasePage from "src/components/ui/BasePage.vue";
import BaseButtonForTitleBar from "src/components/ui/BaseButtonForTitleBar.vue";


export default {
  data() {
    return {
      isLetterVisible: false,
    };
  },
  components: {
    TheHeader,
    TheEventViewer,
    BasePage,
    BaseButtonForTitleBar
  },
  methods: {
    toggleLetterVisibility() {
      this.isLetterVisible = !this.isLetterVisible;
    },
    goToEventSetToCreationMode() {
      this.$store.commit("data/setModeForNewEvent", "CREATE");
      this.$router.push("Event");
    },
    // TODO: angucken!
    goToEventSetToEditingMode(eventData) {
      let diaryEntryRefWhereEventIsStoredAt = this.$store.getters[
        "data/getDiaryEntryByDate"
      ](eventData.createdOn);

      this.$store.commit("data/updateEventData", {
        eventData: eventData,
        diaryEntryRef: diaryEntryRefWhereEventIsStoredAt,
      });

      this.$store.commit("data/setModeForNewEvent", "EDIT");
      this.$router.push("Event");
    },
  },
  computed: {
    // get diary entry for today
    getDiaryEntry() {
      let diaryEntryRefForDate = this.$store.getters[
        "data/getDiaryEntryByDate"
      ](new Date());
      return diaryEntryRefForDate;
    },
    getLetterIcon() {
      if (this.isLetterVisible) {
        return 'bi-envelope-open'
      } else {
        return "bi-envelope"
      }
    },
    getModeForHome() {
      return this.$store.state.layout.modeForHome;
    },
    getBackgroundColor() {
      return this.$store.state.layout.backgroundColorForHome;
    }
  },
};
</script>

<style scoped>
.test2 {
  background: red;
}
</style>
