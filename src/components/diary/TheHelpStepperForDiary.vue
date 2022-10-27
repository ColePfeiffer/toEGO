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
                title="Writing a diary entry"
                caption="Part 1"
                icon="bi-plus-lg"
                :done="getDoneFor(2)">
            </q-step>
            <q-step :name="3"
                title="Writing a diary entry"
                caption="Part 2"
                icon="bi-plus-lg"
                :done="getDoneFor(3)">
            </q-step>
            <q-step :name="4"
                title="Navigating your diary"
                icon="bi-sticky"
                :done="getDoneFor(4)">
            </q-step>


        </template>
        <template v-slot:step-content>
            <!-- Step 1 -->
            <div class="col-12 q-px-md q-pb-md"
                v-if="step === 1">
                <div class="text-justify">
                    This is where you can look through your diary, where you get to plan and review.
                </div>
                <div class="q-mt-md">
                    You can start writing via
                    <q-btn size="12px"
                        padding="4px"
                        round
                        dense
                        unelevated
                        color="transparent"
                        text-color="accent"
                        icon="bi-journal-plus"
                        class="text-accent q-mr-sm"></q-btn>
                </div>
            </div>
            <!-- Step 2 -->
            <div class="col-12 q-px-md q-pb-md"
                v-else-if="step === 2">
                <div>
                    <span style="font-size: 14px; font-weight: 600;">Buttons</span>
                    <ul style="list-style: none">
                        <li class="list-item">
                            <q-btn size="10px"
                                padding="4px"
                                round
                                unelevated
                                color="whitesmoke"
                                icon="undo"
                                class="text-black q-mr-sm"></q-btn>
                            <q-btn size="10px"
                                padding="4px"
                                round
                                unelevated
                                color="whitesmoke"
                                icon="redo"
                                class="text-black q-mr-sm"></q-btn>

                            undo and redo
                        </li>
                        <li class="list-item">
                            <q-btn size="8px"
                                padding="4px"
                                round
                                unelevated
                                color="whitesmoke"
                                icon="bi-fullscreen"
                                class="text-black q-mr-sm"></q-btn> Fullscreen
                        </li>
                        <li class="list-item">
                            <BaseButtonForDialogFooter style="font-size: 9.5px"
                                buttonText="Templates"
                                :hasShadow="false">
                            </BaseButtonForDialogFooter> opens the <span
                                style="font-style: italic">Template-Manager</span>
                        </li>
                        <li class="list-item">
                            <BaseButtonForDialogFooter style="font-size: 9.5px"
                                buttonText="
                                Toolbar
                                [+]"
                                :hasShadow="false">
                            </BaseButtonForDialogFooter> shows more options
                        </li>

                    </ul>
                </div>

            </div>
            <!-- Step 3 -->
            <div class="col-12 q-px-md q-pb-md"
                v-else-if="step === 3">
                <div>
                    <span style="font-size: 14px; font-weight: 600;">What to write about?</span>
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
                v-else-if="step === 4">
                <span style="font-size: 14px; font-weight: 600;">Titlebar's buttons</span>
                <div class="q-mt-md">
                    <ul style="list-style: none">
                        <li>
                            <q-btn size="8px"
                                padding="4px"
                                round
                                unelevated
                                color="secondary"
                                icon="bi-chevron-left"
                                class="text-white q-mr-sm"></q-btn>
                            <q-btn size="8px"
                                padding="4px"
                                round
                                unelevated
                                color="secondary"
                                icon="bi-chevron-right"
                                class="text-white q-mr-sm"></q-btn>

                            <span :style="getStyleForEmphasisedTextSecondary">navigates</span> between days
                        </li>
                        <li>
                            <q-btn size="8px"
                                padding="4px"
                                round
                                unelevated
                                color="secondary"
                                icon="bi-calendar-event"
                                class="text-white q-mr-sm"></q-btn> opens the <span
                                :style="getStyleForEmphasisedTextSecondary">calendar</span>
                        </li>
                        <li>
                            <q-btn size="8px"
                                padding="4px"
                                round
                                unelevated
                                color="secondary"
                                icon="bi-dot"
                                class="text-white q-mr-sm"></q-btn> brings you back to <span
                                :style="getStyleForEmphasisedTextSecondary">today</span>
                        </li>
                    </ul>
                </div>
                <div class="q-mt-md"></div>
            </div>

        </template>
    </BaseStepper>
</template>

<script>
import BaseButtonForDialogFooter from "../ui/BaseButtonForDialogFooter.vue";
import BaseStepper from "../ui/BaseStepper.vue"
export default {
    name: "TheHelpStepperForHome",
    emits: ["finish"],
    components: { BaseStepper, BaseButtonForDialogFooter },
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
.my-stepper
  .q-stepper__nav
    padding-top: 0px
    padding-bottom: 5px

.my-stepper
  .q-stepper__step-inner
    padding: 0px
.stepper-container 
    position: absolute
    z-index: 1
    left: 50%



.close-button-for-stepper
    margin-top: 25px
    margin-right: 20px
    padding: 10px
    z-index: 1
    
.list-item
    margin-bottom: 6px

</style>