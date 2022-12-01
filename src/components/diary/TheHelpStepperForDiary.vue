<template>
    <BaseStepper :step="step"
        :numberOfSteps="numberOfSteps"
        @go-step-forward="goStepForward"
        @go-step-backward="goStepBackward"
        @finish="finish">
        <template v-slot:steps>
            <q-step :name="1"
                title="Diary"
                dense
                color="secondary"
                class="q-pa-none q-ma-none"
                icon="bi-eye"
                :done="getDoneFor(1)">
            </q-step>
            <q-step :name="2"
                title="Editor Buttons"
                icon="bi-plus-lg"
                :done="getDoneFor(2)">
            </q-step>
            <q-step :name="3"
                title="Writing a diary entry"
                caption="What to write about?"
                icon="bi-plus-lg"
                :done="getDoneFor(3)">
            </q-step>
            <q-step :name="4"
                title="Navigating your diary"
                caption="Titlebar's Buttons"
                icon="bi-sticky"
                :done="getDoneFor(4)">
            </q-step>


        </template>
        <template v-slot:step-content>
            <!-- Step 1 -->
            <div class="col-12 "
                style="margin-top: 30px"
                v-if="step === 1">
                <div class="text-justify">
                    This is where you can look through your diary, where you get to plan and review.
                </div>
                <div class="q-mt-md"> I will explain the buttons. You can start writing by clicking on
                    <q-btn size="12px"
                        padding="4px"
                        round
                        dense
                        disable
                        unelevated
                        color="transparent"
                        text-color="accent"
                        icon="bi-journal-plus"
                        class="text-accent q-mr-sm"></q-btn>
                </div>
            </div>
            <!-- Step 2 -->
            <div class="col-12"
                style="margin-top: 30px"
                v-else-if="step === 2">
                <div>
                    <q-btn size="8px"
                        padding="4px"
                        round
                        disable
                        unelevated
                        color="whitesmoke"
                        icon="bi-plus-lg"
                        class="text-black q-mr-sm"></q-btn> shows tools to style text
                    <br />
                    <q-btn size="8px"
                        padding="4px"
                        round
                        disable
                        unelevated
                        color="whitesmoke"
                        icon="bi-fullscreen"
                        class="text-black q-mr-sm"></q-btn> Fullscreen
                    <br />
                    <q-btn size="8px"
                        padding="4px"
                        round
                        disable
                        unelevated
                        color="whitesmoke"
                        icon="bi-file-earmark-font"
                        class="text-black q-mr-sm"></q-btn> opens the Template-Manager
                </div>

            </div>
            <!-- Step 3 -->
            <div class="col-12 "
                v-else-if="step === 3">
                <div>
                    <p>
                        Notes you create during the day will show up in your diary.<br>
                    <ul style="list-style: none">
                        <li class="list-item">
                            You could read through them again, and reflect.
                        </li>
                        <li class="list-item">
                            Or you could answer a couple of questions from a template.
                        </li>
                        <li class="list-item">
                            Or write about anything you want.
                        </li>
                    </ul>
                    </p>
                </div>
            </div>
            <!-- Step 4 -->
            <div class="col-12 q-px-md q-pb-md"
                style="margin-top: 20px"
                v-else-if="step === 4">
                <div class="q-mt-md">

                    <q-btn size="8px"
                        padding="4px"
                        disable
                        round
                        unelevated
                        color="secondary"
                        icon="bi-chevron-left"
                        class="text-white q-mr-sm"></q-btn>
                    <q-btn size="8px"
                        padding="4px"
                        disable
                        round
                        unelevated
                        color="secondary"
                        icon="bi-chevron-right"
                        class="text-white q-mr-sm"></q-btn>

                    <span :style="getStyleForEmphasisedTextSecondary">navigates</span> between days
                    <br />

                    <q-btn size="8px"
                        padding="4px"
                        round
                        disable
                        unelevated
                        color="secondary"
                        icon="bi-calendar-event"
                        class="text-white q-mr-sm"></q-btn> opens the <span
                        :style="getStyleForEmphasisedTextSecondary">calendar</span>
                    <br />
                    <q-btn size="8px"
                        padding="4px"
                        round
                        unelevated
                        disable
                        color="secondary"
                        icon="bi-dot"
                        class="text-white q-mr-sm"></q-btn> brings you back to <span
                        :style="getStyleForEmphasisedTextSecondary">today</span>
                </div>
            </div>

        </template>
    </BaseStepper>
</template>

<script>
import BaseStepper from "../common/BaseStepper.vue"
export default {
    name: "TheHelpStepperForHome",
    emits: ["finish"],
    components: { BaseStepper },
    data() {
        return {
            step: 1,
            numberOfSteps: 4,
        }
    },
    methods: {
        getDoneFor(stepNumber) {
            if (this.step <= stepNumber) {
                return false;
            } else {
                return true;
            }
        },
        goStepForward() {
            this.step = this.step + 1;
        },
        goStepBackward() {
            this.step = this.step - 1;
        },
        finish() {
            this.$emit("finish");
        }
    },
    computed: {
        getStyleForEmphasisedText() {
            let style = {};
            //style["color"] = 
            style["background-color"] = this.$store.state.layout.accent + this.$store.state.layout.lowOpacity;
            //style["text-shadow"] = this.$store.state.layout.secondary + this.$store.state.layout.lowOpacity + " 2px 2px 2px"
            return style;
        },
        getStyleForEmphasisedTextSecondary() {
            let style = {};
            //style["color"] = 
            style["background-color"] = this.$store.state.layout.secondary + this.$store.state.layout.lowOpacity;
            //style["text-shadow"] = this.$store.state.layout.secondary + this.$store.state.layout.lowOpacity + " 2px 2px 2px"
            return style;
        },
    }
};
</script>

<style lang="sass">
.list-item
    margin-bottom: 6px

</style>