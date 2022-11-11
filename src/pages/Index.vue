

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
        <TheEventViewer :isNoteTitleColorful="isNoteTitleColorful"
          :borderColorLeft="borderColorLeft"
          :borderColorRight="borderColorRight"
          :textShadowColor="textShadowColor"
          :diaryEntry="getDiaryEntry"
          :marginBottom="22"
          :backgroundColor="noteBackgroundColor"
          @goToEventSetToCreationMode="goToEventSetToCreationMode"
          @edit-note="goToEventSetToEditingMode"
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
    goToEventSetToEditingMode(note) {
      let diaryEntryRefWhereEventIsStoredAt = this.$store.getters[
        "diaryentries/getDiaryEntryByDate"
      ](note.date);

      this.$store.commit("diaryentries/updateCurrentNote", {
        note: note,
        diaryEntry: diaryEntryRefWhereEventIsStoredAt,
      });

      this.$store.commit("data/setModeForNewEvent", "EDIT");
      this.$router.push("Event");
    },
  },
  computed: {
    borderColorLeft() {
      return this.$store.state.layout.borderColorLeft;
    },
    textShadowColor() {
      return this.$store.state.layout.noteTextShadowColorForHome;
    },
    borderColorRight() {
      return this.$store.state.layout.borderColorRight;
    },
    isNoteTitleColorful() {
      return this.$store.state.layout.noteTitleRowIsColored;
    },
    noteBackgroundColor() {
      return this.$store.state.layout.noteBackgroundColor;
    },
    // get diary entry for today
    getDiaryEntry() {
      let diaryEntryRefForDate = this.$store.getters[
        "diaryentries/getDiaryEntryByDate"
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
