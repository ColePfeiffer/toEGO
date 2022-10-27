<template>
  <BasePage titleOfPage="Today's notes"
    :mode="getHomeMode"
    :backgroundColor="$store.getters['layout/getHomeBackgroundColor']">
    <template v-slot:title-bar-icon>
      <div style="padding: 4px">
        <q-icon name="bi-eye"
          size="19px" />
      </div>
    </template>
    <template v-slot:title-bar-controls>
      <div class="row justify-between items-center q-pr-sm">
        <BaseButtonForTitleBar class="q-ml-xs q-mr-xs no-box-shadow "
          icon="bi-plus-lg"
          @click-button="goToEventSetToCreationMode">
          <template v-slot:tooltip>
            <BaseTooltip text="Add new event"
              :delay="15"></BaseTooltip>
          </template>
        </BaseButtonForTitleBar>
        <BaseButtonForTitleBar class="q-ml-xs no-box-shadow "
          :icon="getLetterIcon"
          @click-button="toggleLetterVisibility">
          <template v-slot:tooltip>
            <BaseTooltip text="Message to myself"
              :delay="15"></BaseTooltip>
          </template>
        </BaseButtonForTitleBar>
      </div>
    </template>
    <template v-slot:content>
      <div>
        <MessageToMyself v-if="isLetterVisible"
          class="q-px-md "
          @hide-message="isLetterVisible = false"></MessageToMyself>
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
import MessageToMyself from "src/components/home/MessageToMyself.vue";
import TheEventViewer from "src/components/common/TheEventViewer.vue";
import BasePage from "src/components/ui/BasePage.vue";
import BaseButtonForTitleBar from "src/components/ui/BaseButtonForTitleBar.vue";
import BaseTooltip from "src/components/ui/BaseTooltip.vue";

export default {
  data() {
    return {
      isLetterVisible: false,
    };
  },
  components: {
    MessageToMyself,
    TheEventViewer,
    BasePage,
    BaseButtonForTitleBar,
    BaseTooltip
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
    getHomeMode() {
      return this.$store.state.layout.homeMode;
    },
  },
};
</script>

<style scoped>
.test2 {
  background: red;
}
</style>
