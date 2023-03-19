

<template>
  <div>
    <BaseGhostHelper v-if="(!$store.state.data.userSettings.hasFinishedHelpForHomeForTheFirstTime)"
      :messages="messages"
      :numberOfMessages="numberOfMessages"
      @show-next="showNext"
      @show-last="showLast"
      @finish="finish"></BaseGhostHelper>
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
            :style="styleForButtonCreateNote"
            @click-button="goToNoteSetToCreationMode">
            <template v-slot:tooltip>
              <BaseTooltip text="create note"
                :delay="15"></BaseTooltip>
            </template>
          </BaseButtonForTitleBar>
          <BaseButtonForTitleBar class="q-ml-xs no-box-shadow "
            :style="styleForButtonMessageToMyself"
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
          <TheNoteViewer :isNoteTitleColorful="isNoteTitleColorful"
            :borderColorLeft="borderColorLeft"
            :borderColorRight="borderColorRight"
            :textShadowColor="textShadowColor"
            :diaryEntry="getDiaryEntry"
            :marginBottom="22"
            :backgroundColor="noteBackgroundColor"
            @goToNoteSetToCreationMode="goToNoteSetToCreationMode"
            @edit-note="goToNoteSetToEditingMode"
            class="q-px-md q-pt-md "></TheNoteViewer>

        </div>
      </template>
    </BasePage>
  </div>
</template>


<script>
import MessageToMyself from "src/components/Today/MessageToMyself.vue";
import TheNoteViewer from "src/components/common/TheNoteViewer.vue";
import BasePage from "src/components/common/BasePage.vue";
import BaseButtonForTitleBar from "src/components/common/BaseButtonForTitleBar.vue";
import BaseTooltip from "src/components/common/BaseTooltip.vue";
import BaseGhostHelper from "src/components/Helper/BaseGhostHelper.vue";

export default {
  data() {
    return {
      messages: [" "],
      numberOfMessages: 5,
      isButtonMessageToMyselfHighlighted: false,
      isButtonCreateNoteHighlighted: false,
    };
  },
  components: {
    MessageToMyself,
    TheNoteViewer,
    BasePage,
    BaseButtonForTitleBar,
    BaseTooltip,
    BaseGhostHelper
  },
  watch: {
    currentRouterPath(newPath) {
      if (this.getDiaryEntry != undefined) {
        let notesAsArray = this.$store.getters['diaryentries/getNotesAsRevertedArrayByDiaryEntryID'](this.getDiaryEntry.id);
        if (notesAsArray != undefined) {
          notesAsArray.forEach(note => {
            if (note.expanded) {
              let payload = { diaryEntryID: this.getDiaryEntry.id, noteID: note.id, toggle: false };
              this.$store.commit("diaryentries/setExpanded", payload);
            }
          });
        }

      }
    },
  },
  methods: {
    finish() {
      this.messages = [" "];
      if (!this.$store.state.data.userSettings.hasFinishedHelpForHomeForTheFirstTime) {
        this.$store.dispatch("data/setHelpForHomeToCompleted", true);
      }
    },
    showNext(index) {
      if (index === 1) {
        this.messages = [];
        this.messages.push("Hi there! This diary app will help you with introspection. I will tell you how.");
      } else if (index === 2) {
        this.messages.push("Notes are used to keep track of your experiences, your thoughts, your emotions, worries, ideas and goals.");
      } else if (index === 3) {
        this.isButtonCreateNoteHighlighted = true;
        this.messages.push("Create a note by clicking the highlighted button.");
      } else if (index === 4) {
        this.isButtonCreateNoteHighlighted = false;
        this.isButtonMessageToMyselfHighlighted = true;
        this.messages.push("Have you spotted the little envelope? There you can leave messages for yourself. I'm using it for writing down a goal or an important task. Other times I will write a positive reminder for myself.");
      } else if (index === 5) {
        this.isButtonMessageToMyselfHighlighted = false;
        this.messages.push("P.S. You can change the look of the app in Options! If you want to see this again, click on the plus below and select 'show help'.");
      } else {
        this.messages = [" "];
      }
    },
    showLast() {
      this.messages.pop();
      if (this.messages.length === 3) {
        this.isButtonCreateNoteHighlighted = true;
        this.isButtonMessageToMyselfHighlighted = false;
      } else if (this.messages.length === 4) {
        this.isButtonCreateNoteHighlighted = false;
        this.isButtonMessageToMyselfHighlighted = true;
      } else {
        this.isButtonMessageToMyselfHighlighted = false;
        this.isButtonCreateNoteHighlighted = false;
      }
    },
    toggleMessageVisibility() {
      this.$store.commit("data/setPlusFabButtonOpened", false);
      this.$store.dispatch("data/firebaseToggleMessageVisibility");
    },
    goToNoteSetToCreationMode() {
      this.$store.commit("data/setModeForNewEvent", "CREATE");
      this.$router.push("Event");
    },
    goToNoteSetToEditingMode(note) {
      this.$store.commit("diaryentries/updateCurrentNoteForEditing", note);
      this.$store.commit("data/setModeForNewEvent", "EDIT");
      this.$router.push("Event");
    },
  },
  computed: {
    styleForButtonMessageToMyself() {
      if (this.isButtonMessageToMyselfHighlighted === true) {
        return {
          "background-color": "var(--q-accent) !important",
          "border-radius": "9px !important"
        };
      } else {
        return { 'background-color': "transparent !important" }
      }
    },
    styleForButtonCreateNote() {
      if (this.isButtonCreateNoteHighlighted === true) {
        return {
          "background-color": "var(--q-accent) !important",
          "border-radius": "9px !important"
        };
      } else {
        return { 'background-color': "transparent !important" }
      }
    },
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
