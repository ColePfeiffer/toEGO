<template>
    <DiaryBaseSection>
        <template v-slot:content>
            <TheEventViewer :isNoteTitleColorful="noteTitleRowIsColoredForDiary"
                :borderColorLeft="borderColorLeftForDiary"
                :borderColorRight="borderColorRightForDiary"
                :backgroundColor="backgroundColor"
                :textShadowColor="textShadowColor"
                :diaryEntry="diaryEntry"
                @go-to-event-set-to-creation-mode="goToEventSetToCreationMode"
                @edit-note="goToEventSetToEditingMode"
                :showMessageIfThereAreNoEvents="false">
            </TheEventViewer>
        </template>
    </DiaryBaseSection>
</template>

<script>
import TheEventViewer from "../common/TheEventViewer.vue";
import DiaryBaseSection from "./Base/DiaryBaseSection.vue";
export default {
    name: "TheSectionForNotes",
    components: { TheEventViewer, DiaryBaseSection },
    emits: ["go-to-event-set-to-creation-mode", "go-to-event-set-to-editing-mode"],
    props: {
        diaryEntry: Object,
        backgroundColor: {
            type: String,
            default: "#f5f5f5",
        },
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
        goToEventSetToCreationMode() {
            this.$emit("go-to-event-set-to-creation-mode");
        },
        goToEventSetToEditingMode(eventData) {
            this.$emit("go-to-event-set-to-editing-mode", eventData);
        },
    }
}
</script>