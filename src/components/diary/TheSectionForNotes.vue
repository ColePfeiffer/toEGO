<template>
  <DiaryBaseSection>
    <template v-slot:content>
      <TheNoteViewer :isNoteTitleColorful="noteTitleRowIsColoredForDiary"
        :borderColorLeft="borderColorLeftForDiary"
        :borderColorRight="borderColorRightForDiary"
        :backgroundColor="backgroundColor"
        :textShadowColor="textShadowColor"
        :diaryEntry="diaryEntry"
        :isShowingExpandButton="isShowingExpandButton"
        @go-to-note-set-to-creation-mode="goToNoteSetToCreationMode"
        @edit-note="editNote"
        :showMessageIfThereAreNoEvents="false">
      </TheNoteViewer>
    </template>
  </DiaryBaseSection>
</template>

<script>
import TheNoteViewer from "../common/TheNoteViewer.vue";
import DiaryBaseSection from "./Base/DiaryBaseSection.vue";
export default {
  name: "TheSectionForNotes",
  components: { TheNoteViewer, DiaryBaseSection },
  emits: ["go-to-note-set-to-creation-mode", "edit-note"],
  props: {
    diaryEntry: Object,
    backgroundColor: {
      type: String,
      default: "#f5f5f5",
    },
    isShowingExpandButton: Boolean,
  },
  computed: {
    isUsingSameStyleAsHome() {
      return this.$store.state.layout.isDiaryInputStyleSetToTodaysNotes;
    },
    textShadowColor() {
      if (this.isUsingSameStyleAsHome) {
        return this.$store.state.layout.noteTextShadowColorForHome;
      } else {
        return this.$store.state.layout.noteTextShadowColorForDiary;
      }
    },
    noteTitleRowIsColoredForDiary() {
      if (this.isUsingSameStyleAsHome) {
        return this.$store.state.layout.noteTitleRowIsColored;
      } else {
        return this.$store.state.layout.noteTitleRowIsColoredForDiary;
      }
    },
    borderColorLeftForDiary() {
      if (this.isUsingSameStyleAsHome) {
        return this.$store.state.layout.borderColorLeft;
      } else {
        return this.$store.state.layout.borderColorLeftForDiary;
      }
    },
    borderColorRightForDiary() {
      if (this.isUsingSameStyleAsHome) {
        return this.$store.state.layout.borderColorRight;
      } else {
        return this.$store.state.layout.borderColorRightForDiary;
      }
    }
  },
  methods: {
    goToNoteSetToCreationMode() {
      this.$emit("go-to-note-set-to-creation-mode");
    },
    editNote(note) {
      this.$emit("edit-note", note);
    },
  }
}
</script>
