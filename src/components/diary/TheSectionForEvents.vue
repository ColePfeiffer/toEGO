<template>
    <BaseSectionForDiary ref="baseSection"
        :width="width"
        :heightForScrollArea="heightForScrollArea"
        :isShowingLeftButton="isShowingLeftButton"
        :isShowingRightButton="isShowingRightButton"
        @click-left-button="clickLeftButton"
        @click-right-button="clickRightButton">
        <template v-slot:nameOfTitle>
            {{ getTextForFirstHeadline }}
        </template>

        <!-- Button: Initiate Viewing-Mode -->
        <template v-slot:leftSideButton
            :payload="leftButton1"></template>

        <!-- Right Button-->

        <template v-slot:content>
            <TheEventViewer :style="getWidth"
                :diaryEntry="diaryEntry"
                :isShowingExpandButtonOfEventCard="isShowingExpandButtonOfEventCard"
                :showMessageIfThereAreNoEvents="false">
            </TheEventViewer>
        </template>
    </BaseSectionForDiary>


</template>


<script>
import BaseSectionForDiary from './BaseSectionForDiary.vue';
import TheEventViewer from '../common/TheEventViewer.vue';
export default {
    name: "TheSectionForEvents",
    components: {
        BaseSectionForDiary,
        TheEventViewer
    },
    emits: [],
    props: {
        //isDiarySectionVisible: Boolean,
        diaryEntry: Object,
        width: {
            type: Number,
            default: 350,
        },
        // TODO: kann maybe weg? prüfe.
        isShowingExpandButtonOfEventCard: {
            type: Boolean,
            default: true,
        },

    },
    data() {
        return {
            leftButton1: {
                textColor: "white",
                icon: "bi-eye",
                label: "view",
                style: this.$store.state.data.sTextAccentShadow
            },
            /*
             <template v-slot:rightSideButton
            :textColor="'accent'"
            :icon="'bi-plus-lg'"
            :label="'new '"
            :style="$store.state.data.sTextAccentShadow">
        </template> */
            heightForScrollArea: 175,
        };
    },
    computed: {
        getTextForFirstHeadline() {
            if (this.diaryEntry != undefined) {
                return "EVENTS";
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
        // TODO: 
        isShowingLeftButton() {
            return true
        },
        // TODO: 
        isShowingRightButton() {
            return true
        }
    },
    methods: {
        clickLeftButton(buttonName) {
            this.$emit("click-left-button", buttonName);
        },
        clickRightButton(buttonName) {
            this.$emit("click-right-button", buttonName);
        }
    },

}
</script>
    
<style scoped>

</style>
    