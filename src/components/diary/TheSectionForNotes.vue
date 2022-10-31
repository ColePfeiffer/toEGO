<template>
    <DiaryBaseSection>
        <template v-slot:content>
            <TheEventViewer :backgroundColor="backgroundColor"
                :diaryEntry="diaryEntry"
                @go-to-event-set-to-creation-mode="goToEventSetToCreationMode"
                @go-to-event-set-to-editing-mode="goToEventSetToEditingMode"
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