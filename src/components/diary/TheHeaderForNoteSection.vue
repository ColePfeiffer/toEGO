<template>
    <DiaryBaseHeader>
        <template v-slot:nameOfTitle>
            {{ getTitle }}
        </template>
        <template v-slot:buttons>
            <!-- Buttons: Left -->
            <div class="row no-wrap">
                <ButtonForDiarySection v-if="$store.state.data.eventsOnDiaryPageAreExpanded || splitterModel >= 10"
                    textColor="white"
                    icon="bi-chevron-bar-up"
                    size="9.2px"
                    label=""
                    :style="$store.getters['layout/diarySectionButton']"
                    @click-button="hideEvents">
                    <template v-slot:tooltip>
                        <BaseTooltip text="Hide Events"
                            :delay="15"></BaseTooltip>
                    </template>
                </ButtonForDiarySection>
                <ButtonForDiarySection v-if="hasEvents"
                    textColor="white"
                    icon="bi-chevron-bar-down"
                    size="9.2px"
                    label=""
                    :style="$store.getters['layout/diarySectionButton']"
                    @click-button="expandMore">
                    <template v-slot:tooltip>
                        <BaseTooltip text="Show Events"
                            :delay="15"></BaseTooltip>
                    </template>
                </ButtonForDiarySection>
            </div>
            <!-- Buttons: Right -->
            <div>
                <!-- Button: Create new event -->
                <ButtonForDiarySection textColor="white"
                    icon="bi-plus-lg"
                    class="q-mr-xs"
                    label=""
                    :style="$store.getters['layout/diarySectionButton']"
                    @click-button="goToEventSetToCreationMode">
                    <template v-slot:tooltip>
                        <BaseTooltip text="Add new event"
                            :delay="15"></BaseTooltip>
                    </template>
                </ButtonForDiarySection>
            </div>
        </template>
    </DiaryBaseHeader>
</template>

<script>
import BaseTooltip from "../ui/BaseTooltip.vue";
import ButtonForDiarySection from "./Base/ButtonForDiarySection.vue";
import DiaryBaseHeader from "./Base/DiaryBaseHeader.vue";

export default {
    name: "TheHeaderForNoteSection",
    components: {
        ButtonForDiarySection,
        BaseTooltip,
        DiaryBaseHeader
    },
    emits: ["go-to-event-set-to-creation-mode", "go-to-event-set-to-editing-mode", "hide-events", "show-events"],
    props: {
        diaryEntry: Object,
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
        getTitle() {
            if (this.diaryEntry != undefined) {
                if (this.diaryEntry.events.length === 1) {
                    return this.diaryEntry.events.length + " NOTE";
                } else {
                    return this.diaryEntry.events.length + " NOTES";
                }

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
            this.$emit("show-events");
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
