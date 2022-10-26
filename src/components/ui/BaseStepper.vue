<template>
    <div class="q-px-md q-mt-xl q-pt-lg stepper-container"
        :style="getStepperStyle">
        <q-stepper v-model="step"
            class="my-stepper"
            vertical
            ref="stepper"
            color="primary"
            done-color="secondary"
            active-color="black"
            inactive-color="grey-4"
            animated>
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
                title="Message to Myself"
                icon="bi-envelope"
                :done="getDoneFor(3)">
            </q-step>
            <q-step :name="4"
                title="Create a Note"
                icon="bi-plus-lg"
                :done="getDoneFor(4)">
            </q-step>
            <div class="q-pa-md row justify-center items-center">
                <div class="col-12 q-pa-md"
                    v-if="step === 1">
                    <div class="text-justify">
                        Hi!

                        This diary app will help you with introspection.
                    </div>
                    <div class="q-mt-lg">
                        I will tell you how.
                    </div>



                </div>
                <div class="col-12 q-pa-md"
                    v-else-if="step === 2">
                    <div>
                        You can create a note whenever you want.
                    </div>
                    <div class="q-mt-md">
                        Notes are used to keep track of...
                        <ul style="list-style: none">
                            <li>
                                - <span :style="getStyleForEmphasisedText">things happening</span> in your life
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

                <div class="col-12 q-px-md "
                    v-else-if="step === 3">
                    Have you spotted
                    <q-btn size="8px"
                        padding="4px"
                        round
                        unelevated
                        color="secondary"
                        icon="bi-envelope"
                        class="text-white q-mr-sm"></q-btn>?
                    <div class="q-mt-md q-mb-md">There you can leave messages for yourself.
                        I use it for writing down...
                        <ul>
                            <li>
                                a <span :style="getStyleForEmphasisedText">goal</span> or an <span
                                    :style="getStyleForEmphasisedText">important task</span>
                            </li>
                            <li>
                                a positive <span :style="getStyleForEmphasisedText">reminder</span>
                                <q-icon class="q-ml-md"
                                    color="secondary"
                                    name="bi-suit-heart" />
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-12 q-px-md q-pb-md"
                    v-else-if="step === 4">
                    <div>
                        Create a note by clicking on
                        <ul style="list-style: none">
                            <li>
                                <q-btn size="8px"
                                    padding="4px"
                                    round
                                    unelevated
                                    color="secondary"
                                    icon="bi-plus-lg"
                                    class="text-white q-mr-sm"></q-btn> above, or
                            </li>
                            <li>
                                <q-btn size="8px"
                                    round
                                    padding="4px"
                                    color="transparent"
                                    text-color="accent"
                                    unelevated
                                    icon="bi-plus-lg"
                                    class="text-accent q-mr-sm"></q-btn>
                                below, and selecting <span style="font-style: italic">create
                                    note</span>.
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-12">
                    <q-stepper-navigation>
                        <div class="row justify-start items-center">
                            <q-btn v-if="step != numberOfSteps"
                                class="col-3 q-ml-sm"
                                @click="goStepForward"
                                color="primary"
                                label="Next" />
                            <q-btn class="col-3 q-ml-sm"
                                v-else
                                @click="finish"
                                color="primary"
                                label="Finish" />
                            <q-btn class="col-3 q-ml-sm"
                                v-if="step != 1"
                                flat
                                @click="goStepBack"
                                color="primary"
                                label="Back" />

                            <div class="col-3 q-ml-sm"
                                v-else>

                            </div>
                            <q-img class="col-3 q-ml-sm"
                                :src="'/images/ghost-pink-hue.gif'"
                                style="height: 50px; max-width: 50px; opacity: 0.5"
                                spinner-color="white" />

                        </div>

                    </q-stepper-navigation>
                </div>

            </div>

        </q-stepper>
    </div>
</template>

<script>
export default {
    name: "BaseStepper",
    emits: ["finish"],
    props: {
    },
    data() {
        return {
            step: 1,
            done1: false,
            done2: false,
            done3: false,
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
            if (this.step != this.numberOfSteps) {
                this.step = this.step + 1;
            }
        },
        goStepBack() {
            if (this.step != 1) {
                this.step = this.step - 1;
            }
        },
        reset() {
            done1.value = false
            done2.value = false
            done3.value = false
            step.value = 1
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
        getStepperStyle() {
            let style = {};
            let width = this.$store.state.layout.innerWidth;
            style["font-family"] = "Inter";
            style["min-height"] = "400px";
            style["width"] = width + "px";
            style["margin-left"] = -width / 2 + "px"
            return style;
        }
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

    

</style>