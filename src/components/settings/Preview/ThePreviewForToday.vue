<template>
    <BasePreview :layoutMode="layoutMode"
        :heightForContentMultiplier="0.2"
        titleOfPage="Today's notes"
        :backgroundColor="backgroundColor">
        <template v-slot:content>
            <div class="row justify-center items-center text-center ">
                <!-- today, yesterday, x days ago, x days ahead... -->
                <EventCard class="col-10 q-ma-md event-card"
                    :style="styleForPreviewEventCard"
                    :borderColorLeft="borderColorLeft"
                    :borderColorRight="borderColorRight"
                    :isNoteTitleColorful="isNoteTitleColorful"
                    :backgroundColor="noteBackgroundColor"
                    :textShadowColor="textShadowColor"
                    :currentNote="$store.state.data.notePreview" />
            </div>
        </template>

    </BasePreview>
</template>

<script>
import BasePreview from "../Base/BasePreview.vue";
import EventCard from "../../common/TheNoteCard.vue";

export default {
    name: "ThePreviewForToday",
    components: { BasePreview, EventCard },
    props: {
        layoutMode: String,
        backgroundColor: String,
        isNoteTitleColorful: Boolean,
        noteBackgroundColor: String,
        borderColorLeft: String,
        borderColorRight: String,
        textShadowColor: String,
    },
    data() {
        return {
        };
    },
    methods: {
    },
    computed: {
        styleForPreviewEventCard() {
            return {
                "font-size": "10.5px",
                "font-family": this.$store.state.layout.defaultFont
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