<template>
    <BasePreview :layoutMode="layoutMode"
        style="height: 340px"
        :heightForContentMultiplier="0.15"
        titleOfPage="Diary"
        :backgroundColor="backgroundColor">

        <template v-slot:titlebar>
            <TheToolbarForDiary :isDiaryTitlebarShowingDay="isDiaryTitlebarShowingDay"
                viewingMode="view"
                :getNumberOfDaysAwayFromToday="0"
                dateForLabel="November 5th, 2022">
            </TheToolbarForDiary>
        </template>

        <template v-slot:content>
            <div class="row justify-center items-center text-center ">
                <TheDiaryDayCounter class="col-10"
                    day="today"
                    dateForSubtitle="November 5th, 2022"
                    :diaryMode="layoutMode"
                    :style="styleForDiaryDayCounterPreview"
                    dateFontSize="11px"
                    dayCounterFontSize="10px"></TheDiaryDayCounter>
                <div class="col-10"
                    :style="styleForHeader">
                    <div class="row justify-between">
                        <div class="col-6 text-left text-white"
                            :style="$store.getters['layout/diarySectionButton']">1 NOTE</div>
                        <ButtonForDiarySection textColor="white"
                            icon="bi-plus-lg"
                            class="q-mr-xs col-3"
                            label=""
                            :style="$store.getters['layout/diarySectionButton']">
                        </ButtonForDiarySection>
                    </div>
                </div>
                <EventCard class="col-10 q-ma-md event-card"
                    :style="styleForPreviewBaseCardDiary"
                    :backgroundColor="cardBackground"
                    :borderColorLeft="borderColorLeft"
                    :borderColorRight="borderColorRight"
                    :isNoteTitleColorful="isNoteTitleColorful"
                    :textShadowColor="textShadowColor"
                    :currentNote="$store.state.data.notePreview" />
                <div class="col-10"
                    style="margin-bottom: 5px">
                    <div class="row justify-between">
                        <div class="col-6 text-left text-white"
                            :style="$store.getters['layout/diarySectionButton']">DIARY</div>
                        <ButtonForDiarySection textColor="white"
                            icon="bi-eye"
                            class="q-mr-xs col-3"
                            label=""
                            :style="$store.getters['layout/diarySectionButton']">
                        </ButtonForDiarySection>
                    </div>
                </div>
                <BaseCard class="col-10 q-ma-md "
                    :isTextSetToCentered="false"
                    :backgroundColor="cardBackground"
                    :borderColorLeft="borderColorLeft"
                    :borderColorRight="borderColorRight"
                    :style="styleForPreviewBaseCardDiary">
                    <template v-slot:content>
                        <div class="q-pa-sm"
                            style="font-size: 10.5px">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                            invidunt.
                        </div>
                    </template>
                </BaseCard>
            </div>
        </template>
    </BasePreview>
</template>

<script>
import BasePreview from "./BasePreview.vue";
import EventCard from "../common/TheNoteCard.vue";
import TheToolbarForDiary from "../diary/TheToolbarForDiary.vue";
import TheDiaryDayCounter from "../diary/TheDiaryDayCounter.vue";
import ButtonForDiarySection from "../diary/Base/ButtonForDiarySection.vue";
import BaseCard from "../ui/BaseCard.vue";

export default {
    name: "ThePreviewForToday",
    components: { BasePreview, BaseCard, EventCard, TheToolbarForDiary, TheDiaryDayCounter, ButtonForDiarySection },
    props: {
        layoutMode: String,
        backgroundColor: String,
        isDiaryTitlebarShowingDay: Boolean,
        cardBackground: String,
        borderColorLeft: String,
        borderColorRight: String,
        textShadowColor: String,
        isNoteTitleColorful: Boolean,
    },
    data() {
        return {
        };
    },
    computed: {
        styleForHeader() {
            if (this.layoutMode != 'transparent') {
                return {
                    "margin-top": "10px",
                    "margin-bottom": "5px"
                };
            } else {
                return { "margin-bottom": "5px" };
            }
        },
        styleForDiaryDayCounterPreview() {
            return { "font-family": this.$store.state.layout.defaultFont };
        },
        styleForPreviewBaseCardDiary() {
            return {
                "font-size": "10.5px",
                "font-family": this.$store.state.layout.defaultFont,
                "margin-left": "0px",
                "margin-right": "0px",
                "margin-top": "0px"

            };
        },
    },
};
</script>

<style scoped>
.event-card {
    max-height: 110px !important;
}
</style>