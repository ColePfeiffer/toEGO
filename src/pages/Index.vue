

<template>
  <BasePage titleOfPage="Today's notes"
    :mode="getLayoutModeForHome"
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
            <BaseTooltip text="create note"
              :delay="15"></BaseTooltip>
          </template>
        </BaseButtonForTitleBar>
        <BaseButtonForTitleBar class="q-ml-xs no-box-shadow "
          :icon="getLetterIcon"
          @click-button="toggleMessageVisibility">
          <template v-slot:tooltip>
            <BaseTooltip text="Message to myself"
              :delay="15"></BaseTooltip>
          </template>
        </BaseButtonForTitleBar>
      </div>
    </template>
    <template v-slot:content>
      <div>
        <MessageToMyself v-if="isMessageShown"
          class="q-px-md "
          @hide-message="toggleMessageVisibility"></MessageToMyself>
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
    };
  },
  components: {
    MessageToMyself,
    TheEventViewer,
    BasePage,
    BaseButtonForTitleBar,
    BaseTooltip
  },
  watch: {
    currentRouterPath(newPath) {
      console.log("currentRouterPath", this.currentRouterPath);
      if (this.getDiaryEntry != undefined) {
        this.$store.getters['diaryentries/getNotesAsRevertedArrayByDiaryEntryID'](this.getDiaryEntry.id).forEach(note => {
          console.log("note: ", note);
          if (note.expanded) {
            console.log("is expanded");
            let payload = { diaryEntryID: this.getDiaryEntry.id, noteID: note.id, toggle: false };
            this.$store.commit("diaryentries/setExpanded", payload);
          }
        });
      }
    },
  },
  methods: {
    toggleMessageVisibility() {
      this.$store.commit("data/setPlusFabButtonOpened", false);
      this.$store.dispatch("data/firebaseToggleMessageVisibility");
    },
    goToEventSetToCreationMode() {
      this.$store.commit("data/setModeForNewEvent", "CREATE");
      this.$router.push("Event");
    },
    goToEventSetToEditingMode(note) {
      this.$store.commit("diaryentries/updateCurrentNoteForEditing", note);
      this.$store.commit("data/setModeForNewEvent", "EDIT");
      this.$router.push("Event");
      /* OLD
     let diaryEntryRefWhereEventIsStoredAt = this.$store.getters[
        "diaryentries/getDiaryEntryByDate"
      ](note.date);

      this.$store.commit("diaryentries/updateCurrentNote", {
        note: note,
        diaryEntry: diaryEntryRefWhereEventIsStoredAt,
      });

      this.$store.commit("data/setModeForNewEvent", "EDIT");
      this.$router.push("Event");
      */
    },
  },
  computed: {
    currentRouterPath() {
      return this.$route.path;
    },
    isMessageShown() {
      return this.$store.state.data.userSettings.isMessageShown;
    },
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
      if (this.isMessageShown) {
        return 'bi-envelope-open'
      } else {
        return "bi-envelope"
      }
    },
    getLayoutModeForHome() {
      return this.$store.state.layout.homeLayoutMode;
    },
  },
};
</script>

<style scoped>
.test2 {
  background: red;
}
</style>
