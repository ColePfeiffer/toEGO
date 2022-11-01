<template>
    <BaseStepper :style="getStyle"
        :step="step"
        :numberOfSteps="numberOfSteps"
        @go-step-forward="goStepForward"
        @go-step-backward="goStepBackward"
        @finish="finish">
        <template v-slot:steps>
            <q-step :name="1"
                title="Welcome to toEGO!"
                dense
                color="secondary"
                class="q-pa-none q-ma-none"
                icon="bi-eye"
                :done="getDoneFor(1)">
            </q-step>
            <q-step :name="2"
                title="What are Notes used for?"
                caption="Keeping track"
                icon="bi-sticky"
                :done="getDoneFor(2)">
            </q-step>
            <q-step :name="3"
                title="Create a Note"
                icon="bi-plus-lg"
                :done="getDoneFor(3)">
            </q-step>
            <q-step :name="4"
                title="Message to Myself"
                icon="bi-envelope"
                :done="getDoneFor(4)">
            </q-step>

        </template>
        <template v-slot:step-content>
            <!-- Step 1: Welcome to toEGO -->
            <div class="col-12 "
                style="margin-top: 30px"
                v-if="step === 1">
                <div class="text-justify">
                    Hi!

                    This diary app will help you with introspection.
                </div>
                <div class="q-mt-lg">
                    I will tell you how.
                </div>
            </div>
            <!-- Step 2: What are Notes? -->
            <div class="col-12 "
                style="margin-top: 30px"
                v-else-if="step === 2">
                <div>
                    Notes are used to keep track of

                    <ul style="list-style: none">
                        <li>
                            - your <span :style="getStyleForEmphasisedText">experiences</span>, things happening
                            in
                            your life
                        </li>
                        <li>
                            - your <span :style="getStyleForEmphasisedText">thoughts</span>, your <span
                                :style="getStyleForEmphasisedText">emotions</span>
                        </li>
                        <li>- worries, your <span :style="getStyleForEmphasisedText">ideas</span>,
                            your <span :style="getStyleForEmphasisedText">goals</span></li>
                    </ul>
                </div>
            </div>
            <!-- Step 3: Create a Note -->
            <div class="col-12 "
                style="margin-top: 30px"
                v-else-if="step === 3">
                <div>
                    Create a note by clicking on
                    <ul style="list-style: none">
                        <li>
                            <q-btn size="8px"
                                padding="4px"
                                disable
                                round
                                unelevated
                                color="secondary"
                                icon="bi-plus-lg"
                                class="text-white q-mr-sm"></q-btn> above, or
                        </li>
                        <li>
                            <q-btn size="8px"
                                round
                                disable
                                padding="4px"
                                color="transparent"
                                text-color="accent"
                                unelevated
                                icon="bi-plus-lg"
                                class="text-accent q-mr-sm"></q-btn>
                            below, and selecting <span style="font-style: italic">create
                                note</span>
                        </li>
                    </ul>

                </div>
            </div>
            <!-- Step 4: Message to Myself -->
            <div class="col-12 "
                v-else-if="step === 4">
                Have you spotted
                <q-btn size="8px"
                    padding="4px"
                    round
                    disable
                    unelevated
                    color="secondary"
                    icon="bi-envelope"
                    class="text-white q-mr-sm"></q-btn>? There you can leave <span
                    style="font-size: 14px; font-weight: 600;">messages for yourself</span> via the
                <q-btn size="8px"
                    round
                    padding="4px"
                    disable
                    color="transparent"
                    text-color="secondary"
                    unelevated
                    icon="bi-pencil-square"
                    class="text-secondary q-mx-xs"></q-btn> symbol. I use it for writing...
                <div class="q-mt-md q-mb-md">

                    <ul style="list-style: none">
                        <li>
                            - a <span :style="getStyleForEmphasisedText">goal</span> or an <span
                                :style="getStyleForEmphasisedText">important task</span>
                        </li>
                        <li>
                            - a positive <span :style="getStyleForEmphasisedText">reminder</span>
                            <q-icon class="q-ml-md"
                                color="secondary"
                                name="bi-suit-heart" />
                        </li>
                    </ul>
                </div>
                <div class="q-mt-md">
                    P.S. You can change the look of the app in <span style="font-style: italic">Options</span>.
                </div>
            </div>
        </template>
    </BaseStepper>
</template>

<script>
import BaseStepper from "../ui/BaseStepper.vue"
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
        getStyle() {
            let style = {};
            style["height"] = this.$store.state.layout.height * 0.5 + "px";
            return style;
        }
    }
};
</script>
